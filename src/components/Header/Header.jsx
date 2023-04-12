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
import { useTranslation } from "react-i18next";
import EnImg from "../../assets/Img/en.jpg";
import ArImg from "../../assets/Img/ar.jpg";
import FrImg from "../../assets/Img/fr.jpg";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const Header = ({ drawerWidth, handleDrawerToggle }) => {
    let { t, i18n } = useTranslation();
    let Navigate = useNavigate();

    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [userImg, setUserImg] = React.useState(
        localStorage.getItem("avatar")
    );
    const [languageTarget, setLanguageTarget] = React.useState(null);
    const [imgTarget, setImgTarget] = React.useState(
        localStorage.getItem("language") === "en"
            ? EnImg
            : localStorage.getItem("language") === "ar"
            ? ArImg
            : localStorage.getItem("language") === "fr"
            ? FrImg
            : EnImg
    );
    const handleLogOut = useCallback(() => {
        localStorage.removeItem("AccessToken");
        Navigate("/");
    }, [Navigate]);
    let { avatar } = useSelector((state) => state.ProfileReducer);
    useEffect(() => {
        if (avatar) {
            setUserImg(avatar);
            localStorage.setItem("avatar", avatar);
        }
    }, [avatar]);

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
                        <>
                            <IconButton
                                onClick={(event) => {
                                    setLanguageTarget(event.currentTarget);
                                }}
                                sx={{ p: 0 }}
                                className="img-shadow"
                            >
                                <Avatar alt="Remy Sharp" src={imgTarget} />
                            </IconButton>

                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={languageTarget}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(languageTarget)}
                                onClose={(e) => {
                                    setLanguageTarget(null);
                                }}
                            >
                                <MenuItem
                                    onClick={(e) => {
                                        setLanguageTarget(null);
                                    }}
                                    className=" w-full !min-w-[180px] "
                                >
                                    <Typography
                                        textAlign="center "
                                        className=" w-full flex justify-start items-center gap-[8px]"
                                        onClick={() => {
                                            setImgTarget(EnImg);
                                            i18n.changeLanguage("en");
                                            localStorage.setItem(
                                                "language",
                                                "en"
                                            );
                                        }}
                                    >
                                        <img
                                            src={EnImg}
                                            alt=""
                                            className=" w-[35px] h-[20px]"
                                        />
                                        {t("Language.English")}
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={(e) => {
                                        setLanguageTarget(null);
                                    }}
                                    className=" w-full !min-w-[180px] "
                                >
                                    <Typography
                                        textAlign="center "
                                        className=" w-full flex justify-start items-center gap-[8px]"
                                        onClick={() => {
                                            setImgTarget(ArImg);
                                            i18n.changeLanguage("ar");
                                            localStorage.setItem(
                                                "language",
                                                "ar"
                                            );
                                        }}
                                    >
                                        <img
                                            src={ArImg}
                                            alt=""
                                            className=" w-[35px] h-[20px]"
                                        />
                                        {t("Language.Arabic")}
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={(e) => {
                                        setLanguageTarget(null);
                                    }}
                                    className=" w-full !min-w-[180px] "
                                >
                                    <Typography
                                        textAlign="center "
                                        className=" w-full flex justify-start items-center gap-[8px]"
                                        onClick={() => {
                                            setImgTarget(FrImg);
                                            i18n.changeLanguage("fr");
                                            localStorage.setItem(
                                                "language",
                                                "fr"
                                            );
                                        }}
                                    >
                                        <img
                                            src={FrImg}
                                            alt=""
                                            className=" w-[35px] h-[20px]"
                                        />
                                        {t("Language.French")}
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </>
                        <>
                            <IconButton
                                onClick={(event) => {
                                    setAnchorElUser(event.currentTarget);
                                }}
                                sx={{ p: 0 }}
                            >
                                <Avatar alt="Remy Sharp" src={userImg} />
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
                                onClose={(e) => {
                                    setAnchorElUser(null);
                                }}
                            >
                                <MenuItem
                                    onClick={(e) => {
                                        setAnchorElUser(null);
                                    }}
                                    className=" w-full !min-w-[100px] "
                                >
                                    <Typography
                                        textAlign="center"
                                        className=" w-full"
                                        onClick={() => {
                                            Navigate("/admin/profile");
                                        }}
                                    >
                                        {t("sidBar.profile")}
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={(e) => {
                                        setAnchorElUser(null);
                                    }}
                                    className=" w-full !min-w-[100px] "
                                >
                                    <Typography
                                        textAlign="center"
                                        className=" w-full"
                                        onClick={() => {
                                            Navigate("/admin/settings");
                                        }}
                                    >
                                        {t("sidBar.settings")}
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={(e) => {
                                        setAnchorElUser(null);
                                    }}
                                    className=" w-full !min-w-[100px] "
                                >
                                    <Typography
                                        textAlign="center"
                                        className=" w-full"
                                        onClick={handleLogOut}
                                    >
                                        {t("sidBar.Logout")}
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </>
                    </Box>
                </div>
            </AppBar>
        </>
    );
};

export default Header;
