
import {
    AcUnit,
    AccountCircle,
    AccountTree,
    Apartment,
    Attribution,
    BrandingWatermark,
    Category,
    CellTowerOutlined,
    ContactPhone,
    DesignServices,
    Explore,
    FiberManualRecord,
    InfoOutlined,
    KeyboardDoubleArrowLeft,
    Paid,
    Person,
    ProductionQuantityLimits,
    SettingsOutlined,
    SpeedOutlined,
} from "@mui/icons-material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import hasPermission from "../../HooK/functions.js";
import "./SidBar.css";

const SidBar = ({
    drawerWidth,
    container,
    mobileOpen,
    handleDrawerToggle,

    setMobileOpen,
}) => {
    let { t, i18n } = useTranslation();

    let drawer = useMemo(() => {
        return (
            <>
                <Toolbar
                    sx={{ display: "flex ", justifyContent: "center" }}
                    className=" !min-h-[120px]"
                >
                    {/* <img className=' max-h-[120px]  w-fit ' src={ImgLogo} alt="img-logo" /> */}
                    <span className=" w-full  h-full flex text-center  justify-center items-stretch ">
                        <img
                            className=" max-h-[100px]  w-fit object-contain "
                            src={localStorage.getItem("logo_dh")}
                            alt="img-logo"
                        />
                    </span>
                    <Typography
                        variant="body1"
                        color="initial"
                        sx={{ display: { sm: "none" } }}
                        className=" !absolute top-5 right-0 "
                        component={"div"}
                    >
                        <IconButton
                            variant="contained"
                            color="primary"
                            className=" "
                            onClick={(e) => {
                                setMobileOpen(false);
                            }}
                        >
                            <KeyboardDoubleArrowLeft sx={{ color: "#fff" }} />
                        </IconButton>
                    </Typography>
                </Toolbar>
                <Divider />
                <List>
                    {/* =========================Dashboard======================== */}
                    <ListItem disablePadding>
                        <NavLink
                            to={"/admin/"}
                            className={({ isActive }) =>
                                isActive
                                    ? "w-full  text-decoration-none sidebar-list active"
                                    : "w-full   text-decoration-none sidebar-list"
                            }
                        >
                            <ListItemButton sx={{ color: "#fff" }}>
                                <ListItemIcon>
                                    <InboxIcon sx={{ color: "#fff" }} />
                                </ListItemIcon>
                                <ListItemText
                                    className=" !capitalize !text-start"
                                    primary={t("sidBar.DashBoard")}
                                />
                            </ListItemButton>
                        </NavLink>
                    </ListItem>

                    {/* ======================== Brand========================= */}
                    {hasPermission("brand_management") ? (
                        <ListItem disablePadding>
                            <NavLink
                                to={"/admin/brand"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "w-full  text-decoration-none sidebar-list active"
                                        : "w-full   text-decoration-none sidebar-list"
                                }
                            >
                                <ListItemButton sx={{ color: "#fff" }}>
                                    <ListItemIcon>
                                        <BrandingWatermark
                                            sx={{ color: "#fff" }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        className=" !capitalize !text-start"
                                        primary={t("sidBar.Brand")}
                                    />
                                </ListItemButton>
                            </NavLink>
                        </ListItem>
                    ) : (
                        ""
                    )}

                    {/* ========================attributes================================ */}

                    {hasPermission("attribute_management") ? (
                        <ListItem disablePadding>
                            <NavLink
                                to={"/admin/attributes"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "w-full  text-decoration-none sidebar-list active"
                                        : "w-full   text-decoration-none sidebar-list"
                                }
                            >
                                <ListItemButton sx={{ color: "#fff" }}>
                                    <ListItemIcon>
                                        <Attribution sx={{ color: "#fff" }} />
                                    </ListItemIcon>
                                    <ListItemText
                                        className=" !capitalize !text-start"
                                        primary={t("sidBar.attributes")}
                                    />
                                </ListItemButton>
                            </NavLink>
                        </ListItem>
                    ) : (
                        ""
                    )}

                    {/* ========================units================================ */}
                    {hasPermission("unit_management") ? (
                        <ListItem disablePadding>
                            <NavLink
                                to={"/admin/units"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "w-full  text-decoration-none sidebar-list active"
                                        : "w-full   text-decoration-none sidebar-list"
                                }
                            >
                                <ListItemButton sx={{ color: "#fff" }}>
                                    <ListItemIcon>
                                        <Apartment sx={{ color: "#fff" }} />
                                    </ListItemIcon>
                                    <ListItemText
                                        className=" !capitalize !text-start"
                                        primary={t("sidBar.units")}
                                    />
                                </ListItemButton>
                            </NavLink>
                        </ListItem>
                    ) : (
                        ""
                    )}

                    {/* ========================Users================================ */}
                    {hasPermission("user_management") ? (
                        <ListItem disablePadding>
                            <NavLink
                                to={"/admin/users"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "w-full  text-decoration-none sidebar-list active"
                                        : "w-full   text-decoration-none sidebar-list"
                                }
                            >
                                <ListItemButton sx={{ color: "#fff" }}>
                                    <ListItemIcon>
                                        <Person sx={{ color: "#fff" }} />
                                    </ListItemIcon>
                                    <ListItemText
                                        className=" !capitalize !text-start"
                                        primary={t("sidBar.Users")}
                                    />
                                </ListItemButton>
                            </NavLink>
                        </ListItem>
                    ) : (
                        ""
                    )}

                    {/* ========================categories================================ */}
                    {hasPermission("category_management") ? (
                        <ListItem disablePadding>
                            <NavLink
                                to={"/admin/categories"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "w-full  text-decoration-none sidebar-categories-list active"
                                        : "w-full   text-decoration-none sidebar-categories-list"
                                }
                            >
                                <ListItemButton sx={{ color: "#fff" }}>
                                    <ListItemIcon>
                                        <Category sx={{ color: "#fff" }} />
                                    </ListItemIcon>
                                    <ListItemText
                                        className=" !capitalize !text-start"
                                        primary={t("sidBar.categories")}
                                    />
                                </ListItemButton>
                                <div className={`list pl-[10px]`}>
                                    {/* =================================== */}
                                    <NavLink
                                        to={"/admin/categories/sub"}
                                        className="w-full  text-decoration-none"
                                    >
                                        <ListItemButton sx={{ color: "#fff" }}>
                                            <ListItemIcon className="!min-w-[20px]  ">
                                                <FiberManualRecord
                                                    sx={{
                                                        color: "#fff",
                                                        fontSize: "13px",
                                                    }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText className=" !capitalize !text-start">
                                                <span className=" text-[13px]">
                                                    {t("sidBar.sub_categories")}
                                                </span>
                                            </ListItemText>
                                        </ListItemButton>
                                    </NavLink>
                                    {/* =================================== */}
                                    <NavLink
                                        to={"/admin/categories/sub_sub"}
                                        className="w-full  text-decoration-none"
                                    >
                                        <ListItemButton sx={{ color: "#fff" }}>
                                            <ListItemIcon className="!min-w-[20px]  ">
                                                <FiberManualRecord
                                                    sx={{
                                                        color: "#fff",
                                                        fontSize: "13px",
                                                    }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText className=" !capitalize !text-start">
                                                <span className=" text-[13px]">
                                                    {t(
                                                        "sidBar.sub_Sub_categories"
                                                    )}
                                                </span>
                                            </ListItemText>
                                        </ListItemButton>
                                    </NavLink>
                                </div>
                            </NavLink>
                        </ListItem>
                    ) : (
                        ""
                    )}

                    {/* ========================== Products============================= */}
                    {hasPermission("product_management") ? (
                        <ListItem disablePadding>
                            <NavLink
                                to={"/admin/product"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "w-full  text-decoration-none sidebar-list active"
                                        : "w-full   text-decoration-none sidebar-list"
                                }
                            >
                                <ListItemButton sx={{ color: "#fff" }}>
                                    <ListItemIcon>
                                        <ProductionQuantityLimits
                                            sx={{ color: "#fff" }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        className=" !capitalize !text-start"
                                        primary={t("sidBar.product")}
                                    />
                                </ListItemButton>
                            </NavLink>
                        </ListItem>
                    ) : (
                        ""
                    )}
                    {/* ========================Services================================ */}
                    {hasPermission("service_management") ? (
                        <ListItem disablePadding>
                            <NavLink
                                to={"/admin/services"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "w-full  text-decoration-none sidebar-list active"
                                        : "w-full   text-decoration-none sidebar-list"
                                }
                            >
                                <ListItemButton sx={{ color: "#fff" }}>
                                    <ListItemIcon>
                                        <DesignServices
                                            sx={{ color: "#fff" }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        className=" !capitalize !text-start"
                                        primary={t("sidBar.Services")}
                                    />
                                </ListItemButton>
                            </NavLink>
                            {/* ================================================= */}
                        </ListItem>
                    ) : (
                        ""
                    )}

                    {/* ========================project================================ */}
                    {hasPermission("project_management") ? (
                        <ListItem disablePadding>
                            <NavLink
                                to={"/admin/project"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "w-full  text-decoration-none sidebar-list active"
                                        : "w-full   text-decoration-none sidebar-list"
                                }
                            >
                                <ListItemButton sx={{ color: "#fff" }}>
                                    <ListItemIcon>
                                        <AccountTree sx={{ color: "#fff" }} />
                                    </ListItemIcon>
                                    <ListItemText
                                        className=" !capitalize !text-start"
                                        primary={t("sidBar.project")}
                                    />
                                </ListItemButton>
                            </NavLink>
                            {/* ================================================= */}
                        </ListItem>
                    ) : (
                        ""
                    )}

                    {/* ========================projectPayment================================ */}
                    {hasPermission("project_payment_management") ? (
                        <ListItem disablePadding>
                            <NavLink
                                to={"/admin/projectPayment"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "w-full  text-decoration-none sidebar-list active"
                                        : "w-full   text-decoration-none sidebar-list"
                                }
                            >
                                <ListItemButton sx={{ color: "#fff" }}>
                                    <ListItemIcon>
                                        <Paid sx={{ color: "#fff" }} />
                                    </ListItemIcon>
                                    <ListItemText
                                        className=" !capitalize !text-start"
                                        primary={t("sidBar.project_Payment")}
                                    />
                                </ListItemButton>
                            </NavLink>
                            {/* ================================================= */}
                        </ListItem>
                    ) : (
                        ""
                    )}

                    {/* ========================generalExpenses================================ */}
                    {hasPermission("project_expenses_management") ? (
                        <ListItem disablePadding>
                            <NavLink
                                to={"/admin/generalExpenses"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "w-full  text-decoration-none sidebar-list active"
                                        : "w-full   text-decoration-none sidebar-list"
                                }
                            >
                                <ListItemButton sx={{ color: "#fff" }}>
                                    <ListItemIcon>
                                        <CellTowerOutlined
                                            sx={{ color: "#fff" }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        className=" !capitalize !text-start"
                                        primary={t("sidBar.General_Expenses")}
                                    />
                                </ListItemButton>
                            </NavLink>
                        </ListItem>
                    ) : (
                        ""
                    )}

                    {/* ========================companyExpenses================================ */}
                    {hasPermission("general_expenses_management") ? (
                        <ListItem disablePadding>
                            <NavLink
                                to={"/admin/projectExpense"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "w-full  text-decoration-none sidebar-list active"
                                        : "w-full   text-decoration-none sidebar-list"
                                }
                            >
                                <ListItemButton sx={{ color: "#fff" }}>
                                    <ListItemIcon>
                                        <Explore sx={{ color: "#fff" }} />
                                    </ListItemIcon>
                                    <ListItemText
                                        className=" !capitalize !text-start"
                                        primary={t("sidBar.project_Expenses")}
                                    />
                                </ListItemButton>
                            </NavLink>
                        </ListItem>
                    ) : (
                        ""
                    )}

                    {/* ========================profile================================ */}
                    <ListItem disablePadding>
                        <NavLink
                            to={"/admin/profile"}
                            className={({ isActive }) =>
                                isActive
                                    ? "w-full  text-decoration-none sidebar-list active"
                                    : "w-full   text-decoration-none sidebar-list"
                            }
                        >
                            <ListItemButton sx={{ color: "#fff" }}>
                                <ListItemIcon>
                                    <AccountCircle sx={{ color: "#fff" }} />
                                </ListItemIcon>
                                <ListItemText
                                    className=" !capitalize !text-start"
                                    primary={t("sidBar.profile")}
                                />
                            </ListItemButton>
                        </NavLink>
                    </ListItem>

                    {/* ========================contact================================ */}
                    {hasPermission("contact_us_management") ? (
                        <ListItem disablePadding>
                            <NavLink
                                to={"/admin/contact"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "w-full  text-decoration-none sidebar-list active"
                                        : "w-full   text-decoration-none sidebar-list"
                                }
                            >
                                <ListItemButton sx={{ color: "#fff" }}>
                                    <ListItemIcon>
                                        <ContactPhone sx={{ color: "#fff" }} />
                                    </ListItemIcon>
                                    <ListItemText
                                        className=" !capitalize !text-start"
                                        primary={t("sidBar.contact")}
                                    />
                                </ListItemButton>
                            </NavLink>
                        </ListItem>
                    ) : (
                        ""
                    )}

                    {/* ========================about================================ */}
                    {hasPermission("about_us_management") ? (
                        <ListItem disablePadding>
                            <NavLink
                                to={"/admin/about"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "w-full  text-decoration-none sidebar-list active"
                                        : "w-full   text-decoration-none sidebar-list"
                                }
                            >
                                <ListItemButton sx={{ color: "#fff" }}>
                                    <ListItemIcon>
                                        <InfoOutlined sx={{ color: "#fff" }} />
                                    </ListItemIcon>
                                    <ListItemText
                                        className=" !capitalize !text-start"
                                        primary={t("sidBar.about")}
                                    />
                                </ListItemButton>
                            </NavLink>
                        </ListItem>
                    ) : (
                        ""
                    )}

                    {/* ======================== Roles ================================ */}
                    {hasPermission("role_management") ? (
                        <ListItem disablePadding>
                            <NavLink
                                to={"/admin/roles"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "w-full  text-decoration-none sidebar-list active"
                                        : "w-full   text-decoration-none sidebar-list"
                                }
                            >
                                <ListItemButton sx={{ color: "#fff" }}>
                                    <ListItemIcon>
                                        <SpeedOutlined sx={{ color: "#fff" }} />
                                    </ListItemIcon>
                                    <ListItemText
                                        className=" !capitalize !text-start"
                                        primary={t("sidBar.roles")}
                                    />
                                </ListItemButton>
                            </NavLink>
                        </ListItem>
                    ) : (
                        ""
                    )}

                    {/* ========================settings================================ */}

                    {hasPermission("settings_management") ? (
                        <ListItem disablePadding>
                            <NavLink
                                to={"/admin/settings"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "w-full  text-decoration-none sidebar-list active"
                                        : "w-full   text-decoration-none sidebar-list"
                                }
                            >
                                <ListItemButton sx={{ color: "#fff" }}>
                                    <ListItemIcon>
                                        <SettingsOutlined
                                            sx={{ color: "#fff" }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        className=" !capitalize !text-start"
                                        primary={t("sidBar.settings")}
                                    />
                                </ListItemButton>
                            </NavLink>
                        </ListItem>
                    ) : (
                        ""
                    )}
                    {/* ========================ads================================ */}
                    {hasPermission("ad_management") ? (
                        <ListItem disablePadding>
                            <NavLink
                                to={"/admin/ads"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "w-full  text-decoration-none sidebar-list active"
                                        : "w-full   text-decoration-none sidebar-list"
                                }
                            >
                                <ListItemButton sx={{ color: "#fff" }}>
                                    <ListItemIcon>
                                        <AcUnit sx={{ color: "#fff" }} />
                                    </ListItemIcon>
                                    <ListItemText
                                        className=" !capitalize !text-start"
                                        primary={t("sidBar.ads")}
                                    />
                                </ListItemButton>
                            </NavLink>
                        </ListItem>
                    ) : (
                        ""
                    )}
                    {/* ======================================================== */}
                </List>
                {/* <Divider /> */}
            </>
        );
    }, [setMobileOpen, t]);

    return (
        <>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
                className="sidbar  "
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
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            paddingX: "15px",
                            paddingY: "50px",
                            width: drawerWidth,
                            backgroundColor: "#031d54",
                            right: i18n.language === "ar" && "0",
                            left: i18n.language === "ar" ? "auto" : "0",
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
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                            paddingX: "15px",
                            paddingY: "50px",
                            backgroundColor: "#031d54",
                            left: i18n.language === "ar" ? "auto" : "0",
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </>
    );
};

export default SidBar;