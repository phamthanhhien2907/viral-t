import { apiUpdatedUser } from "@/services/userService";
import { getCurrent } from "@/stores/actions/userAction";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const updateBank = () => {
  const { t } = useTranslation('global');
  const { register, handleSubmit, watch, setValue, getValues, onChange } =
    useForm({
      defaultValues: {
        nameOfUser: "",
        creditCartOfBank: "",
        nameOfBank: "",
      },
    });
  const params = useParams();
  const { id } = params;
  const { currentData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrent());
  }, [dispatch]);
  const updateUser = async (values) => {
    try {
      const data = await apiUpdatedUser(id, {
        creditCartOfBank: values?.creditCartOfBank,
        nameOfUser: values?.nameOfUser,
        nameOfBank: values?.nameOfBank,
      });
      console.log(data);
      if (data.success) {
        toast.success(`Liên kết ngân hàng thành công `);
        // window.location.href = "/collections";
        navigate("/");
      }
    } catch (error) {
      console.log("[collections_POST]", error);
      // toast.error("Something went wrong! Please try again.");
    }
  };
  return (
    <>
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
              <span className=" text-xl text-white absolute top-2 max-sm:top-3 left-[40%] max-sm:left-[35%] max-sm:text-base">
                {t("setBank.personal_info_label")}
              </span>
            </div>
          </div>
          {currentData?.nameOfBank &&
          currentData.nameOfUser &&
          currentData?.creditCartOfBank ? (
            <div className="flex flex-col gap-4">
              <div className="w-[90%] mx-auto h-[0.5px] bg-[#ebedf0]"></div>
              <div className="flex  px-4 py-2">
                <span className="text-red-500 max-sm:text-[12px]">{t("setBank.linkedBank")}</span>
              </div>
              <div className="flex items-center gap-8 px-4 py-2">
                <span className="max-sm:text-[12px]">{t("setBank.account_holder_label")}</span>
                <span className="max-sm:text-[12px]">{currentData?.nameOfUser}</span>
              </div>
              <div className="flex items-center gap-8 px-4 py-2">
                <span className="max-sm:text-[12px]">{t("setBank.account_number_label")}</span>
                <span className="max-sm:text-[12px]">{currentData?.creditCartOfBank}</span>
              </div>
              <div className="flex items-center gap-8 px-4 py-2">
                <span className="max-sm:text-[12px]">{t("setBank.bank_name_label")}</span>
                <span className="max-sm:text-[12px]">{currentData?.nameOfBank}</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(updateUser)}>
              <div className="flex flex-col gap-4">
                <div className="w-[90%] mx-auto h-[0.5px] bg-[#ebedf0]"></div>
                <div className="flex  px-4 py-2">
                  <span className="max-sm:text-[12px]">{t("setBank.link_bank_prompt")}</span>
                </div>
                <div className="flex items-center gap-8 px-4 py-2 w-full">
                  <span className="w-[25%] max-sm:text-[12px]">{t("setBank.account_holder_label")}</span>
                  <input
                    type="text"
                    className="outline-none w-[80%] max-sm:text-[12px]"
                    placeholder={t("setBank.account_holder_placeholder")}
                    {...register("nameOfUser")}
                  />
                </div>
                <div className="flex items-center gap-8 px-4 py-2">
                  <span className="w-[25%] max-sm:text-[12px]">{t("setBank.account_number_label")}</span>
                  <input
                    type="number"
                    className="outline-none w-[80%] no-spinner max-sm:text-[12px]"
                    placeholder={t("setBank.account_number_placeholder")}
                    {...register("creditCartOfBank")}
                  />
                </div>
                <div className="flex items-center gap-8 px-4 py-2">
                  <span className="w-[25%] max-sm:text-[12px]">{t("setBank.bank_name_label")}</span>
                  <input
                    type="text"
                    className="outline-none w-[80%] max-sm:text-[12px]"
                    placeholder={t("setBank.bank_name_placeholder")}
                    {...register("nameOfBank")}
                  />
                </div>
                <div className="flex items-center gap-8 px-4 py-2">
                  <span className="text-red-500 font-semibold max-sm:text-[12px]" >
                    {t("setBank.warning_text")}
                  </span>
                </div>
                <div className="flex items-center gap-8 px-4 py-2">
                  <button
                    type="submit"
                    className="bg-profileColor w-full rounded-xl h-12 text-white"
                  >
                    {t("setBank.save_button")}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default updateBank;
