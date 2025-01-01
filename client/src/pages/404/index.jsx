import { useState, useEffect } from "react";
import not_found from "@/assets/404.jpg";
import Loader from "@/components/custom ui/Loader";

const NotFound = () => {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(true); 
    }, 1000); 

    return () => clearTimeout(timer); // Dọn dẹp hàm hẹn giờ khi component bị hủy
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      {showImage ? (
        <img
          src={not_found}
          alt="not_found"
          className="object-scale-down h-screen mx-auto"
        />
      ) : (
        <Loader/> 
      )}
    </div>
  );
};

export default NotFound;
