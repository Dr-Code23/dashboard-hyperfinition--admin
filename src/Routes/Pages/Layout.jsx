import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/SidebarBox/Sidebar';
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next';
const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  let { t, i18n } = useTranslation()

  // useEffect(() => {
  //   document.querySelector('html').style.scrollBehavior = 'auto'
  //   window.scroll({ top: 0 })
  //   document.querySelector('html').style.scrollBehavior = ''
  // }, [location.pathname]); // triggered on route change




  return (
    <>
      <div className="flex h-screen overflow-hidden " style={{ direction: i18n.language === 'ar' ? "rtl" : 'ltr' }}>

        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} i18n={i18n} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} i18n={i18n} setSidebarOpen={setSidebarOpen} />

          <Typography variant="body1" color="initial" className=' w-full h-full' component={'main'}>

            <Outlet />


          </Typography>



        </div>
      </div>
    </>
  );
}

export default Layout;
