import {
  apiGetAllWithDraw,
} from "@/services/withdrawAndDepositService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import empty from "@/assets/empty-image-default.png";
import { Check, ChevronLeft, X } from "lucide-react";
import moment from "moment";
import { apiUpdatedStatus } from "@/services/userService";
import { Textarea } from "@/components/ui/textarea";
import {  faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "@/components/custom ui/Loader";
import DataGridUI from "../Admin/DataGrid";
const WithDrawalHistoryAdmin = () => {
  const [withDraw, setWithDraw] = useState([]);
  const [loading, setLoading] = useState(false)
  const [reson, setReson] = useState(null);
  const navigate = useNavigate();
  const [value, setValue] = useState(null)
  const searchValue = value?.toString().toUpperCase();
  const getWithDrawalHistory = async () => {
    setLoading(true)
    const data = await apiGetAllWithDraw();
    if (data?.success) {
      const filterData = data?.findWithDraw?.filter((withDraw) => {
        return (withDraw?.status === "Thành công" || withDraw?.status === "Không thành công")
      })?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      setWithDraw(filterData)
      setLoading(false)
    };
  };
  const handleCheck = async (id, userId, status) => {
    const data = await apiUpdatedStatus(id, userId, {
      status: status,
      reson: reson,
    });
  };
  const onChangeValue = (e) => {
    setValue(e.target.value)
  }
  useEffect(() => {
    getWithDrawalHistory();
  }, []);
 
  return (
    loading ? <Loader/> : <DataGridUI initialRows={withDraw} type="withDraw"/>
    // <div className="h-screen">
    //   <div className="relative w-full mx-auto">
    //     <div className="sticky w-full top-0 ">
    //       <div className="w-full h-[50px] bg-profileColor">
    //         <span className=" text-xl text-white absolute top-2 left-[40%] max-sm:text-lg">
    //           Lịch sử giao dịch
    //         </span>
    //       </div>
    //     </div>
    //     <form
    //                 className="sm:w-full shadow-md mx-auto my-2 p-2 bg-white relative z-50">
    //                 <div className="flex items-center">
    //                   <input 
    //                     value={value} 
    //                     onChange={onChangeValue} 
    //                     type="text" 
    //                     className="flex-grow  border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
    //                     placeholder="Tìm kiếm tên người rút tiền" 
    //                     aria-label="Search" 
    //                     aria-describedby="basic-addon2" 
    //                   />
    //                   <button 
    //                     className="ml-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md transition-all duration-200" 
    //                     type="button">
    //                     <FontAwesomeIcon icon={faSearch} />
    //                   </button>
    //                 </div>
    //     </form>
    //     <div>
    //       {value?.length > 0 ? withDraw.length > 0 ? (
    //         <div className="bg-gray-200 h-fit">
    //           <div className="w-full px-2 py-4 ">
    //             {withDraw
    //               ?.filter(
    //                 (fill) =>
    //                   fill?.status?.includes("Thành công") |
    //                   fill?.status?.includes("Không thành công")
    //               )
    //               ?.map((el) => {
    //                 const isMatch = 
    //                 (typeof el?.users?.username === "string" &&
    //                   el?.users?.username?.toUpperCase()?.includes(searchValue)) ||
    //                 (typeof el?.withDraw === "number" &&
    //                   el?.withDraw?.toString().toUpperCase() === searchValue) || (typeof el?.users?.withDraw === "number" &&
    //                     el?.users?.withDraw?.toString().toUpperCase() === searchValue);
    //                 if(isMatch) {
    //                 return(
    //                 <div
    //                   key={el?._id}
    //                   className="w-full h-fit border-b-2 bg-white flex justify-between gap-1 py-2 rounded-xl px-8"
    //                 >
    //                   <div>
    //                     <div className="flex flex-col gap-2">
    //                       <span className="text-lg font-semibold text-gray-500 max-sm:text-[14px]">
    //                         Khoảng thời gian
    //                       </span>
    //                       <span className="text-lg font-bold max-sm:text-[14px]">
    //                         {moment(el?.createdAt).format(
    //                           "DD-MM-YYYY HH:mm:ss"
    //                         )}
    //                       </span>
    //                     </div>
    //                     <div className="flex flex-col gap-2">
    //                       <span className="text-lg font-semibold text-gray-500 max-sm:text-[14px]">
    //                         Tên người muốn rút tiền
    //                       </span>
    //                       <span className="text-lg font-bold max-sm:text-[14px]">
    //                         {el?.users?.username}
    //                       </span>
    //                     </div>
    //                     <div className="flex flex-col gap-2">
    //                       <span className="text-lg font-semibold text-gray-500 max-sm:text-[14px]">
    //                         Số tiền hiện có
    //                       </span>
    //                       <span className="text-lg font-bold max-sm:text-[14px]">
    //                         {el?.users?.withDraw} VNĐ
    //                       </span>
    //                     </div>
    //                     <div className="flex flex-col gap-2">
    //                       <span className="text-lg font-semibold text-gray-500 max-sm:text-[14px]">
    //                         Số tiền muốn rút
    //                       </span>
    //                       <span className="text-lg font-bold max-sm:text-[14px]">
    //                         {el?.withDraw}
    //                       </span>
    //                     </div>
    //                     <div className="flex flex-col gap-2">
    //                       <span className="text-lg font-semibold text-gray-500 max-sm:text-[14px]">
    //                         Trạng thái
    //                       </span>
    //                       <span className="text-lg font-bold max-sm:text-[14px]">
    //                         {el?.status}
    //                       </span>
    //                     </div>
    //                   </div>
    //                   {el?.status === "Thành công" ? (
    //                     ""
    //                   ) : el?.status === "Không thành công" ? (
    //                     ""
    //                   ) : (
    //                     <div className="flex flex-col gap-4 ">
    //                       <div className="flex items-center gap-4 ">
    //                         <button>
    //                           <Check
    //                             onClick={() =>
    //                               handleCheck(
    //                                 el?._id,
    //                                 el?.users?._id,
    //                                 "Thành công"
    //                               )
    //                             }
    //                             className="text-green-500  cursor-pointer"
    //                           />
    //                         </button>
    //                         <button>
    //                           <X
    //                             className="text-red-500 cursor-pointer"
    //                             onClick={() =>
    //                               handleCheck(
    //                                 el?._id,
    //                                 el?.users?._id,
    //                                 "Không thành công"
    //                               )
    //                             }
    //                           />
    //                         </button>
    //                       </div>
    //                       <div className="flex flex-col gap-2">
    //                         <span className="text-lg font-semibold text-gray-500">
    //                           Nội dung
    //                         </span>
    //                         <Textarea
    //                           className="w-[300px]"
    //                           placeholder="Nhập nội dung"
    //                           onChange={(e) => setReson(e.target.value)}
    //                         />
    //                       </div>
    //                     </div>
    //                   )}
    //                 </div>
    //             )}})}
    //           </div>
    //         </div>
    //       ) : (
    //         <div className="w-full h-screen flex flex-col items-center justify-start">
    //           <img src={empty} />
    //           <span className="text-xl font-semibold text-gray-500">
    //             Chưa có giao dịch nào !
    //           </span>
    //         </div>
    //       ) : withDraw.length > 0 ? (
    //         <div className="bg-gray-200 h-fit">
    //           <div className="w-full px-2 py-4 ">
    //             {withDraw
    //               ?.filter(
    //                 (fill) =>
    //                   fill?.status?.includes("Thành công") |
    //                   fill?.status?.includes("Không thành công")
    //               )
    //               ?.map((el) => {
                   
    //                 return(
    //                 <div
    //                   key={el?._id}
    //                   className="w-full h-fit border-b-2 bg-white flex justify-between gap-1 py-2 rounded-xl px-8"
    //                 >
    //                   <div>
    //                     <div className="flex flex-col gap-2">
    //                       <span className="text-lg font-semibold text-gray-500 max-sm:text-[14px]">
    //                         Khoảng thời gian
    //                       </span>
    //                       <span className="text-lg font-bold max-sm:text-[14px]">
    //                         {moment(el?.createdAt).format(
    //                           "DD-MM-YYYY HH:mm:ss"
    //                         )}
    //                       </span>
    //                     </div>
    //                     <div className="flex flex-col gap-2">
    //                       <span className="text-lg font-semibold text-gray-500 max-sm:text-[14px]">
    //                         Tên người muốn rút tiền
    //                       </span>
    //                       <span className="text-lg font-bold max-sm:text-[14px]">
    //                         {el?.users?.username}
    //                       </span>
    //                     </div>
    //                     <div className="flex flex-col gap-2">
    //                       <span className="text-lg font-semibold text-gray-500 max-sm:text-[14px]">
    //                         Số tiền hiện có
    //                       </span>
    //                       <span className="text-lg font-bold max-sm:text-[14px]">
    //                         {el?.users?.withDraw} VNĐ
    //                       </span>
    //                     </div>
    //                     <div className="flex flex-col gap-2">
    //                       <span className="text-lg font-semibold text-gray-500 max-sm:text-[14px]">
    //                         Số tiền muốn rút
    //                       </span>
    //                       <span className="text-lg font-bold max-sm:text-[14px]">
    //                         {el?.withDraw}
    //                       </span>
    //                     </div>
    //                     <div className="flex flex-col gap-2">
    //                       <span className="text-lg font-semibold text-gray-500 max-sm:text-[14px]">
    //                         Trạng thái
    //                       </span>
    //                       <span className="text-lg font-bold max-sm:text-[14px]">
    //                         {el?.status}
    //                       </span>
    //                     </div>
    //                   </div>
    //                   {el?.status === "Thành công" ? (
    //                     ""
    //                   ) : el?.status === "Không thành công" ? (
    //                     ""
    //                   ) : (
    //                     <div className="flex flex-col gap-4 ">
    //                       <div className="flex items-center gap-4 ">
    //                         <button>
    //                           <Check
    //                             onClick={() =>
    //                               handleCheck(
    //                                 el?._id,
    //                                 el?.users?._id,
    //                                 "Thành công"
    //                               )
    //                             }
    //                             className="text-green-500  cursor-pointer"
    //                           />
    //                         </button>
    //                         <button>
    //                           <X
    //                             className="text-red-500 cursor-pointer"
    //                             onClick={() =>
    //                               handleCheck(
    //                                 el?._id,
    //                                 el?.users?._id,
    //                                 "Không thành công"
    //                               )
    //                             }
    //                           />
    //                         </button>
    //                       </div>
    //                       <div className="flex flex-col gap-2">
    //                         <span className="text-lg font-semibold text-gray-500">
    //                           Nội dung
    //                         </span>
    //                         <Textarea
    //                           className="w-[300px]"
    //                           placeholder="Nhập nội dung"
    //                           onChange={(e) => setReson(e.target.value)}
    //                         />
    //                       </div>
    //                     </div>
    //                   )}
    //                 </div>
    //             )})}
    //           </div>
    //         </div>
    //       ) : (
    //         <div className="w-full h-screen flex flex-col items-center justify-start">
    //           <img src={empty} />
    //           <span className="text-xl font-semibold text-gray-500">
    //             Chưa có giao dịch nào !
    //           </span>
    //         </div>
    //       )}
    //     </div>
        
    //   </div>
    // </div>
  );
};

export default WithDrawalHistoryAdmin;
