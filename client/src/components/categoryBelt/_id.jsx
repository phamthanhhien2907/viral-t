import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "@/components/custom ui/Loader";
import { useParams } from "react-router-dom";
import { apiGetCategoryBeltById } from "@/services/categoryBeltService";
import CategoryBeltForm from "./CategoryBeltForm";
const CategoryBeltDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categoryBelt, setCategoryBelt] = useState(null);
  const { id } = useParams();
  const getCategoryBelt = async (id) => {
    try {
      const data = await apiGetCategoryBeltById(id);
      console.log(data)
      setCategoryBelt(data?.getCategoryBelt);
      setIsLoading(false);
    } catch (error) {
      console.log("collection_[GET]", error);
      toast.error("Something went wrong! Please try again.");
    }
  };
  useEffect(() => {
    getCategoryBelt(id);
  }, [id]);
  return isLoading ? (
    <Loader />
  ) : (
    <CategoryBeltForm initialData={categoryBelt} />
  );
};

export default CategoryBeltDetails;
