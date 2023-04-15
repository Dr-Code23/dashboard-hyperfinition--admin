import React, { useCallback, useEffect, useState } from "react";
import "./AdsBox.css";
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
import { Avatar, Box, Button, Modal } from "@mui/material";
import { PaginationBox } from "../../index.js";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AllAdsThunk } from "../../../RTK/Thunk/AllAdsThunk";
import CloseIcon from "@mui/icons-material/Close";
import { DeleteAdsThunk } from "../../../RTK/Thunk/DeleteAdsThunk";

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

const AdsBox = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let { t, i18n } = useTranslation();
    let { adsData, lastPage } = useSelector((state) => state.AdsReducer);
    const [pageTarget, setPageTarget] = useState(1);
    const [messageData, setMessageData] = useState("");
    const [openCt, setOpenCt] = React.useState(false);
    const handleClose = useCallback(() => {
        setOpenCt(false);
    }, [setOpenCt]);


    const [searchValue, setSearchValue] = useState('');


    useEffect(() => {
        if (searchValue) {
            dispatch(AllAdsThunk({ page: pageTarget, search: searchValue }));

        }
        else {
            dispatch(AllAdsThunk({ page: pageTarget, search: '' }));

        }
    }, [dispatch, pageTarget, i18n.language, searchValue]);


    // handle Delete
    let handleDeleteAds = (id) => {
        dispatch(
            DeleteAdsThunk({
                id: id,
            })
        )
            .unwrap()
            .then((data) => {
                // console.log(data);
                dispatch(AllAdsThunk({ page: pageTarget }));
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
                            navigate("/admin/ads/add");
                        }}
                    >
                        {t("pages.AdsBox.Add_a_new")}
                    </Button>
                </div>
                {adsData.length ? (
                    <TableContainer component={Paper} className=" h-fit">
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
                                        {t("pages.AdsBox.table.id")}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        className="!bg-primaryBg capitalize"
                                    >
                                        {t("pages.AdsBox.table.Title")}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        className="!bg-primaryBg capitalize"
                                    >
                                        {t("pages.AdsBox.table.Img")}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        className="!bg-primaryBg capitalize"
                                    >
                                        {t("pages.AdsBox.table.Description")}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        className="!bg-primaryBg capitalize"
                                    >
                                        {t("pages.AdsBox.table.discount")}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        className="!bg-primaryBg capitalize"
                                    >
                                        {t("pages.AdsBox.table.actions")}
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {adsData.map((row, index) => (
                                    <StyledTableRow key={row.id}>
                                        <StyledTableCell align="center">
                                            {row.id}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.title}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            <Avatar
                                                className=" !mx-auto"
                                                alt="Remy Sharp"
                                                src={row.image}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <IconButton
                                                aria-label=""
                                                onClick={() => {
                                                    setOpenCt(true);
                                                    setMessageData(
                                                        row.description
                                                    );
                                                }}
                                            >
                                                <InfoOutlined />
                                            </IconButton>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.discount}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <div className="action flex items-center justify-center gap-2">
                                                <IconButton
                                                    aria-label=""
                                                    onClick={() => {
                                                        navigate(
                                                            `/admin/ads/edit/${row.id}`
                                                        );
                                                    }}
                                                >
                                                    <ModeEdit />
                                                </IconButton>
                                                <IconButton
                                                    aria-label=""
                                                    onClick={() => {
                                                        handleDeleteAds(row.id);
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
                                {t("pages.AdsBox.table.Description")}
                            </h4>
                            <p className=" w-full text-start  text-[17px]  font-medium overflow-hidden">
                                {messageData}
                            </p>
                        </div>
                    </Box>
                </Modal>
            </>
        </>
    );
};

export default AdsBox;
// discount;
