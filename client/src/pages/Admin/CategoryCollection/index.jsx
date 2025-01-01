import { columns } from "@/components/categoryCollection/CategoryCollectionColumns";
import { DataTable } from "@/components/custom ui/DataTable";
import Loader from "@/components/custom ui/Loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { apiGetCategoryCollection } from "@/services/categoryCollectionService";
import { apiGetCollection } from "@/services/collectionService";
import { Plus } from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataGridUI from "../DataGrid";

const CategoryCollection = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [categoryBelt, setCategoryBelt] = useState([]);
  const getCategoryBelt = async () => {
    try {
      setIsLoading(true);
      const data = await apiGetCategoryCollection();
      console.log(data)
      setCategoryBelt(data?.getcategoryCollection);
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
    // <DataGridUI initialRows={categoryBelt} type="categoryCollection"/>
    
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold font-semibold max-sm:text-xs">QUẢN LÍ DANH MỤC PHIM</p>
        <Button
          className="bg-red-500 text-white hover:bg-red-700 max-sm:text-xs"
          onClick={() => navigate("/categoryCollection/new")}
        >
          <Plus className="h-4 w-4 mr-2 " />
          Thêm danh mục mới
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={columns} data={categoryBelt} searchKey={["name"]} />
    </div>
  );
};

export default CategoryCollection;