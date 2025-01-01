import { apiGetLotteryHistory } from "@/services/evaluateService";
import { useNavigate, useParams } from "react-router-dom";
import empty from "@/assets/empty-image-default.png";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
const HistoryDetails = () => {
  const [evalute, setEvalute] = useState(null);
  const [active, setActive] = useState(0);
  const [key, setKey] = useState(1);
  const { t } = useTranslation("global");
  const { roomId, userId } = useParams();
  const navigate = useNavigate();
  const getHistoryLottery = async (roomId, userId) => {
    const data = await apiGetLotteryHistory(roomId, userId);
    if (data?.success) {
      setEvalute(data?.evaluates);
    }
  };
  useEffect(() => {
    getHistoryLottery(roomId, userId);
  }, [roomId, userId]);

  const filterUser = evalute?.users?.filter((el) => el?.UserId === userId);
  return (
    <div className="h-screen">
      <div className="relative w-full mx-auto">
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
            <span className=" text-lg text-white absolute max-sm:top-3 top-2 left-[25%] max-sm:text-sm">
                {t("evalute.evaluationHistory")} {roomId}
            </span>
          </div>
        </div>
        <div>
          {filterUser?.length > 0 ? (
            <div className="bg-gray-200 h-fit pt-2">
              <div className="w-full px-2 ">
                {filterUser &&
                  filterUser?.reverse()?.map((el) => (
                    <div
                      key={el?._id}
                      className="w-full h-fit border-b-2 bg-white flex flex-col gap-1 px-2 py-2 rounded-xl"
                    >
                      <div className="flex flex-col gap-2">
                        <span className="text-lg font-semibold text-gray-500 max-sm:text-[12px]">
                          Khoảng thời gian
                        </span>
                        <span className="text-lg font-bold max-sm:text-[12px]">
                          {moment(el?.createdAt).format("DD-MM-YYYY HH:mm:ss")}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-lg font-semibold text-gray-500 max-sm:text-[12px]">
                          Số tiền
                        </span>
                        <span className="text-lg font-bold max-sm:text-[12px]">{el?.money}</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-lg font-semibold text-gray-500 max-sm:text-[12px]">
                          Đánh giá của bạn
                        </span>
                        <div className="text-lg font-bold flex items-center gap-4 max-sm:text-[12px]">
                          {el?.result?.map((rs, index) => (
                            <span key={index}>{rs}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 max-sm:text-[12px]">
                        <span className="text-lg font-semibold text-gray-500 max-sm:text-[12px]">
                          Kỳ
                        </span>
                        <div className="text-lg font-bold flex items-center gap-4 max-sm:text-[12px]">
                          {el?.periodNumber}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-lg font-semibold text-gray-500 max-sm:text-[12px]">
                          Kết quả
                        </span>
                        <div className="text-lg font-bold flex items-center gap-4 max-sm:text-[12px]">
                          {evalute?.result[el?.periodNumber - 1]
                            .sort()
                            ?.map((rs, index) => (
                              <span key={index}>{rs.toUpperCase()}</span>
                            ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-lg font-semibold text-gray-500 max-sm:text-[12px]">
                          Nội dung
                        </span>
                        <div className="text-lg font-bold flex items-center gap-4 max-sm:text-[12px]">
                          {/* {JSON.stringify(
                            evalute?.result[el?.periodNumber - 1].sort()
                          ) === JSON.stringify(el?.result)
                            ? "Thắng "
                            : "Thua"} */}
                          {evalute?.result[el?.periodNumber - 1]
                            .sort()
                            .every(
                              (value, index) => value === el?.result[index]
                            )
                            ? "Thắng"
                            : evalute?.result[el?.periodNumber - 1]
                                .sort()
                                .some(
                                  (value, index) => value === el?.result[index]
                                )
                            ? "Huề"
                            : evalute?.result[el?.periodNumber - 1]
                                .sort()
                                .every(
                                  (value, index) => value !== el?.result[index]
                                ) && "Thua"}
                        </div>
                      </div>
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

export default HistoryDetails;
