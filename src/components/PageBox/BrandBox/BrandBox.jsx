import React, { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import "./BrandBox.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { DeleteForever, ModeEdit } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import { PaginationBox } from "../../index.js";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AllBrandThunk } from "../../../RTK/Thunk/AllBrandThunk";
import { DeleteBrand } from "../../../RTK/Thunk/DeleteBrand";
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

const BrandBox = ({ setNameBrand, setOpen }) => {
    let dispatch = useDispatch();
    let { t, i18n } = useTranslation();
    let { brandData, lastPage } = useSelector((state) => state.BrandReducer);
    const [pageTarget, setPageTarget] = useState(1);
    // const navigation = useNavigate();

    useEffect(() => {
        dispatch(AllBrandThunk({ page: pageTarget }));
    }, [dispatch, pageTarget, i18n.language]);

    // ====
    // handle Delete Brand
    let handleDeleteBrand = (id) => {
        dispatch(
            DeleteBrand({
                id: id,
            })
        )
            .unwrap()
            .then((data) => {
                console.log(data);
                dispatch(AllBrandThunk({ page: pageTarget }));
            })
            .catch((error) => {
                console.log(error);

                // handle error here
            });
    };

    return (
        <>
            <div className=" mx-auto px-4 mt-[40px]">
                <div className="flex  items-start md:items-center justify-end flex-col md:flex-row mb-3  gap-5 ">
                    <Button
                        variant="contained"
                        color="primary"
                        className=" !bg-primaryBg"
                        onClick={() => {
                            setOpen(true);
                            setNameBrand({
                                type: "add",
                                id: "",
                            });
                        }}
                    >
                        {t("pages.BrandBox.Add_a_new")}
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
                                    {t("pages.BrandBox.table.id")}
                                </StyledTableCell>
                                <StyledTableCell
                                    align="center"
                                    className=" !bg-primaryBg capitalize"
                                >
                                    {t("pages.BrandBox.table.Img")}
                                </StyledTableCell>
                                <StyledTableCell
                                    align="center"
                                    className="!bg-primaryBg capitalize"
                                >
                                    {t("pages.BrandBox.table.Name")}
                                </StyledTableCell>
                                <StyledTableCell
                                    align="center"
                                    className="!bg-primaryBg capitalize"
                                >
                                    {t("pages.BrandBox.table.actions")}
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {brandData.length &&
                                brandData.map((row, index) => (
                                    <StyledTableRow key={row.name}>
                                        <StyledTableCell align="center">
                                            {row.id}
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
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <div className="action flex items-center justify-center gap-2">
                                                <IconButton
                                                    aria-label=""
                                                    onClick={() => {
                                                        setOpen(true);
                                                        setNameBrand({
                                                            type: "update",
                                                            id: row.id,
                                                        });
                                                    }}
                                                >
                                                    <ModeEdit />
                                                </IconButton>
                                                <IconButton
                                                    aria-label=""
                                                    onClick={() => {
                                                        handleDeleteBrand(
                                                            row.id
                                                        );
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
            </div>

            <PaginationBox count={lastPage} setPageTarget={setPageTarget} />
        </>
    );
};

export default React.memo(BrandBox);
