import { Alert, Button, FormControl } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./ProjectPaymentView.css";
import "react-datepicker/dist/react-datepicker.css";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ViewPaymentThunk } from "../../RTK/Thunk/ViewPaymentThunk";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const ProjectPaymentView = () => {
    let { t, i18n } = useTranslation();
    let dispatch = useDispatch();
    let param = useParams();
    let { viewData, viewTableData } = useSelector(
        (state) => state.PaymentReducer
    );
    // ================
    useEffect(() => {
        dispatch(ViewPaymentThunk({ id: param.paymentView }));
    }, [dispatch, param.paymentView]);

    return (
        <>
            <div className="p-[20px] mt-[40px]">
                <form
                    action=""
                    className="add-box flex  items-start justify-start flex-col px-5 py-[60px]  mb-[40px] add-shadow  "
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <div className=" flex flex-wrap  w-full gap-[30px] justify-start items-center">
                        <FormControl className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[440px]">
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t("pages.ProjectPaymentAddView.Project_Name")}
                            </h6>
                            <h4 className="input">{viewData?.project_name}</h4>
                        </FormControl>
                        <FormControl className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[440px]">
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t("pages.ProjectPaymentAddView.Customer_Name")}
                            </h6>
                            <h4 className="input">{viewData?.customer_name}</h4>
                        </FormControl>
                        <FormControl className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[440px]">
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t("pages.ProjectPaymentAddView.Project_Total")}
                            </h6>
                            <h4 className="input">{viewData?.project_total}</h4>
                        </FormControl>
                        <FormControl className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[440px]">
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t("pages.ProjectPaymentAddView.paid_before")}
                            </h6>
                            <h4 className="input">{viewData?.paid_before}</h4>
                        </FormControl>
                        <FormControl className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[440px]">
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t(
                                    "pages.ProjectPaymentAddView.remaining_money"
                                )}
                            </h6>
                            <h4 className="input">
                                {viewData?.remaining_money}
                            </h4>
                        </FormControl>
                    </div>
                    <hr className=" w-full my-[40px]" />
                    <div className=" flex flex-col md:flex-row   md:justify-start justify-center items-center gap-[30px] w-full ">
                        <FormControl className="min-h-[75.5px]  w-full lg:max-w-[440px]">
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t("pages.ProjectPaymentAddView.Start_Date")}
                            </h6>
                            <h4 className="input">{viewData?.start_date}</h4>
                        </FormControl>
                        <FormControl className="min-h-[75.5px]  w-full lg:max-w-[440px]">
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t("pages.ProjectPaymentAddView.End_Date")}
                            </h6>
                            <h4 className="input">{viewData?.end_date}</h4>
                        </FormControl>
                    </div>
                    <hr className=" w-full my-[40px]" />
                    {viewTableData.length ? (
                        <TableContainer
                            component={Paper}
                            className=" h-fit  max-h-[450px] "
                        >
                            <Table
                                sx={{ minWidth: 700 }}
                                aria-label="customized table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell
                                            align="center"
                                            className="!bg-primaryBg capitalize"
                                        >
                                            {t(
                                                "pages.ProjectPaymentEdit.table.id"
                                            )}{" "}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            align="center"
                                            className="!bg-primaryBg capitalize"
                                        >
                                            {t(
                                                "pages.ProjectPaymentEdit.table.price"
                                            )}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            align="center"
                                            className="!bg-primaryBg capitalize"
                                        >
                                            {t(
                                                "pages.ProjectPaymentEdit.table.created_at"
                                            )}
                                        </StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {viewTableData.map((row, index) => (
                                        <StyledTableRow key={row.id}>
                                            <StyledTableCell align="center">
                                                {row.id}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {row.price}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {row.created_at}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : null}
                    {/* ======================== */}
                </form>
            </div>
        </>
    );
};

export default React.memo(ProjectPaymentView);
