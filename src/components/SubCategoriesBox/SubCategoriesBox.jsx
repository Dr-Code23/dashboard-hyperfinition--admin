import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SubCategoriesBox.css";
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
import { useDispatch, useSelector } from "react-redux";
import { SelectParentCategoriesThunk } from "../../RTK/Thunk/SelectParentCategoriesThunk";
import { SubCategoriesThunk } from "../../RTK/Thunk/SubCategoriesThunk";
import { AddSubCategoriesThunk } from "../../RTK/Thunk/AddSubCategoriesThunk";
import {
    closeError,
    removeCategoriesData,
} from "../../RTK/Reducers/SubCategoriesReducer";
import { DeleteSubCategoriesThunk } from "../../RTK/Thunk/DeleteSubCategoriesThunk";

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

const SubCategoriesBox = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();

    let { t, i18n } = useTranslation();
    const [value, setValue] = React.useState(0);
    const [age, setAge] = React.useState(0);
    const [pageTarget, setPageTarget] = useState(1);

    const [inputValue, setInputValue] = React.useState({
        input_en: "",
        input_ar: "",
        input_fr: "",
    });
    let {
        subcategoriesData,
        mainSelectData,
        lastPage,
        name_en_Error,
        name_ar_Error,
        name_fr_Error,
        selectError,
    } = useSelector((state) => state.SubCategoriesReducer);
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

    // ================================
    useEffect(() => {
        dispatch(SelectParentCategoriesThunk());
    }, []);
    /// update table data

    useEffect(() => {
        if (age !== 0) {
            dispatch(closeError({ type: "select" }));

            dispatch(
                SubCategoriesThunk({
                    id: age,
                    page: pageTarget,
                })
            );
        }
    }, [age, dispatch, pageTarget]);
    // handle error input
    // =====en=======
    useEffect(() => {
        if (inputValue.input_en) {
            dispatch(closeError({ type: "en" }));
        }
    }, [inputValue.input_en, dispatch]);
    // =====ar=======
    useEffect(() => {
        if (inputValue.input_ar) {
            dispatch(closeError({ type: "ar" }));
        }
    }, [inputValue.input_ar, dispatch]);
    // =====fr=======

    useEffect(() => {
        if (inputValue.input_fr) {
            dispatch(closeError({ type: "fr" }));
        }
    }, [inputValue.input_fr, dispatch]);
    // ======submit=========
    let handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            AddSubCategoriesThunk({
                // id: nameBrand?.id,
                ar: inputValue?.input_ar,
                en: inputValue?.input_en,
                fr: inputValue?.input_fr,
                parent_id: age === 0 ? null : age,
            })
        )
            .unwrap()
            .then((data) => {
                // console.log(data);
                dispatch(
                    SubCategoriesThunk({
                        id: age,
                        page: pageTarget,
                    })
                );
                setInputValue({
                    input_en: "",
                    input_ar: "",
                    input_fr: "",
                });
            })
            .catch((error) => {
                // console.log(error);
                // setCode(error.code);
                // handle error here
            });
    };
    useEffect(() => {
        return () => {
            dispatch(removeCategoriesData());
        };
    }, [dispatch]);
    // handle Delete sub Category
    let handleDeleteSubCategories = (id) => {
        dispatch(
            DeleteSubCategoriesThunk({
                id: id,
            })
        )
            .unwrap()
            .then((data) => {
                // console.log(data);
                dispatch(
                    SubCategoriesThunk({
                        id: age,
                        page: pageTarget,
                    })
                );
            })
            .catch((error) => {
                // console.log(error);
                // handle error here
            });
    };
    return (
        <>
            <div className=" mx-auto px-4  mt-[40px] mb-[160px] ">
                <form
                    action=""
                    className="add-box flex  items-start justify-start flex-col px-5 py-[60px]  mb-[40px] add-shadow  "
                    onSubmit={handleSubmit}
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
                                        "pages.SubCategoriesBox.add.Sub_category_Name"
                                    )}
                                </h6>

                                <input
                                    type="text"
                                    value={inputValue?.input_en}
                                    onChange={(e) => {
                                        setInputValue({
                                            ...inputValue,
                                            input_en: e.target.value,
                                        });
                                    }}
                                />
                                {name_en_Error !== null && (
                                    <span
                                        style={{
                                            width: "100%",
                                            color: "red",
                                            fontSize: "15px",
                                            marginTop: "20px",
                                            display: "block",
                                        }}
                                    >
                                        {name_en_Error}
                                    </span>
                                )}
                            </div>
                            <div
                                className=" w-full "
                                style={{
                                    display: value === 1 ? "block" : "none",
                                }}
                            >
                                <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                    {t(
                                        "pages.SubCategoriesBox.add.Sub_category_Name"
                                    )}{" "}
                                </h6>

                                <input
                                    type="text"
                                    value={inputValue?.input_ar}
                                    onChange={(e) => {
                                        setInputValue({
                                            ...inputValue,
                                            input_ar: e.target.value,
                                        });
                                    }}
                                />
                                {name_ar_Error !== null && (
                                    <span
                                        style={{
                                            width: "100%",
                                            color: "red",
                                            fontSize: "15px",
                                            marginTop: "20px",
                                            display: "block",
                                        }}
                                    >
                                        {name_ar_Error}
                                    </span>
                                )}
                            </div>
                            <div
                                className=" w-full "
                                style={{
                                    display: value === 2 ? "block" : "none",
                                }}
                            >
                                <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                    {t(
                                        "pages.SubCategoriesBox.add.Sub_category_Name"
                                    )}
                                </h6>

                                <input
                                    type="text"
                                    value={inputValue?.input_fr}
                                    onChange={(e) => {
                                        setInputValue({
                                            ...inputValue,
                                            input_fr: e.target.value,
                                        });
                                    }}
                                />
                                {name_fr_Error !== null && (
                                    <span
                                        style={{
                                            width: "100%",
                                            color: "red",
                                            fontSize: "15px",
                                            marginTop: "20px",
                                            display: "block",
                                        }}
                                    >
                                        {name_fr_Error}
                                    </span>
                                )}
                            </div>
                        </>
                        <FormControl fullWidth className="min-h-[75.5px]">
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t("pages.SubCategoriesBox.add.Main_Category")}
                            </h6>
                            {mainSelectData.length && (
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    onChange={handleChangeMenu}
                                    className="select-box "
                                >
                                    {mainSelectData.map((el, index) => {
                                        return (
                                            <MenuItem
                                                value={el.id}
                                                key={el.id}
                                                className="ssssssssssss"
                                            >
                                                {el.name}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            )}
                            {selectError !== null && (
                                <span
                                    style={{
                                        width: "100%",
                                        color: "red",
                                        fontSize: "15px",
                                        marginTop: "20px",
                                        display: "block",
                                    }}
                                >
                                    {selectError}
                                </span>
                            )}
                        </FormControl>
                    </div>

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className=" !bg-primaryBg  !w-full md:!w-[130px] !h-[50px]  !mt-[30px] !ml-auto"
                    >
                        {t("pages.SubCategoriesBox.add.Submit")}
                    </Button>
                </form>
                {subcategoriesData.length ? (
                    <>
                        <TableContainer component={Paper} className=" !h-fit">
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
                                                "pages.SubCategoriesBox.table.id"
                                            )}
                                        </StyledTableCell>

                                        <StyledTableCell
                                            align="center"
                                            className="!bg-primaryBg capitalize"
                                        >
                                            {t(
                                                "pages.SubCategoriesBox.table.Name"
                                            )}
                                        </StyledTableCell>

                                        <StyledTableCell
                                            align="center"
                                            className="!bg-primaryBg capitalize"
                                        >
                                            {t(
                                                "pages.SubCategoriesBox.table.actions"
                                            )}
                                        </StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {subcategoriesData.map((row, index) => (
                                        <StyledTableRow key={row.id}>
                                            <StyledTableCell align="center">
                                                {row.id}
                                            </StyledTableCell>

                                            <StyledTableCell align="center">
                                                {row.name}
                                            </StyledTableCell>

                                            <StyledTableCell align="center">
                                                <div className="action flex items-center justify-center gap-2">
                                                    <IconButton
                                                        id="basic-button"
                                                        onClick={() => {
                                                            navigate(
                                                                `/admin/categories/sub/edit/${age}/${row.id}`
                                                            );
                                                        }}
                                                    >
                                                        <ModeEdit />
                                                    </IconButton>
                                                    <IconButton
                                                        aria-label=""
                                                        onClick={() => {
                                                            handleDeleteSubCategories(
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
                        <PaginationBox
                            count={lastPage}
                            setPageTarget={setPageTarget}
                        />
                    </>
                ) : null}
            </div>
        </>
    );
};

export default React.memo(SubCategoriesBox);
