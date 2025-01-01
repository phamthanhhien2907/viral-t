import { ChevronDown, ChevronLeft, ShoppingCart } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  apiGetAllLottery,
  apiGetCountdownTimer,
  apiGetLotteryById,
  apiUpdateLottery,
  apiUpdateUserIntoRoom,
} from "@/services/evaluateService";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getCurrent } from "@/stores/actions/userAction";
import { useForm } from "react-hook-form";
import { Skeleton } from "@/components/ui/skeleton";
import { pathImg } from "@/lib/constant";
import { useTranslation } from "react-i18next";

const result = [
  {
    id: 1,
    name: "A",
  },
  {
    id: 2,
    name: "B",
  },
  {
    id: 3,
    name: "C",
  },
  {
    id: 4,
    name: "D",
  },
];
const DetailEvalute = () => {
  const {
    register,
    handleSubmit,
    reset
  } = useForm({
    defaultValues: {
      money: "",
    },
  });
  // const [seconds, setSeconds] = useState(180);
  const [selectedItems, setSelectedItems] = useState([]);
  const [hoverActive, setHoverActive] = useState(true);
  const [active, setActive] = useState(false);
  const [lottery, setLottery] = useState(null);
  const { id } = useParams();
  const { roomId, userId } = useParams();
  const [isFetching, setIsFetching] = useState(false); // Thêm cờ kiểm tra
  const { t } = useTranslation('global');
  const navigate = useNavigate();
  const { currentData } = useSelector((state) => state.user);
  const [timeLeft, setTimeLeft] = useState(0);
  // Hàm gọi API để lấy thời gian còn lại
  const fetchTimeLeft = async () => {
    if (isFetching) return; 
    setIsFetching(true); 

    try {
      const response = await apiGetCountdownTimer();
      setTimeLeft(response?.timeLeft);

      if (response?.timeLeft <= 2000) {
        setTimeout(async () => {
          try {
            await apiUpdateUserRoom(roomId, userId);
            await getAllLottery();
            await apiGetDetailsLottery(roomId, userId);
          } catch (error) {
            console.error("Lỗi khi gọi API đếm ngược:", error);
          }
        }, 2000);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API đếm ngược:", error);
    } finally {
      setIsFetching(false); // Đặt lại cờ sau khi hoàn tất
    }
  };
  
  useEffect(() => {
    // Gọi API ngay khi component được tải
    fetchTimeLeft();

    // Thiết lập interval để gọi API mỗi giây
    const interval = setInterval(() => {
      fetchTimeLeft();
    }, 1000);

    return () => clearInterval(interval); // Dọn dẹp khi component unmount
  }, []);
  const formatTime = (timeInMillis) => {
    const hours = Math.floor(
      (timeInMillis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeInMillis % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeInMillis % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, "0")} : ${minutes
      .toString()
      .padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`;
  };

  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(getCurrent());
    }, 1000);
  }, [dispatch]);

  const handleSelect = (e, name) => {
    e.preventDefault();
    e.stopPropagation();
    let newSelected = [...selectedItems]; // Assuming you have 'selectedItems' state

    // Check if the clicked element is already selected (includes)
    const isSelected = newSelected.includes(name);

    // Update the selected items based on the click
    if (isSelected) {
      // Remove the clicked element if it's already selected
      newSelected.splice(newSelected.indexOf(name), 1);
    } else {
      // Add the clicked element if it's not already selected (limit to 2?)
      if (newSelected.length < 2) {
        // Limit to 2 selections (optional)
        newSelected.push(name);
      } else {
        // Handle case where user tries to select more than 2 (optional)
        toast.error("Bạn đã chọn tối đa 2 ô");
      }
    }

    // Update state with the new selected items (assuming you have a state)
    newSelected.sort();
    setSelectedItems(newSelected);
  };
  const apiUpdateEvaluate = async (values) => {
    const data = await apiUpdateLottery(roomId, userId, {
      money: values?.money,
      result: selectedItems,
    });

    if (data?.success) {
      toast.success(data?.message);
      reset();
      setHoverActive(!hoverActive);
      setSelectedItems([]);
      dispatch(getCurrent())
    } else {
      toast.error(data?.message);
    }
  };
  // const apiGetApiUpdateTimer = async () => {
  //   let endTime = new Date().getTime() + Number(time) * 60 * 1000;
  //   await apiupdateTimer({ timer: endTime });
  //   // if (data?.success) {
  //   //   toast.success(data?.message);
  //   // } else {
  //   //   toast.error(data?.message);
  //   // }

  // };
  const apiGetDetailsLottery = async (roomId, userId) => {
    const data = await apiGetLotteryById(roomId, userId);
    if (data?.success) {
      setLottery(data?.evaluates);
    }
  };
  useEffect(() => {
    apiGetDetailsLottery(roomId, userId);
  }, [roomId, userId]);

  const getAllLottery = async() => {
     await apiGetAllLottery()
  }

  const calledRooms = new Set(); // Bộ nhớ tạm để lưu các cặp roomId-userId đã gọi

    const apiUpdateUserRoom = async (roomId, userId) => {
      const key = `${roomId}-${userId}`; // Tạo một khóa duy nhất cho mỗi cặp roomId-userId

      if (calledRooms.has(key)) {
        console.log("Hàm đã được gọi trước đó, không gọi lại.");
        return;
      }

      // Đánh dấu cặp roomId-userId này đã được gọi
      calledRooms.add(key);

      try {
        const data = await apiUpdateUserIntoRoom(roomId, userId);
        // if (data?.success) {
        //   toast.success(data?.message);
        // } else {
        //   toast.error(data?.message);
        // }
      } catch (error) {
        toast.error("Lỗi khi cập nhật người dùng vào phòng." + error);
      }
    };

 

  // useEffect(() => {
  //   const countdownElement = document.getElementById("countdown");
  //   async function updateCountdown() {
  //     const now = new Date().getTime();
  //     const distance = lottery?.timer - now
  //     if (distance <= 0) {
  //       getAllLottery()
  //       countdownElement.textContent = "00 : 00 : 00";
  //       getApiUpdateTimer();
  //       apiGetDetailsLottery(roomId, userId);
  //       // apiUpdateUserRoom(roomId, userId);
  //     } else {
  //       const hours = Math.floor(distance / (1000 * 60 * 60))
  //         .toString()
  //         .padStart(2, "0");
  //       const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  //         .toString()
  //         .padStart(2, "0");
  //       const seconds = Math.floor((distance % (1000 * 60)) / 1000)
  //         .toString()
  //         .padStart(2, "0");

  //       countdownElement.textContent =
  //         hours + " : " + minutes + " : " + seconds;
  //     }
      
  //   }

  //   let intervalId = setInterval(updateCountdown, 1000);
  //   updateCountdown();

  //   return () => clearInterval(intervalId);
  // }, [lottery?.timer, roomId, userId, timer]);

  
  return (
    <div className="sm:w-full mx-auto bg-gray-100 h-screen relative">
      <div className="sticky w-full top-0">
        <ChevronLeft
          onClick={(e) => {
            e.preventDefault();
            localStorage.setItem("page", 1);
            navigate("/");
          }}
          className="absolute top-2 z-30 left-4 text-white cursor-pointer"
          size={30}
        />
        <div className="w-full h-[50px] bg-profileColor">
          <span className=" text-xl text-white absolute top-2 left-[40%]">
            {t("belt.evaluateId")}
          </span>
        </div>
      </div>
        {/* <div onClick={() => apiUpdateUserRoom(roomId, userId)}>abc</div>     */}
      <div className="shadow-xl">
        <div className="flex items-center justify-between px-4 pt-4 pb-10">
          <div className="flex gap-4 items-center">
            <div className="w-[60px] h-[60px]">
              {lottery?.image ? (
                <img
                  src={`${pathImg}/images/${lottery?.image}`}
                  alt=""
                  className="w-full h-full"
                />
              ) : (
                <Skeleton className="w-full bg-gray-400 h-full rounded-full" />
              )}
            </div>
            {lottery?.periodNumber ? (
              <span className="font-semibold text-xl">
                {lottery?.periodNumber?.length + 1}
              </span>
            ) : (
              <Skeleton className="h-[30px] w-[120px] bg-gray-300 rounded-xl" />
            )}
          </div>
          <div className="flex flex-col gap-4 items-center">
            <span className="text-pink-700">{t("belt.history")}</span>
            <p hidden id="timeHidden" className=" text-xl text-red-500"></p>
            {timeLeft > 0 ? (
              <h2 className=" text-xl text-red-500">{formatTime(timeLeft)}</h2>
            ) : (
              <h2>{t("belt.loading")}</h2>
            )}
            <p id="countdown" className=" text-xl text-red-500"></p>
          </div>
        </div>

        <div className="w-[90%] mx-auto rounded-full h-[2px] bg-borderColor"></div>
        <div className="relative">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-12 ">
              <span className="flex items-center gap-2">
                {t("belt.previousPeriod")}
                <span className="font-semibold">
                  {lottery?.periodNumber?.at(-1)} :
                </span>
              </span>
              <span className="text-blue-500 flex items-center  gap-8 font-medium">
                {lottery?.result?.at(-1)?.map((el, index) => (
                  <span key={index}>{el}</span>
                ))}
              </span>
            </div>
            <ChevronDown
              className={`transition cursor-pointer duration-150 ease-in-out ${
                active ? "rotate-180" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActive(!active);
              }}
            />
          </div>
          {active && (
            <div
              className={`tabs-list overflow-y-scroll absolute top-10 w-full h-[220px] bg-white ${
                active
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-[-100%]"
              } transition-all duration-1000 ease-in-out delay-1000`}
            >
              <div className="flex items-center justify-around w-full">
                <span className="text-red-500 font-semibold">{t("belt.session")}</span>
                <span className="text-red-500 font-semibold">{t("belt.result")}</span>
              </div>
              <div className="flex items-center justify-around ">
                <div className="flex flex-col gap-4">
                  {lottery?.periodNumber
                    ?.slice()
                    ?.reverse()
                    ?.map((lot) => (
                      <span className="font-semibold " key={lot}>
                        {lot}
                      </span>
                    ))}
                </div>

                <div className="font-semibold">
                  <div className="flex flex-col gap-4">
                    {lottery?.result
                      ?.slice()
                      ?.reverse()
                      ?.map((lot, index) => (
                        <span
                          className="font-semibold items-center flex gap-6"
                          key={index}
                        >
                          {lot?.map((el) => (
                            <span key={el + index}>{el}</span>
                          ))}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 py-8 px-4">
        {result?.map((rs) => (
          <button
            key={rs?.id}
            onClick={(e) => {
              e.stopPropagation();
              handleSelect(e, rs?.name);
            }}
            className={`w-full h-[160px] rounded-xl ${
              selectedItems?.includes(rs?.name) ? "bg-red-500" : "bg-white"
            }`}
          >
            <div className="w-full flex flex-col items-center justify-center h-full">
              <span
                className={`${
                  selectedItems?.includes(rs?.name)
                    ? "text-white font-semibold"
                    : "text-gray-500 font-semibold"
                }`}
              >
                {rs.name}
              </span>
              <span
                className={`  ${
                  selectedItems?.includes(rs?.name)
                    ? "text-white font-semibold"
                    : "text-red-500 font-bold"
                }`}
              >
                1:10
              </span>
            </div>
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit(apiUpdateEvaluate)}>
        <div className="w-full h-[70px] bg-white absolute bottom-0">
          <div className="flex items-center py-2 justify-between px-4 relative ">
            {selectedItems?.length > 0 && hoverActive && (
              <div className="absolute bottom-[70px] w-full h-fit bg-white border-b-2 left-0">
                <div className="flex items-center justify-between px-4 py-2">
                  <div className="flex gap-4 items-center">
                    <span>{t("belt.yourSelection")}</span>
                    {selectedItems?.map((selected, index) => (
                      <span key={index}>{selected}</span>
                    ))}
                  </div>
                  <ChevronDown
                    className={`transition cursor-pointer duration-150 ease-in-out ${
                      hoverActive ? "rotate-180" : ""
                    }`}
                    onClick={(e) => {
                      setHoverActive(!hoverActive);
                      e.stopPropagation();
                    }}
                  />
                </div>
                <div className="flex items-center justify-between px-4 py-2">
                  <span>{t("belt.enterAmount")}</span>
                  <input
                    type="number"
                    placeholder={t("belt.enterAmount")}
                    className="outline-none text-red-500 font-semibold"
                    {...register("money", { required: true })}
                    // aria-invalid={errors.moeny ? "true" : "false"}
                  />
                  {/* {errors.money?.type === "required" &&
                    toast.error("Vui lòng nhập số tiền bạn muốn đặt")} */}
                </div>
                <div className="flex items-center justify-between px-4 py-2">
                  <span className="flex items-center gap-2">
                    {t("belt.totalBets")}
                    <span className="text-red-500 font-bold">
                      {selectedItems?.length}
                    </span>
                  </span>
                  <span className="flex items-center gap-2">
                  {t("belt.allAmount")}
                    <span className="text-red-500 font-bold">
                      {currentData?.withDraw.toLocaleString("vi-VN") + "₫"}
                    </span>
                  </span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-6 ">
              <div className="flex flex-col gap-2 justify-center cursor-pointer">
                <ShoppingCart
                  size={22}
                  onClick={() => {
                    if (selectedItems?.length > 0) setHoverActive(!hoverActive);
                  }}
                />
                <span className="text-gray-500">{t("belt.option")}</span>
              </div>
              <span className="w-[2px] h-[40px] bg-gray-500"></span>
            </div>
            <div className="flex items-start gap-4  ">
              <span className="flex flex-col ">
                {t("belt.availableMoney")}
                <span className="text-red-500">
                  {currentData?.withDraw.toLocaleString("vi-VN") + "₫"}
                </span>
              </span>
              <button className="rounded-2xl bg-profileColor px-6 py-2 text-white" >
              {t("belt.placeAmount")}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DetailEvalute;
