import { Separator } from "../ui/separator";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import toast from "react-hot-toast";
import Delete from "../custom ui/Delete";
import { useNavigate, useParams } from "react-router-dom";
import { apiCreateCollection } from "@/services/collectionService";
import {
  apiCreateUser,
  apiUpdatedDesposit,
  apiUpdatedWithDrawAndDeposit,
} from "@/services/userService";

const CustomerForm = ({ initialData }) => {
  const navigate = useNavigate();
  const [isLoadding, setIsLoadding] = useState(false);
  const [invisible, setInvisible] = useState(false);
  const { id } = useParams();
  const { register, handleSubmit, watch, setValue, getValues, onChange } =
    useForm({
      defaultValues: initialData
        ? initialData
        : {
            desposit: "",
            vip: "",
          },
    });
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  const onSubmit = async (values) => {
    try {
      setIsLoadding(true);
      if(location.pathname === "/customer/new") {
        const res = await apiCreateUser( {
          vip: values?.vip,
          creditCartOfBank : values?.creditCartOfBank,
          nameOfBank : values?.nameOfBank,
          nameOfUser : values?.nameOfUser,
          role : values?.role,
          password : values?.passwordChange,
          username : values?.username
        });
        console.log(res)
        if (res?.success) {
          setIsLoadding(false);
          toast.success(res?.message);
          navigate("/");
        } else {
          toast.error(res?.message);
        }
      }else{
        const res = await apiUpdatedDesposit(id, {
          desposit: values?.desposit,
          despositMinutes : values?.despositMinutes,
          vip: values?.vip,
          creditCartOfBank : values?.creditCartOfBank,
          nameOfBank : values?.nameOfBank,
          nameOfUser : values?.nameOfUser,
          role : values?.role,
          password : values?.passwordChange,
          username : values?.username
        });
  
        if (res.success) {
          setIsLoadding(false);
          toast.success(res?.message);
          navigate("/");
        } else {
          toast.error(res?.message);
        }
      }
    } catch (error) {
      console.log("[collections_POST]", error);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="p-10">
      {initialData ? (
        <div className="flex items-center justify-center gap-4">
          <p className="text-xl font-semibold">
            Chỉnh sửa người dùng và nạp tiền
          </p>
          <Delete item="customers" id={initialData?._id} />
        </div>
      ) : (
        <p className="text-xl font-semibold text-center">Thêm người dùng</p>
      )}

      <Separator className="bg-grey-1 mt-4" />
      
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-[70%] mx-auto">
        {/* <label>Nạp tiền:</label>
        <Input
          {...register("desposit")}
          placeholder="Số tiền cần nộp"
          onKeyDown={handleKeyPress}
          type="number"
          style={{
            WebkitAppearance: "none",
            MozAppearance: "textfield",
          }}
        />

        <div className="flex flex-col gap-4">
        <label>Trừ tiền:</label>
        <Input
          {...register("despositMinutes")}
          placeholder="Số tiền cần trừ"
          onKeyDown={handleKeyPress}
          type="number"
          style={{
            WebkitAppearance: "none",
            MozAppearance: "textfield",
          }}
        />
        </div> */}
        <div className="flex items-start flex-col gap-4">
          <label htmlFor="username">Tên đăng nhập</label>
          <Input
          {...register("username")}
          placeholder="Tên đăng nhập"
          onKeyDown={handleKeyPress}
          type="text"
        />
        </div>
        <div className="flex items-start flex-col gap-4">
          <label htmlFor="passwordChange">Mật khẩu</label>
          <Input
          {...register("passwordChange")}
          placeholder="Mật khẩu"
          onKeyDown={handleKeyPress}
          type="text"
        />
        </div>
        <div className="flex items-start flex-col gap-4">
          <label htmlFor="vip">Vip cho khách hàng</label>
          <Input
          {...register("vip")}
          placeholder="Vip cho khách hàng"
          onKeyDown={handleKeyPress}
          type="text"
        />
        </div>
        <div className="flex items-start flex-col gap-4">
          <label htmlFor="creditCartOfBank">Số tài khoản</label>
          <Input
          {...register("creditCartOfBank")}
          placeholder="Số tài khoản"
          onKeyDown={handleKeyPress}
          type="text"
        />
        
        </div>
        <div className="flex items-start flex-col gap-4">
          <label htmlFor="nameOfBank">Tên tài khoản</label>
          <Input
          {...register("nameOfBank")}
          placeholder="Tên tài khoản"
          onKeyDown={handleKeyPress}
          type="text"
        />
        </div>
        <div className="flex items-start flex-col gap-4">
          <label htmlFor="nameOfUser">Người thụ hưởng</label>
          <Input
          {...register("nameOfUser")}
          placeholder="Người thụ hưởng"
          onKeyDown={handleKeyPress}
          type="text"
        />
        </div>
        <div className="flex items-start flex-col gap-4">
          <label htmlFor="role">Vai trò ( Vui lòng nhập user hoặc admin )</label>
          <Input
          {...register("role")}
          placeholder="Vai trò"
          onKeyDown={handleKeyPress}
          type="text"
        />
        </div>
        <div className="flex gap-10 pt-4">
          <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-700">
            Gửi
          </Button>
          <Button
            type="button"
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white hover:bg-blue-700"
          >
            Quay về
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
