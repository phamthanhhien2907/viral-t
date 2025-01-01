import { columns } from "@/components/collections/CollectionColumns";
import { DataTable } from "@/components/custom ui/DataTable";
import Loader from "@/components/custom ui/Loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { apiGetCollection } from "@/services/collectionService";
import { Plus } from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataGridUI from "../DataGrid";

const Collections = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [collections, setCollections] = useState([]);
  const getCollections = async () => {
    try {
      setIsLoading(true);
      const data = await apiGetCollection();
      setCollections(data.collections);
      setIsLoading(false);
    } catch (error) {
      console.log("[Collections_GET]", error);
    }
  };
  useEffect(() => {
    getCollections();
  }, []);
  return isLoading ? (
    <Loader />
  ) : (
    // <DataGridUI initialRows={collections} type="collection"/>
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold font-semibold max-sm:text-xs">QUẢN LÍ PHIM</p>
        <Button
          className="bg-red-500 text-white hover:bg-red-700 max-sm:text-xs"
          onClick={() => navigate("/collection/new")}
        >
          <Plus className="h-4 w-4 mr-2 " />
          Thêm phim mới
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={columns} data={collections} searchKey={["title", "category"]} />
    </div>
  );
};

export default Collections;
