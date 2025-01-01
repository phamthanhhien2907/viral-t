import { faBell, faCircleUser, faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

import cskh from "@/assets/cskh.png"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { AlignLeft, Globe } from 'lucide-react';
import LeftSideBar from '../LeftSideBar';
import { pathImg } from '@/lib/constant';
import { useMediaQuery } from '@mui/material';

function Topbar() {
    const [open, setOpen] = React.useState(false);
    const { currentData } = useSelector((state) => state.user); 
    const isMobile = useMediaQuery("(max-width:600px)");
   
    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };
    const DrawerList = (
        <Box sx={{ width: 250, height : "100%", overflow : "hidden" }} role="presentation" onClick={toggleDrawer(false)}>
            <LeftSideBar/>
          <Divider />
          <List>
          </List>
        </Box>
      );
    
    return (
        <nav className="flex items-center px-4">
            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                <FontAwesomeIcon icon={faBars} onClick={toggleDrawer(true)}/>
                <Drawer open={open} onClose={toggleDrawer(false)}>
                        {DrawerList}
                </Drawer>
            </button>
            <form
                className="pt-4">
                {/* {value?.length > 0 && <div className='absolute top-10 overflow-y-scroll w-full h-[750px] scrollbar-hide bg-white shadow-sm z-50'>
                    {currentData?.role === "admin" && productList?.map((product) => {
                        if(typeof product?.title === "string" && typeof value === "string" && product.title.toUpperCase().includes(value.toUpperCase())){
                            return <div className="w-full h-fit scrollbar-hide overflow-y-scroll text-gray-500 flex flex-col gap-2" key={product?._id}>
                     
                            <div className="flex items-center w-full gap-12 bg-white px-8  rounded-xl justify-center">
                              <div className="w-[80px] h-[80px] max-sm:w-[120px] max-sm:h-[150px]">
                              <img src={`${pathImage}/${product?.photos && product?.photos[0]}`} alt="" className="w-full h-full mix-blend-darken" />
                              </div>
                              <div className="flex flex-col w-[50%] py-4 px-2 max-sm:px-0 gap-2 bg-white rounded-xl">
                                  <div className="flex items-center gap-4 ">
                                      <span className="text-xl max-sm:text-xs text-[#fe5000]">${product?.price}</span>
                                     <div className="">
                                      <span className="max-sm:text-xs">Giá cũ </span>
                                      <span className="line-through max-sm:text-xs">${product?.priceOld}</span>
                                     </div>
                                  </div>
                                  <span className="max-sm:text-xs line-clamp-4">
                                    {product?.title}
                                  </span>
                               
                              </div>
                              
                            </div>
                           
                          </div>
                        }
                    })}
                      {currentData?.role === "agent" && productList?.order?.map((product) => (
                         <div className="w-full h-fit scrollbar-hide overflow-y-scroll text-gray-500 flex flex-col gap-2" key={product?._id}>
                     
                         <div className="flex items-center w-full gap-12 bg-white px-8  rounded-xl justify-center">
                           <div className="w-[80px] h-[80px] max-sm:w-[120px] max-sm:h-[150px]">
                           <img src={`${pathImage}/${product?.product?.photos && product?.product?.photos[0]}`} alt="" className="w-full h-full mix-blend-darken" />
                           </div>
                           <div className="flex flex-col w-[50%] py-4 px-2 max-sm:px-0 gap-2 bg-white rounded-xl">
                               <div className="flex items-center gap-4 ">
                                   <span className="text-xl max-sm:text-xs text-[#fe5000]">${product?.product?.price}</span>
                                  <div className="">
                                   <span className="max-sm:text-xs">Giá cả </span>
                                   <span className="line-through max-sm:text-xs">${product?.product?.priceOld}</span>
                                  </div>
                               </div>
                               <span className="max-sm:text-xs line-clamp-4">
                                 {product?.product?.title}
                               </span>
                            
                           </div>
                           
                         </div>
                        
                       </div>
                    ))}
                </div>} */}
                <div className="input-group flex items-center gap-6">
                    <img src={cskh} alt="cskh" className='w-7 h-7 cursor-pointer' />
                    {/* <input value={value} onChange={onChangeValue} type="text" className="form-control bg-light border-0 small" placeholder="Search for..." 
                        aria-label="Search" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div> */}
                </div>
            </form>

            {/* <!-- Topbar Navbar --> */}
            <ul className="navbar-nav ml-auto">

                {/* <li className="nav-item dropdown no-arrow d-sm-none">
                    <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <FontAwesomeIcon icon={faSearch} />
                    </a>
                    <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                        aria-labelledby="searchDropdown">
                        <form className="form-inline mr-auto w-100 navbar-search">
                            <div className="input-group">
                                <input type="text" className="form-control bg-light border-0 small"
                                    placeholder="Search for..." aria-label="Search"
                                    aria-describedby="basic-addon2" />
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="button">
                                        <i className="fas fa-search fa-sm"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </li> */}

                <li className="flex items-center">
                    <div className='flex flex-col gap-1'>
                        <span className='mr-2 text-[12px] d-lg-inline text-gray-600'>
                            {currentData?.role === "agent" ? "Người bán hàng" : "Quản trị"}
                        </span>
                    </div>
                    <Link className="nav-link dropdown-toggle " to="/" id="userDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {currentData?.avatar ?  <img src={`${pathImg}/images/${currentData?.avatar}`} className='w-12 h-12 max-sm:w-8 max-sm:h-8 rounded-full' alt="" /> :  <FontAwesomeIcon icon={faCircleUser} size={isMobile ? "1x" : "xl"} />}
                    </Link>
                    
                </li>

            </ul>

        </nav>
    )
}

export default Topbar