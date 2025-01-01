import { Link } from "react-router-dom";
import Delete from "../custom ui/Delete";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import { pathImg } from "@/lib/constant";
export const columns = [
  {
    accessorKey: "title",
    header: "Tên phim",
    cell: ({ row }) => (
      <div className="max-sm:w-[120px]">
        <Link to={`/collection/${row.original._id}`} className="hover:text-red-1">
        {row.original.title}
      </Link>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Thể loại phim",
    cell: ({ row }) => <div className="max-sm:w-[120px]">{row.original.category}</div>,
  },
  {
    accessorKey: "image",
    header: "Ảnh",
    cell: ({ row }) => <div className="max-sm:w-[120px]">
      <img src={`${pathImg}/images/${row.original.image}`} className="w-12 h-12" alt="" />
    </div>,
  },
  {
    header: "Hành động",
    id: "actions",
    cell: ({ row }) =>  (
      <div className="flex items-center gap-2">
        <Link to={`/collection/${row.original._id}`} className="hover:text-red-1">
        <Button className="bg-blue-500 text-white hover:bg-blue-700">
          <Edit className="h-4 w-4"/>
        </Button>
      </Link>
      <Delete item="collection" id={row.original._id} />
      </div>
    )
  },
  
];
