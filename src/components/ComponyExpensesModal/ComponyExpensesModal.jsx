import React, { useCallback, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import "./ComponyExpensesModal.css";
import IconButton from "@mui/material/IconButton";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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
const CategoriesModal = ({ openCt, setOpenCt, nameBrand, setNameBrand }) => {
    const handleClose = useCallback(() => {
        setOpenCt(false);
    }, [setOpenCt]);
    let { i18n } = useTranslation();

    return (
        <>
            <Modal
                open={openCt}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="categories-modal">
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
                        <TableContainer
                            component={Paper}
                            sx={{ height: "238px" }}
                            className=" max-w-[500px]"
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
                                            id
                                        </StyledTableCell>

                                        <StyledTableCell
                                            align="center"
                                            className="!bg-primaryBg capitalize"
                                        >
                                            Name
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
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default CategoriesModal;
