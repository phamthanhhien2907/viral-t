import { Button } from "@/components/ui/button";
import { apiUpdatedUser } from "@/services/userService";
import { getCurrent } from "@/stores/actions/userAction";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const updateGender = () => {
  const { currentData } = useSelector((state) => state.user);
  const [isLoadding, setIsLoadding] = useState(false);
  const { t } = useTranslation('global');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, setValue, getValues, onChange } =
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
      console.log(values);

      const res = await apiUpdatedUser(currentData?._id, {
        gender: values?.gender,
      });
      console.log(res);
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
                <span className=" text-xl text-white absolute top-2 left-[40%]">
                  {t("gender.screen.header.title")}
                </span>
                <Button
                  type="submit"
                  className=" text-white text-lg absolute top-1 right-0"
                >
                  {t("gender.screen.header.saveButton")}
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-4 px-4 py-4 w-full bg-gray-100">
              <div className="flex flex-col ">
                <div className="flex gap-4 items-center w-full pt-2 pb-4 border-b-[2px]  ">
                  <input type="radio" {...register("gender")} value="male" />
                  <label className="text-sm font-semibold" htmlFor="male">
                  {t("gender.screen.form.genderOptions.male")}
                  </label>
                </div>
                <div className="flex gap-4 items-center w-full pt-4">
                  <input type="radio" value="female" {...register("gender")} />
                  <label className="text-sm font-semibold" htmlFor="female">
                  {t("gender.screen.form.genderOptions.female")}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default updateGender;
