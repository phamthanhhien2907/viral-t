import { Link } from "react-router-dom";
import Delete from "../custom ui/Delete";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import { pathImg } from "@/lib/constant";
export const columns = [
  {
    accessorKey: "name",
    header: "Tên danh mục",
    cell: ({ row }) => (
      <div className="max-sm:w-[120px]">
        <Link to={`/collection/${row.original._id}`} className="hover:text-red-1">
        {row.original.name}
      </Link>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Phòng (Nâng cấp VIP)",
    cell: ({ row }) => <div className="max-sm:w-[120px] flex flex-col gap-4">{row.original.rooms?.map((room) => (
      <p key={room?._id}>{room?.room}</p>
    ))}</div>,
  },
  
  {
    header: "Hành động",
    id: "actions",
    cell: ({ row }) =>  (
      <div className="flex items-center gap-2">
        <Link to={`/categoryBelt/${row.original._id}`} className="hover:text-red-1">
        <Button className="bg-blue-500 text-white hover:bg-blue-700">
          <Edit className="h-4 w-4"/>
        </Button>
      </Link>
      <Delete item="categoryBelt" id={row.original._id} />
      </div>
    )
  },
  
];
