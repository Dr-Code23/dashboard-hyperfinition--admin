import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { Box, Button, FormControl, Modal } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { TablePaymentThunk } from "../../RTK/Thunk/TablePaymentThunk";
import CloseIcon from "@mui/icons-material/Close";
import { UpdateTablePaymentThunk } from "../../RTK/Thunk/UpdateTablePaymentThunk";
import { closeError } from "../../RTK/Reducers/PaymentReducer";
import { DeleteTablePaymentThunk } from "../../RTK/Thunk/DeleteTablePaymentThunk";

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
const ProjectPaymentEdit = () => {
    let { t, i18n } = useTranslation();
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let param = useParams();
    const [openCt, setOpenCt] = React.useState(false);
    const [inputValue, setInputValue] = useState({
        price: "",
        id: "",
    });

    let { priceError, tableDataPayment } = useSelector(
        (state) => state.PaymentReducer
    );
    // ;
    const handleClose = useCallback(() => {
        setOpenCt(false);
    }, [setOpenCt]);
    useEffect(() => {
        dispatch(TablePaymentThunk({ id: param.projectPaymentEdit }));
    }, [dispatch, param.projectPaymentEdit]);
    // handle Delete
    let handleDelete = (id) => {
        dispatch(
            DeleteTablePaymentThunk({
                id: id,
            })
        )
            .unwrap()
            .then((data) => {
                // console.log(data);
                dispatch(TablePaymentThunk({ id: param.projectPaymentEdit }));
            })
            .catch((error) => {
                // console.log(error);
                // handle error here
            });
    };
    // handle edit submit
    let submitEdit = (e) => {
        e.preventDefault();
        dispatch(
            UpdateTablePaymentThunk({
                price: inputValue.price,
                project_id: param.projectPaymentEdit,
                id: inputValue.id,
            })
        )
            .unwrap()
            .then((data) => {
                // console.log(data);
                setInputValue({
                    price: "",
                    id: "",
                });
                setOpenCt(false);
                dispatch(TablePaymentThunk({ id: param.projectPaymentEdit }));

                // navigate("/admin/projectPayment");
            })
            .catch((error) => {
                // console.log(error);
                //    setCode(error.code);
            });
    };
    useEffect(() => {
        dispatch(closeError());
    }, [dispatch, inputValue]);
    useEffect(() => {
        return () => {
            dispatch(closeError());
        };
    }, []);
    return (
        <>
            <>
                <div className=" mx-auto px-4  mt-[40px]">
                    <div className="flex  items-start md:items-center justify-end flex-col md:flex-row mb-3  gap-5 "></div>
                    {tableDataPayment.length ? (
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
                                            {t(
                                                "pages.ProjectPaymentEdit.table.id"
                                            )}{" "}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            align="center"
                                            className="!bg-primaryBg capitalize"
                                        >
                                            {t(
                                                "pages.ProjectPaymentEdit.table.created_at"
                                            )}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            align="center"
                                            className="!bg-primaryBg capitalize"
                                        >
                                            {t(
                                                "pages.ProjectPaymentEdit.table.price"
                                            )}
                                        </StyledTableCell>

                                        <StyledTableCell
                                            align="center"
                                            className="!bg-primaryBg capitalize"
                                        >
                                            {t(
                                                "pages.ProjectPaymentEdit.table.actions"
                                            )}
                                        </StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableDataPayment.map((row, index) => (
                                        <StyledTableRow key={row.payment_id}>
                                            <StyledTableCell align="center">
                                                {row.payment_id}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {row.created_at}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {row.price}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <div className="action flex items-center justify-center gap-2">
                                                    <IconButton
                                                        aria-label=""
                                                        onClick={() => {
                                                            setInputValue({
                                                                price: row.price,
                                                                id: row.payment_id,
                                                            });
                                                            setOpenCt(true);
                                                        }}
                                                    >
                                                        <ModeEdit />
                                                    </IconButton>
                                                    <IconButton
                                                        aria-label=""
                                                        onClick={() => {
                                                            handleDelete(
                                                                row.payment_id
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
                    ) : null}
                </div>
                <>
                    <Modal
                        open={openCt}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box className="contact-modal ">
                            <form
                                className="all !max-w-[525px]"
                                onSubmit={submitEdit}
                            >
                                <IconButton
                                    aria-label=""
                                    onClick={() => {
                                        setOpenCt(false);
                                        setInputValue({
                                            price: "",
                                            id: "",
                                        });
                                    }}
                                    className="close-modal"
                                >
                                    <CloseIcon />
                                </IconButton>
                                <FormControl className="add-box min-h-[75.5px] min-w-[250px] w-full lg:max-w-[440px]">
                                    <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                        {t("pages.ProjectPaymentEdit.Price")}
                                    </h6>
                                    <input
                                        type="text"
                                        value={inputValue?.price}
                                        onChange={(e) => {
                                            setInputValue({
                                                ...inputValue,
                                                price: e.target.value,
                                            });
                                        }}
                                    />
                                    {priceError !== null && (
                                        <span
                                            style={{
                                                width: "100%",
                                                color: "red",
                                                fontSize: "15px",
                                                marginBottom: "15px",
                                                marginTop: "15px",
                                                display: "block",
                                            }}
                                        >
                                            {priceError}
                                        </span>
                                    )}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        className=" !bg-primaryBg  !w-full md:!w-[130px] !h-[50px]  !mt-[30px] !mx-auto"
                                    >
                                        {t("pages.ProjectPaymentEdit.Submit")}
                                    </Button>
                                </FormControl>
                            </form>
                        </Box>
                    </Modal>
                </>
            </>
        </>
    );
};

export default ProjectPaymentEdit;
