import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import "./UsersBox.css";
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
import { AllUsersThunk } from "../../../RTK/Thunk/AllUsersThunk";
import { DeleteUserThunk } from "../../../RTK/Thunk/DeleteUserThunk";
import { UserStatusThunk } from "../../../RTK/Thunk/UserStatusThunk";
import SwitchBox from "../../SwitchBox/SwitchBox";
import { closeModal } from "../../../RTK/Reducers/UserReducer";

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
const UsersBox = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let { t, i18n } = useTranslation();
    let { userData, lastPage } = useSelector((state) => state.UserReducer);
    const [pageTarget, setPageTarget] = useState(1);

    const [searchValue, setSearchValue] = useState('');


    useEffect(() => {
        if (searchValue) {
            dispatch(AllUsersThunk({ page: pageTarget, search: searchValue }));

        }
        else {
            dispatch(AllUsersThunk({ page: pageTarget, search: '' }));

        }
    }, [dispatch, pageTarget, i18n.language, searchValue]);



    // handle Delete user
    useEffect(() => {

        return () => {
            dispatch(closeModal())
        };
    }, []);
    let handleDeleteUser = (id) => {
        dispatch(
            DeleteUserThunk({
                id: id,
            })
        )
            .unwrap()
            .then((data) => {
                // //console.log(data);
                dispatch(AllUsersThunk({ page: pageTarget }));
            })
            .catch((error) => {
                // //console.log(error);
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
                            navigate("/admin/users/add/add");
                        }}
                    >
                        {t("pages.UsersBox.Add_a_new")}
                    </Button>
                </div>
                {userData.length && (
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
                                        {t("pages.UsersBox.table.id")}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        className="!bg-primaryBg capitalize"
                                    >
                                        {t("pages.UsersBox.table.Name")}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        className="!bg-primaryBg capitalize"
                                    >
                                        {t("pages.UsersBox.table.Img")}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        className="!bg-primaryBg capitalize"
                                    >
                                        {t("pages.UsersBox.table.Email")}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        className="!bg-primaryBg capitalize"
                                    >
                                        {t("pages.UsersBox.table.Rule")}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        className="!bg-primaryBg capitalize"
                                    >
                                        {t("pages.ProductBox.table.status")}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        className="!bg-primaryBg capitalize"
                                    >
                                        {t("pages.UsersBox.table.actions")}
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {userData.map((row, index) => (
                                    <StyledTableRow key={row.id}>
                                        <StyledTableCell align="center">
                                            {row.id}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            <Avatar
                                                className=" !mx-auto"
                                                alt="Remy Sharp"
                                                src={row.avatar}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.email}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.role_name}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <div
                                                data-name={row.status}
                                                onClick={(e) => {
                                                    if (
                                                        e.currentTarget.dataset
                                                            .name == "true"
                                                    ) {
                                                        dispatch(
                                                            UserStatusThunk(
                                                                {
                                                                    id: row.id,
                                                                    status: false,
                                                                }
                                                            )
                                                        );
                                                        e.currentTarget.dataset.name = false;
                                                    } else {
                                                        dispatch(
                                                            UserStatusThunk(
                                                                {
                                                                    id: row.id,
                                                                    status: true,
                                                                }
                                                            )
                                                        );
                                                        e.currentTarget.dataset.name = true;
                                                    }
                                                }}
                                            >
                                                <SwitchBox
                                                    status={row.status}
                                                />
                                            </div>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <div className="action flex items-center justify-center gap-2">
                                                <IconButton
                                                    aria-label=""
                                                    onClick={() => {
                                                        navigate(
                                                            `/admin/users/detail/${row.id}`
                                                        );
                                                    }}
                                                >
                                                    <ModeEdit />
                                                </IconButton>
                                                <IconButton
                                                    aria-label=""
                                                    onClick={() => {
                                                        handleDeleteUser(
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
                )}
            </div>
            <PaginationBox count={lastPage} setPageTarget={setPageTarget} />
        </>
    );
};

export default UsersBox;
