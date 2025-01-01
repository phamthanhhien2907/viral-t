import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import { apiDeleteUserById } from "@/services/userService";
import { apiDeleteCollectionById } from "@/services/collectionService";
import { apiDeleteLotteryById } from "@/services/evaluateService";
import { apiDeleteCategoryBeltById } from "@/services/categoryBeltService";
import { apiDeleteCategoryCollectionById } from "@/services/categoryCollectionService";

const Delete = ({ id, item }) => {
  console.log(item);
  const [isLoadding, setIsLoadding] = useState(false);
  const onDelete = async (id) => {
    try {
      setIsLoadding(true);
      if (item === "customers") {
        const data = await apiDeleteUserById(id);
        if (data?.success) {
          setIsLoadding(false);
          window.location.href = `/`;
          toast.success(`${item} đã xóa`);
        }
      }
      if (item === "collection") {
        const data = await apiDeleteCollectionById(id);
        if (data?.success) {
          setIsLoadding(false);
          window.location.href = `/`
          toast.success(`${item} đã xóa`);
        }
      }
      if (item === "lottery") {
        const data = await apiDeleteLotteryById(id);
        if (data?.success) {
          setIsLoadding(false);
          window.location.href = `/`;
          toast.success(`${item} đã xóa`);
        }
      }
      if(item === "categoryBelt") {
        const data = await apiDeleteCategoryBeltById(id);
        if (data?.success) {
          setIsLoadding(false);
          window.location.href = `/`;
          toast.success(`${item} đã xóa`);
        }
      }
      if(item === "categoryCollection") {
        const data = await apiDeleteCategoryCollectionById(id);
        if (data?.success) {
          setIsLoadding(false);
          window.location.href = `/`;
          toast.success(`${item} đã xóa`);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong! Please try again.");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="bg-red-500 text-white hover:bg-red-700">
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white text-grey-1">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500">
            Bạn có chắc chắn muốn xóa không?
          </AlertDialogTitle>
          <AlertDialogDescription className="font-semibold">
            Hành động này không thể khôi phục lại dữ liệu.Bạn chắc chắn muốn xóa không?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel  className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white">Quay lại</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 text-white hover:bg-red-700"
            onClick={() => onDelete(id)}
          >
            Xóa
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
