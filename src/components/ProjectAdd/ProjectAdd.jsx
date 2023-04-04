import { Button, FormControl } from "@mui/material";
import React, { useState } from "react";
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
    const [startDate, setStartDate] = useState(new Date("2023/01/01"));
    const [endDate, setEndDate] = useState(new Date("2023/01/02"));
    const [selectTarget, setSelectTarget] = React.useState({
        Product: "",
    });
    const [tableData, setTableData] = useState([
        { name: "dr-1", id: (numberD += 1) },
        { name: "dr-2", id: (numberD += 1) },
        { name: "dr-3", id: (numberD += 1) },
        { name: "dr-4", id: (numberD += 1) },
    ]);

    //  error Message
    const [open, setOpen] = React.useState(false);

    const addTable = useCallback(
        (e) => {
            if (e.currentTarget.parentElement.querySelector("input").value) {
                if (
                    !isNaN(
                        e.currentTarget.parentElement.querySelector("input")
                            .value
                    ) &&
                    e.currentTarget.parentElement.querySelector("input").value >
                        0
                ) {
                    setTableData([
                        ...tableData,
                        {
                            name: e.currentTarget.parentElement.querySelector(
                                "input"
                            ).value,
                            id: (numberD += 1),
                        },
                    ]);
                    e.currentTarget.parentElement.querySelector("input").value =
                        "";
                } else {
                    setOpen(true);
                }
            } else {
                setOpen(true);
            }
        },
        [tableData]
    );

    const TableChange = useCallback(
        (e) => {
            setTableData(tableData.filter((el) => el.id !== e));
        },
        [tableData]
    );

    // ================

    return (
        <>
            <div className="p-[20px] mt-[40px]">
                <form
                    action=""
                    className="add-box flex  items-start justify-start flex-col px-5 py-[60px]  mb-[40px] add-shadow  "
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <div className=" flex flex-wrap  w-full gap-[30px] justify-start items-center">
                        <FormControl className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[440px]">
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t("pages.ProjectAdd.Project_Name")}
                            </h6>
                            <input type="text" />
                        </FormControl>
                        <FormControl className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[440px]">
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t("pages.ProjectAdd.Customer_Name")}
                            </h6>
                            <input type="text" />
                        </FormControl>
                        <FormControl className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[440px]">
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t("pages.ProjectAdd.Project_Total")}
                            </h6>
                            <input type="text" />
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
                        </FormControl>
                    </div>
                    <hr className=" w-full my-[40px]" />

                    <div className=" flex flex-wrap  w-full gap-[30px] justify-start items-center">
                        <FormControl
                            className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[440px]"
                            onClick={(e) => {
                                // console.log(e.target.textContent)
                                setSelectTarget({
                                    ...selectTarget,
                                    Product: e.target.textContent,
                                });
                            }}
                        >
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t("pages.ProjectAdd.Product")}
                            </h6>
                            <SelectBox selectData={selectData} />
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
                    <TableContainer
                        component={Paper}
                        sx={{ minHeight: "238px" }}
                        className=" "
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
                                        {t("pages.ProjectAdd.table.Quantity")}
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
                                        {t("pages.ProjectAdd.table.actions")}
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableData.map((el, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell align="center">
                                            {index + 1}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            dr
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {el.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            12
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
            <ErrorBox
                setOpen={setOpen}
                open={open}
                Data={t("pages.ProjectAdd.The_Quantity_Must_be_Number")}
            />
        </>
    );
};

export default React.memo(ProjectAdd);
