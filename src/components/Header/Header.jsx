import {AppBar, Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Typography,} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import React, {useCallback, useEffect} from "react";
import "./Header.css";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {LogoutThunk} from "../../RTK/Thunk/LogoutThunk";
import {allLanguagesAsArray, allLanguagesAsObject, getCurrentUserLanguage} from "../../config/language"

const Header = ({drawerWidth, handleDrawerToggle}) => {
    let {t, i18n} = useTranslation();
    let Navigate = useNavigate();
    let dispatch = useDispatch();

    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [userImg, setUserImg] = React.useState(
        localStorage.getItem("avatar")
    );
    const [languageTarget, setLanguageTarget] = React.useState(null);
    const [imgTarget, setImgTarget] = React.useState(
        allLanguagesAsObject[getCurrentUserLanguage()].image
    );

    const handleLogOut = useCallback(() => {

        dispatch(LogoutThunk()).unwrap()
            .then((data) => {
                localStorage.clear();
                Navigate("/");
            })
            .catch((error) => {
                // //console.log(error);
                // handle error here
            });

    }, [Navigate, dispatch]);
    let {avatar} = useSelector((state) => state.ProfileReducer);
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
                    width: {sm: `calc(100% - ${drawerWidth}px)`},
                    mr: i18n.language === "ar" && {sm: `${drawerWidth}px`},
                    ml: i18n.language !== "ar" && {sm: `${drawerWidth}px`},
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
                            sx={{mr: 2, display: {sm: "none"}}}
                        >
                            <MenuIcon sx={{color: "#000"}}/>
                        </IconButton>
                    </Toolbar>

                    <Box className="box-left">
                        <>
                            <IconButton
                                onClick={(event) => {
                                    setLanguageTarget(event.currentTarget);
                                }}
                                sx={{p: 0}}
                                className="img-shadow"
                            >
                                <Avatar alt="Remy Sharp" src={imgTarget}/>
                            </IconButton>

                            <Menu
                                sx={{mt: "45px"}}
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
                                {
                                    allLanguagesAsArray.map(function (language): React.ReactNode {
                                        return (
                                            <MenuItem
                                                onClick={() => {
                                                    setLanguageTarget(null);
                                                }}
                                                className=" w-full !min-w-[180px] "
                                                key={language}
                                            >
                                                <Typography
                                                    textAlign="center "
                                                    className=" w-full flex justify-start items-center gap-[8px]"
                                                    onClick={() => {
                                                        setImgTarget(allLanguagesAsObject[language].image);
                                                        i18n.changeLanguage(language);
                                                        localStorage.setItem(
                                                            "language",
                                                            language
                                                        );
                                                    }}
                                                >
                                                    <img
                                                        src={allLanguagesAsObject[language].image}
                                                        alt=""
                                                        className=" w-[35px] h-[20px]"
                                                    />
                                                    {t("Language." + allLanguagesAsObject[language].translatedWord)}
                                                </Typography>
                                            </MenuItem>)
                                    })
                                }
                            </Menu>
                        </>
                        <>
                            <IconButton
                                onClick={(event) => {
                                    setAnchorElUser(event.currentTarget);
                                }}
                                sx={{p: 0}}
                            >
                                <Avatar alt="Remy Sharp" src={userImg}/>
                            </IconButton>

                            <Menu
                                sx={{mt: "45px"}}
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
