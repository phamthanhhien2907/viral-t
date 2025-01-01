import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomePage from "@/pages/HomePage";
import { useEffect, useState } from "react";
import Evalute from "@/pages/Evalute";
import Cinema from "@/pages/Cinema";
import Profile from "@/pages/Profile";
import PersonIcon from "@mui/icons-material/Person";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import WavesIcon from "@mui/icons-material/Waves";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch, useSelector } from "react-redux";
import { getCurrent } from "@/stores/actions/userAction";
import beauty from "@/assets/beauty.png"
import { useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function FixedBottomNavigation() {
  const { currentData } = useSelector((state) => state.user);
  const { isLoggedIn, token } = useSelector((state) => state.auth);
  const isMobile = useMediaQuery("(max-width:600px)");
  
  const dispatch = useDispatch();
  const { t } = useTranslation("global");
  useEffect(() => {
    if (isLoggedIn && token) {
      dispatch(getCurrent());
    }
  }, [isLoggedIn, token, dispatch]);
  const messageExamples = [
    {
      page: <HomePage currentData={currentData} />,
    },
    {
      page: <Evalute currentData={currentData} />,
    },
    {
      // page: <Province />,
    },
    {
      page: <Cinema currentData={currentData} />,
    },
    {
      page: <Profile />,
    },
  ];

  const page = localStorage.getItem("page");
  const [value, setValue] = useState(Number(page) || 0);
  const [activeComponent, setActiveComponent] = useState(
    messageExamples[value].page
  );
  useEffect(() => {
    setActiveComponent(messageExamples[value].page);
  }, [value]);
  return (
      <Box
      sx={{
        pb: 10,
        bgcolor: "#f2f2f5",

      }}
    >
      <CssBaseline />
      {activeComponent}
   
      <div
        className="fixed bottom-0 left-0 right-0 w-full xl:w-[30%] mx-auto"
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            localStorage.setItem("page", newValue);
            if (newValue === 2) return;
            setValue(newValue);
          }}
          className={isMobile ? "py-0 px-4" : "py-8"}
        >
          <BottomNavigationAction
           label={
            <span
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: isMobile ? "10px" : "11px",
                color: "black",
              }}
            >
              {t('navigation.home')}
            </span>
          }
            sx={{
              fontWeight: 600,
              color: "rgb(151, 151, 153)",
              ":focus": {
                color: "rebeccapurple",
              },
            }}
            icon={<HomeIcon sx={{ fontSize: isMobile ? 25 : 35 }} />}
          />
          <BottomNavigationAction
          label={
            <span
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: isMobile ? "10px" : "11px",
                color: "black",
              }}
            >
              {isMobile ? t('navigation.evalutePhone') : t('navigation.evalute')}
            </span>
          }
            sx={{
              fontWeight: 600,
              color: "rgb(151, 151, 153)",
              ":focus": {
                color: "rebeccapurple",
              },
            }}
            icon={<AccessAlarmIcon sx={{ fontSize: isMobile ? 25 : 35 }} />}
          />

          <BottomNavigationAction
          label={
            <img src={beauty} alt="beauty" className={isMobile ? "w-[60px] h-[55px] mb-10" : "w-[85px] h-[85px] mb-12"}/>
          }
            sx={{
              fontWeight: 600,
              color: "palevioletred",
              ":focus": {
                color: "rebeccapurple",
              },
            }}
          
          />
          <BottomNavigationAction
            label={
              <span
                style={{
                  fontFamily: "Arial, sans-serif",
                  fontSize: isMobile ? "10px" : "11px",
                  color: "black",
                }}
              >
                {isMobile ? t('navigation.cinemaPhone') : t('navigation.cinema')}
              </span>
            }
            sx={{
              fontWeight: 600,
              fontSize: 20,
              color: "rgb(151, 151, 153)",
              ":focus": {
                color: "rebeccapurple",
              },
            }}
            icon={<LiveTvIcon sx={{ fontSize: isMobile ? 25 : 35 }} />}
          />
          <BottomNavigationAction
           label={
            <span
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: isMobile ? "10px" : "11px",
                color: "black",
              }}
            >
              {t('navigation.profile')}
            </span>
          }
            sx={{
              fontWeight: 600,
             
              color: "rgb(151, 151, 153)",
              ":focus": {
                color: "rebeccapurple",
              },
            }}
            icon={<PersonIcon sx={{ fontSize: isMobile ? 25 : 35 }} />}
          />
        </BottomNavigation>
      </div>
    </Box>
  );
}
