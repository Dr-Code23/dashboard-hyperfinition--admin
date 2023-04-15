import { Button, FormControl } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import "./ProjectAdd.css";
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
import { finalDate } from "../../HooK/ConvertDate";
import { useDispatch, useSelector } from "react-redux";
import { SelectProductThunk } from "../../RTK/Thunk/SelectProductThunk";
import { useNavigate } from "react-router-dom";
import { UpdateProjectThunk } from "../../RTK/Thunk/UpdateProjectThunk";
import { closeError } from "../../RTK/Reducers/ProjectReducer";

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
const ProjectAdd = () => {
    let numberD = 0;
    let { t, i18n } = useTranslation();
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date("2023/01/01"));
    const [endDate, setEndDate] = useState(new Date("2023/01/02"));
    const [open, setOpen] = React.useState(false);
    const [ErrorMessage, setErrorMessage] = React.useState();

    const [selectTarget, setSelectTarget] = React.useState({
        Product: "",
    });
    const [targetIdSelect, setTargetIdSelect] = React.useState({
        product: "",
    });
    const [inputValue, setInputValue] = useState({
        project: "",
        customer: "",
        total: "",
    });
    const [tableData, setTableData] = useState([]);

    let {
        projectData,
        lastPage,
        productError,
        projectError,
        productSelectData,
        customerError,
        totalError,
        startError,
        endError,
    } = useSelector((state) => state.ProjectReducer);

    //  error Message
    // handle fun date
    // console.log(finalDate(startDate));

    // =====data===========
    const selectRef = useRef(true)
    useEffect(() => {
        if (selectRef.current) {
            dispatch(SelectProductThunk());

        }
    }, [dispatch]);

    // handle select on loading

    useEffect(() => {
        if (targetIdSelect.product == "" && productSelectData.length) {
            setTargetIdSelect({
                ...targetIdSelect,
                product: productSelectData[0]?.id,
            });
        }
    }, [productSelectData, targetIdSelect]);
    const TableChange = useCallback(
        (e) => {
            setTableData(tableData.filter((el) => el.id !== e));
        },
        [tableData]
    );
    // =================
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
    // ================

    let handleSubmit = (e) => {
        e.preventDefault();
        let data = tableData.map((el) => {
            return {
                id: el.id,
                quantity: el.quantity,
            };
        });
        data = {
            project_name: inputValue.project,
            customer_name: inputValue.customer,
            start_date: finalDate(startDate),
            end_date: finalDate(endDate),
            project_total: inputValue.total,
            materials: data,
        };
        // console.log(finalDate(startDate));
        // console.log(finalDate(endDate));

        dispatch(UpdateProjectThunk(data))
            .unwrap()
            .then((data) => {
                // console.log(data);
                navigate("/admin/project");
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
    }, [dispatch, inputValue]);
    return (
        <>
            <div className="p-[20px] mt-[40px]">
                <form
                    action=""
                    className="add-box flex  items-start justify-start flex-col px-5 py-[60px]  mb-[40px] add-shadow  "
                    onSubmit={handleSubmit}
                >
                    <div className=" flex flex-wrap  w-full gap-[30px] justify-start items-center">
                        <FormControl className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[440px]">
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t("pages.ProjectAdd.Project_Name")}
                            </h6>
                            <input
                                type="text"
                                value={inputValue.project}
                                onChange={(e) => {
                                    setInputValue({
                                        ...inputValue,
                                        project: e.target.value,
                                    });
                                }}
                            />
                            {projectError !== null && (
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
                                    {projectError}
                                </span>
                            )}
                        </FormControl>
                        <FormControl className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[440px]">
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t("pages.ProjectAdd.Customer_Name")}
                            </h6>
                            <input
                                type="text"
                                value={inputValue.customer}
                                onChange={(e) => {
                                    setInputValue({
                                        ...inputValue,
                                        customer: e.target.value,
                                    });
                                }}
                            />
                            {customerError !== null && (
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
                                    {customerError}
                                </span>
                            )}{" "}
                        </FormControl>
                        <FormControl className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[440px]">
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t("pages.ProjectAdd.Project_Total")}
                            </h6>
                            <input
                                type="text"
                                value={inputValue.total}
                                onChange={(e) => {
                                    setInputValue({
                                        ...inputValue,
                                        total: e.target.value,
                                    });
                                }}
                            />
                            {totalError !== null && (
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
                                    {totalError}
                                </span>
                            )}
                        </FormControl>
                    </div>
                    <hr className=" w-full my-[40px]" />
                    <div className=" flex flex-col md:flex-row   md:justify-start justify-center items-center gap-[30px] w-full ">
                        {/* className='w-full max-w-[400px]' */}
                        <FormControl className="min-h-[75.5px]  w-full lg:max-w-[440px]">
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t("pages.ProjectAdd.Start_Date")}
                            </h6>
                            <DatePicker
                                dateFormat="yyyy/MM/dd"
                                selected={startDate}
                                onChange={(date) => {
                                    setStartDate(date);
                                }}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                            />
                            {startError !== null && (
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
                                    {startError}
                                </span>
                            )}{" "}
                        </FormControl>
                        <FormControl className="min-h-[75.5px]  w-full lg:max-w-[440px]">
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t("pages.ProjectAdd.End_Date")}
                            </h6>
                            <DatePicker
                                selected={endDate}
                                dateFormat="yyyy/MM/dd"
                                onChange={(date) => setEndDate(date)}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                            />
                            {endError !== null && (
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
                                    {endError}
                                </span>
                            )}
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
                                {t("pages.ProjectAdd.Product")}
                            </h6>
                            <SelectBox TargetData={productSelectData} />
                        </FormControl>
                        <FormControl className=" !flex-col  md:!flex-row justify-center items-center md:items-end gap-[20px]  min-h-[75.5px] min-w-[250px] w-full lg:max-w-[440px]">
                            <div className=" flex-1 w-full ">
                                <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                    {t("pages.ProjectAdd.Quantity_Total")}
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
                                {t("pages.ProjectAdd.Add")}
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
                                            {t("pages.ProjectAdd.table.id")}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            align="center"
                                            className="!bg-primaryBg capitalize"
                                        >
                                            {t("pages.ProjectAdd.table.Name")}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            align="center"
                                            className="!bg-primaryBg capitalize"
                                        >
                                            {t(
                                                "pages.ProjectAdd.table.Quantity"
                                            )}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            align="center"
                                            className="!bg-primaryBg capitalize"
                                        >
                                            {t(
                                                "pages.ProjectAdd.table.unit_price"
                                            )}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            align="center"
                                            className="!bg-primaryBg capitalize"
                                        >
                                            {t("pages.ProjectAdd.table.Price")}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            align="center"
                                            className="!bg-primaryBg capitalize"
                                        >
                                            {t(
                                                "pages.ProjectAdd.table.actions"
                                            )}
                                        </StyledTableCell>
                                    </TableRow>
                                </TableHead>
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
                        {t("pages.ProjectAdd.Submit")}
                    </Button>
                </form>
            </div>
            <ErrorBox setOpen={setOpen} open={open} Data={ErrorMessage} />
        </>
    );
};

export default React.memo(ProjectAdd);
