import { Link } from "react-router-dom";
import Delete from "../custom ui/Delete";
import { pathImg } from "@/lib/constant";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";

export const columns = [
  {
    accessorKey: "room",
    header: "Phòng",
    cell: ({ row }) => (
      <div className="max-sm:w-[120px]">
        <Link to={`/room/${row.original?.room}`} className="hover:text-red-1">
        {row.original.room}
      </Link>
      </div>
    ),
  },
  {
    accessorKey: "image",
    header: "Ảnh nền",
    cell: ({ row }) => (
      <div className="max-sm:w-[120px]">
        <img src={`${pathImg}/images/${row.original.image}`} className="w-12 h-12" alt="" />
      </div>
    ),
  },
  {
    header: "Sửa",
    id: "actions",
    cell: ({ row }) =>  (
      <div className="flex items-center gap-2">
        <Link to={`/room/${row.original?.room}`} className="hover:text-red-1">
        <Button className="bg-blue-500 text-white hover:bg-blue-700">
          <Edit className="h-4 w-4"/>
        </Button>
        </Link>
        <Delete item="lottery" id={row.original._id} />
      </div>
    )
  },
 
];
