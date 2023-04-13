import React, { useEffect } from "react";

import { Container, Grid } from "@mui/material";
import CardBox from "../../components/CardBox/CardBox";
import {
    AccountTreeOutlined,
    AutorenewOutlined,
    CalendarViewMonthOutlined,
    ChromeReaderModeOutlined,
    DateRangeOutlined,
    DesignServicesOutlined,
    EuroOutlined,
    MonetizationOnOutlined,
    MoneyOffOutlined,
    PaymentsOutlined,
    ProductionQuantityLimitsOutlined,
    TaxiAlertOutlined,
    TrackChangesOutlined,
    VerifiedOutlined,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { DashThunk } from "../../RTK/Thunk/DashThunk";

const Dashboard = () => {
    let { t, i18n } = useTranslation();
    let dispatch = useDispatch();
    let { dashData } = useSelector((state) => state.DashReducer);
    useEffect(() => {
        dispatch(DashThunk());
    }, [dispatch]);
    return (
        <>
            <Container className="!mt-[40px] !mb-[100px]">
                <Grid container spacing={6}>
                    <CardBox
                        title={t("pages.DashBoard.names.productsCount")}
                        number={
                            dashData !== null ? dashData?.productsCount : null
                        }
                        Icon={
                            <ProductionQuantityLimitsOutlined className=" text-[#0644c6] !text-[32px]  " />
                        }
                        path={`/admin/product`}
                    />
                    <CardBox
                        title={t("pages.DashBoard.names.servicesCount")}
                        number={
                            dashData !== null ? dashData?.servicesCount : null
                        }
                        Icon={
                            <DesignServicesOutlined className=" text-[#0644c6] !text-[32px]  " />
                        }
                        path={`/admin/services`}
                    />
                    <CardBox
                        title={t("pages.DashBoard.names.allProjectsCount")}
                        number={
                            dashData !== null
                                ? dashData?.allProjectsCount
                                : null
                        }
                        Icon={
                            <AccountTreeOutlined className=" text-[#0644c6] !text-[32px]  " />
                        }
                        path={`/admin/project`}
                    />
                    <CardBox
                        title={t("pages.DashBoard.names.pendingProjectsCount")}
                        number={
                            dashData !== null
                                ? dashData?.pendingProjectsCount
                                : null
                        }
                        Icon={
                            <AutorenewOutlined className=" text-[#0644c6] !text-[32px]  " />
                        }
                        path={`/admin/project`}
                    />
                    <CardBox
                        title={t("pages.DashBoard.names.doneProjectsCount")}
                        number={
                            dashData !== null
                                ? dashData?.doneProjectsCount
                                : null
                        }
                        Icon={
                            <VerifiedOutlined className=" text-[#0644c6] !text-[32px]  " />
                        }
                        path={`/admin/project`}
                    />
                    <CardBox
                        title={t("pages.DashBoard.names.dailyPayments")}
                        number={
                            dashData !== null ? dashData?.dailyPayments : null
                        }
                        Icon={
                            <PaymentsOutlined className=" text-[#0644c6] !text-[32px]  " />
                        }
                        path={``}
                    />
                    <CardBox
                        title={t("pages.DashBoard.names.dailyExpenses")}
                        number={
                            dashData !== null ? dashData?.dailyExpenses : null
                        }
                        Icon={
                            <ChromeReaderModeOutlined className=" text-[#0644c6] !text-[32px]  " />
                        }
                        path={``}
                    />
                    <CardBox
                        title={t("pages.DashBoard.names.monthlyPayments")}
                        number={
                            dashData !== null ? dashData?.monthlyPayments : null
                        }
                        Icon={
                            <CalendarViewMonthOutlined className=" text-[#0644c6] !text-[32px]  " />
                        }
                        path={``}
                    />
                    <CardBox
                        title={t("pages.DashBoard.names.monthlyExpenses")}
                        number={
                            dashData !== null ? dashData?.monthlyExpenses : null
                        }
                        Icon={
                            <DateRangeOutlined className=" text-[#0644c6] !text-[32px]  " />
                        }
                        path={``}
                    />
                    <CardBox
                        title={t("pages.DashBoard.names.yearlyPayments")}
                        number={
                            dashData !== null ? dashData?.yearlyPayments : null
                        }
                        Icon={
                            <TrackChangesOutlined className=" text-[#0644c6] !text-[32px]  " />
                        }
                        path={``}
                    />
                    <CardBox
                        title={t("pages.DashBoard.names.yearlyExpenses")}
                        number={
                            dashData !== null ? dashData?.yearlyExpenses : null
                        }
                        Icon={
                            <TaxiAlertOutlined className=" text-[#0644c6] !text-[32px]  " />
                        }
                        path={``}
                    />
                    <CardBox
                        title={t("pages.DashBoard.names.dailyProfits")}
                        number={
                            dashData !== null ? dashData?.dailyProfits : null
                        }
                        Icon={
                            <MoneyOffOutlined className=" text-[#0644c6] !text-[32px]  " />
                        }
                        path={``}
                    />
                    <CardBox
                        title={t("pages.DashBoard.names.monthlyProfits")}
                        number={
                            dashData !== null ? dashData?.monthlyProfits : null
                        }
                        Icon={
                            <MonetizationOnOutlined className=" text-[#0644c6] !text-[32px]  " />
                        }
                        path={``}
                    />
                    <CardBox
                        title={t("pages.DashBoard.names.yearlyProfits")}
                        number={
                            dashData !== null ? dashData?.yearlyProfits : null
                        }
                        Icon={
                            <EuroOutlined className=" text-[#0644c6] !text-[32px]  " />
                        }
                        path={``}
                    />
                </Grid>
            </Container>
        </>
    );
};

export default Dashboard;
