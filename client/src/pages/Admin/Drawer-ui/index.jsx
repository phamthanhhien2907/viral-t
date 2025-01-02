import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';
import CategoryBelt from '../CategoryBelt';
import Collections from '../Collection';
import CategoryCollection from '../CategoryCollection';
import Lottery from '../Lottery';
import Customers from '../Customer';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PersonIcon from '@mui/icons-material/Person';
import DepositialHistoryAdmin from '@/pages/DepositalHistoryAdmin';
import WithDrawalHistoryAdmin from '@/pages/WithDrawalHistoryAdmin';
import TransformHistory from '@/pages/Transform';
import CustomersBank from '../CustomerBank';
import Belt from '@/pages/Belt';
import { useDispatch, useSelector } from 'react-redux';
import CustomersList from '../CustomerList';
import { logout } from '@/stores/actions/authAction';
import UpdatePassword from "../../UpdatePassword";
import { fontSize, useMediaQuery } from '@mui/system';
import { AttachMoney, LocalMovies, SystemSecurityUpdateGoodOutlined } from '@mui/icons-material';
import { getCurrent } from '@/stores/actions/userAction';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const drawerWidth = 280;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
 
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);
const tabs_list_right = [
  {
    id : 1,
    direct : <CategoryBelt/>
  },
  {
    id : 2,
    direct : <Collections/>
  },
  {
    id : 3,
    direct : <CategoryCollection/>
  },
  {
    id : 4,
    direct : <Lottery/>
  },
  {
    id : 5,
    direct : <Customers/>
  },
 
  {
    id : 6,
    direct : <DepositialHistoryAdmin/>
  },
  {
    id : 7,
    direct : <WithDrawalHistoryAdmin/>
  },
  {
    id : 8,
    direct : <TransformHistory/>
  },
  {
    id : 9,
    direct : <CustomersBank/>
  },
  {
    id : 10,
    direct : <Belt/>
  },
  {
    id : 11,
    direct : <CustomersList/>
  },
  {
    id : 12,
    direct : <UpdatePassword type="change"/>
  },
]
export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [openList, setOpenList] = useState(false);
  const [openList1, setOpenList1] = useState(true);
  const [openList2, setOpenList2] = useState(false);
  const [openList3, setOpenList3] = useState(false);
  const [openList4, setOpenList4] = useState(false);
  const [openList5, setOpenList5] = useState(false);
  const [loading, setLoading] = useState(false)
  const { isLoggedIn, token } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width:600px)");
  const { currentData } = useSelector((state) => state.user);
  useEffect(() => {
      if (isLoggedIn && token) {
        setLoading(true);
        setTimeout(() => {
          dispatch(getCurrent());
          setLoading(false);
        }, 1000);
      } else {
        navigate("/sign-in");
      }
    }, [isLoggedIn, token, dispatch, navigate]);
  const handleClick = () => {
    setOpenList(!openList);
  };
  const handleClick1 = () => {
    setOpenList1(!openList1);
  };
  const handleClick2 = () => {
    setOpenList2(!openList2);
  };
  const handleClick3 = () => {
    setOpenList3(!openList3);
  };
  const handleClick4 = () => {
    setOpenList4(!openList4);
  };
  const handleClick5 = () => {
    setOpenList5(!openList5);
  };
  const [active, setActive] = useState(1)
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const activeContent = tabs_list_right.find((tab) => tab.id === active)?.direct;
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                
                marginRight: 5,
                
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <div className='flex items-center justify-between w-full gap-4'>
          <Typography variant="p" noWrap component="div" className="max-sm:text-sm">
            {currentData?.role} [Hậu đài]
          </Typography>
          <div className='flex items-center gap-2 cursor-pointer max-sm:text-sm' onClick={() => dispatch(logout())}>
            <p>Đăng xuất</p>
            <LogOut size={isMobile ? 15 : 20}/>
          </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader >
        <Typography
            variant="h6"
            component="span"
            sx={{
              ml: 1, // Add some margin to the left of the icon
              fontWeight: 800,
              textAlign : 'center',
              width : "100%", 
              // font : 'normal normal bold 25px/24px Roboto',
              color : "#ff1744"
            }}
          >
          TINDER
        </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton> 
        </DrawerHeader>
        <Divider />
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          // subheader={
          //   <ListSubheader component="div" id="nested-list-subheader">
          //     Nested List Items
          //   </ListSubheader>
          // }
        >
          
          <ListItemButton onClick={handleClick1} className='flex items-center gap-7'>
            <EqualizerIcon sx={{
              fontSize : isMobile && "20px"
            }}/>
            <ListItemText primary="Thống kê dữ liệu"  primaryTypographyProps={{
              fontSize : isMobile ?  "11px" : "15px"
            }}/>
            {openList1 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openList1} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 8.5 }} onClick={() => setActive(11)}>
                <ListItemText primary="Thống kê đăng ký" primaryTypographyProps={{
              fontSize : isMobile ?  "11px" : "15px"
            }}/>
              </ListItemButton>
              <ListItemButton sx={{ pl: 8.5 }} onClick={() => setActive(6)}>
              <ListItemText primary="Thống kê nạp tiền" primaryTypographyProps={{
              fontSize : isMobile ?  "11px" : "15px"
            }}/>
              </ListItemButton>
              <ListItemButton sx={{ pl: 8.5 }} onClick={() => setActive(7)}>
              <ListItemText primary="Thống kê rút tiền" primaryTypographyProps={{
              fontSize : isMobile ?  "11px" : "15px"
            }}/>
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton onClick={handleClick} className='flex items-center gap-7'>
            <AccountBalanceIcon  sx={{
              fontSize : isMobile && "18px"
            }}/>
            <ListItemText primary="Thống kê tài chính"  primaryTypographyProps={{
              fontSize : isMobile ?  "11px" : "15px"
            }}/>
            {openList ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openList} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton  sx={{ pl: 8.5 }} onClick={() => setActive(8)}>
                
                <ListItemText primary="Quản lý rút tiền" primaryTypographyProps={{
              fontSize : isMobile ?  "11px" : "15px"
            }}/>
              </ListItemButton>
              <ListItemButton sx={{ pl: 8.5 }} onClick={() => setActive(9)}>
                
                <ListItemText primary="Quản lý ngân hàng" primaryTypographyProps={{
              fontSize : isMobile ?  "11px" : "15px"
            }}/>
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton onClick={handleClick2}  className='flex items-center gap-7'>
            <PersonIcon  sx={{
              fontSize : isMobile && "20px"
            }}/>
            <ListItemText primary="Quản lý người dùng"  primaryTypographyProps={{
              fontSize : isMobile ?  "11px" : "15px"
            }}/>
            {openList2 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openList2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 8.5 }} onClick={() => setActive(5)}>
                <ListItemText primary="Quản lý thành viên" primaryTypographyProps={{
              fontSize : isMobile ?  "11px" : "15px"
            }}/>
              </ListItemButton>
              {/* <ListItemButton sx={{ pl: 8.5 }} onClick={() => setActive(4)}>
                <ListItemText primary="Starred" />
              </ListItemButton> */}
            </List>
          </Collapse>
          <ListItemButton onClick={handleClick3}  className='flex items-center gap-7'>
            <AttachMoney  sx={{
              fontSize : isMobile && "18px"
            }}/>
            <ListItemText primary="Quản lý sổ xố"  primaryTypographyProps={{
              fontSize : isMobile ?  "11px" : "15px"
            }}/>
            {openList3 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openList3} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 8.5 }} onClick={() => setActive(10)}>
                <ListItemText primary="Kết quả số xố" primaryTypographyProps={{
              fontSize : isMobile ?  "11px" : "15px"
            }}/>
              </ListItemButton>
              <ListItemButton sx={{ pl: 8.5 }} onClick={() => setActive(1)}>
                <ListItemText primary="Quản lý sảnh" primaryTypographyProps={{
              fontSize : isMobile ?  "11px" : "15px"
            }}/>
              </ListItemButton>
              {/* <ListItemButton sx={{ pl: 8.5 }} onClick={() => setActive(4)}>
                <ListItemText primary="Quản lý phòng" />
              </ListItemButton> */}
              <ListItemButton sx={{ pl: 8.5 }} onClick={() => setActive(4)}>
                <ListItemText primary="Quản lý kết quả sổ xố" primaryTypographyProps={{
              fontSize : isMobile ?  "11px" : "15px"
            }}/>
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton onClick={handleClick4}  className='flex items-center gap-7'>
            <LocalMovies  sx={{
              fontSize : isMobile && "20px"
            }}/>
            <ListItemText primary="Quản lý video"  primaryTypographyProps={{
              fontSize : isMobile ?  "11px" : "15px"
            }}/>
            {openList4 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openList4} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 8.5 }} onClick={() => setActive(2)}>
                <ListItemText primary="Quản lý video" primaryTypographyProps={{
              fontSize : isMobile ?  "11px" : "15px"
            }}/>
              </ListItemButton>
              <ListItemButton sx={{ pl: 8.5 }} onClick={() => setActive(3)}>
                <ListItemText primary="Quản lý danh mục" primaryTypographyProps={{
              fontSize : isMobile ?  "11px" : "15px"
            }}/>
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton onClick={handleClick5}  className='flex items-center gap-7'>
            <SystemSecurityUpdateGoodOutlined  sx={{
              fontSize : isMobile && "20px"
            }}/>
            <ListItemText primary="Quản lý hệ thống"  primaryTypographyProps={{
              fontSize : isMobile ?  "11px" : "15px"
            }}/>
            {openList5 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openList5} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 8.5 }} onClick={() => setActive(12)}>
                <ListItemText primary="Đổi mật khẩu" primaryTypographyProps={{
              fontSize : isMobile ?  "11px" : "15px"
            }}/>
              </ListItemButton>
              
            </List>
          </Collapse>
        </List>
        <Divider />
       
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {activeContent}
      </Box>
    </Box>
  );
}
