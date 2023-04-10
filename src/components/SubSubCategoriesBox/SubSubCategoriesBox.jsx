import React, { useCallback, useEffect, useRef } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { SelectParentCategoriesThunk } from "../../RTK/Thunk/SelectParentCategoriesThunk";
import { SelectSubCategoriesThunk } from "../../RTK/Thunk/SelectSubCategoriesThunk";
import { useState } from "react";
import { SubSubCategoriesThunk } from "../../RTK/Thunk/SubSubCategoriesThunk";
import { DeleteSubCategoriesThunk } from "../../RTK/Thunk/DeleteSubCategoriesThunk";
import { AddSubSubCategoriesThunk } from "../../RTK/Thunk/AddSubSubCategoriesThunk";
import { closeError } from "../../RTK/Reducers/SubSubCategoriesReducer";

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
const SubSubCategoriesBox = () => {
    let { t, i18n } = useTranslation();
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const [value, setValue] = React.useState(0);
    const [age, setAge] = React.useState("0");
    const [inputValue, setInputValue] = React.useState({
        input_en: "",
        input_ar: "",
        input_fr: "",
    });
    const [pageTarget, setPageTarget] = useState(1);

    const [selectTarget, setSelectTarget] = React.useState({
        Sub_Categories: "",
        Main_Category: "",
    });
    const [targetIdSelect, setTargetIdSelect] = React.useState({
        main: "",
        sub: "",
    });
    let {
        subSubcategoriesData,
        mainSelectData,
        subSelectData,
        lastPage,
        name_en_Error,
        name_ar_Error,
        name_fr_Error,
        selectError,
    } = useSelector((state) => state.SubSubCategoriesReducer);
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
    const dataOne = useRef(true);
    useEffect(() => {
        if (dataOne.current) {
            dispatch(SelectParentCategoriesThunk());
            dataOne.current = false;
        }
    }, [dispatch]);
    // ====get table data
    useEffect(() => {
        if (targetIdSelect.sub !== "") {
            // dispatch(closeError({ type: "select" }));
            dispatch(
                SubSubCategoriesThunk({
                    sub: targetIdSelect.sub,
                    page: pageTarget,
                })
            );
        }
    }, [targetIdSelect, dispatch, pageTarget]);
    //handle first open page

    useEffect(() => {
        if (targetIdSelect.sub == "" && subSelectData.length) {
            setTargetIdSelect({
                ...targetIdSelect,
                sub: subSelectData[0]?.id,
            });
        }
        if (targetIdSelect.main == "" && mainSelectData.length) {
            setTargetIdSelect({
                ...targetIdSelect,
                main: mainSelectData[0]?.id,
            });
        }
    }, [mainSelectData, subSelectData, targetIdSelect]);

    useEffect(() => {
        if (targetIdSelect.main) {
            dispatch(SelectSubCategoriesThunk({ id: targetIdSelect.main }));
        }
    }, [targetIdSelect.main, dispatch]);
    //     useEffect(() => {
    //         if (subSubcategoriesData.length) {
    //  dispatch(
    //      SubSubCategoriesThunk({
    //          sub: targetIdSelect.sub,
    //          page: pageTarget,
    //      })
    //  );        }
    //     }, [, dispatch,]);

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
                    SubSubCategoriesThunk({
                        sub: targetIdSelect.sub,
                        main: targetIdSelect.main,
                        page: pageTarget,
                    })
                );
            })
            .catch((error) => {
                // console.log(error);
                // handle error here
            });
    };
    let handleSubmit = (e) => {
        e.preventDefault();
        if (targetIdSelect.main !== "" && targetIdSelect.sub !== "") {
            dispatch(
                AddSubSubCategoriesThunk({
                    // id: nameBrand?.id,
                    ar: inputValue?.input_ar,
                    en: inputValue?.input_en,
                    fr: inputValue?.input_fr,
                    sub: targetIdSelect.sub,
                })
            )
                .unwrap()
                .then((data) => {
                    // console.log(data);
                    dispatch(
                        SubSubCategoriesThunk({
                            sub: targetIdSelect.sub,
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
                    console.log(error);
                    // setCode(error.code);
                    // handle error here
                });
        }
    };
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
                                        "pages.SubSubCategoriesBox.add.Sub_Sub_category_Name"
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
                                )}{" "}
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
                                )}{" "}
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
                        <FormControl
                            fullWidth
                            className="min-h-[75.5px]"
                            onClick={(e) => {
                                setSelectTarget({
                                    ...selectTarget,
                                    Sub_Categories: e.target.textContent,
                                });
                                if (e.target.textContent) {
                                    let data = subSelectData.filter(
                                        (el) => el.name === e.target.textContent
                                    );
                                    setTargetIdSelect({
                                        ...targetIdSelect,
                                        sub: data[0].id,
                                    });
                                }
                            }}
                        >
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t(
                                    "pages.SubSubCategoriesBox.add.Sub_category_Name"
                                )}
                            </h6>
                            <SelectBox TargetData={subSelectData} />
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
                                if (e.target.textContent) {
                                    let data = mainSelectData.filter(
                                        (el) => el.name === e.target.textContent
                                    );
                                    setTargetIdSelect({
                                        ...targetIdSelect,
                                        main: data[0].id,
                                    });
                                    // dispatch(
                                    //     SelectSubCategoriesThunk({
                                    //         id: targetIdSelect.main,
                                    //     })
                                    // )
                                    //     .unwrap()
                                    //     .then((data) => {
                                    //         // console.log(data);

                                    //     })
                                    //     .catch((error) => {
                                    //         // setCode(error.code);
                                    //         // handle error here
                                    //     });
                                }
                            }}
                        >
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t(
                                    "pages.SubSubCategoriesBox.add.Main_Category"
                                )}
                            </h6>
                            <SelectBox TargetData={mainSelectData} />
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
                {subSubcategoriesData.length ? (
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
                                                "pages.SubSubCategoriesBox.table.id"
                                            )}
                                        </StyledTableCell>

                                        <StyledTableCell
                                            align="center"
                                            className="!bg-primaryBg capitalize"
                                        >
                                            {t(
                                                "pages.SubSubCategoriesBox.table.Name"
                                            )}
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
                                    {subSubcategoriesData.map((row, index) => (
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
                                                                `/admin/categories/sub_sub/edit/${targetIdSelect.sub}/${row.id}`
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

export default React.memo(SubSubCategoriesBox);
