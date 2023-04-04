import React, { useCallback } from "react";

import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { DeleteForever, InfoOutlined, ModeEdit } from "@mui/icons-material";
import { Box, Button, Modal } from "@mui/material";
import { PaginationBox } from "../../index.js";
import CloseIcon from "@mui/icons-material/Close";
import "./GeneralExpenses.css";
import { useTranslation } from "react-i18next";
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

const GeneralExpenses = () => {
    let { t, i18n } = useTranslation();

    const navigate = useNavigate();
    const [openCt, setOpenCt] = React.useState(false);
    const handleClose = useCallback(() => {
        setOpenCt(false);
    }, [setOpenCt]);
    // ================
    return (
        <>
            <div className=" mx-auto px-4  mt-[40px]">
                <div className="flex  items-start md:items-center justify-end flex-col md:flex-row mb-3  gap-5 ">
                    <Button
                        variant="contained"
                        color="primary"
                        className=" !bg-primaryBg"
                        onClick={() => {
                            navigate("/admin/generalExpenses/add/add");
                        }}
                    >
                        {t("pages.GeneralExpenses.Add_a_new")}
                    </Button>
                </div>
                <TableContainer component={Paper} sx={{ height: "438px" }}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell
                                    align="center"
                                    className="!bg-primaryBg capitalize"
                                >
                                    {t("pages.GeneralExpenses.table.id")}
                                </StyledTableCell>
                                <StyledTableCell
                                    align="center"
                                    className="!bg-primaryBg capitalize"
                                >
                                    {t("pages.GeneralExpenses.table.Price")}
                                </StyledTableCell>
                                <StyledTableCell
                                    align="center"
                                    className="!bg-primaryBg capitalize"
                                >
                                    {t(
                                        "pages.GeneralExpenses.table.Description"
                                    )}
                                </StyledTableCell>
                                <StyledTableCell
                                    align="center"
                                    className="!bg-primaryBg capitalize"
                                >
                                    {t("pages.GeneralExpenses.table.actions")}
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell align="center">
                                        {index + 1}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row.calories}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <div className="action flex items-center justify-center gap-2">
                                            <IconButton
                                                aria-label=""
                                                onClick={() => {
                                                    setOpenCt(true);
                                                }}
                                            >
                                                <InfoOutlined />
                                            </IconButton>
                                        </div>
                                    </StyledTableCell>

                                    <StyledTableCell align="center">
                                        <div className="action flex items-center justify-center gap-2">
                                            <IconButton
                                                aria-label=""
                                                onClick={() => {
                                                    navigate(
                                                        `/admin/generalExpenses/edit/${
                                                            index + 1
                                                        }`
                                                    );
                                                }}
                                            >
                                                <ModeEdit />
                                            </IconButton>
                                            <IconButton aria-label="">
                                                <DeleteForever />
                                            </IconButton>
                                        </div>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <PaginationBox count={10} />
            <>
                <Modal
                    open={openCt}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className="contact-modal">
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
                            <h4 className=" w-full text-start mb-[12px] text-[20px]  font-bold">
                                {t("pages.GeneralExpenses.table.Description")} :
                            </h4>
                            <p className=" w-full text-start  text-[17px]  font-medium">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Repellendus nostrum minima
                                harum blanditiis ab molestias aspernatur culpa
                                cupiditate corrupti! Saepe commodi accusamus,
                                facere quos ducimus ex quam optio officia
                                adipisci?
                            </p>
                        </div>
                    </Box>
                </Modal>
            </>
        </>
    );
};

export default GeneralExpenses;
