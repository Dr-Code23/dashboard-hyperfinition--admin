import { Button, FormControl } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./ComponyExpensesAdd.css";
import "react-datepicker/dist/react-datepicker.css";
import SelectBox from "../SelectBox/SelectBox";
import DatePicker from "react-datepicker";
import IconButton from "@mui/material/IconButton";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DeleteForever } from "@mui/icons-material";
import { useCallback } from "react";
import { ErrorBox } from "../index";
import { useTranslation } from "react-i18next";
import { SelectProjectThunk } from "../../RTK/Thunk/SelectProjectThunk";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SelectProductThunk } from "../../RTK/Thunk/SelectProductThunk";
import { UpdateExpensesThunk } from "../../RTK/Thunk/UpdateExpensesThunk";
import { closeError } from "../../RTK/Reducers/ExpensesReducer";

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

const ComponyExpensesAdd = () => {
    let { t, i18n } = useTranslation();
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let numberD = 0;
    let { projectSelectData, productSelectData, productError } = useSelector(
        (state) => state.ExpensesReducer
    );
    const [selectTarget, setSelectTarget] = React.useState({
        Product: "",
        Project: "",
    });
    const [tableData, setTableData] = useState([]);
    const [targetIdSelect, setTargetIdSelect] = React.useState({
        main: "",
        product: "",
    });
    //  error Message
    const [open, setOpen] = React.useState(false);
    const [ErrorMessage, setErrorMessage] = React.useState();

    // handle select on loading
    useEffect(() => {
        if (targetIdSelect.main == "" && projectSelectData.length) {
            setTargetIdSelect({
                ...targetIdSelect,
                main: projectSelectData[0]?.id,
            });
        }
    }, [projectSelectData, targetIdSelect]);
    useEffect(() => {
        if (targetIdSelect.product == "" && productSelectData.length) {
            setTargetIdSelect({
                ...targetIdSelect,
                product: productSelectData[0]?.id,
            });
        }
    }, [productSelectData, targetIdSelect]);
    const addTable = (e) => {
        if (e.currentTarget.parentElement.querySelector("input").value) {
            if (
                !isNaN(
                    e.currentTarget.parentElement.querySelector("input").value
                ) &&
                e.currentTarget.parentElement.querySelector("input").value > 0
            ) {
                let foundId = productSelectData.filter(
                    (el) => el.id === targetIdSelect?.product
                );

                if (
                    e.currentTarget.parentElement.querySelector("input").value >
                    foundId[0]?.total_quantity
                ) {
                    setOpen(true);
                    setErrorMessage(
                        t(
                            "code_error.The_amount_entered_is_greater_than_the_available_quantity"
                        )
                    );
                } else {
                    foundId = productSelectData.filter(
                        (el) => el.id === targetIdSelect?.product
                    );
                    let data = [...tableData];
                    if (data.length) {
                        data = data.filter(
                            (el) => el.id !== targetIdSelect?.product
                        );
                        data = [
                            ...data,
                            {
                                ...foundId[0],
                                total_price: Number(
                                    foundId[0]?.unit_price *
                                        e.currentTarget.parentElement.querySelector(
                                            "input"
                                        ).value
                                ).toFixed(2),
                                quantity:
                                    e.currentTarget.parentElement.querySelector(
                                        "input"
                                    ).value,
                            },
                        ];
                        setTableData(data);
                    } else {
                        data = [
                            ...data,
                            {
                                ...foundId[0],
                                total_price: Number(
                                    foundId[0]?.unit_price *
                                        e.currentTarget.parentElement.querySelector(
                                            "input"
                                        ).value
                                ).toFixed(2),
                                quantity:
                                    e.currentTarget.parentElement.querySelector(
                                        "input"
                                    ).value,
                            },
                        ];
                        setTableData(data);
                    }

                    // let datax = data.map((el) => {
                    //     if (el.id == targetIdSelect?.product) {
                    //         return {
                    //             ...foundId[0],
                    //             total_quantity:
                    //                 e.currentTarget.parentElement.querySelector(
                    //                     "input"
                    //                 ).value,
                    //         };
                    //     } else {
                    //         return el;
                    //     }
                    // });
                }
                e.currentTarget.parentElement.querySelector("input").value = "";
            } else {
                setOpen(true);
                setErrorMessage(
                    t("pages.ComponyExpensesAdd.The_Quantity_Must_be_Number")
                );
            }
        } else {
            setOpen(true);
            setErrorMessage(
                t("pages.ComponyExpensesAdd.The_Quantity_Must_be_Number")
            );
        }
    };

    const TableChange = useCallback(
        (e) => {
            setTableData(tableData.filter((el) => el.id !== e));
        },
        [tableData]
    );

    // =====data===========
    useEffect(() => {
        dispatch(SelectProjectThunk());
        dispatch(SelectProductThunk());
    }, [dispatch]);

    let handleSubmit = (e) => {
        e.preventDefault();
        let data = tableData.map((el) => {
            return {
                id: el.id,
                quantity: el.quantity,
            };
        });
        dispatch(
            UpdateExpensesThunk({
                project_id: targetIdSelect.main,
                products: [...data],
            })
        )
            .unwrap()
            .then((data) => {
                // console.log(data);
                navigate("/admin/projectExpense");
            })
            .catch((error) => {
                // console.log(error);
                //    setCode(error.code);
            });
    };
    useEffect(() => {
        return () => {
            dispatch(closeError());
        };
    }, []);
    useEffect(() => {
        dispatch(closeError());
    }, [dispatch, tableData]);
    return (
        <>
            <div className="p-[20px] mt-[40px]">
                <form
                    action=""
                    className="add-box flex  items-start justify-start flex-col px-5 py-[60px]  mb-[40px] add-shadow  "
                    onSubmit={handleSubmit}
                >
                    <div className=" flex flex-wrap  w-full gap-[30px] justify-start items-center">
                        <FormControl
                            className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[440px]"
                            onClick={(e) => {
                                if (e.target.tagName == "LI") {
                                    // console.log(e.target.textContent);
                                    setSelectTarget({
                                        ...selectTarget,
                                        Main_Category: e.target.textContent,
                                    });
                                    let data = projectSelectData.filter(
                                        (el) => el.name === e.target.textContent
                                    );

                                    setTargetIdSelect({
                                        ...targetIdSelect,
                                        main: data[0].id,
                                    });
                                    // dispatch(
                                    //     SelectSubCategoriesThunk({
                                    //         id: data[0].id,
                                    //     })
                                    // )
                                    //     .unwrap()
                                    //     .then((data) => {
                                    //         // console.log(data);
                                    //         setTargetIdSelect({
                                    //             ...targetIdSelect,
                                    //             sub: data.data[0]?.id,
                                    //         });
                                    //     });
                                }
                            }}
                        >
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t("pages.ComponyExpensesAdd.Project")}
                            </h6>
                            <SelectBox TargetData={projectSelectData} />
                        </FormControl>
                    </div>
                    <hr className=" w-full my-[40px]" />
                    <div className=" flex flex-wrap  w-full gap-[30px] justify-start items-center">
                        <FormControl
                            className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[440px]"
                            onClick={(e) => {
                                // console.log(e.target.textContent)
                                if (e.target.tagName == "LI") {
                                    // console.log(e.target.textContent);
                                    setSelectTarget({
                                        ...selectTarget,
                                        Main_Category: e.target.textContent,
                                    });
                                    let data = productSelectData.filter(
                                        (el) => el.name === e.target.textContent
                                    );

                                    setTargetIdSelect({
                                        ...targetIdSelect,
                                        product: data[0].id,
                                    });
                                }
                            }}
                        >
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t("pages.ComponyExpensesAdd.Product")}
                            </h6>
                            <SelectBox TargetData={productSelectData} />
                        </FormControl>
                        <FormControl className=" !flex-col  md:!flex-row justify-center items-center md:items-end gap-[20px]  min-h-[75.5px] min-w-[250px] w-full lg:max-w-[440px]">
                            <div className=" flex-1 w-full ">
                                <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                    {t(
                                        "pages.ComponyExpensesAdd.Quantity_Total"
                                    )}
                                </h6>
                                <input type="text" />
                            </div>
                            <Button
                                variant="contained"
                                color="primary"
                                className=" !bg-primaryBg  !w-full md:!w-[80px] !h-[50px]"
                                onClick={(e) => {
                                    addTable(e);
                                }}
                            >
                                {t("pages.ComponyExpensesAdd.Add")}
                            </Button>
                        </FormControl>
                    </div>
                    <hr className=" w-full my-[40px]" />
                    {tableData.length ? (
                        <TableContainer
                            component={Paper}
                            className=" h-fit max-h-[450px] "
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
                                                "pages.ComponyExpensesAdd.table.id"
                                            )}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            align="center"
                                            className="!bg-primaryBg capitalize"
                                        >
                                            {t(
                                                "pages.ComponyExpensesAdd.table.Name"
                                            )}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            align="center"
                                            className="!bg-primaryBg capitalize"
                                        >
                                            {t(
                                                "pages.ComponyExpensesAdd.table.Quantity"
                                            )}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            align="center"
                                            className="!bg-primaryBg capitalize"
                                        >
                                            {t(
                                                "pages.ComponyExpensesAdd.table.Price"
                                            )}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            align="center"
                                            className="!bg-primaryBg capitalize"
                                        >
                                            {t(
                                                "pages.ComponyExpensesAdd.table.total_Price"
                                            )}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            align="center"
                                            className="!bg-primaryBg capitalize"
                                        >
                                            {t(
                                                "pages.ComponyExpensesAdd.table.actions"
                                            )}
                                        </StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableData.map((el, index) => (
                                        <StyledTableRow key={el.id}>
                                            <StyledTableCell align="center">
                                                {el.id}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {el.name}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {el.quantity}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {el.unit_price}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {el.total_price}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <IconButton
                                                    aria-label=""
                                                    onClick={() => {
                                                        TableChange(el.id);
                                                    }}
                                                >
                                                    <DeleteForever />
                                                </IconButton>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : null}
                    {productError !== null && (
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
                            {productError}
                        </span>
                    )}
                    {/* ======================== */}
                    <hr className=" w-full my-[40px]" />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className=" !bg-primaryBg  !w-full md:!w-[130px] !h-[50px]  !mt-[30px] !ml-auto"
                    >
                        {t("pages.ComponyExpensesAdd.Submit")}
                    </Button>
                </form>
            </div>
            <ErrorBox setOpen={setOpen} open={open} Data={ErrorMessage} />
        </>
    );
};

export default React.memo(ComponyExpensesAdd);
