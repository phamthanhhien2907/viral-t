import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "@/components/custom ui/Loader";
import { useParams } from "react-router-dom";
import { apiGetCategoryBeltById } from "@/services/categoryBeltService";
import CategoryCollectionForm from "./CategoryCollectionForm";
import { apiGetCategoryCollectionById } from "@/services/categoryCollectionService";
const CategoryCollectionDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categoryBelt, setCategoryBelt] = useState(null);
  const { id } = useParams();
  const getCategoryBelt = async (id) => {
    try {
      const data = await apiGetCategoryCollectionById(id);
      console.log(data)
      setCategoryBelt(data?.getcategoryCollection);
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
    <CategoryCollectionForm initialData={categoryBelt} />
  );
};

export default CategoryCollectionDetails;
