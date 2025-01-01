import { columns } from "@/components/lottery/LotteryColumns";
import { DataTable } from "@/components/custom ui/DataTable";
import Loader from "@/components/custom ui/Loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { apiGetAllLottery } from "@/services/evaluateService";
import { Plus } from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataGridUI from "../DataGrid";

const Lottery = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [lotteries, setLotteries] = useState([]);
  const getLottery = async () => {
    try {
      setIsLoading(true);
      const data = await apiGetAllLottery();
      console.log(data);
      setLotteries(data.lotteries);
      setIsLoading(false);
    } catch (error) {
      console.log("[Collections_GET]", error);
    }
  };
  useEffect(() => {
    getLottery();
  }, []);
  return ( <div className="px-10 py-5 max-sm:px-4 max-sm:py-2">
    {/* { isLoading ? (
      <Loader />
    ) : (
     <DataGridUI initialRows={lotteries} type="lottery"/>
    )} */}
    <div className="flex items-center justify-between">
      <p className="font-semibold items-center text-center max-sm:text-xs">QUẢN LÍ CƯỢC</p>
      <Button
        className="bg-red-500 text-white hover:bg-red-700  max-sm:text-xs"
        onClick={() => navigate("/lottery/new")}
      >
        <Plus className="h-4 w-4 mr-2" />
        Thêm cược
      </Button>
    </div>
    <Separator className="bg-grey-1 my-4 max-sm:my-0" />
    <DataTable columns={columns} data={lotteries} searchKey="room" />
  </div>)
};

export default Lottery;
