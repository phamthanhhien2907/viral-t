import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "@/components/custom ui/Loader";
import CollectionForm from "@/components/collections/CollectionForm";
import { apiGetCollectionById } from "@/services/collectionService";
import { useParams } from "react-router-dom";
const CollectionDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [collectionDetails, setCollectionDetails] = useState(null);
  const { id } = useParams();
  const getCollectionDetails = async (id) => {
    try {
      const data = await apiGetCollectionById(id);
      setCollectionDetails(data.collections);
      setIsLoading(false);
    } catch (error) {
      console.log("collection_[GET]", error);
      toast.error("Something went wrong! Please try again.");
    }
  };
  useEffect(() => {
    getCollectionDetails(id);
  }, [id]);
  return isLoading ? (
    <Loader />
  ) : (
    <CollectionForm initialData={collectionDetails} />
  );
};

export default CollectionDetails;
