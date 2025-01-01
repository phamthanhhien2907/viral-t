import { apiGetWithDrawById } from "@/services/withdrawAndDepositService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import empty from "@/assets/empty-image-default.png";
import { ChevronLeft, X } from "lucide-react";
import moment from "moment";
const WithDrawalHistory = () => {
  const [withDraw, setWithDraw] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const getWithDrawalHistory = async (id) => {
    const data = await apiGetWithDrawById(id);
    if (data.success) setWithDraw(data?.withDraws);
  };
  useEffect(() => {
    getWithDrawalHistory(id);
  }, [id]);
  return (
    <div className="">
      <div className="relative w-full mx-auto ">
        <div className="sticky w-full top-0">
          <div className="w-full h-[50px] bg-profileColor">
            <ChevronLeft
              onClick={() => {
                localStorage.setItem("page", 4);
                navigate("/");
              }}
              className="absolute top-2 z-30 left-4 text-white cursor-pointer"
              size={30}
            />
            <span className=" text-xl text-white absolute top-2 left-[40%] max-sm:text-base">
              Lịch sử rút
            </span>
          </div>
        </div>
        <div className="h-screen overflow-y-scroll tabs-list">
          {withDraw.length > 0 ? (
            <div className="bg-gray-200 py-2">
              <div className="w-full px-2 flex flex-col gap-2">
                {withDraw?.map((el, index) => (
                  <div
                    key={index}
                    className="w-full  border-b-2 bg-white flex flex-col gap-1 px-2 py-2 rounded-xl"
                  >
                    <div className="flex flex-col gap-2">
                      <span className="text-lg font-semibold text-gray-500 max-sm:text-[12px]">
                        Trạng thái
                      </span>
                      <span className={`${el?.status === "Đợi duyệt" ? "text-lg font-bold text-yellow-500 max-sm:text-[12px]" : el?.status === "Thành công" ? "text-lg font-bold text-green-500 max-sm:text-[12px]" : "text-lg font-bold text-red-500 max-sm:text-[12px]"} `}>{el?.status}</span>
                    </div>
                    {/* <div className="flex flex-col gap-2">
                      <span className="text-lg font-semibold text-gray-500">
                        Khoảng thời gian
                      </span>
                      <span className="text-lg font-bold">
                        {moment(el?.craetedAt).format("YYYY-MM-DD HH:mm:ss")}
                      </span>
                    </div> */}
                    <div className="flex flex-col gap-2">
                      <span className="text-lg font-semibold text-gray-500 max-sm:text-[12px]">
                        Số tiền
                      </span>
                      <span className="text-lg font-bold max-sm:text-[12px]">{el?.withDraw}</span>
                    </div>
                    
                    {el?.reson?.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <span className="text-lg font-semibold text-gray-500">
                          Nội dung
                        </span>
                        <span className="text-lg font-bold">{el?.reson}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
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
  );
};

export default WithDrawalHistory;
