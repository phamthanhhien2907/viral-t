"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "@/components/custom ui/Loader";
import LotteryForm from "@/components/lottery/LotteryForm";
import { apiGetLotteryById, apiGetRoomById } from "@/services/evaluateService";
import { useParams } from "react-router-dom";

const LotteryDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lotteryDetails, setLotteryDetails] = useState(null);

  const { roomId } = useParams();
  console.log(roomId)
  const getCollectionDetails = async (roomId) => {
    try {
      const data = await apiGetRoomById(roomId);
      if (data?.success) setLotteryDetails(data?.evaluates);
      setIsLoading(false);
    } catch (error) {
      console.log("collection_[GET]", error);
      toast.error("Something went wrong! Please try again.");
    }
  };
  useEffect(() => {
    getCollectionDetails(roomId);
  }, [roomId]);
  return isLoading ? <Loader /> : <LotteryForm initialData={lotteryDetails} />;
};

export default LotteryDetails;
