import { navLinks } from "@/lib/constant";
import { Link } from "react-router-dom";
import logo from "@/assets/beauty.png";
import { logout } from "@/stores/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";

const LeftSideBar = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const dispatch = useDispatch();
  const { currentData } = useSelector((state) => state.user);

  return (
    <div className={isMobile ? "left-0 top-0 sticky pt-4 flex flex-col gap-2 bg-blue-2 shadow-xl w-full h-screen items-start" : "left-0 top-0 sticky p-10 flex flex-col gap-10 bg-blue-2 shadow-xl w-full  h-screen "}>
      <div className="flex items-center justify-between">
        <Link to="/" className="px-3">
          <img src={logo} alt="logo" width={isMobile ? 50 : 100} height={50} className="object-cover" />
        </Link>
       
        <div className="flex flex-col gap-3 max-sm:gap-2 items-end">
          <span className="font-semibold text-red-500 max-sm:text-[10px]">Quản trị viên</span>
         <div className="flex items-center gap-2 j"> 
          <span className="font-semibold max-sm:text-[10px]">Mã giới thiệu:</span>
          <span className="font-semibold max-sm:text-[10px]">{currentData?.code}</span>
         </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 max-sm:gap-1">
        {navLinks?.map((link) => (
          <Link
            to={link?.url}
            key={link?.label}
            className={`flex gap-4 px-4 py-2 w-full  items-center justify-start  ${"hover:text-white hover:bg-profileColor rounded-xl"}`}
          >
            {/* {link?.icon} */}
            <p className="text-base font-semibold max-sm:text-[10px]">{link?.label}</p>
          </Link>
        ))}
        <div className="max-sm:px-2">
          <button
            className="flex items-center w-full text-base font-semibold  bg-profileColor px-4 py-2 justify-start text-white rounded-xl max-sm:text-[10px]"
            onClick={() => dispatch(logout())}
          >
            ĐĂNG XUẤT
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
