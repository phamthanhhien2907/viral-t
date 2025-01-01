import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiUpdatedUser } from "@/services/userService";
import { getCurrent } from "@/stores/actions/userAction";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const updateName = () => {
  const { currentData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoadding, setIsLoadding] = useState(false);
  const [invisible, setInvisible] = useState(false);
  const { t } = useTranslation('global');
  
  const { register, handleSubmit } =
    useForm({
      name: "",
    });
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  const onSubmit = async (values) => {
    try {
      setIsLoadding(true);
      // const url = initialData
      //   ? `/api/collections/${initialData?._id}`
      //   : "/api/collections/new";

      const res = await apiUpdatedUser(currentData?._id, {
        fullName: values?.name,
      });
      if (res.success) {
        setIsLoadding(false);
        // toast.success(`Collection ${initialData ? "updated" : "created"} `);
        // window.location.href = "/collections";
        navigate("/information");
      }
    } catch (error) {
      console.log("[collections_POST]", error);
      toast.error("Something went wrong! Please try again.");
    }
  };
  useEffect(() => {
    dispatch(getCurrent());
  }, [dispatch]);

  // Ví dụ sử dụng:

  return (
    <>
      <div className="h-screen">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
                <span className="max-sm:text-base text-xl text-white absolute top-2 left-[40%]">
                  {t("setName.editName")}
                </span>
                <Button
                  type="submit"
                  className="max-sm:text-base text-white text-lg absolute top-1 right-0"
                >
                  {t("setName.save")}
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="w-[90%] mx-auto h-[0.5px] bg-[#ebedf0]"></div>
              <div className="flex items-center gap-8 px-4 py-2">
                <span className="max-sm:text-[12px]">{t("setName.realName")}</span>
                <div className="">
                  <input
                    {...register("name")}
                    placeholder={t("setName.realName")}
                    onKeyDown={handleKeyPress}
                    className="outline-none border-none max-sm:text-[12px]"
                  />
                </div>
              </div>
              <div className="flex items-center gap-8 px-4 py-2">
                <span className="text-red-500 max-sm:text-[12px]">
                  {t("setName.realNameNote")}
                </span>
              </div>

              <div className="w-[90%] mx-auto h-[0.5px] bg-[#ebedf0]"></div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default updateName;
