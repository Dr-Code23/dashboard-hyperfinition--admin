import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProjectPayment.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { DeleteForever, ModeEdit, RemoveRedEye } from "@mui/icons-material";
import { Button } from "@mui/material";
import { PaginationBox } from "../../index.js";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AllPaymentThunk } from "../../../RTK/Thunk/AllPaymentThunk";
import UpdateDataFn from "../../UpdateDataFn/UpdateDataFn";

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

const ProjectPayment = () => {
    let { t, i18n } = useTranslation();
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const [pageTarget, setPageTarget] = useState(1);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        if (searchValue) {
            dispatch(
                AllPaymentThunk({ page: pageTarget, search: searchValue })
            );
        } else {
            dispatch(AllPaymentThunk({ page: pageTarget, search: "" }));
        }
    }, [dispatch, pageTarget, i18n.language, searchValue]);
    let { paymentData, lastPage } = useSelector(
        (state) => state.PaymentReducer
    );

    // ================
    // ===================================
    const [openAlertFn, setOpenAlertFn] = React.useState(false);
    const [Message, setMessage] = React.useState("");
    let { typeAlert } = useSelector((state) => state.MessageReducer);

    useEffect(() => {
        if (typeAlert) {
            setMessage(t("code_error.The_Data_Has_Been_Updated"));
            setOpenAlertFn(true);
        }
    }, [typeAlert, t]);
    return (
        <>
            <div className=" mx-auto px-4  mt-[40px]">
                <div className="flex  items-start md:items-center justify-between flex-col md:flex-row mb-3  gap-5 ">
                    <div className="flex  items-end gap-2 pl-1">
                        <h6 className=" capitalize text-[22px]  font-medium	">
                            {t("pages.BrandBox.search")} :
                        </h6>

                        <input
                            type="text"
                            className=" bg-secondaryBg outline-none p-[8px]"
                            value={searchValue}
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                            }}
                        />
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        className=" !bg-primaryBg"
                        onClick={() => {
                            navigate("/admin/projectPayment/add");
                        }}
                    >
                        {t("pages.ProjectPayment.Add_a_new")}
                    </Button>
                </div>
                {paymentData.length ? (
                    <TableContainer component={Paper} sx={{ height: "438px" }}>
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
                                        {t("pages.ProjectPayment.table.id")}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        className="!bg-primaryBg capitalize"
                                    >
                                        {t(
                                            "pages.ProjectPayment.table.Customer_Name"
                                        )}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        className="!bg-primaryBg capitalize"
                                    >
                                        {t(
                                            "pages.ProjectPayment.table.Project_Name"
                                        )}
                                    </StyledTableCell>

                                    <StyledTableCell
                                        align="center"
                                        className="!bg-primaryBg capitalize"
                                    >
                                        {t(
                                            "pages.ProjectPayment.table.actions"
                                        )}
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paymentData.map((row, index) => (
                                    <StyledTableRow key={row.id}>
                                        <StyledTableCell align="center">
                                            {row.id}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.customer_name}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.project_name}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <div className="action flex items-center justify-center gap-2">
                                                <IconButton
                                                    aria-label=""
                                                    onClick={() => {
                                                        navigate(
                                                            `/admin/projectPayment/view/${row.id}`
                                                        );
                                                    }}
                                                >
                                                    <RemoveRedEye />
                                                </IconButton>
                                                <IconButton
                                                    aria-label=""
                                                    onClick={() => {
                                                        navigate(
                                                            `/admin/projectPayment/edit/${row.id}`
                                                        );
                                                    }}
                                                >
                                                    <ModeEdit />
                                                </IconButton>
                                            </div>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : null}
            </div>

            <PaginationBox count={lastPage} setPageTarget={setPageTarget} />
            <UpdateDataFn
                openAlert={openAlertFn}
                setOpenAlert={setOpenAlertFn}
                Data={Message}
            />
        </>
    );
};

export default ProjectPayment;
