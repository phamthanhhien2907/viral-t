import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "@/assets/images_1.jpg";
import image2 from "@/assets/images_2.jpg";
import image3 from "@/assets/image_3.jpg";
import image4 from "@/assets/image_4.jpg";
import image5 from "@/assets/image_5.jpg";
import image6 from "@/assets/image_6.png";
import image7 from "@/assets/image_7.jpg";
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import "@/index.css"
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { useMediaQuery } from "@mui/material";
export default function SlickSlider() {
   const isMobile = useMediaQuery("(max-width:600px)");
  var settings = {
    className: "center",
    centerMode: true,
    dots: false,
    infinite: true,
    centerPadding: "60px",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    // <div className="slider-container relative">
    //   <div className="absolute w-full h-[155px] bg-profileColor"></div>
    //   <Slider {...settings} className="absolute top-[50px]">
    //     <div className="sm:w-[90%] md:w-[70%] sm:h-full md:h-[320px] sm:object-contain md:object-cover">
    //       <img
    //         src={image1}
    //         alt="image_1"
    //         className="sm:w-[90%] md:w-[70%] sm:mx-auto sm:object-cover "
    //       />
    //     </div>
    //     <div className="sm:w-[90%] md:w-[70%] sm:h-full md:h-[320px] sm:object-contain md:object-cover">
    //       <img
    //         src={image2}
    //         alt="image_1"
    //         className="sm:w-[90%] md:w-[70%] sm:mx-auto sm:object-cover "
    //       />
    //     </div>
    //     <div className="sm:w-[90%] md:w-[70%] sm:h-full md:h-[320px] sm:object-contain md:object-cover">
    //       <img
    //         src={image3}
    //         alt="image_1"
    //         className="sm:w-[90%] md:w-[70%] sm:mx-auto sm:object-cover "
    //       />
    //     </div>
    //     <div className="sm:w-[90%] md:w-[70%] sm:h-full md:h-[320px] sm:object-contain md:object-cover">
    //       <img
    //         src={image4}
    //         alt="image_1"
    //         className="sm:w-[90%] md:w-[70%] sm:mx-auto sm:object-cover "
    //       />
    //     </div>
    //     <div className="sm:w-[90%] md:w-[70%] sm:h-full md:h-[320px] sm:object-contain md:object-cover">
    //       <img
    //         src={image5}
    //         alt="image_1"
    //         className="sm:w-[90%] md:w-[70%] sm:mx-auto sm:object-cover "
    //       />
    //     </div>
    //     <div className="sm:w-[90%] md:w-[70%] sm:h-full md:h-[320px] sm:object-contain md:object-cover">
    //       <img
    //         src={image6}
    //         alt="image_1"
    //         className="sm:w-[90%] md:w-[70%] sm:mx-auto sm:object-cover "
    //       />
    //     </div>
    //     <div className="sm:w-[90%] md:w-[70%] sm:h-full md:h-[320px] sm:object-contain md:object-cover">
    //       <img
    //         src={image7}
    //         alt="image_1"
    //         className="sm:w-[90%] md:w-[70%] mx-auto sm:object-cover "
    //       />
    //     </div>
    //   </Slider>
    // </div>
    <div className="relative">
      <div className={isMobile ? "h-[120px] absolute custom-background w-full" : "h-[195px] absolute custom-background w-full"}>
      </div>
      <div className="py-6">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'1.2'}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img className={isMobile ? "h-[180px] rounded-xl" : "h-[260px] rounded-xl"} src={image1} />
        </SwiperSlide>
        <SwiperSlide>
          <img className={isMobile ? "h-[180px] rounded-xl" : "h-[260px] rounded-xl"} src={image2} />
        </SwiperSlide>
        <SwiperSlide>
          <img className={isMobile ? "h-[180px] rounded-xl" : "h-[260px] rounded-xl"} src={image3} />
        </SwiperSlide>
        <SwiperSlide>
          <img className={isMobile ? "h-[180px] rounded-xl" : "h-[260px] rounded-xl"} src={image4} />
        </SwiperSlide>
        <SwiperSlide>
          <img className={isMobile ? "h-[180px] rounded-xl" : "h-[260px] rounded-xl"} src={image5} />
        </SwiperSlide>
        <SwiperSlide>
          <img className={isMobile ? "h-[180px] rounded-xl" : "h-[260px] rounded-xl"} src={image6} />
        </SwiperSlide>
        <SwiperSlide>
          <img className={isMobile ? "h-[180px] rounded-xl" : "h-[260px] rounded-xl"} src={image7} />
        </SwiperSlide>
      
      </Swiper>
      </div>
    </div>
  );
}
