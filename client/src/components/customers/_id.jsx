import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "@/components/custom ui/Loader";
import { useParams } from "react-router-dom";
import { apiGetUserById } from "@/services/userService";
import CustomerForm from "./CustomerForm";
const UserDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const { id } = useParams();
  const getUserDetailsById = async (id) => {
    try {
      const data = await apiGetUserById(id);
      console.log(data);
      setUserDetails(data.user);
      setIsLoading(false);
    } catch (error) {
      console.log("collection_[GET]", error);
      toast.error("Something went wrong! Please try again.");
    }
  };
  useEffect(() => {
    getUserDetailsById(id);
  }, [id]);
  return isLoading ? <Loader /> : <CustomerForm initialData={userDetails} />;
};

export default UserDetails;
