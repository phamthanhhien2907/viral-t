import { columns } from "@/components/customers/CustomerColumns";
import { DataTable } from "@/components/custom ui/DataTable";
import Loader from "@/components/custom ui/Loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { apiGetAllUser } from "@/services/userService";
import { Plus } from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataGridUI from "../DataGrid";

const CustomersBank = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [customer, setCustomer] = useState([]);
  const getCustomer = async () => {
    try {
      setIsLoading(true);
      const data = await apiGetAllUser();
      setCustomer(data.user);
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
    <DataGridUI initialRows={customer} type="customerBank" callApi={getCustomer}/>
    
    // <div className="px-10 py-5 max-sm:px-2 max-sm:py-2">
    //   <div className="flex items-center justify-between">
    //     <p className="font-semibold max-sm:text-xs">QUẢN LÍ NGƯỜI DÙNG VÀ NẠP TIỀN</p>
    //     <Button
    //       className="bg-red-500 text-white hover:bg-red-700 max-sm:text-xs"
    //       onClick={() => navigate("/customer/new")}
    //     >
    //       <Plus className="h-4 w-4 mr-2" />
    //       Thêm người dùng
    //     </Button>
    //   </div>
    //   <Separator className="bg-grey-1 my-4 max-sm:my-0" />
    //   <DataTable columns={columns} data={customer} searchKey={["username", "creditCartOfBank", "nameOfBank", "nameOfUser", "code", "withDraw"]}  />
    // </div>
  );
};

export default CustomersBank;
