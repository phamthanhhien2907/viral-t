import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import level_vip from "@/assets/level_vip.webp";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import RefreshIcon from "@mui/icons-material/Refresh";
import WalletIcon from "@mui/icons-material/Wallet";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrent } from "@/stores/actions/userAction";
import { Landmark } from "lucide-react";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import toast from "react-hot-toast";
import { useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
const Profile = () => {
  const [alert, setAlert] = useState(false);
  const { currentData } = useSelector((state) => state.user);
  const { isLoggedIn, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width:600px)");
  const { t } = useTranslation('global');
  useEffect(() => {
    if (isLoggedIn && token) {
      setTimeout(() => {
        dispatch(getCurrent());
      }, 1000);
    }
  }, [isLoggedIn, token, navigate, dispatch]);
  const handleAlert = () => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 2000);
  };
  return (
    <div className="relative  pb-12">
      <div className="relative w-[100%] h-[200px] max-sm:h-[180px]">
        <div className="bg-profileColor w-full h-full">
          <div className="w-full flex justify-end p-4">
            <SettingsIcon
              onClick={() => navigate("/setting")}
              sx={{
                color: "white",
                cursor: "pointer",
              }}
              // onClick={() => {
              //   if (Object.keys(currentData).length === 0) {
              //     navigate("/sign-in");
              //   } else {
              //     navigate("/settings");
              //   }
              // }}
            />
          </div>
          <div className="flex items-center px-8 gap-4">
            <Link
              to={isLoggedIn && token ? `/information` : ""}
              className="flex items-center gap-4"
            >
              <Avatar
                // onClick={() => navigate("/information")}
                alt={currentData && currentData?.username}
                src={PersonIcon}
                sx={{
                  width: 70,
                  height: 70,
                  bgcolor: "white",
                  color: "black",
                  cursor: "pointer",
                }}
              />
              <h3 className="text-2xl text-white">
                {currentData
                  ? currentData?.fullName
                    ? currentData?.fullName
                    : currentData?.username
                  : "anonymous"}
              </h3>
            </Link>
            <div className="flex items-center gap-1">
              <img src={level_vip} className="w-12 h-10" alt="vip" />
              <h3 className="text-lg text-white">{t('profile.vipLevel')} ({`level ${currentData?.vip}`})</h3>
            </div>
          </div>
        </div>
        <div className="absolute z-30 bottom-[-40px] w-full">
          <div className="w-[90%] mx-auto max-sm:h-[60px] h-[80px] bg-white rounded-2xl py-2  ">
            <div className="flex items-center justify-evenly">
              <div className="flex items-center gap-2 cursor-pointer " onClick={handleAlert}>
                <AccountBalanceWalletIcon
                  sx={{ fontSize: 30, color: "#c24491" }}
                />
                <span className="text-xl text-[#c24491] max-sm:text-base" >
                  {t('profile.deposit')}
                </span>
              </div>
              <span className="w-[3px] bg-gray-300 h-[60px] max-sm:h-[40px]"></span>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  if (
                    currentData?.nameOfBank &&
                    currentData?.creditCartOfBank &&
                    currentData?.nameOfUser
                  ) {
                    navigate(`/withdraw/${currentData?._id}`);
                  } else {
                    navigate(`/setBank/${currentData?._id}`);
                  }
                }}
              >
                <WalletIcon sx={{ fontSize: 30, color: "#c24491" }} />
                <span className="text-xl text-[#c24491] max-sm:text-base">{t('profile.withdraw')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {alert && (
        <div className="absolute top-[40%] z-20 w-[90%] h-12 left-7 mx-auto bg-gray-600 ">
          <span className="text-white w-full h-full flex items-center justify-center">
          {t('profile.contact')}
          </span>
        </div>
      )}
      <div className="w-[90%] mx-auto h-[260px] max-sm:h-[200px] mt-20 bg-white rounded-2xl py-2  ">
        <div className=" mx-auto w-[95%] py-2 border-b-2 ">
          <h3 className="text-xl text-blue-700 max-sm:text-base">{t('profile.wallet')}</h3>
        </div>
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-blue-700 max-sm:text-xl">{currentData?.withDraw?.toLocaleString("vi-VN") + "₫"}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xl text-gray-600 max-sm:text-base">{t('profile.balance')}</span>
            <div className="w-[50px] h-[50px] max-sm:w-[30px] max-sm:h-[30px] flex items-center justify-center bg-[#c24491] rounded-full">
              <RefreshIcon
                sx={{
                  fontSize: isMobile ? 20 : 30,
                  color: "white",
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-blue-700 max-sm:text-xl">0</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xl text-gray-600 max-sm:text-base">{t('profile.creditScore')}</span>
            <div className="w-[50px] h-[50px] max-sm:w-[30px] max-sm:h-[30px] flex items-center justify-center bg-[#c24491] rounded-full">
              <RefreshIcon
                sx={{
                  fontSize: isMobile ? 20 : 30,
                  color: "white",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[90%] mx-auto h-fit mt-4 bg-white rounded-2xl py-2  ">
        <div className="w-full grid grid-cols-2">
          <div className="flex items-center px-4 py-4 gap-4 cursor-pointer max-sm:gap-2 max-sm:px-1">
            <div className="w-[50px] h-[50px] max-sm:w-[30px] max-sm:h-[30px] flex items-center justify-center border rounded-full">
              <AssignmentIcon
                sx={{
                  fontSize: isMobile ? 20 : 30,
                  color: "grey",
                }}
              />
            </div>
            <span className="text-base text-[#c24491] max-sm:text-xs">
            {t('profile.accountDetails')}
            </span>
          </div>
          <div
            className="flex items-center px-4 py-4 gap-4 cursor-pointer max-sm:gap-2 max-sm:px-1"
            onClick={() => navigate(isLoggedIn && token ? "/information" : "")}
          >
            <div className="w-[50px] h-[50px] max-sm:w-[30px] max-sm:h-[30px] flex items-center justify-center border rounded-full ">
              <PersonIcon
                sx={{
                  fontSize: isMobile ? 20 : 30,
                  color: "grey",
                }}
              />
            </div>
            <span className="text-base text-[#c24491] max-sm:text-xs">{t('profile.personalInfo')}</span>
          </div>
          <div
            className="flex items-center px-4 py-4 gap-4 cursor-pointer max-sm:gap-2 max-sm:px-1"
            onClick={() => navigate(`/withdrawalhistory/${currentData?._id}`)}
          >
            <div className="w-[50px] h-[50px] max-sm:w-[30px] max-sm:h-[30px] flex items-center justify-center border rounded-full">
              <WalletIcon
                sx={{
                  fontSize: isMobile ? 20 : 30,
                  color: "grey",
                }}
              />
            </div>
            <span className="text-base text-[#c24491] max-sm:text-xs">{t('profile.withdrawHistory')}</span>
          </div>
          <div
            className="flex items-center px-4 py-4 gap-4 cursor-pointer max-sm:gap-2 max-sm:px-1"
            onClick={() => navigate("/depositalhistory")}
          >
            <div className="w-[50px] h-[50px] max-sm:w-[30px] max-sm:h-[30px] flex items-center justify-center border rounded-full ">
              <AccountBalanceWalletIcon
                sx={{
                  fontSize: isMobile ? 20 : 30,
                  color: "grey",
                }}
              />
            </div>
            <span className="text-base text-[#c24491] max-sm:text-xs">{t('profile.depositHistory')}</span>
          </div>
          <div
            className="flex items-center px-4 py-4 gap-4 cursor-pointer max-sm:gap-2 max-sm:px-1"
            onClick={() => navigate(`/evaluatehistory/${currentData?._id}`)}
          >
            <div className="w-[50px] h-[50px] max-sm:w-[30px] max-sm:h-[30px] flex items-center justify-center border rounded-full">
              <SportsEsportsIcon
                sx={{
                  fontSize: isMobile ? 20 : 30,
                  color: "grey",
                }}
              />
            </div>
            <span className="text-base text-[#c24491] max-sm:text-xs">{t('profile.reviewHistory')}</span>
          </div>
          <div
            className="flex items-center px-4 py-4 gap-4 cursor-pointer max-sm:gap-2 max-sm:px-1"
            onClick={() =>
              navigate(
                isLoggedIn && token ? `/setBank/${currentData?._id}` : ""
              )
            }
          >
            <div className="w-[50px] h-[50px] max-sm:w-[30px] max-sm:h-[30px] flex items-center justify-center border rounded-full ">
              <AccountBalanceIcon
                sx={{
                  fontSize: isMobile ? 20 : 30,
                  color: "grey",
                }}
              />
            </div>
            <span className="text-base text-[#c24491] max-sm:text-xs">
            {t('profile.bankLink')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
