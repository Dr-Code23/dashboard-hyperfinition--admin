import React, { useCallback, useEffect, useState } from "react";
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
import {
    DeleteForever,
    InfoOutlined,
    ModeEdit,
    RemoveRedEye,
} from "@mui/icons-material";
import { Box, Button, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { PaginationBox } from "../../index";
import "./ContactBox.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { ContactThunk } from "../../../RTK/Thunk/ContactThunk";
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

const ContactBox = () => {
    const navigate = useNavigate();
    let dispatch = useDispatch();
    let { t, i18n } = useTranslation();
    let { contactData, lastPage } = useSelector(
        (state) => state.ContactReducer
    );
    const [pageTarget, setPageTarget] = useState(1);
    const [messageData, setMessageData] = useState("");
    const [openCt, setOpenCt] = React.useState(false);
    const handleClose = useCallback(() => {
        setOpenCt(false);
    }, [setOpenCt]);
    // ================



    const [searchValue, setSearchValue] = useState('');


    useEffect(() => {
        if (searchValue) {
            dispatch(ContactThunk({ page: pageTarget, search: searchValue }));

        }
        else {
            dispatch(ContactThunk({ page: pageTarget, search: '' }));

        }
    }, [dispatch, pageTarget, i18n.language, searchValue]);
    return (
        <>
            <div className=" mx-auto px-4  mt-[40px]">
                <div className=" w-full flex justify-start  items-end my-[20px]">
                    <div className='flex  items-end gap-2 pl-1'>

                        <h6 className=' capitalize text-[22px]  font-medium	'>{t("pages.BrandBox.search")} :</h6>
                        <input type="text" className=' bg-secondaryBg outline-none p-[8px]' value={searchValue} onChange={(e) => {

                            setSearchValue(e.target.value)
                        }

                        } />
                    </div>
                </div>

                {contactData.length ? (
                    <TableContainer component={Paper} sx={{ height: "424px" }}>
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
                                        {t("pages.ContactBox.table.id")}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        className="!bg-primaryBg capitalize"
                                    >
                                        {t("pages.ContactBox.table.Name")}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        className="!bg-primaryBg capitalize"
                                    >
                                        {t("pages.ContactBox.table.Email")}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        className="!bg-primaryBg capitalize"
                                    >
                                        {t("pages.ContactBox.table.Phone")}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        className="!bg-primaryBg capitalize"
                                    >
                                        {t("pages.ContactBox.table.actions")}
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {contactData.map((row, index) => (
                                    <StyledTableRow key={row.id}>
                                        <StyledTableCell align="center">
                                            {row.id}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.email}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.phone}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <div className="action flex items-center justify-center gap-2">
                                                <IconButton
                                                    aria-label=""
                                                    onClick={() => {
                                                        setOpenCt(true);
                                                        setMessageData(
                                                            row.message
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
            </div>

            <PaginationBox count={lastPage} setPageTarget={setPageTarget} />
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
                                    setMessageData("");
                                }}
                                className="close-modal"
                            >
                                <CloseIcon />
                            </IconButton>
                            <h4 className=" w-full text-start mb-[12px] text-[20px]  font-bold">
                                {t("pages.ContactBox.table.Message_Modal")}:
                            </h4>
                            <p className=" w-full text-start  text-[17px]  font-medium">
                                {messageData}
                            </p>
                        </div>
                    </Box>
                </Modal>
            </>
        </>
    );
};

export default ContactBox;
