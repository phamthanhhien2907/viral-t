const users = require("../models/users");
const withDraw = require("../models/withDraw");

const getAllDeposit = async (req, res) => {
  const lotteries = await withDraw.find();
  console.log(lotteries);
  return res.status(200).json({
    success: lotteries ? true : false,
    lotteries,
  });
};
const getAllWithDraw = async (req, res) => {
  const findWithDraw = await withDraw
    .find()
    .populate({
      path: "users",
    })
    .sort({ createdAt: -1 });
  console.log(findWithDraw);

  return res.status(200).json({
    success: findWithDraw ? true : false,
    findWithDraw,
  });
};
const getWithDrawById = async (req, res) => {
  const { id } = req.params;
  const findWithDraw = await withDraw
    .find()
    .populate({
      path: "users",
    })
    .sort({ createdAt: -1 });

  let withDraws;
  if (findWithDraw) {
    withDraws = findWithDraw?.filter(
      (draw) => draw.users?._id.toString() === id
    );
  }

  console.log(withDraws);

  return res.status(200).json({
    success: withDraws ? true : false,
    withDraws,
  });
};
module.exports = {
  getAllDeposit,
  getAllWithDraw,
  getWithDrawById,
};
