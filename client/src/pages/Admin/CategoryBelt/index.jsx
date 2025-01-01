import { columns } from "@/components/categoryBelt/CategoryBeltColumns";
import { DataTable } from "@/components/custom ui/DataTable";
import Loader from "@/components/custom ui/Loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { apiGetCategoryBelt } from "@/services/categoryBeltService";
import { apiGetCollection } from "@/services/collectionService";
import { Plus } from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataGridUI from "../DataGrid";

const CategoryBelt = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [categoryBelt, setCategoryBelt] = useState([]);
  const getCategoryBelt = async () => {
    try {
      setIsLoading(true);
      const data = await apiGetCategoryBelt();
      console.log(data)
      setCategoryBelt(data?.getCategoryBelt);
      setIsLoading(false);
    } catch (error) {
      console.log("[CategoryBelt_GET]", error);
    }
  };
  useEffect(() => {
    getCategoryBelt();
  }, []);
  return isLoading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold font-semibold max-sm:text-xs">QUẢN LÍ DANH MỤC PHÒNG CƯỢC</p>
        <Button
          className="bg-red-500 text-white hover:bg-red-700 max-sm:text-xs"
          onClick={() => navigate("/categoryBelt/new")}
        >
          <Plus className="h-4 w-4 mr-2 " />
          Thêm danh mục mới
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={columns} data={categoryBelt} searchKey={["name"]} />
    </div>
    // <DataGridUI initialRows={categoryBelt} type="categoryBelt"/>
    
  );
};

export default CategoryBelt;