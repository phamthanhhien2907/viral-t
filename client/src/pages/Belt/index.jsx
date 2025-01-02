import { apiGetAllLottery } from "@/services/evaluateService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import empty from "@/assets/empty-image-default.png";
import { ChevronLeft } from "lucide-react";
import {  faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "@/components/custom ui/Loader";
import DataGridUI from "../Admin/DataGrid";
import moment from "moment";
const Belt = () => {
  const [lottery, setLottery] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState(null)
  const searchValue = value?.toString().toUpperCase();
  const getResultString = (isDraw) => {
    console.log(isDraw)
    if (isDraw === true) return "hòa";
    if (isDraw === false) return "thua";
  };
  const getResultStringWin = (isWin) => {
    if (isWin === true) return "thắng";

  };
  const getAllLottery = async () => {
    setLoading(true)
    const data = await apiGetAllLottery();
    if (data?.success) {
      const updatedLotteries = data?.lotteries.map((el) => {
        const updatedUsers = el?.users.map((user) => {
          const userPeriodIndex = el?.periodNumber.indexOf(user?.periodNumber);
          if (userPeriodIndex !== -1) {
            const gameResult = el?.result[userPeriodIndex];
            const userResult = user?.result;

            if (
              JSON.stringify(gameResult) === JSON.stringify(userResult)
            ) {
              return { ...user, gameStatus: "Thắng" };
            } else if (
              gameResult?.some((r) => userResult?.includes(r))
            ) {
              return { ...user, gameStatus: "Hòa" };
            } else {
              return { ...user, gameStatus: "Thua" };
            }
          }
          return { ...user, gameStatus: "Không rõ" };
        }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return { ...el, users: updatedUsers };
      });
      setLottery(updatedLotteries);
      console.log(updatedLotteries)
      setLoading(false)
    }
  };
  const onChangeValue = (e) => {
    setValue(e.target.value)
  }
  useEffect(() => {
    getAllLottery();
  }, []);
 
  return (
    // loading ? <Loader /> : <DataGridUI initialRows={lottery} type="belt"/>
    
    <div className="">
      <div className="relative w-full mx-auto">
          <form
            className="sm:w-full shadow-md mx-auto my-2 p-2 bg-white relative z-50">
            <div className="flex items-center">
              <input 
                value={value} 
                onChange={onChangeValue} 
                type="text" 
                className="flex-grow bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                placeholder="Tìm kiếm tên người rút tiền" 
                aria-label="Search" 
                aria-describedby="basic-addon2" 
              />
              <button 
                className="ml-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md transition-all duration-200" 
                type="button">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </form>
        <div className="h-screen overflow-y-scroll tabs-list overflow-x-hidden">
          {lottery?.length > 0 ? lottery?.map((el, index) => (
            <div
              key={index}
              className="w-full bg-white flex flex-col gap-1 px-2 py-2 "
            >
              {/* <div className="flex flex-col gap-2 ">
                <span className="text-base font-semibold text-gray-500 max-sm:text-[14px]">
                  Khoảng thời gian
                </span>
                <span className="text-base font-bold max-sm:text-[14px]">
                  {moment(el?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                </span>
              </div> */}
              {value?.length > 0 ? <div className="flex flex-col gap-2">
                {/* <span className="text-base font-semibold text-gray-500 max-sm:text-[14px]">Kết quả đánh giá phòng {el?.room}</span> */}
                {el?.users?.length > 0 ? el?.users?.map((user, userIndex) => {
                  const periodResult = el?.result?.[user.periodNumber - 1]; // Lấy kết quả của vòng hiện tại
                  const formattedDate = moment(user?.createdAt).format("YYYY-MM-DD HH:mm:ss");
                  const isWin = JSON.stringify(user.result) === JSON.stringify(periodResult);
                  const isDraw = user?.result?.some((r) => periodResult?.includes(r)) && !isWin;
                  const isMatch = 
                    (typeof user.UserId?.username === "string" &&
                      user.UserId?.username?.toUpperCase()?.includes(searchValue)) ||
                    (typeof isWin === "boolean" &&
                      getResultStringWin(isWin)?.toString().toUpperCase() === searchValue) || (typeof isDraw === "boolean" &&
                        getResultString(isDraw)?.toString().toUpperCase() === searchValue) ||
                    (typeof user?.periodNumber === "number" &&
                      user?.periodNumber?.toString().toUpperCase() === searchValue) || 
                      (formattedDate?.includes(searchValue))
                  if(isMatch) {
                    return (
                      <div key={userIndex} className="w-full flex flex-col gap-2 bg-gray-100 rounded-xl py-4 px-2">
                        <span className="text-sm font-bold max-sm:text-[12px]">
                          Khoảng thời gian : {moment(user?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                        </span>
                        <span className="text-sm font-bold max-sm:text-[12px]">
                          Tài khoản người chơi: {user.UserId?.username}
                        </span>
                        <span className="text-sm font-bold max-sm:text-[12px]">
                          Phiên đánh giá: {user?.periodNumber}
                        </span>
                        <div className="flex flex-col gap-2">
                          <span className="text-sm font-bold max-sm:text-[12px]">
                            Kết quả: {user.result?.join(", ")}
                          </span>
                          <span className="text-sm font-bold max-sm:text-[12px]">
                            Dự đoán của người chơi: {periodResult?.join(", ")}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold max-sm:text-[12px]">Nội dung:</span>
                            <span
                            className={`text-sm max-sm:text-[12px] font-bold ${
                              isWin
                                ? "text-green-500"
                                : isDraw
                                ? "text-yellow-500"
                                : "text-red-500"
                            }`}
                          >
                            {isWin ? "Thắng" : isDraw ? "Hòa" : "Thua"}
                          </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  }) : <div className="text-black font-semibold max-sm:text-[14px]">Chưa có người chơi nào đánh giá !</div>}
              </div> : <div className="flex flex-col gap-2">
                {/* <span className="text-base font-semibold text-blue-500 max-sm:text-[14px]">Kết quả đánh giá phòng {el?.room}</span> */}
                {el?.users?.length > 0 ? el?.users?.map((user, userIndex) => {
                  const periodResult = el?.result?.[user.periodNumber - 1]; // Lấy kết quả của vòng hiện tại
                  const isWin = JSON.stringify(user.result) === JSON.stringify(periodResult);
                  const isDraw = user.result.some((r) => periodResult?.includes(r)) && !isWin;
                 
                    return (
                      <div key={userIndex} className="w-full flex flex-col gap-2 bg-gray-100 rounded-xl py-4 px-2">
                        <span className="text-sm font-bold max-sm:text-[12px]">
                          Khoảng thời gian : {moment(user?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                        </span>
                        <span className="text-sm font-bold max-sm:text-[12px]">
                          Tài khoản người chơi: {user.UserId?.username}
                        </span>
                        <span className="text-sm font-bold max-sm:text-[12px]">
                          Phiên đánh giá: {user?.periodNumber}
                        </span>
                        <div className="flex flex-col gap-2">
                          <span className="text-sm font-bold max-sm:text-[12px]">
                            Kết quả: {user.result?.join(", ")}
                          </span>
                          <span className="text-sm font-bold max-sm:text-[12px]">
                            Dự đoán của người chơi: {periodResult?.join(", ")}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold max-sm:text-[12px]">Nội dung:</span>
                            <span
                            className={`text-sm max-sm:text-[12px] font-bold ${
                              isWin
                                ? "text-green-500"
                                : isDraw
                                ? "text-yellow-500"
                                : "text-red-500"
                            }`}
                          >
                            {isWin ? "Thắng" : isDraw ? "Hòa" : "Thua"}
                          </span>
                          </div>
                        </div>
                      </div>
                    );
                  
                  }) : null}
              </div>}
              </div>
          ))
          :(
            <div className="w-full h-screen flex flex-col items-center justify-start">
              <img src={empty} />
              <span className="text-xl font-semibold text-gray-500">
                Chưa có giao dịch nào !
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
};

export default Belt;
