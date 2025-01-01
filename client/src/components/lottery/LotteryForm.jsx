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
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Delete from "../custom ui/Delete";
import { useNavigate, useParams } from "react-router-dom";
import { apiCreateLottery, apiGetLotteryById, apiGetRoomById, apiUpdateResult } from "@/services/evaluateService";
import { pathImg } from "@/lib/constant";
let array = ["A", "B", "C", "D"];

const LotteryForm = ({ initialData }) => {
  console.log(initialData)
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [isLoadding, setIsLoadding] = useState(false);
  const [invisible, setInvisible] = useState(false);
  const [selectedResults, setSelectedResults] = useState([]);
  const [lottery, setLottery] = useState(null);
  const handleResultChange = (event) => {
    const newSelectedResults = [...event.target.options]
      .filter((option) => option.selected) // Filter selected options
      .map((option) => option.value) // Extract option values
      .slice(0, 2); // Limit to a maximum of 2 selected values

    setSelectedResults(newSelectedResults);
  };
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    getValues,
    onChange,
  } = useForm({
    defaultValues: initialData
      ? initialData
      : {
          period: "",
          result: "",
          room: "",
          image: "",
        },
  });
  
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  const getBeltByRoom = async (roomId) => {
    const data = await apiGetRoomById(roomId);
    if(data?.success) setLottery(data.evaluates);
  }
  function getRandomTwo(arr) {
    const shuffled = arr.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
  
    const result = shuffled.slice(0, 2);
    return result;
  }
  useEffect(() => {
    getBeltByRoom(roomId);
  }, [roomId])
  const onSubmit = async (values) => {
    try {
      setIsLoadding(true);
      const formData = new FormData();
      const selectedFile = getValues().image[0];
      if (selectedFile?.name) {
        formData.append("image", selectedFile, selectedFile.name);
      } else {
        formData.append("image", lottery?.image) 
      }
      formData.append("resultUpdate", selectedResults.length > 1 ? [selectedResults] : [getRandomTwo(array)])
      formData.append("room", values?.room)

      if (initialData) {        
        if (selectedResults.length > 1 || selectedFile) {
          const data = await apiUpdateResult(roomId, formData);
          if (data?.success) {
            toast.success("Chỉnh sửa thành công")
            navigate("/lottery");
          }
        }
       
      } else {
        const formData = new FormData();
        const selectedFile = getValues().image[0];
        if (selectedFile) {
          formData.append("images", selectedFile, selectedFile.name);
        }
        formData.append("period", values.period);
        formData.append("room", values.room);
        const res = await apiCreateLottery(formData);
        if (res.success) {
          setIsLoadding(false);
          toast.success(
            `Phòng cược ${initialData ? "đã được cập nhật" : "đã được tạo"} `
          );
          navigate("/lottery");
        }
      }
    } catch (error) {
      console.log("[collections_POST]", error);
      toast.error("Vui lòng chọn dữ liệu để chỉnh sửa");
    }
  };
  return (
    <div className="p-10">
      {initialData ? (
        <div className="flex items-center justify-center gap-4">
          <p className="text-lg font-semibold">Chỉnh sửa cược</p>
          <Delete item="lottery" id={initialData?._id} />
        </div>
      ) : (
        <p className="text-2xl font-semibold items-center text-center">
          Thêm phòng cược
        </p>
      )}

      <Separator className="bg-grey-1 mt-4 mb-7" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-[50%] mx-auto">
        {/* {!initialData && (
          <div className="flex flex-col gap-4">
            <label htmlFor="">Thời gian (Giây) :</label>
            <Input
              {...register("period", { required: true })}
              placeholder="Tạo thời gian (Nhập 3 = 3 phút). Nếu không điền mặc định là 3 phút"
              onKeyDown={handleKeyPress}
              aria-invalid={errors.period ? "true" : "false"}
            />
          </div>
        )} */}
        <div className="flex flex-col gap-4">
            <label htmlFor="">Phòng: </label>
            <Input
              {...register("room", { required: true })}
              placeholder="Tạo phòng"
              onKeyDown={handleKeyPress}
              aria-invalid={errors.room ? "true" : "false"}
            />
        </div>
        {initialData && (
          <div className="flex flex-col items-start gap-4">
            <label>Chỉnh sửa nền cược</label>
            <div className="flex items-center w-full gap-4">
              <div className="w-[80%]">
                <Input
                    type="file"
                    {...register("image", { onChange })}
                    placeholder="Image"
                    // onKeyDown={handleKeyPress}
                    accept="image/*"
                    
                  />
              </div>
                {lottery?.image?.length > 0 ? <img src={`${pathImg}/images/${lottery?.image}`} className='w-24 h-24' alt="" /> : <p>Chưa có nền cược</p>}
            </div>
          </div>
        )}
        {initialData && (
          <div className="flex items-start flex-col gap-4 ">
            <label htmlFor="result">
              Kết quả dự đoán (Nếu chọn thì tự động random ra kết quả)
            {lottery?.resultUpdate?.length > 0 && <p className="text-red-500 font-semibold">Kết quả dự đoán tiếp theo là: {lottery?.resultUpdate?.at(-1)}</p>}
            </label>
            <select
              multiple
              value={selectedResults} // Set the selected values from state
              onChange={handleResultChange}
              className="border px-4 w-full border-black h-32 overflow-y-hidden"
            >
              {!invisible && (
                <option className="break-all" value="">
                  Chọn kết quả (tối đa là 2 trong 4 kết quả). Vui lòng nhấn giữ
                  nút Shift hoặc Crlt để có thể chọn 2 đáp án
                </option>
              )}
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
        )}
        {!initialData && (
          <div className="flex flex-col items-start gap-4">
            <label>Chọn ảnh nền cược</label>
            <Input
              type="file"
              {...register("image", { onChange, required: true })}
              placeholder="Image"
              aria-invalid={errors.image ? "true" : "false"}
              // onKeyDown={handleKeyPress}
              // accept="image/*"
            />
          </div>
        )}
        
         
          
        
        <div className="flex gap-10 items-center justify-center">
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

export default LotteryForm;
