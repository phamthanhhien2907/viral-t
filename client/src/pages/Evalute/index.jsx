import danhgia1 from "@/assets/danhgia1.jpg";
import danhgia2 from "@/assets/danhgia2.jpg";
import danhgia3 from "@/assets/danhgia3.jpg";
import danhgia4 from "@/assets/danhgia4.jpeg";
import danhgia5 from "@/assets/danhgia5.jpg";
import danhgia6 from "@/assets/danhgia6.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGetAllLottery } from "@/services/evaluateService";
import { pathImg } from "@/lib/constant";
import { useTranslation } from "react-i18next";
import { apiGetCategoryBelt, apiGetCategoryBeltById } from "@/services/categoryBeltService";

const Evalute = ({ currentData }) => {
  const { t } = useTranslation("global");
  const [active, setActive] = useState(0);
  const [lottery, setLottery] = useState([]);
  const [categoryBelt, setCategoryBelt] = useState([])
  const [key, setKey] = useState(1);
  const [categoryBeltDetails, setCategoryBeltDetails] = useState(null);
  const apiGetLottery = async () => {
    const data = await apiGetAllLottery();
    if (data?.success) setLottery(data?.lotteries);
  };
  const getCategoryBelt = async() => {
    const data = await apiGetCategoryBelt()
    if(data?.success) setCategoryBelt(data?.getCategoryBelt)
  }
  const fetchCategoryBeltDetails = async (id) => {
    const data = await apiGetCategoryBeltById(id); // Fetch details by ID
    if (data?.success) setCategoryBeltDetails(data?.getCategoryBelt);
  };

  useEffect(() => {
    apiGetLottery();
    getCategoryBelt();
  }, []);
  useEffect(() => {
    if (categoryBelt[active]?._id) {
      fetchCategoryBeltDetails(categoryBelt[active]._id); 
    }
  }, [active, categoryBelt]);
  return (
    <div className="w-full h-screen">
      <div className="sticky w-full top-0">
        <div className="w-full h-[50px] bg-profileColor">
          <span className=" text-xl max-sm:text-base py-1 text-white absolute top-2 left-[40%] max-sm:left-[35%]">
            {t("evalute.title")}
          </span>
        </div>
      </div>
      <div className="w-full flex bg-gray-100">
        <div className="flex flex-col w-[30%]">
          {categoryBelt?.map((category, index) => (
            <div
              key={category?._id}
              className={`w-full h-[62px] max-sm:h-[50px] ${
                active === index ? "bg-white text-blue-500" : ""
              } cursor-pointer flex items-center justify-center`}
              onClick={() => setActive(index)}
            >
              <span className="max-sm:text-xs">{category?.name}</span>
            </div>
          ))}
          
          {/* <div
            className={`w-full h-[62px] max-sm:h-[50px] ${
              active === 1 ? "bg-white text-blue-500" : ""
            } cursor-pointer flex items-center justify-center`}
            onClick={() => setActive(1)}
          >
            <span className="max-sm:text-xs">{t("evalute.vip_upgrade_1")}</span>
          </div>
          <div
            className={`w-full h-[62px] max-sm:h-[50px] ${
              active === 2 ? "bg-white text-blue-500" : ""
            } cursor-pointer flex items-center justify-center`}
            onClick={() => setActive(2)}
          >
            <span className="max-sm:text-xs">{t("evalute.vip_upgrade_2")}</span>
          </div>
          <div
            className={`w-full h-[62px] max-sm:h-[50px] ${
              active === 3 ? "bg-white text-blue-500" : ""
            } cursor-pointer flex items-center justify-center`}
            onClick={() => setActive(3)}
          >
            <span className="max-sm:text-xs">{t("evalute.vip_upgrade_3")}</span>
          </div>
          <div
            className={`w-full h-[62px] max-sm:h-[50px] ${
              active === 4 ? "bg-white text-blue-500" : ""
            } cursor-pointer flex items-center justify-center`}
            onClick={() => setActive(4)}
          >
            <span className="max-sm:text-xs">{t("evalute.vip_upgrade_4")}</span>
          </div>
          <div
            className={`w-full h-[62px] max-sm:h-[50px] ${
              active === 5 ? "bg-white text-blue-500" : ""
            } cursor-pointer flex items-center justify-center`}
            onClick={() => setActive(5)}
          >
            <span className="max-sm:text-xs">{t("evalute.vip_upgrade_5")}</span>
          </div>
          <div
            className={`w-full h-[62px] max-sm:h-[50px] ${
              active === 6 ? "bg-white text-blue-500" : ""
            } cursor-pointer flex items-center justify-center`}
            onClick={() => setActive(6)}
          >
            <span className="max-sm:text-xs">{t("evalute.vip_upgrade_6")}</span>
          </div> */}
        </div>
        {categoryBeltDetails && (
          <RoomDisplay
            rooms={categoryBeltDetails?.rooms}
            currentData={currentData}
            setKey={setKey}
          />
        )}
        {/* {active === 1 && (
           <div className="w-[70%] grid grid-cols-2 gap-2 px-4 pb-20 pt-4 ">
           {categoryBeltDetails && categoryBeltDetails?.rooms?.map((room, index) => (
             <Link
               key={room?._id}
               to={`/lottery/${index + 1}/${currentData?._id}`}
               onClick={(e) => {
                 setTimeout(() => {
                   e.preventDefault();
                   e.stopPropagation();
                 }, 100);
                 setKey(1);
                
               }}
             >
               <div className="w-[100%] bg-white cursor-pointer  rounded-2xl h-[140px] max-sm:h-[100px] flex flex-col items-center justify-center">
                 <img
                   className="w-full h-[70%] object-contain rounded-2xl px-4 py-2"
                   src={`${pathImg}/images/${room?.image}`}
                   alt="evalute"
                 />
                 <span className="max-sm:text-xs">{room?.room}</span>
               </div>
             </Link>
           ))}
         </div>
        )}
        {active === 2 && (
           <div className="w-[70%] grid grid-cols-2 gap-2 px-4 pb-20 pt-4 ">
           {categoryBeltDetails && categoryBeltDetails?.rooms?.map((room, index) => (
             <Link
               key={room?._id}
               to={`/lottery/${index + 1}/${currentData?._id}`}
               onClick={(e) => {
                 setTimeout(() => {
                   e.preventDefault();
                   e.stopPropagation();
                 }, 100);
                 setKey(1);
                
               }}
             >
               <div className="w-[100%] bg-white cursor-pointer  rounded-2xl h-[140px] max-sm:h-[100px] flex flex-col items-center justify-center">
                 <img
                   className="w-full h-[70%] object-contain rounded-2xl px-4 py-2"
                   src={`${pathImg}/images/${room?.image}`}
                   alt="evalute"
                 />
                 <span className="max-sm:text-xs">{room?.room}</span>
               </div>
             </Link>
           ))}
            </div>
        )}
        {active === 3 && (
            <div className="w-[70%] grid grid-cols-2 gap-2 px-4 pb-20 pt-4 ">
            {categoryBeltDetails && categoryBeltDetails?.rooms?.map((room, index) => (
              <Link
                key={room?._id}
                to={`/lottery/${index + 1}/${currentData?._id}`}
                onClick={(e) => {
                  setTimeout(() => {
                    e.preventDefault();
                    e.stopPropagation();
                  }, 100);
                  setKey(1);
                 
                }}
              >
                <div className="w-[100%] bg-white cursor-pointer  rounded-2xl h-[140px] max-sm:h-[100px] flex flex-col items-center justify-center">
                  <img
                    className="w-full h-[70%] object-contain rounded-2xl px-4 py-2"
                    src={`${pathImg}/images/${room?.image}`}
                    alt="evalute"
                  />
                  <span className="max-sm:text-xs">{room?.room}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
        {active === 4 && (
            <div className="w-[70%] grid grid-cols-2 gap-2 px-4 pb-20 pt-4 ">
            {categoryBeltDetails && categoryBeltDetails?.rooms?.map((room, index) => (
              <Link
                key={room?._id}
                to={`/lottery/${index + 1}/${currentData?._id}`}
                onClick={(e) => {
                  setTimeout(() => {
                    e.preventDefault();
                    e.stopPropagation();
                  }, 100);
                  setKey(1);
                 
                }}
              >
                <div className="w-[100%] bg-white cursor-pointer  rounded-2xl h-[140px] max-sm:h-[100px] flex flex-col items-center justify-center">
                  <img
                    className="w-full h-[70%] object-contain rounded-2xl px-4 py-2"
                    src={`${pathImg}/images/${room?.image}`}
                    alt="evalute"
                  />
                  <span className="max-sm:text-xs">{room?.room}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
        {active === 5 && (
           <div className="w-[70%] grid grid-cols-2 gap-2 px-4 pb-20 pt-4 ">
           {categoryBeltDetails && categoryBeltDetails?.rooms?.map((room, index) => (
             <Link
               key={room?._id}
               to={`/lottery/${index + 1}/${currentData?._id}`}
               onClick={(e) => {
                 setTimeout(() => {
                   e.preventDefault();
                   e.stopPropagation();
                 }, 100);
                 setKey(1);
                
               }}
             >
               <div className="w-[100%] bg-white cursor-pointer  rounded-2xl h-[140px] max-sm:h-[100px] flex flex-col items-center justify-center">
                 <img
                   className="w-full h-[70%] object-contain rounded-2xl px-4 py-2"
                   src={`${pathImg}/images/${room?.image}`}
                   alt="evalute"
                 />
                 <span className="max-sm:text-xs">{room?.room}</span>
               </div>
             </Link>
           ))}
         </div>
        )}
        {active === 6 && (
           <div className="w-[70%] grid grid-cols-2 gap-2 px-4 pb-20 pt-4 ">
           {categoryBeltDetails && categoryBeltDetails?.rooms?.map((room, index) => (
             <Link
               key={room?._id}
               to={`/lottery/${index + 1}/${currentData?._id}`}
               onClick={(e) => {
                 setTimeout(() => {
                   e.preventDefault();
                   e.stopPropagation();
                 }, 100);
                 setKey(1);
                
               }}
             >
               <div className="w-[100%] bg-white cursor-pointer  rounded-2xl h-[140px] max-sm:h-[100px] flex flex-col items-center justify-center">
                 <img
                   className="w-full h-[70%] object-contain rounded-2xl px-4 py-2"
                   src={`${pathImg}/images/${room?.image}`}
                   alt="evalute"
                 />
                 <span className="max-sm:text-xs">{room?.room}</span>
               </div>
             </Link>
           ))}
         </div>
        )} */}
      </div>
    </div>
  );
};
const RoomDisplay = ({ rooms, currentData, setKey }) => (
  <div className="w-[70%] grid grid-cols-2 gap-2 px-4 pb-20 pt-4 ">
    {rooms?.map((room, index) => (
      <Link
        key={room?._id}
        to={`/lottery/${room?.room}/${currentData?._id}`}
        onClick={(e) => {
          setTimeout(() => {
            e.preventDefault();
            e.stopPropagation();
          }, 100);
          setKey(1);
        }}
      >
        <div className="w-[100%] bg-white cursor-pointer rounded-2xl h-[140px] max-sm:h-[100px] flex flex-col items-center justify-center">
          <img
            className="w-full h-[70%] object-contain rounded-2xl px-4 py-2"
            src={`${pathImg}/images/${room?.image}`}
            alt="evalute"
          />
          <span className="max-sm:text-xs">{room?.room}</span>
        </div>
      </Link>
    ))}
  </div>
);
export default Evalute;
