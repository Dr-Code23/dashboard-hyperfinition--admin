import { Alert, Button, FormControl } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./ProjectView.css";
import "react-datepicker/dist/react-datepicker.css";
import SelectBox from "../SelectBox/SelectBox";
import DatePicker from "react-datepicker";
import IconButton from "@mui/material/IconButton";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DeleteForever } from "@mui/icons-material";
import { useCallback } from "react";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import { AllProjectThunk } from "../../RTK/Thunk/AllProjectThunk";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ViewProjectThunk } from "../../RTK/Thunk/ViewProjectThunk";

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

let selectData = ["name", "email", "pass"];
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}
const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
];
const ProjectView = () => {
    let { t, i18n } = useTranslation();
    let dispatch = useDispatch();
    let param = useParams();
    let { viewData, viewTableData } = useSelector(
        (state) => state.ProjectReducer
    );
    // ================
    useEffect(() => {
        dispatch(ViewProjectThunk({ id: param.projectView }));
    }, [dispatch, param.projectView]);
    // ================

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
                                {t("pages.ProjectView.Project_Name")}
                            </h6>
                            <h4 className="input">{viewData?.project_name}</h4>
                        </FormControl>
                        <FormControl className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[440px]">
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t("pages.ProjectView.Customer_Name")}
                            </h6>
                            <h4 className="input">{viewData?.customer_name}</h4>
                        </FormControl>
                        <FormControl className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[440px]">
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t("pages.ProjectView.Project_Total")}
                            </h6>
                            <h4 className="input">{viewData?.project_total}</h4>
                        </FormControl>
                        <FormControl className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[440px]">
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t("pages.ProjectView.profits")}
                            </h6>
                            <h4 className="input">{viewData?.profits}</h4>
                        </FormControl>
                        <FormControl className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[440px]">
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t("pages.ProjectView.materials_total")}
                            </h6>
                            <h4 className="input">
                                {viewData?.materials_total}
                            </h4>
                        </FormControl>
                    </div>
                    <hr className=" w-full my-[40px]" />
                    <div className=" flex flex-col md:flex-row   md:justify-start justify-center items-center gap-[30px] w-full ">
                        <FormControl className="min-h-[75.5px]  w-full lg:max-w-[440px]">
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t("pages.ProjectView.Start_Date")}
                            </h6>
                            <h4 className="input">{viewData?.start_date}</h4>
                        </FormControl>
                        <FormControl className="min-h-[75.5px]  w-full lg:max-w-[440px]">
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t("pages.ProjectView.End_Date")}
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
                                            {t("pages.ProjectView.table.id")}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            align="center"
                                            className="!bg-primaryBg capitalize"
                                        >
                                            {t("pages.ProjectView.table.Name")}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            align="center"
                                            className="!bg-primaryBg capitalize"
                                        >
                                            {t(
                                                "pages.ProjectView.table.quantity"
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
                                                {row.name}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {row.quantity}
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

export default React.memo(ProjectView);
