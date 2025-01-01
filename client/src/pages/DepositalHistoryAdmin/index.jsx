import { columns } from "@/components/customers/CustomerColumns";
import { DataTable } from "@/components/custom ui/DataTable";
import Loader from "@/components/custom ui/Loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { apiGetAllDeposit, apiGetAllUser } from "@/services/userService";
import { Plus } from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataGridUI from "../Admin/DataGrid";
const DepositialHistoryAdmin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [customer, setCustomer] = useState([]);
  const getCustomer = async () => {
    try {
      setIsLoading(true);
      const data = await apiGetAllDeposit();
      setCustomer(data?.dp);
      setIsLoading(false);
    } catch (error) {
      console.log("[Customer_GET]", error);
    }
  };
  useEffect(() => {
    getCustomer();
  }, []);
 



  return isLoading ? (
    <Loader />
  ) : (
    <DataGridUI initialRows={customer} type="deposit"/>
  );
};

export default DepositialHistoryAdmin;
