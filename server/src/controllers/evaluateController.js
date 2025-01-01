const evaluate = require("../models/evaluate");
const users = require("../models/users");
const getRandomTwo = require("../utils/randomLottery");
var LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");
let array = ["A", "B", "C", "D"];
let endTime = new Date().getTime() + 3 * 60 * 1000;
const cron = require("node-cron");
// Tạo cron job để reset thời gian đếm ngược mỗi 3 phút
// cron.schedule("*/3 * * * *", async () => {
//   console.log("Reset thời gian đếm ngược...");
//   endTime = new Date().getTime() + 3 * 60 * 1000;
//   // await updateLotteryAndUsers();
// });
const countdownTimer = async (req, res) => {
  const currentTime = new Date().getTime();
  const timeLeft = endTime - currentTime;

  if (timeLeft <= 0) {
    endTime = currentTime + 3 * 60 * 1000;
    return res.status(200).json({
      timeLeft: 3 * 60 * 1000,
    });
  } else {
    return res.status(200).json({
      timeLeft,
    });
  }
};
const updateTimer = async (req, res) => {
  try {
    let findRoom;
    findRoom = await evaluate.find();
    if (findRoom?.length === 0) throw new Error("Hiện tại chưa có phòng nào");

    const updatePromises = findRoom.map(async (find) => {
      const newTimer = new Date().getTime() + 3 * 60 * 1000;
      return await evaluate.findOneAndUpdate(
        { room: find?.room },
        { $set: { timer: newTimer } },
        { new: true, upsert: true }
      );
    });

    await Promise.all(updatePromises);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const countdown = async (req, res) => {
  try {
    let findRoom;
    findRoom = await evaluate.find();
    if (findRoom?.length === 0) throw new Error("Hiện tại chưa có phòng nào");
    const updatePromises = findRoom?.map(async (find) => {
      // Perform updates inside the promise
      return await evaluate.findOneAndUpdate(
        { room: find?.room },
        {
          periodNumber: [...find.periodNumber, find.periodNumber.length + 1],
          result: [
            ...find.result,
            find?.resultUpdate?.length > 0
              ? find.resultUpdate.at(-1)
              : getRandomTwo(array),
          ],
        },
        { new: true }
      );
    });

    await Promise.all(updatePromises);
    const removedPromises = findRoom.map(async (find) => {
      return await evaluate.findOneAndUpdate(
        { room: find?.room },
        {
          $pullAll: {
            resultUpdate: find?.resultUpdate,
          },
        },
        { new: true }
      );
    });
    await Promise.all(removedPromises);
    return res.status(200).json({
      success: findRoom ? true : false,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const updateRooms = async () => {
  const rooms = await evaluate.find();
  if (!rooms.length) throw new Error("Hiện tại chưa có phòng nào");

  const updateRoomPromises = rooms?.map(async (room) => {
    const newPeriodNumber = room.periodNumber.length + 1;
    const result = room?.resultUpdate?.at(-1);
    let splitResult;
    let formattedResult;
    if (result) {
      splitResult = result?.split(",");
      formattedResult = [splitResult[0], splitResult[1]];
    }
    const newResult =
      room?.resultUpdate?.length > 0 ? formattedResult : getRandomTwo(array);

    return evaluate.findOneAndUpdate(
      { room: room.room },
      {
        $push: { periodNumber: newPeriodNumber, result: newResult },
        $pullAll: { resultUpdate: room.resultUpdate },
      },
      { new: true }
    );
  });

  await Promise.all(updateRoomPromises);
};

const updateUserBalance = async (userId, roomId) => {
  const targetRoom = await evaluate.findOne({ room: roomId });
  const user = await users.findById(userId);

  if (!targetRoom || !user) {
    throw new Error("Không tìm thấy phòng hoặc người chơi");
  }
  console.log(userId, roomId);
  // Lấy danh sách các room
  const rooms = await evaluate.find();

  // const periodNumbers = rooms.map((room) => room.periodNumber.at(-1));
  // const results = rooms.map((room) => room.result.at(-1).sort());

  // Lọc kết quả của người dùng trong các phòng
  const userResults = rooms.flatMap((room, index) => {
    return room.users
      .filter((u) => u.UserId.toString() === userId?.toString())
      .map((user) => ({
        userResult: user.result,
        periodNumber: user.periodNumber,
        roomResult: room.result[user.periodNumber - 1],
        money: user.money,
      }));
  });
  // Kiểm tra kết quả: thắng, thua, hòa
  const checkResult = (userResult, roomResult) => {
    const isWin =
      userResult.length === roomResult.length &&
      userResult.every((el) => roomResult.includes(el));

    const isTie = userResult.some((el) => roomResult.includes(el));

    return isWin ? "win" : isTie ? "tie" : "lose";
  };

  // Hàm cập nhật số dư người dùng
  const updateBalanceForUser = async (
    user,
    resultType,
    multiplier = 2,
    money
  ) => {
    let adjustment = 0;
    if (resultType === "win") {
      adjustment = multiplier === 2 && money * 3;
    } else if (resultType === "lose") {
      adjustment = multiplier === 2 ? -money : 0;
    } else if (resultType === "tie") {
      adjustment = multiplier === 2 ? money : money * 2;
    }
    // Hòa (tie) không thay đổi số dư

    const newBalance = user.withDraw + adjustment;
    await users.findByIdAndUpdate(
      user._id,
      { withDraw: newBalance },
      { new: true }
    );
    return resultType;
  };

  // Lặp qua kết quả người dùng và thực hiện cập nhật
  const balanceUpdates = userResults.map(
    async ({ userResult, roomResult, periodNumber, money }) => {
      if (periodNumber === targetRoom.periodNumber.at(-1)) {
        const multiplier = userResult.length === 2 ? 2 : 1;
        const resultType = checkResult(userResult, roomResult);
        const resultMessage = await updateBalanceForUser(
          user,
          resultType,
          multiplier,
          money
        );

        if (resultMessage === "win") {
          console.log(
            `Người chơi thắng ${multiplier === 2 ? "2 cửa" : "1 cửa"}`
          );
        } else if (resultMessage === "lose") {
          console.log(
            `Người chơi thua ${multiplier === 2 ? "2 cửa" : "1 cửa"}`
          );
        } else if (resultMessage === "tie") {
          console.log(`Người chơi hòa`);
        }
      } else {
        console.log(
          `Không cập nhật vì periodNumber không khớp: ${periodNumber}`
        );
      }
    }
  );

  // Đợi tất cả các cập nhật hoàn tất
  await Promise.all(balanceUpdates);
};

const updateLotteryAndUsers = async (req, res) => {
  try {
    const { userId, roomId } = req.params;

    const requestKey = `${userId}-${roomId}`;
    if (global.activeRequests?.has(requestKey)) {
      return res
        .status(429)
        .json({ message: "Request is already being processed" });
    }
    global.activeRequests = global.activeRequests || new Set();
    global.activeRequests.add(requestKey);

    await updateRooms();
    await updateUserBalance(userId, roomId);

    global.activeRequests.delete(requestKey);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error in updateLotteryAndUsers:", error.message);
    return res.status(500).json({ error: error.message });
  }
};
// const updateLotteryAndUsers = async (req, res) => {
//   try {
//     const { userId, roomId } = req.params;

//     // Kiểm tra nếu yêu cầu đang được xử lý
//     const requestKey = `${userId}-${roomId}`;
//     if (global.activeRequests?.has(requestKey)) {
//       return res
//         .status(429)
//         .json({ message: "Request is already being processed" });
//     }
//     global.activeRequests = global.activeRequests || new Set();
//     global.activeRequests.add(requestKey);

//     // Lấy danh sách phòng
//     const rooms = await evaluate.find();
//     if (!rooms.length) throw new Error("Hiện tại chưa có phòng nào");

//     // Cập nhật periodNumber và result cho từng phòng
//     const updateRoomPromises = rooms.map(async (room) => {
//       const newPeriodNumber = room.periodNumber.length + 1;
//       const newResult =
//         room.resultUpdate?.length > 0
//           ? room.resultUpdate.at(-1)
//           : getRandomTwo(array);

//       return evaluate.findOneAndUpdate(
//         { room: room.room },
//         {
//           $push: { periodNumber: newPeriodNumber, result: newResult },
//           $pullAll: { resultUpdate: room.resultUpdate },
//         },
//         { new: true }
//       );
//     });

//     await Promise.all(updateRoomPromises);

//     // Lấy thông tin phòng và người chơi
//     const targetRoom = await evaluate.findOne({ room: roomId });
//     const user = await users.findById(userId);

//     if (!targetRoom || !user) {
//       throw new Error("Không tìm thấy phòng hoặc người chơi");
//     }

//     const periodNumbers = rooms.map((room) => room.periodNumber.at(-1));
//     const results = rooms.map((room) => room.result.at(-1).sort());

//     // Lấy kết quả xổ số của từng người chơi
//     const userResults = rooms.flatMap((room, index) => {
//       return room.users
//         .filter((u) => u.UserId === userId)
//         .map((user) => ({
//           userResult: user.result,
//           periodNumber: periodNumbers[index],
//           roomResult: results[index],
//         }));
//     });

//     // Hàm kiểm tra phần tử chung giữa 2 mảng
//     const hasCommonElements = (arr1, arr2) =>
//       arr1.some((el) => arr2.includes(el));

//     // Cập nhật số dư của người chơi dựa trên kết quả
//     const updateUserBalance = async (
//       user,
//       userResult,
//       roomResult,
//       multiplier = 1
//     ) => {
//       const isWin = hasCommonElements(userResult, roomResult);
//       const adjustment = (isWin ? multiplier : -multiplier) * userResult.length;
//       const newBalance = user.withDraw + adjustment;

//       await users.findByIdAndUpdate(
//         user._id,
//         { withDraw: newBalance },
//         { new: true }
//       );
//       return isWin;
//     };

//     // Xử lý kết quả của từng người chơi
//     const balanceUpdates = userResults.map(
//       async ({ userResult, roomResult }) => {
//         const multiplier = userResult.length === 2 ? 2 : 1;
//         const isWin = await updateUserBalance(
//           user,
//           userResult,
//           roomResult,
//           multiplier
//         );
//         console.log(
//           isWin
//             ? `Người chơi thắng ${multiplier === 2 ? "2 cửa" : "1 cửa"}`
//             : `Người chơi thua ${multiplier === 2 ? "2 cửa" : "1 cửa"}`
//         );
//       }
//     );

//     await Promise.all(balanceUpdates);

//     // Xóa key request khỏi danh sách active
//     global.activeRequests.delete(requestKey);

//     return res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("Error in updateLotteryAndUsers:", error.message);
//     return res.status(500).json({ error: error.message });
//   }
// };

const createLottery = async (req, res) => {
  try {
    const { period, result, room } = req.body;

    const newEvaluate = await evaluate.create({
      period,
      result,
      room,
      image: req?.files?.images[0]?.filename,
    });
    newEvaluate.save();
    return res.status(200).json({
      success: newEvaluate
        ? "Successfully created"
        : "Failed to create evaluate",
      newEvaluate,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const updateLotteryResult = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { resultUpdate, image, room } = req.body;
    console.log(resultUpdate);
    const newEvaluate = await evaluate.findOneAndUpdate(
      { room: roomId },
      {
        resultUpdate,
        image: image?.length > 0 ? image : req?.files?.image[0]?.filename,
        room,
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: newEvaluate
        ? "Successfully update"
        : "Failed to update evaluate",
      newEvaluate,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const getAllLottery = async (req, res) => {
  const lotteries = await evaluate.find().populate({
    path: "users",
    populate: {
      path: "UserId",
      select: "username", // Lấy thông tin tên và ảnh sản phẩm
    },
  });

  return res.status(200).json({
    success: lotteries ? true : false,
    lotteries,
  });
};
const updateLottery = async (req, res) => {
  try {
    const { userId, roomId } = req.params;
    const findUser = await users.findById(userId);
    if (!findUser)
      return res.status(400).json({
        message: "Không tìm thấy người dùng",
      });
    let data = await evaluate.findOne({ room: roomId });
    const { money, result } = req.body;
    if (!result.length > 0)
      return res.status(400).json({
        message: "Vui lòng chọn cược",
      });
    if (!money || money < 1)
      return res.status(400).json({
        message: "Vui lòng nhập số tiền lớn hơn 1 ",
      });
    if (money > findUser?.withDraw / 2)
      return res.status(400).json({
        message: "Vui lòng đặt tiền cược không hơn 50% số dư của bạn",
      });
    if (
      data &&
      data.users.at(-1)?.UserId === userId &&
      data?.periodNumber?.at(-1) + 1 === data?.users?.at(-1)?.periodNumber
    )
      return res.status(400).json({
        message: "Bạn đã đặt cược rồi! Vui lòng đợi kết quả ",
      });
    // console.log(evaluates?.result?.at(-1)?.sort());
    // toLowerCase()
    // let user = await evaluate.findOne({ "users._id": userId });
    // console.log(user);
    // if (!user) {

    // }

    await evaluate.findOneAndUpdate(
      { room: roomId },
      {
        $push: {
          users: {
            money: money,
            UserId: userId,
            result: result,
            periodNumber: data?.periodNumber?.at(-1) + 1,
          },
          // "users.money": money,
          // "users.id": userId,
          // "users.result": result,
          // "users.periodNumber": data?.periodNumber?.at(-1),
        },
      },
      { new: true }
    );

    await users.findByIdAndUpdate(
      findUser._id,
      { withDraw: findUser.withDraw - money },
      { new: true }
    );
    return res.status(200).json({
      success: data ? true : false,
      message: data && "Đánh giá thành công vui lòng đợi có kết quả!",
      data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const getRoomById = async (req, res) => {
  try {
    const { roomId } = req.params;
    let evaluates = await evaluate
      .findOne({ room: roomId })
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: evaluates ? true : false,
      evaluates,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật thời gian:", error);
  }
};
const getLotteryById = async (req, res) => {
  try {
    const { roomId, userId } = req.params;
    const evaluates = await evaluate
      .findOne({ room: roomId })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: evaluates ? true : false,
      evaluates,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật thời gian:", error);
  }
};

const getLotteryHistory = async (req, res) => {
  try {
    const { roomId, userId } = req.params;

    // Tìm bản ghi cần cập nhật
    const evaluates = await evaluate.findOne({ room: roomId });

    // await updatePromise;
    return res.status(200).json({
      success: evaluates ? true : false,
      evaluates,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật thời gian:", error);
  }
};
const deleteLotteryById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("Invalid");
    const lottery = await evaluate?.findByIdAndDelete(id);
    return res.status(200).json({
      success: lottery ? true : false,
      lottery,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createLottery,
  getAllLottery,
  updateLottery,
  getLotteryById,
  updateLotteryAndUsers,
  getLotteryHistory,
  getRoomById,
  updateLotteryResult,
  countdown,
  deleteLotteryById,
  updateTimer,
  countdownTimer,
};
