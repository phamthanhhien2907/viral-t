import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { pathImg } from "@/lib/constant";

export default function CustomSlide({ collection, currentData }) {
  var settings = {
    className: "center",
    centerMode: true,
    // dots: false,
    infinite: true,
    centerPadding: "25px",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {collection &&
          collection?.map((col) => (
            <Link
              key={col?._id}
              to={`/video/${col?.title.replace(/ /g, "_")}/${col?._id}/${
                currentData?._id
              }`}
              className="relative w-full"
            >
              <div className="w-[90%] h-[250px]  max-sm:h-[150px] object-cover">
                <img
                  src={`${pathImg}/images/${col?.image}`}
                  className="w-full h-full rounded-xl object-cover"
                  alt=""
                />
              </div>

              <div className="absolute bottom-0 w-[100%] ">
                <div className="flex items-center px-4 py-1  bg-[rgba(0,0,0,.4)] w-[90%] justify-between rounded-b-xl">
                  <span className="text-white font-medium">{col?.title}</span>
                  <span className="text-white font-medium">{col?.view?.length}</span>
                </div>
              </div>
            </Link>
          ))}
      </Slider>
    </div>
  );
}
