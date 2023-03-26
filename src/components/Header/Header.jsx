import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import React, { useCallback } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
const Header = ({ drawerWidth, handleDrawerToggle, i18n }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  let Navigate = useNavigate();

  const handleOpenUserMenu = useCallback((event) => {
    setAnchorElUser(event.currentTarget);
  }, []);
  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);
  const handleLogOut = useCallback(() => {
    localStorage.removeItem("AccessToken");
    Navigate("/");
  }, [Navigate]);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mr: i18n.language === "ar" && { sm: `${drawerWidth}px` },
          ml: i18n.language !== "ar" && { sm: `${drawerWidth}px` },
        }}
        className="header"
      >
        <div className="container">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon sx={{ color: "#000" }} />
            </IconButton>
          </Toolbar>

          <Box className="box-left">
            {i18n.language === "ar" ? (
              <Button
                variant="contained"
                color="primary"
                sx={{
                  width: "35px",
                  height: "35px",
                  minWidth: "35px",
                }}
                className=" !rounded-full  !bg-slate-400 !ml-2"
                onClick={() => {
                  i18n.changeLanguage("en");
                }}
              >
                en
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{
                  width: "35px",
                  height: "35px",
                  minWidth: "35px",
                }}
                className="!rounded-full !bg-slate-400 !mr-2"
                onClick={() => {
                  i18n.changeLanguage("ar");
                }}
              >
                ar
              </Button>
            )}


            <IconButton
              onClick={handleOpenUserMenu}
              sx={{ p: 0 }}
            >
              <Avatar
                alt="Remy Sharp"
                src="https://mui.com/static/images/avatar/2.jpg"
              />
            </IconButton>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                  Account
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography
                  textAlign="center"
                  onClick={handleLogOut}
                >
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </div>
      </AppBar>
    </>
  );
};

export default Header;
