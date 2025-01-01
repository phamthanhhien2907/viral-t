import { apiUpdatedWithDrawAndDeposit } from "@/services/userService";
import { getCurrent } from "@/stores/actions/userAction";
import { ChevronLeft, Info } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const WithDraw = () => {
  const [active, setActive] = useState(false);
  const { t } = useTranslation('global');
  const { register, handleSubmit, reset } =
    useForm({
      defaultValues: {
        money: "",
      },
      
    });
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentData } = useSelector((state) => state.user);
  const updateWithDrawAndDeposit = async (values) => {
    const data = await apiUpdatedWithDrawAndDeposit(id, {
      draw: values?.money,
    });
    if (data.success) {
      toast.success(
        `Bạn đã rút ${values?.money}! Vui lòng đợi quản trị viên kiểm duyệt`
      );
      dispatch(getCurrent())
      reset()
    } else {
      toast.error(`${data?.message}`);
    }
   
  };

  useEffect(() => {
    dispatch(getCurrent());
  }, [dispatch]);
  return (
    <div className="h-screen">
      <div className="relative w-full mx-auto">
        <div className="sticky w-full top-0">
          <div className="w-full h-[50px] bg-profileColor">
            <ChevronLeft
              onClick={() => {
                navigate(window.history.back());
              }}
              className="absolute top-2 z-30 left-4 text-white cursor-pointer"
              size={30}
            />
            <span className="max-sm:text-base max-sm:top-3 text-xl text-white absolute top-2 left-[35%] max-sm:left-[40%]">
              {t("withDraw.withdrawPoints")}
            </span>
            <span className="max-sm:text-base max-sm:top-3 text-lg text-white absolute top-2 right-[20px] cursor-pointer" onClick={() => navigate(`/withdrawalhistory/${currentData?._id}`)}>
              {t("withDraw.withdrawHistory")}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit(updateWithDrawAndDeposit)}>
          <div className="flex flex-col gap-4 max-sm:gap-2">
            <div className="w-[90%] mx-auto h-[0.5px] bg-[#ebedf0]"></div>
            <div className="flex  px-4 py-2">
              <span className="text-red-500 text-lg font-semibold max-sm:text-[12px]">
                {currentData?.nameOfUser?.slice(0, 6) + " " + "(******)"}
              </span>
            </div>
            <div className="flex flex-col justify-center gap-4 px-4 py-2">
              <span className="max-sm:text-[12px]">{t("withDraw.withdrawAmount")}</span>
              <input
                {...register("money")}
                type="number"
                placeholder={t("withDraw.withdrawAmount")}
                className="outline-none border-[1px] border-gray-500 w-full h-12 px-2 max-sm:text-[12px]"
              />
            </div>
            <div className="flex items-center justify-between gap-8 px-4 py-2">
              <span className="flex items-center gap-2">
                 <span className="max-sm:text-[12px]">{t("withDraw.currentBalance")}</span>
                <span className="text-red-500 font-semibold max-sm:text-[12px]">
                  {currentData?.withDraw?.toLocaleString("vi-VN") + "₫"}
                </span>
              </span>
              
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setActive(!active)}
              >
                <Info className="text-gray-500" /> <span className="max-sm:text-[12px]">{t("withDraw.notes")}</span>
              </div>
              {active && (
                <div className="absolute bottom-0 right-0 max-sm:right-4">
                  <div className="w-2/3 py-4 items-start bg-white flex flex-col shadow-lg justify-center gap-4 mx-auto px-4">
                    <span className="max-sm:text-[12px]">{t("withDraw.note1")}</span>
                    <span className="max-sm:text-[12px]">{t("withDraw.note2")}</span>
                    <span className="max-sm:text-[12px]">
                    {t("withDraw.note3")}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="px-8 py-12 max-sm:py-2">
              <button
                type="submit"
                className="flex items-center w-full max-sm:text-[12px] max-sm:w-[70%] max-sm:mx-auto bg-profileColor h-12 justify-center text-white rounded-full"
              >
                 {t("withDraw.confirm")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithDraw;
