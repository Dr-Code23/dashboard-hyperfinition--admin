import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SubSubCategoriesBox.css";
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
import {
    Avatar,
    Button,
    FormControl,
    MenuItem,
    Select,
    Tab,
    Tabs,
} from "@mui/material";
import ImageUploading from "react-images-uploading";
import { PaginationBox } from "../index.js";
import { useTranslation } from "react-i18next";
import SelectBox from "../SelectBox/SelectBox";

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
let selectData = ["name", "email", "pass"];
const SubSubCategoriesBox = () => {
    let { t, i18n } = useTranslation();

    let navigate = useNavigate();
    const [value, setValue] = React.useState(0);
    const [age, setAge] = React.useState("0");
    const [selectTarget, setSelectTarget] = React.useState({
        Sub_Categories: "",
        Main_Category: "",
    });
    const handleChangeMenu = useCallback((event) => {
        setAge(event.target.value);
    }, []);
    //handle input language
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        if (i18n.language === "en") {
            setValue(0);
        }
        if (i18n.language === "ar") {
            setValue(1);
        }
        if (i18n.language === "fr") {
            setValue(2);
        }
    }, [i18n.language]);

    return (
        <>
            <div className=" mx-auto px-4  mt-[40px] mb-[160px] ">
                <form
                    action=""
                    className="add-box flex  items-start justify-start flex-col px-5 py-[60px]  mb-[40px] add-shadow  "
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        centered
                        sx={{ mb: "20px" }}
                        className="justify-start"
                    >
                        <Tab label={t("Language.English")} className="!p-2" />
                        <Tab label={t("Language.Arabic")} className="!p-2" />
                        <Tab label={t("Language.French")} className="!p-2" />
                    </Tabs>
                    <hr className=" w-full my-[20px]" />
                    <div className="flex justify-center flex-col lg:flex-row items-center w-full  gap-5 h-full">
                        <>
                            <div
                                className=" w-full "
                                style={{
                                    display: value === 0 ? "block" : "none",
                                }}
                            >
                                <h6 className=" text-[17px] mb-3 font-[500] capitalize  ">
                                    {t(
                                        "pages.SubSubCategoriesBox.add.Sub_Sub_category_Name"
                                    )}
                                </h6>

                                <input type="text" placeholder="Name" />
                            </div>
                            <div
                                className=" w-full "
                                style={{
                                    display: value === 1 ? "block" : "none",
                                }}
                            >
                                <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                    {t(
                                        "pages.SubSubCategoriesBox.add.Sub_Sub_category_Name"
                                    )}
                                </h6>

                                <input type="text" placeholder="Name" />
                            </div>
                            <div
                                className=" w-full "
                                style={{
                                    display: value === 2 ? "block" : "none",
                                }}
                            >
                                <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                    {t(
                                        "pages.SubSubCategoriesBox.add.Sub_Sub_category_Name"
                                    )}
                                </h6>

                                <input type="text" placeholder="Name" />
                            </div>
                        </>
                        <FormControl
                            fullWidth
                            className="min-h-[75.5px]"
                            onClick={(e) => {
                                // console.log(e.target.textContent)
                                setSelectTarget({
                                    ...selectTarget,
                                    Sub_Categories: e.target.textContent,
                                });
                            }}
                        >
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t(
                                    "pages.SubSubCategoriesBox.add.Sub_category_Name"
                                )}
                            </h6>
                            <SelectBox selectData={selectData} />
                        </FormControl>
                        <FormControl
                            fullWidth
                            className="min-h-[75.5px]"
                            onClick={(e) => {
                                // console.log(e.target.textContent)
                                setSelectTarget({
                                    ...selectTarget,
                                    Main_Category: e.target.textContent,
                                });
                            }}
                        >
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t(
                                    "pages.SubSubCategoriesBox.add.Main_Category"
                                )}
                            </h6>
                            <SelectBox selectData={selectData} />
                        </FormControl>
                    </div>

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className=" !bg-primaryBg  !w-full md:!w-[130px] !h-[50px]  !mt-[30px] !ml-auto"
                    >
                        {t("pages.SubSubCategoriesBox.add.Submit")}
                    </Button>
                </form>
                <TableContainer component={Paper} sx={{ height: "438px" }}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell
                                    align="center"
                                    className="!bg-primaryBg capitalize"
                                >
                                    {t("pages.SubSubCategoriesBox.table.id")}
                                </StyledTableCell>

                                <StyledTableCell
                                    align="center"
                                    className="!bg-primaryBg capitalize"
                                >
                                    {t("pages.SubSubCategoriesBox.table.Name")}
                                </StyledTableCell>
                                <StyledTableCell
                                    align="center"
                                    className="!bg-primaryBg capitalize"
                                >
                                    {t("pages.SubSubCategoriesBox.table.Img")}
                                </StyledTableCell>

                                <StyledTableCell
                                    align="center"
                                    className="!bg-primaryBg capitalize"
                                >
                                    {t(
                                        "pages.SubSubCategoriesBox.table.actions"
                                    )}
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
                                    <StyledTableCell align="center">
                                        <Avatar
                                            alt="Travis Howard"
                                            className=" mx-auto"
                                            src="https://mui.com/static/images/avatar/2.jpg"
                                        />
                                    </StyledTableCell>

                                    <StyledTableCell align="center">
                                        <div className="action flex items-center justify-center gap-2">
                                            <IconButton
                                                id="basic-button"
                                                onClick={() => {
                                                    navigate(
                                                        `/admin/categories/sub_sub/edit/${
                                                            index + 1
                                                        }`
                                                    );
                                                }}
                                            >
                                                <ModeEdit />
                                            </IconButton>
                                            <IconButton aria-label="">
                                                <DeleteForever />
                                            </IconButton>
                                        </div>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <PaginationBox count={10} />
            </div>
        </>
    );
};

export default React.memo(SubSubCategoriesBox);
