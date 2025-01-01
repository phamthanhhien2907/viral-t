import { ChevronRight } from "lucide-react";
import SlickSlider from "../SlickSlider";
import danhgia1 from "@/assets/danhgia1.jpg";
import danhgia2 from "@/assets/danhgia2.jpg";
import danhgia3 from "@/assets/danhgia3.jpg";
import danhgia4 from "@/assets/danhgia4.jpeg";
import danhgia5 from "@/assets/danhgia5.jpg";
import danhgia6 from "@/assets/danhgia6.png";
import { apiGetCollection } from "@/services/collectionService";
import { useEffect, useState } from "react";
import CustomSlide from "../SlickSlider/cinema";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Marquee from "react-fast-marquee";
import CampaignIcon from '@mui/icons-material/Campaign';
import { pathImg } from "@/lib/constant";
import { useTranslation } from "react-i18next";
import { apiGetCategoryBelt } from "@/services/categoryBeltService";
import { apiGetAllLottery } from "@/services/evaluateService";
const HomePage = ({ currentData }) => {
  const dispatch = useDispatch();
  const [categoryBelt, setCategoryBelt] = useState([])
  const [collection, setCollection] = useState(null);
  const navigate = useNavigate()
  const [t] = useTranslation("global");
  const getCollection = async () => {
    const data = await apiGetCollection();
    if (data.success) setCollection(data.collections);
  };
  const getCategoryBelt = async() => {
     const data = await apiGetAllLottery()
     if(data?.success) setCategoryBelt(data?.lotteries)
   }
  useEffect(() => {
    getCollection() && getCategoryBelt()
  }, []);
  return (
    <div className="w-full h-screen overflow-x-hidden tabs-list">
      <SlickSlider />

      <div className="w-full bg-[#fffbe8] flex gap-4 px-4 text-red-500">
        <CampaignIcon sx={{ fontSize : "30px" }}/>
        <Marquee>
          {t("home.marquee")}
        </Marquee>
      </div>
      <div className="flex items-center px-4 py-4 justify-between w-full">
        <div className="flex items-center gap-2">
          <div className="w-[3px] h-[22px] bg-[#775fd9]"></div>
          <span className="text-[#c24491]  font-semibold">
          {t("home.mission")}
          </span>
        </div>
        <div
          className="flex items-center gap-2 text-gray-500 cursor-pointer"
          onClick={() => {
            localStorage.setItem("page", 1);
            window.location.reload();
          }}
        >
          <span
            className="text-xs
          "
          >
           {t("home.more")}
          </span>
          <ChevronRight />
        </div>
      </div>
      <div className="flex items-center justify-between px-20 py-2 max-sm:px-2">
          {categoryBelt?.slice(0, 3)?.map((category) => (
            <Link to={`/lottery/${category?.room}/${currentData?._id}`}  key={category?._id}>
                <div
                  className="flex flex-col items-center gap-2 cursor-pointer"
                >
                  <img
                    className="w-[60px] h-[60px] max-sm:w-[40px] max-sm:h-[50px] rounded-xl"
                    src={`${pathImg}/images/${category?.image}`}
                    alt="evalute"
                  />
                  <span className="text-base max-sm:text-xs">{category?.room}</span>
                </div>
            </Link>
          ))}
      </div>
      <div className="flex items-center px-4 py-2 justify-between">
        <div className="flex items-center gap-2">
          <div className="w-[3px] h-[22px] bg-[#775fd9]"></div>
          <span className="text-[#c24491] text-base font-semibold">
          {t("home.popular")}
          </span>
        </div>
        <div
          className="flex items-center gap-2 text-gray-500 cursor-pointer"
          onClick={() => {
            localStorage.setItem("page", 3);
            window.location.reload();
          }}
        >
          <span
            className="text-xs
          "
          >
            {t("home.more")}
          </span>
          <ChevronRight />
        </div>
      </div>
      <CustomSlide collection={collection} currentData={currentData} />
      <div className="flex items-center px-4 py-2 justify-between">
        <div className="flex items-center gap-2">
          <div className="w-[3px] h-[22px] bg-[#775fd9]"></div>
          <span className="text-[#c24491] text-base font-semibold">
          {t("home.propose")}
          </span>
        </div>
        <div
          className="flex items-center gap-2 text-gray-500 cursor-pointer"
          onClick={() => {
            localStorage.setItem("page", 3);
            window.location.reload();
          }}
        >
          <span
            className="text-xs
          "
          >
            {t("home.more")}
          </span>
          <ChevronRight />
        </div>
      </div>
      <div className="grid grid-cols-2 px-8 gap-4">
        {collection
          ?.filter((fill) => fill?.category?.includes("jp"))
          ?.map((col) => (
            <Link
              key={col?._id}
              to={`/video/${col?.title}/${col?._id}/${currentData?._id}`}
              className="relative"
            >
              {/* <img
              className="w-[186px] h-[158px] rounded-xl bg-gray-100 "
              src={`http://localhost:8080/images/${col?.image}`}
              alt=""
            /> */}
              <img
                className="rounded-xl bg-gray-100 h-[200px] max-sm:h-[120px] object-cover"
                src={`${pathImg}/images/${col?.image}`}
                alt=""
              />
              <div className="absolute bottom-0  w-full">
                <div className="w-full bg-[rgba(0,0,0,.4)] flex items-center justify-between px-4">
                  <span className="text-white">{col?.title}</span>
                  <span className="text-white">{col?.view?.length}</span>
                </div>
              </div>
            </Link>
          ))}
      </div>
      <span className="w-full h-20 pt-12 pb-20 flex justify-center font-semibold max-sm:text-sm">
      {t("home.information")}
      </span>
    </div>
  );
};

export default HomePage;
