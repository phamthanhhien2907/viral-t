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
    header: "Phim (thể loại)",
    cell: ({ row }) => <div className="max-sm:w-[120px] flex flex-col gap-4">{row.original.category?.map((category) => (
      <p key={category?._id}>{category?.title} ({category?.category})</p>
    ))}</div>,
  },
  
  {
    header: "Hành động",
    id: "actions",
    cell: ({ row }) =>  (
      <div className="flex items-center gap-2">
        <Link to={`/categoryCollection/${row.original._id}`} className="hover:text-red-1">
        <Button className="bg-blue-500 text-white hover:bg-blue-700">
          <Edit className="h-4 w-4"/>
        </Button>
      </Link>
      <Delete item="categoryCollection" id={row.original._id} />
      </div>
    )
  },
  
];
