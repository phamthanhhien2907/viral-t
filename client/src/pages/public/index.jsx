import FixedBottomNavigation from "@/components/FixedBottomNavigation";
import { Outlet } from "react-router-dom";

const Public = () => {
  return (
    <div className="xl:w-[30%] mx-auto max-sm:w-full">
      <Outlet />
    </div>
  );
};

export default Public;
