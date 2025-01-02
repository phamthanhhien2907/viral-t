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
import toast from "react-hot-toast";
import {  faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DataGridUI from "../Admin/DataGrid";
import Loader from "@/components/custom ui/Loader";
const TransformHistory = () => {
  const [withDraw, setWithDraw] = useState([]);
  const [loading, setLoading] = useState(false)
  const getWithDrawalHistory = async () => {
    setLoading(true)
    const data = await apiGetAllWithDraw();

    if (data.success) {
      const filterData = data?.findWithDraw?.filter((withDraw) => {
        return (withDraw?.status === "Đợi duyệt")
      })
      setWithDraw(filterData)
      setLoading(false)
    };
  };
  // const handleCheck = async (id, userId, status) => {
  //   const data = await apiUpdatedStatus(id, userId, {
  //     status: status,
  //     reson: reson,
  //   });
  //   if (data?.success) {
  //     toast.success("Đã chấp nhận rút tiền thành công");
  //   } else {
  //     toast.error("Không chấp nhận rút tiền");
  //   }
  //   getWithDrawalHistory()
  // };
  
  useEffect(() => {
    getWithDrawalHistory();
  }, []);
  
  return (
    loading ? <Loader/> : <DataGridUI initialRows={withDraw} callApi={getWithDrawalHistory} type="transform"/>
    // <div className="h-screen">
    //   <div className="relative w-full mx-auto">
    //     <div className="sticky w-full top-0 ">
    //       <div className="w-full h-[50px] bg-profileColor">
    //         <span className=" text-xl text-white absolute top-2 left-[40%] max-sm:text-lg">
    //           Rút tiền
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
    //           <div className="w-full px-2 py-4">
    //             {withDraw
    //               ?.filter((fill) => fill?.status?.includes("Đợi duyệt"))
    //               ?.map((el) => {
    //                 const isMatch = 
    //                 (typeof el?.users?.username === "string" &&
    //                   el?.users?.username?.toUpperCase()?.includes(searchValue)) ||
    //                 (typeof el?.withDraw === "number" &&
    //                   el?.withDraw?.toString().toUpperCase() === searchValue) || (typeof el?.users?.withDraw === "number" &&
    //                     el?.users?.withDraw?.toString().toUpperCase() === searchValue);
    //                 if(isMatch) {
    //                   return (
    //                     <div
    //                       key={el?._id}
    //                       className="w-full h-fit border-b-2 bg-white flex justify-between gap-1 max-sm:px-4 py-2 rounded-xl px-8 max-sm:flex-col max-sm:py-4"
    //                     >
    //                       <div>
    //                         <div className="flex flex-col gap-2">
    //                           <span className="text-lg font-semibold text-gray-500 max-sm:text-[14px]">
    //                             Khoảng thời gian
    //                           </span>
    //                           <span className="text-lg font-bold max-sm:text-[14px]">
    //                             {moment(el?.createdAt).format(
    //                               "DD-MM-YYYY HH:mm:ss"
    //                             )}
    //                           </span>
    //                         </div>
    //                         <div className="flex flex-col gap-2">
    //                           <span className="text-lg font-semibold text-gray-500 max-sm:text-[14px]">
    //                             Tên người muốn rút tiền
    //                           </span>
    //                           <span className="text-lg font-bold max-sm:text-[14px]">
    //                             {el?.users?.username}
    //                           </span>
    //                         </div>
    //                         <div className="flex flex-col gap-2">
    //                           <span className="text-lg font-semibold text-gray-500 max-sm:text-[14px]">
    //                             Số tiền hiện có
    //                           </span>
    //                           <span className="text-lg font-bold max-sm:text-[14px]">
    //                             {el?.users?.withDraw} VNĐ
    //                           </span>
    //                         </div>
    //                         <div className="flex flex-col gap-2 max-sm:text-[14px]">
    //                           <span className="text-lg font-semibold text-gray-500 max-sm:text-[14px]">
    //                             Số tiền muốn rút
    //                           </span>
    //                           <span className="text-lg font-bold max-sm:text-[14px]">
    //                             {el?.withDraw}
    //                           </span>
    //                         </div>
    //                         <div className="flex flex-col gap-2 max-sm:text-[14px]">
    //                           <span className="text-lg font-semibold text-gray-500 max-sm:text-[14px]">
    //                             Trạng thái
    //                           </span>
    //                           <span className="text-lg font-bold max-sm:text-[14px]">
    //                             {el?.status}
    //                           </span>
    //                         </div>
    //                       </div>
    //                       {el?.status === "Thành công" ? (
    //                         ""
    //                       ) : el?.status === "Không thành công" ? (
    //                         "" 
    //                       ) : (
    //                         <div className="flex flex-col gap-4 ">
    //                           <div className="flex items-center gap-4 ">
    //                             <div
    //                               className="px-4 py-2 max-sm:py-1 cursor-pointer rounded-full bg-green-100 flex items-center justify-center gap-1"
    //                               onClick={() =>
    //                                 handleCheck(
    //                                   el?._id,
    //                                   el?.users?._id,
    //                                   "Thành công"
    //                                 )
    //                               }
    //                             >
    //                               <span className="max-sm:text-[14px]">Đồng ý</span>
    //                               <button>
    //                                 <Check className="text-green-500  " />
    //                               </button>
    //                             </div>
    //                             <div
    //                               className="px-4 py-2 max-sm:py-1 cursor-pointer rounded-full bg-red-100 flex items-center justify-center gap-1"
    //                               onClick={() =>
    //                                 handleCheck(
    //                                   el?._id,
    //                                   el?.users?._id,
    //                                   "Không thành công"
    //                                 )
    //                               }
    //                             >
    //                               <span className="max-sm:text-[14px]">Từ chối</span>
    //                               <button>
    //                                 <X className="text-red-500" />
    //                               </button>
    //                             </div>
    //                           </div>
    //                           <div className="flex flex-col gap-2">
    //                             <span className="text-lg font-semibold text-gray-500 max-sm:text-[14px]">
    //                               Nội dung phản hồi
    //                             </span>
    //                             <Textarea
    //                               className="w-[300px] border-gray-200"
    //                               placeholder="Nhập nội dung ở đây"
    //                               onChange={(e) => setReson(e.target.value)}
    //                             />
    //                           </div>
    //                         </div>
    //                       )}
    //                     </div>
    //                   )
    //                 }
    //                 })}
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
    //           <div className="w-full px-2 py-4">
    //             {withDraw
    //               ?.filter((fill) => fill?.status?.includes("Đợi duyệt"))
    //               ?.map((el) => (
    //                 <div
    //                   key={el?._id}
    //                   className="w-full h-fit border-b-2 bg-white flex justify-between gap-1 max-sm:px-4 py-2 rounded-xl px-8 max-sm:flex-col max-sm:py-4"
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
    //                     <div className="flex flex-col gap-2 max-sm:text-[14px]">
    //                       <span className="text-lg font-semibold text-gray-500 max-sm:text-[14px]">
    //                         Số tiền muốn rút
    //                       </span>
    //                       <span className="text-lg font-bold max-sm:text-[14px]">
    //                         {el?.withDraw}
    //                       </span>
    //                     </div>
    //                     <div className="flex flex-col gap-2 max-sm:text-[14px]">
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
    //                         <div
    //                           className="px-4 py-2 max-sm:py-1 cursor-pointer rounded-full bg-green-100 flex items-center justify-center gap-1"
    //                           onClick={() =>
    //                             handleCheck(
    //                               el?._id,
    //                               el?.users?._id,
    //                               "Thành công"
    //                             )
    //                           }
    //                         >
    //                           <span className="max-sm:text-[14px]">Đồng ý</span>
    //                           <button>
    //                             <Check className="text-green-500  " />
    //                           </button>
    //                         </div>
    //                         <div
    //                           className="px-4 py-2 max-sm:py-1 cursor-pointer rounded-full bg-red-100 flex items-center justify-center gap-1"
    //                           onClick={() =>
    //                             handleCheck(
    //                               el?._id,
    //                               el?.users?._id,
    //                               "Không thành công"
    //                             )
    //                           }
    //                         >
    //                           <span className="max-sm:text-[14px]">Từ chối</span>
    //                           <button>
    //                             <X className="text-red-500" />
    //                           </button>
    //                         </div>
    //                       </div>
    //                       <div className="flex flex-col gap-2">
    //                         <span className="text-lg font-semibold text-gray-500 max-sm:text-[14px]">
    //                           Nội dung phản hồi
    //                         </span>
    //                         <Textarea
    //                           className="w-[300px] border-gray-200"
    //                           placeholder="Nhập nội dung ở đây"
    //                           onChange={(e) => setReson(e.target.value)}
    //                         />
    //                       </div>
    //                     </div>
    //                   )}
    //                 </div>
    //               ))}
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

export default TransformHistory;
