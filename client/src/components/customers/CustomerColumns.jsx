import { Link } from "react-router-dom";
import Delete from "../custom ui/Delete";
import { Edit } from "lucide-react";
import { Button } from "../ui/button";
export const columns = [
  {
    accessorKey: "username",
    header: "Tên đăng nhập",
    cell: ({ row }) => (
      <div className="max-sm:w-[120px]"><Link to={`/customer/${row.original._id}`} className="hover:text-red-1 ">
      {row.original.username}
    </Link></div>
    ),
  },

  // {
  //   accessorKey: "role",
  //   header: "Vai trò",
  //   cell: ({ row }) => <div className="max-sm:w-[120px]">{row.original.role }</div>,
  // },
  {
    accessorKey: "creditCartOfBank",
    header: "Số tài khoản",
    cell: ({ row }) => <div className="max-sm:w-[120px]">{row.original.creditCartOfBank }</div>,
  },
  {
    accessorKey: "nameOfBank",
    header: "Tên tài khoản",
    cell: ({ row }) => <div className="max-sm:w-[120px]">{row.original.nameOfBank}</div>,
  },
  {
    accessorKey: "nameOfUser",
    header: "Người thụ hưởng",
    cell: ({ row }) => <div className="max-sm:w-[120px]">{row.original.nameOfUser }</div>,
  },
  {
    accessorKey: "withDraw",
    header: "Số tiền hiện tại",
    cell: ({ row }) => (
      <div className="max-sm:w-[120px]">{row.original.withDraw.toLocaleString("vi-VN") + "₫"}</div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <div className="max-sm:w-[120px]">{row.original.role === "user" ? "Người dùng" : "Quản trị"}</div>
    ),
  },
  {
    accessorKey: "code",
    header: "Mã giới thiệu",
    cell: ({ row }) => (
      <div className="max-sm:w-[120px]">{row.original.code}</div>
    ),
  },
  // {
  //   header: "Chỉnh sửa",
  //   id: "actions",
  //   cell: ({ row }) => <Edit className="fill-blue-500 w-12 h-14 flex items-center justify-center text-white hover:fill-blue-700 cursor-pointer" item="customers"  id={row.original._id} />,
  // },
  {
    header: "Sửa",
    id: "actions",
    cell: ({ row }) =>  (
      <div className="flex items-center gap-2">
        <Link to={`/customer/${row.original._id}`} className="hover:text-red-1">
        <Button className="bg-blue-500 text-white hover:bg-blue-700">
          <Edit className="h-4 w-4"/>
        </Button>
        </Link>
        <Delete item="customers" id={row.original._id} />
      </div>
    )
  },
  
];
