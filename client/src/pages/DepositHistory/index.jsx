import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import noCart from "@/assets/empty-image-default.png";
import { ChevronLeft } from "lucide-react";
import moment from "moment";
import { apiGetMyDeposit } from "@/services/userService";
import { useMediaQuery } from "@mui/material";
const DepositHistory = () => {
  const [withDraw, setWithDraw] = useState([]);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  const getWithDrawalHistory = async () => {
    const data = await apiGetMyDeposit();
    console.log(data)
    if (data.success) setWithDraw(data?.dp);
  };
  useEffect(() => {
    getWithDrawalHistory();
  }, []);
  return (
    <div className="h-screen bg-gray-50">
      <div className="relative w-full mx-auto">
        <div className="sticky w-full top-0">
          <div className="w-full h-[50px] bg-profileColor">
            <ChevronLeft
              onClick={() => {
                window.history.back()
              }}
              className="absolute top-2 z-30 left-4 text-white cursor-pointer"
              size={isMobile ? "25px" : "30px"}
            />
            <span className=" text-xl max-sm:text-sm text-white absolute top-2 max-sm:top-3 left-[40%]">
              Lịch sử nạp
            </span>
          </div>
        </div>
        <div>
          {withDraw && withDraw?.length > 0 ? (
            <div className=" h-fit px-2 py-4">
              <div className="w-full px-2 ">
                {withDraw?.map((el, index) => (
                  <div
                    key={index}
                    className="w-full h-fit border-b-2 bg-white flex flex-col gap-1 px-2 py-2 rounded-xl"
                  >
                    <div className="flex flex-col gap-2">
                      <span className="text-lg max-sm:text-xs font-semibold text-gray-500">
                        Khoảng thời gian
                      </span>
                      <span className="text-lg max-sm:text-xs font-bold">
                        {moment(el?.craetedAt).format("YYYY-MM-DD HH:mm:ss")}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-lg max-sm:text-xs font-semibold text-gray-500">
                        Số tiền
                      </span>
                      <span className="text-lg max-sm:text-xs font-bold">{el?.deposit}</span>
                    </div>
                    {/* {el?.text && <div className="flex flex-col gap-2">
                      <span className="text-lg max-sm:text-xs font-semibold text-gray-500">
                        Nội dung
                      </span>
                      <span className="text-lg max-sm:text-xs font-bold">{el?.text}</span>
                    </div>}
                    {el.reson?.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <span className="text-lg max-sm:text-xs font-semibold text-gray-500">
                          Nội dung
                        </span>
                        <span className="text-lg max-sm:text-xs font-bold">{el?.reson}</span>
                      </div>
                    )} */}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full h-screen flex flex-col items-center justify-start">
              <img src={noCart} />
              <span className="text-xl font-semibold text-gray-500 max-sm:text-xs">
                Chưa có giao dịch nào !
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepositHistory;