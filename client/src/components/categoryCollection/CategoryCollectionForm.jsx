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
import { apiGetCollection, apiUpdateCollectionById } from "@/services/collectionService";
import { apiCreateCategoryBelt, apiGetCategoryBeltById, apiUpdateCategoryBeltById } from "@/services/categoryBeltService";
import { apiGetAllLottery } from "@/services/evaluateService";
import { apiCreateCategoryCollection, apiGetCategoryCollectionById, apiUpdateCategoryCollectionById } from "@/services/categoryCollectionService";

const CategoryCollectionForm = ({ initialData }) => {
  const navigate = useNavigate();
  const [isLoadding, setIsLoadding] = useState(false);
  const [collection, setCollection] = useState(null)
  const [categoryBelt, setCategoryBelt] = useState([])
  const [invisible, setInvisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { id } = useParams();
  const { register, handleSubmit, watch, setValue, getValues, onChange } =
    useForm();
    const getCollection = async() => {
      const data = await apiGetCollection()
      if(data?.success) setCollection(data?.collections)
    }
    const getCategoryBelt = async(id) => {
      const data = await apiGetCategoryCollectionById(id)
      if(data?.success) setCategoryBelt(data?.getcategoryCollection)
    }
    const handleSelectChange = (e) => {
      const selectedId = e.target.value;
      if (selectedCategories?.includes(selectedId)) {
        // Nếu đã chọn, loại bỏ khỏi danh sách
        setSelectedCategories((prev) => prev.filter((id) => id !== selectedId));
      } else {
        // Nếu chưa chọn, thêm vào danh sách
        setSelectedCategories((prev) => [...prev, selectedId]);
      }
    };
    useEffect(() => {
      getCollection() 
    }, [])
    useEffect(() => {
      if (categoryBelt) {
        setValue("name", categoryBelt?.name);
      }
    }, [categoryBelt, setValue]);
    useEffect(() => {
      getCategoryBelt(id)
    }, [id])
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  const onSubmit = async (values) => {
    try {
      setIsLoadding(true);
    
      if(location.pathname === "/categoryCollection/new") {
        if(!values.name || !values?.roomInputs) {
          toast.error("Vui lòng điền tên danh mục và chọn phim")
          return
        }
        const res = await apiCreateCategoryCollection({
          name : values?.name,
          category : values?.roomInputs
        });
        console.log(res)
        if (res?.message === "Successfully created") {
          setIsLoadding(false);
          toast.success(`Tạo danh mục thành công `);
          navigate("/");
        }
      } else{
        const res = await apiUpdateCategoryCollectionById(id,{
          name : values?.name,
          category : values?.roomInputs
        });
        console.log(res)
        if (res?.success) {
          setIsLoadding(false);
          toast.success(`Cập nhật danh mục thành công `);
          navigate("/categoryCollection");
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
          <p className="text-2xl font-semibold items-center">Chỉnh sửa danh mục phim</p>
          <Delete item="categoryCollection" id={initialData?._id} />
        </div>
      ) : (
        <p className="text-2xl font-semibold items-center text-center">
          Thêm danh mục phim
        </p>
      )}

      <Separator className="bg-grey-1 mt-4 mb-7" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-[70%] mx-auto">
        <div className="flex gap-4 flex-col">
          <label>Tên danh mục</label>
          <Input
            {...register("name")}
            placeholder="Tên danh mục"
            onKeyDown={handleKeyPress}
          />
        </div>
        <div className="flex gap-4 flex-col">
          <div>
            <label className="flex items-center gap-1" htmlFor="roomInputs">Chọn phòng: (Vui lòng nhấn giữ CTRL hoặc SHIFT để chọn nhiều phòng!<p className="text-red-500">Nếu chọn phòng giống với phòng đã tồn tại thì phòng đó sẽ bị xóa khỏi danh mục</p>)</label>
            <div className="flex items-center gap-2 text-blue-500 font-semibold">Phim đã tồn tại : {categoryBelt?.category?.map((category) => (
              <p key={category?._id}>
                {category?.title} ({category?.category}),
              </p>
            ))}</div>
          </div>
          <select
            onClick={() => setInvisible(!invisible)}
            className="border px-4  border-black tabs-list"
            {...register("roomInputs")}
            multiple
            onChange={handleSelectChange}
          >
            {collection && collection?.map((col) => (
              <option value={col?._id} className="py-1" key={col?._id}  selected={selectedCategories.includes(col._id)}>{col?.title } ({col?.category})</option>
            ))}
          </select>
         
        </div>
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

export default CategoryCollectionForm;
