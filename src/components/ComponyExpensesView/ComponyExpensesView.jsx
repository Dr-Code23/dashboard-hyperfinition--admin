import { FormControl, IconButton } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import "./ComponyExpensesView.css";
import "react-datepicker/dist/react-datepicker.css";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Modal } from "@mui/material";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { InfoOutlined } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ViewExpensesThunk } from "../../RTK/Thunk/ViewExpensesThunk";

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
const ComponyExpensesView = () => {
    let { t, i18n } = useTranslation();
    let dispatch = useDispatch();
    let param = useParams();
    let { viewData, viewTableData } = useSelector(
        (state) => state.ExpensesReducer
    );
    // ================
    useEffect(() => {
        dispatch(ViewExpensesThunk({ id: param.ComponyExpensesView }));
    }, [dispatch, param.ComponyExpensesView]);
    const [openCt, setOpenCt] = React.useState(false);
    const [modalData, setModalData] = React.useState([]);
    const handleClose = useCallback(() => {
        setOpenCt(false);
    }, [setOpenCt]);
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
                                {t("pages.ComponyExpensesView.Project_Name")}
                            </h6>
                            <h4 className="input">{viewData?.project_name}</h4>
                        </FormControl>
                        <FormControl className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[440px]">
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t("pages.ComponyExpensesView.Customer_Name")}
                            </h6>
                            <h4 className="input">{viewData?.customer_name}</h4>
                        </FormControl>
                        <FormControl className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[440px]">
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t("pages.ComponyExpensesView.Project_Total")}
                            </h6>
                            <h4 className="input">{viewData?.total}</h4>
                        </FormControl>
                    </div>
                    <hr className=" w-full my-[40px]" />
                    <div className=" flex flex-col md:flex-row   md:justify-start justify-center items-center gap-[30px] w-full ">
                        <FormControl className="min-h-[75.5px]  w-full lg:max-w-[440px]">
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t("pages.ComponyExpensesView.Start_Date")}
                            </h6>
                            <h4 className="input">{viewData?.start_date}</h4>
                        </FormControl>
                        <FormControl className="min-h-[75.5px]  w-full lg:max-w-[440px]">
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t("pages.ComponyExpensesView.End_Date")}
                            </h6>
                            <h4 className="input">{viewData?.end_date}</h4>
                        </FormControl>
                    </div>
                    <hr className=" w-full my-[40px]" />
                    {viewTableData.length ? (
                        <TableContainer
                            component={Paper}
                            sx={{ height: "438px" }}
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
                                                "pages.ComponyExpensesView.table.id"
                                            )}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            align="center"
                                            className="!bg-primaryBg capitalize"
                                        >
                                            {t(
                                                "pages.ComponyExpensesView.table.Date"
                                            )}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            align="center"
                                            className="!bg-primaryBg capitalize"
                                        >
                                            {t(
                                                "pages.ComponyExpensesView.table.Products"
                                            )}
                                        </StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {viewTableData.map((row, index) => (
                                        <StyledTableRow
                                            key={row.project_expense_id}
                                        >
                                            <StyledTableCell align="center">
                                                {row.project_expense_id}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {row.created_at}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <div className="action flex items-center justify-center gap-2">
                                                    <IconButton
                                                        aria-label=""
                                                        onClick={() => {
                                                            setOpenCt(true);
                                                            setModalData(
                                                                row.project_expense_products
                                                            );
                                                        }}
                                                    >
                                                        <InfoOutlined />
                                                    </IconButton>
                                                </div>
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
            <>
                <Modal
                    open={openCt}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className="compony-modal">
                        <div className="all">
                            <IconButton
                                aria-label=""
                                onClick={() => {
                                    setOpenCt(false);
                                }}
                                className="close-modal"
                            >
                                <CloseIcon />
                            </IconButton>
                            {modalData.length ? (
                                <TableContainer
                                    component={Paper}
                                    sx={{ height: "338px" }}
                                    className=" "
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
                                                        "pages.ComponyExpensesView.table_Modal.id"
                                                    )}
                                                </StyledTableCell>

                                                <StyledTableCell
                                                    align="center"
                                                    className="!bg-primaryBg capitalize"
                                                >
                                                    {t(
                                                        "pages.ComponyExpensesView.table_Modal.Products"
                                                    )}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    align="center"
                                                    className="!bg-primaryBg capitalize"
                                                >
                                                    {t(
                                                        "pages.ComponyExpensesView.table_Modal.quantity"
                                                    )}
                                                </StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {modalData.map((row, index) => (
                                                <StyledTableRow
                                                    key={
                                                        row.project_expense_product_id
                                                    }
                                                >
                                                    <StyledTableCell align="center">
                                                        {
                                                            row.project_expense_product_id
                                                        }
                                                    </StyledTableCell>

                                                    <StyledTableCell align="center">
                                                        {row.product_name}
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
                        </div>
                    </Box>
                </Modal>
            </>
        </>
    );
};

export default React.memo(ComponyExpensesView);
