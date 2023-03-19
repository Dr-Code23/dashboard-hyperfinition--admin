import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
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
      <Typography variant="body1" color="initial" className=' bg-slate-500' component={'main'}>
        <Outlet />
      </Typography>
    </>
  );
}

export default Layout;
