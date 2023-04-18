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
import { DeleteForever, InfoOutlined, ModeEdit } from "@mui/icons-material";
import { Box, Button, Modal } from "@mui/material";
import { AlertDialog, PaginationBox } from "../../index.js";
import CloseIcon from "@mui/icons-material/Close";
import "./GeneralExpenses.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AllGeneralThunk } from "../../../RTK/Thunk/AllGeneralThunk.jsx";
import { DeleteGeneralThunk } from "../../../RTK/Thunk/DeleteGeneralThunk.jsx";
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

const GeneralExpenses = () => {
    let { t, i18n } = useTranslation();
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const [openCt, setOpenCt] = React.useState(false);
    const [pageTarget, setPageTarget] = useState(1);
    const [messageData, setMessageData] = useState("");
    const [openAlert, setOpenAlert] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState(0);
    let { generalData, lastPage } = useSelector(
        (state) => state.GeneralReducer
    );

    const [searchValue, setSearchValue] = useState('');


    useEffect(() => {
        if (searchValue) {
            dispatch(AllGeneralThunk({ page: pageTarget, search: searchValue }));

        }
        else {
            dispatch(AllGeneralThunk({ page: pageTarget, search: '' }));

        }
    }, [dispatch, pageTarget, i18n.language, searchValue]);

    const handleClose = useCallback(() => {
        setOpenCt(false);
    }, [setOpenCt]);
    // ================
    // handle Delete
    let handleDelete = (id) => {
        dispatch(
            DeleteGeneralThunk({
                id: id,
            })
        )
            .unwrap()
            .then((data) => {
                // console.log(data);
                dispatch(AllGeneralThunk({ page: pageTarget, search: '' }));
            })
            .catch((error) => {
                // console.log(error);
                // handle error here
            });
    };
    return (
        <>
            <div className=" mx-auto px-4  mt-[40px]">
                <div className="flex  items-start md:items-center justify-between flex-col md:flex-row mb-3  gap-5 ">
                    <div className='flex  items-end gap-2 pl-1'>

                        <h6 className=' capitalize text-[22px]  font-medium	'>{t("pages.BrandBox.search")} :</h6>

                        <input type="text" className=' bg-secondaryBg outline-none p-[8px]' value={searchValue} onChange={(e) => {

                            setSearchValue(e.target.value)
                        }

                        } />
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        className=" !bg-primaryBg"
                        onClick={() => {
                            navigate("/admin/generalExpenses/add");
                        }}
                    >
                        {t("pages.GeneralExpenses.Add_a_new")}
                    </Button>
                </div>
                {generalData.length ? (
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
                                        {t(
                                            "pages.GeneralExpenses.table.actions"
                                        )}
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {generalData.map((row, index) => (
                                    <StyledTableRow key={row.id}>
                                        <StyledTableCell align="center">
                                            {row.id}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.price}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <div className="action flex items-center justify-center gap-2">
                                                <IconButton
                                                    aria-label=""
                                                    onClick={() => {
                                                        setOpenCt(true);

                                                        setMessageData(
                                                            row.reason
                                                        );
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
                                                            `/admin/generalExpenses/edit/${index + 1
                                                            }`
                                                        );
                                                    }}
                                                >
                                                    <ModeEdit />
                                                </IconButton>
                                                <IconButton
                                                    aria-label=""
                                                    onClick={() => {
                                                        // handleDelete(row.id);
                                                        setOpenAlert(true)
                                                        setDeleteId(row.id)
                                                    }}
                                                >
                                                    <DeleteForever />
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
            <AlertDialog open={openAlert} setOpen={setOpenAlert} handleDelete={handleDelete} deleteId={deleteId} setDeleteId={setDeleteId} />

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
                                {t("pages.GeneralExpenses.table.Description")} :
                            </h4>
                            <p className=" w-full text-start  text-[17px]  font-medium  overflow-hidden">
                                {messageData}
                            </p>
                        </div>
                    </Box>
                </Modal>
            </>
        </>
    );
};

export default GeneralExpenses;
