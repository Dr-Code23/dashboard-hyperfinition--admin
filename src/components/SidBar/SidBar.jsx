import React, { useMemo, } from 'react';
import "./SidBar.css"
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { NavLink, } from 'react-router-dom';
import { AccountCircle, AccountTree, Apartment, Attribution, BrandingWatermark, Category, CellTowerOutlined, ContactPhone, DesignServices, Explore, FiberManualRecord, InfoOutlined, KeyboardDoubleArrowLeft, Paid, Person, ProductionQuantityLimits, SpeedOutlined, } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import ImgLogo from "../../assets/Img/logo.png"
const SidBar = ({ drawerWidth, container, mobileOpen, handleDrawerToggle, i18n, setMobileOpen }) => {
  let drawer = useMemo(() => {
    return (
      <>
        <Toolbar sx={{ display: 'flex ', justifyContent: 'center' }} className=" ">
          <img className=' max-h-[120px]  w-fit ' src={ImgLogo} alt="img-logo" />
          <Typography variant="body1" color="initial" sx={{ display: { sm: 'none' } }} className=' !absolute top-5 right-0 ' component={'div'} >
            <IconButton variant="contained" color="primary" className=' ' onClick={(e) => {
              setMobileOpen(false)
            }} >
              <KeyboardDoubleArrowLeft sx={{ color: '#fff' }} />
            </IconButton>
          </Typography>

        </Toolbar>
        <Divider />
        <List dir='ltr' >
          {/* <NavLink to={'/admin/shop'} className='w-full  text-decoration-none'>
            </NavLink> */}
          {/* =========================Dashboard======================== */}

          <ListItem disablePadding   >
            <NavLink to={'/admin/'} className={({ isActive }) =>
              isActive ? "w-full  text-decoration-none sidebar-list active" : "w-full   text-decoration-none sidebar-list"
            }>
              <ListItemButton sx={{ color: '#fff' }}  >
                <ListItemIcon >
                  <InboxIcon sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText className=' !capitalize' primary={'Dash'} />
              </ListItemButton>
            </NavLink>

          </ListItem>
          {/* ========================= Shop======================== */}

          <ListItem disablePadding   >

            <NavLink to={'/admin/shop'} className={({ isActive }) =>
              isActive ? "w-full  text-decoration-none sidebar-list active" : "w-full   text-decoration-none sidebar-list"
            }>
              <ListItemButton sx={{ color: '#fff' }} >
                <ListItemIcon>
                  <AddShoppingCartIcon sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText className=' !capitalize' primary={'My Shop'} />
              </ListItemButton>
            </NavLink>

          </ListItem>
          {/* ======================== Brand========================= */}
          <ListItem disablePadding   >
            <NavLink to={'/admin/brand'} className={({ isActive }) =>
              isActive ? "w-full  text-decoration-none sidebar-list active" : "w-full   text-decoration-none sidebar-list"
            }>
              <ListItemButton sx={{ color: '#fff' }} >
                <ListItemIcon>
                  <BrandingWatermark sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText className=' !capitalize' primary={'Brand'} />
              </ListItemButton>
            </NavLink>
          </ListItem>
          {/* ========================attributes================================ */}

          <ListItem disablePadding   >
            <NavLink to={'/admin/attributes'} className={({ isActive }) =>
              isActive ? "w-full  text-decoration-none sidebar-list active" : "w-full   text-decoration-none sidebar-list"
            }>
              <ListItemButton sx={{ color: '#fff' }} >
                <ListItemIcon>
                  <Attribution sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText className=' !capitalize' primary={'attributes'} className=' capitalize' />
              </ListItemButton>
            </NavLink>
          </ListItem>
          {/* ========================units================================ */}

          <ListItem disablePadding   >
            <NavLink to={'/admin/units'} className={({ isActive }) =>
              isActive ? "w-full  text-decoration-none sidebar-list active" : "w-full   text-decoration-none sidebar-list"
            }>
              <ListItemButton sx={{ color: '#fff' }} >
                <ListItemIcon>
                  <Apartment sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText className=' !capitalize' primary={'units'} className=' capitalize' />
              </ListItemButton>
            </NavLink>
          </ListItem>
          {/* ========================Users================================ */}

          <ListItem disablePadding   >
            <NavLink to={'/admin/users'} className={({ isActive }) =>
              isActive ? "w-full  text-decoration-none sidebar-list active" : "w-full   text-decoration-none sidebar-list"
            }>
              <ListItemButton sx={{ color: '#fff' }} >
                <ListItemIcon>
                  <Person sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText className=' !capitalize' primary={'Users'} className=' capitalize' />
              </ListItemButton>
            </NavLink>
          </ListItem>
          {/* ========================categories================================ */}

          <ListItem disablePadding   >
            <NavLink to={'/admin/categories'} className={({ isActive }) =>
              isActive ? "w-full  text-decoration-none sidebar-categories-list active" : "w-full   text-decoration-none sidebar-categories-list"
            }>
              <ListItemButton sx={{ color: '#fff' }} >
                <ListItemIcon>
                  <Category sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText className=' !capitalize' primary={'categories'} className=' capitalize' />
              </ListItemButton>
              <div className={`list pl-[10px]`}>

                {/* =================================== */}
                <NavLink to={'/admin/categories/sub'} className='w-full  text-decoration-none'>
                  <ListItemButton sx={{ color: '#fff' }} >
                    <ListItemIcon className='!min-w-[20px]  ' >
                      <FiberManualRecord sx={{ color: '#fff', fontSize: '13px' }} />
                    </ListItemIcon>
                    <ListItemText className=' !capitalize' className=' capitalize '>
                      <span className=' text-[13px]'>
                        sub categories
                      </span>
                    </ListItemText>
                  </ListItemButton>
                </NavLink>
                {/* =================================== */}
                <NavLink to={'/admin/categories/sub_sub'} className='w-full  text-decoration-none'>
                  <ListItemButton sx={{ color: '#fff' }} >
                    <ListItemIcon className='!min-w-[20px]  ' >
                      <FiberManualRecord sx={{ color: '#fff', fontSize: '13px' }} />
                    </ListItemIcon>
                    <ListItemText className=' !capitalize' className=' capitalize '>
                      <span className=' text-[13px]'>
                        sub sub categories
                      </span>
                    </ListItemText>
                  </ListItemButton>
                </NavLink>
              </div>
            </NavLink>
          </ListItem>
          {/* ========================== Products============================= */}
          <ListItem disablePadding   >
            <NavLink to={'/admin/product'} className={({ isActive }) =>
              isActive ? "w-full  text-decoration-none sidebar-list active" : "w-full   text-decoration-none sidebar-list"
            }>
              <ListItemButton sx={{ color: '#fff' }} >
                <ListItemIcon>
                  <ProductionQuantityLimits sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText className=' !capitalize' primary={'product'} className=' capitalize' />
              </ListItemButton>
            </NavLink>
          </ListItem>
          {/* ========================Services================================ */}
          <ListItem disablePadding   >
            <NavLink to={'/admin/services'} className={({ isActive }) =>
              isActive ? "w-full  text-decoration-none sidebar-list active" : "w-full   text-decoration-none sidebar-list"
            }>
              <ListItemButton sx={{ color: '#fff' }} >
                <ListItemIcon >
                  <DesignServices sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText className=' !capitalize' primary={'Services'} />
              </ListItemButton>
            </NavLink>
            {/* ================================================= */}
          </ListItem>
          {/* ========================project================================ */}
          <ListItem disablePadding   >
            <NavLink to={'/admin/project'} className={({ isActive }) =>
              isActive ? "w-full  text-decoration-none sidebar-list active" : "w-full   text-decoration-none sidebar-list"
            }>
              <ListItemButton sx={{ color: '#fff' }} >
                <ListItemIcon >
                  <AccountTree sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText className=' !capitalize' primary={'project'} />
              </ListItemButton>
            </NavLink>
            {/* ================================================= */}
          </ListItem>
          {/* ========================projectPayment================================ */}
          <ListItem disablePadding   >
            <NavLink to={'/admin/projectPayment'} className={({ isActive }) =>
              isActive ? "w-full  text-decoration-none sidebar-list active" : "w-full   text-decoration-none sidebar-list"
            }>
              <ListItemButton sx={{ color: '#fff' }} >
                <ListItemIcon >
                  <Paid sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText className=' !capitalize' primary={'project Payment'} />
              </ListItemButton>
            </NavLink>
            {/* ================================================= */}
          </ListItem>
          {/* ========================generalExpenses================================ */}
          <ListItem disablePadding   >
            <NavLink to={'/admin/generalExpenses'} className={({ isActive }) =>
              isActive ? "w-full  text-decoration-none sidebar-list active" : "w-full   text-decoration-none sidebar-list"
            }>
              <ListItemButton sx={{ color: '#fff' }} >
                <ListItemIcon  >
                  <CellTowerOutlined sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText className=' !capitalize' primary={'General Expenses'} />
              </ListItemButton>
            </NavLink>
          </ListItem>
          {/* ========================componyExpenses================================ */}
          <ListItem disablePadding   >
            <NavLink to={'/admin/projectExpense'} className={({ isActive }) =>
              isActive ? "w-full  text-decoration-none sidebar-list active" : "w-full   text-decoration-none sidebar-list"
            }>
              <ListItemButton sx={{ color: '#fff' }} >
                <ListItemIcon  >
                  <Explore sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText className=' !capitalize' primary={'project Expenses'} />
              </ListItemButton>
            </NavLink>
          </ListItem>
          {/* ========================profile================================ */}
          <ListItem disablePadding   >
            <NavLink to={'/admin/profile'} className={({ isActive }) =>
              isActive ? "w-full  text-decoration-none sidebar-list active" : "w-full   text-decoration-none sidebar-list"
            }>
              <ListItemButton sx={{ color: '#fff' }} >
                <ListItemIcon  >
                  <AccountCircle sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText className=' !capitalize' primary={'profile'} />
              </ListItemButton>
            </NavLink>
          </ListItem>
          {/* ========================contact================================ */}
          <ListItem disablePadding   >
            <NavLink to={'/admin/contact'} className={({ isActive }) =>
              isActive ? "w-full  text-decoration-none sidebar-list active" : "w-full   text-decoration-none sidebar-list"
            }>
              <ListItemButton sx={{ color: '#fff' }} >
                <ListItemIcon  >
                  <ContactPhone sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText className=' !capitalize' primary={'contact'} />
              </ListItemButton>
            </NavLink>
          </ListItem>
          {/* ========================about================================ */}
          <ListItem disablePadding   >
            <NavLink to={'/admin/about'} className={({ isActive }) =>
              isActive ? "w-full  text-decoration-none sidebar-list active" : "w-full   text-decoration-none sidebar-list"
            }>
              <ListItemButton sx={{ color: '#fff' }} >
                <ListItemIcon  >
                  <InfoOutlined sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText className=' !capitalize' primary={'about'} />
              </ListItemButton>
            </NavLink>
          </ListItem>
          {/* ========================about================================ */}
          <ListItem disablePadding   >
            <NavLink to={'/admin/roles'} className={({ isActive }) =>
              isActive ? "w-full  text-decoration-none sidebar-list active" : "w-full   text-decoration-none sidebar-list"
            }>
              <ListItemButton sx={{ color: '#fff' }} >
                <ListItemIcon  >
                  <SpeedOutlined sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText className=' !capitalize' primary={'roles'} />
              </ListItemButton>
            </NavLink>
          </ListItem>
          {/* ======================================================== */}

        </List>
        {/* <Divider /> */}
      </>
    );

  }, []);

  return (
    <>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
        className='sidbar'
      >

        {/*  drawer in responsive */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box', paddingX: '15px', width: drawerWidth, backgroundColor: '#031d54', right: i18n.language === 'ar' && '0', left: i18n.language === 'ar' ? 'auto' : '0'
            },
          }}

        >
          {/* <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton variant="contained" color="primary" onClick={handleDrawerToggle}>
              <KeyboardDoubleArrowLeft sx={{ color: '#fff' }} />
            </IconButton>
          </Toolbar> */}
          {drawer}
        </Drawer>
        {/*  drawer in dk */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box', width: drawerWidth, paddingX: '15px', backgroundColor: '#031d54', left: i18n.language === 'ar' ? 'auto' : '0'
            },
          }}


        >

          {drawer}
        </Drawer>
      </Box>
    </>
  );
}

export default SidBar;
