import danhgia1 from "@/assets/danhgia1.jpg";
import danhgia2 from "@/assets/danhgia2.jpg";
import danhgia3 from "@/assets/danhgia3.jpg";
import danhgia4 from "@/assets/danhgia4.jpeg";
import danhgia5 from "@/assets/danhgia5.jpg";
import danhgia6 from "@/assets/danhgia6.png";
import { pathImg } from "@/lib/constant";
import { apiGetAllLottery } from "@/services/evaluateService";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
const EvaluteHistory = () => {
  const [active, setActive] = useState(0);
  const { t } = useTranslation("global");
  const [key, setKey] = useState(1);
  const navigate = useNavigate();
  const [lottery, setLottery] = useState([])
  const { id } = useParams();
  const apiGetLottery = async () => {
  const data = await apiGetAllLottery();
      if (data?.success) setLottery(data?.lotteries);
  };
  useEffect(() => {
    apiGetLottery()
  }, [])
  console.log(lottery)
  return (
    <div className="w-full h-screen  ">
      <div className="sticky w-full top-0">
        <div className="w-full h-[50px] bg-profileColor">
          <ChevronLeft
            onClick={() => {
              localStorage.setItem("page", 4);
              navigate("/");
            }}
            className="absolute top-2 z-30 left-4 text-white cursor-pointer"
            size={30}
          />
          <span className=" text-xl text-white absolute top-2 max-sm:top-3 left-[40%] max-sm:text-base">
            {t("evalute.evaluationHistory")}</span>
        </div>
      </div>
      <div className="w-full flex bg-gray-100">
        <div className="w-full grid grid-cols-2 gap-2 px-4 pb-20 pt-4 ">
          {lottery?.map((lot) => (
          <Link
            to={`/historydetails/${lot?.room}/${id}`}
            key={lot?._id}
          >
               <div className="w-[100%] bg-white cursor-pointer max-sm:h-[120px]  rounded-2xl h-[140px] flex flex-col items-center max-sm:justify-center" >
               <img
                 className="w-[90px] max-sm:w-fitmax-sm:h-[60%] h-[70%] object-cover rounded-2xl px-4 py-2 max-sm:object-contain"
                 src={`${pathImg}/images/${lot?.image}`}
                 alt="evalute"
               />
               <span className="max-sm:text-[12px]">{lot?.room} </span>
             </div>
            
           
          </Link>
          ))}
          {/* <Link
            to={`/historydetails/${key + 1}/${id}`}
            onClick={() => {
              setKey(2);
            }}
          >
            <div className="w-[100%] bg-white cursor-pointer  rounded-2xl h-[140px] flex flex-col items-center">
              <img
                className="w-[90px] h-[70%] object-cover rounded-2xl px-4 py-2  "
                src={danhgia2}
                alt="evalute"
              />
              <span className="">{t("evalute.vip_upgrade_2")} </span>
            </div>
          </Link>
          <Link
            to={`/historydetails/${key + 2}/${id}`}
            onClick={() => {
              setKey(3);
            }}
          >
            <div className="w-[100%] bg-white cursor-pointer  rounded-2xl h-[140px] flex flex-col items-center ">
              <img
                className="w-[90px] h-[70%] object-cover rounded-2xl px-4 py-2  "
                src={danhgia3}
                alt="evalute"
              />
              <span className="">{t("evalute.vip_upgrade_3")} </span>
            </div>
          </Link>
          <Link
            to={`/historydetails/${key + 3}/${id}`}
            onClick={() => {
              setKey(4);
            }}
          >
            <div className="w-[100%] bg-white cursor-pointer  rounded-2xl h-[140px] flex flex-col items-center ">
              <img
                className="w-[90px] h-[70%] object-cover rounded-2xl px-4 py-2  "
                src={danhgia4}
                alt="evalute"
              />
              <span className="">{t("evalute.vip_upgrade_4")} </span>
            </div>
          </Link>
          <Link
            to={`/historydetails/${key + 4}/${id}`}
            onClick={() => {
              setKey(5);
            }}
          >
            <div className="w-[100%] bg-white cursor-pointer  rounded-2xl h-[140px]  flex flex-col items-center">
              <img
                className="w-[90px] h-[70%] object-cover rounded-2xl px-4 py-2  "
                src={danhgia5}
                alt="evalute"
              />
              <span className="">{t("evalute.vip_upgrade_5")} </span>
            </div>
          </Link>
          <Link
            to={`/historydetails/${key + 5}/${id}`}
            onClick={() => {
              setKey(6);
            }}
          >
            <div className="w-[100%] bg-white cursor-pointer  rounded-2xl h-[140px]  flex flex-col items-center">
              <img
                className="w-[90px] h-[70%] object-cover rounded-2xl px-4 py-2  "
                src={danhgia6}
                alt="evalute"
              />
              <span className="">{t("evalute.vip_upgrade_6")} </span>
            </div>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default EvaluteHistory;
