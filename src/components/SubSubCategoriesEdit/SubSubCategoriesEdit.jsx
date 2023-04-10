import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Tab, Tabs } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { OneSubCategoriesThunk } from "../../RTK/Thunk/OneSubCategoriesThunk";
import { UpdateSubCategoriesThunk } from "../../RTK/Thunk/UpdateSubCategoriesThunk";
import { closeError } from "../../RTK/Reducers/SubCategoriesReducer";

const SubCategoriesEdit = () => {
    let { t, i18n } = useTranslation();
    const [value, setValue] = React.useState(0);
    let dispatch = useDispatch();
    let navigate = useNavigate();

    let param = useParams();
    let { subcategoriesName, name_en_Error, name_ar_Error, name_fr_Error } =
        useSelector((state) => state.SubCategoriesReducer);
    const [inputValue, setInputValue] = React.useState({
        input_en: "",
        input_ar: "",
        input_fr: "",
    });
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
    // // ======= get data============
    // useEffect(() => {
    //     dispatch(
    //         OneSubCategoriesThunk({
    //             main_id: param.idMainCategories,
    //             sub_id: param.editSub,
    //         })
    //     );
    // }, [param.idMainCategories, param.editSub, dispatch]);
    // useEffect(() => {
    //     if (subcategoriesName) {
    //         setInputValue({
    //             input_en: subcategoriesName?.en,
    //             input_ar: subcategoriesName?.ar,
    //             input_fr: subcategoriesName?.fr,
    //         });
    //     }
    // }, [subcategoriesName]);
    // // handle error input
    // // =====en=======
    // useEffect(() => {
    //     if (inputValue.input_en) {
    //         dispatch(closeError({ type: "en" }));
    //     }
    // }, [inputValue.input_en, dispatch]);
    // // =====ar=======
    // useEffect(() => {
    //     if (inputValue.input_ar) {
    //         dispatch(closeError({ type: "ar" }));
    //     }
    // }, [inputValue.input_ar, dispatch]);
    // // =====fr=======

    // useEffect(() => {
    //     if (inputValue.input_fr) {
    //         dispatch(closeError({ type: "fr" }));
    //     }
    // }, [inputValue.input_fr, dispatch]);
    // useEffect(() => {
    //     return () => {
    //         dispatch(closeError({ type: "all" }));
    //     };
    // }, [dispatch]);
    // //handle  update
    // let handleSubmit = (e) => {
    //     e.preventDefault();
    //     dispatch(
    //         UpdateSubCategoriesThunk({
    //             ar: inputValue?.input_ar,
    //             en: inputValue?.input_en,
    //             fr: inputValue?.input_fr,
    //             main_id: param.idMainCategories,
    //             sub_id: param.editSub,
    //         })
    //     )
    //         .unwrap()
    //         .then((data) => {
    //             // console.log(data);

    //             navigate("/admin/categories/sub");
    //         })
    //         .catch((error) => {
    //             // console.log(error);
    //             // setCode(error.code);
    //             // handle error here
    //         });
    // };
    return (
        <>
            <div className="p-[20px] mt-[40px]">
                <form
                    action=""
                    className="add-box flex  items-start justify-start flex-col px-5 py-[60px]  mb-[40px] add-shadow  "
                    // onSubmit={handleSubmit}
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
                    <div className="flex justify-center flex-col lg:flex-row items-center w-full max-w-[500px]  gap-5 h-full">
                        <>
                            <div
                                className=" w-full"
                                style={{
                                    display: value === 0 ? "block" : "none",
                                }}
                            >
                                <h6 className=" text-[17px] mb-3 font-[500] capitalize  ">
                                    {t(
                                        "pages.SubCategoriesEdit.add.Sub_category_Name"
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
                                        "pages.SubCategoriesEdit.add.Sub_category_Name"
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
                                        "pages.SubCategoriesEdit.add.Sub_category_Name"
                                    )}{" "}
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
                                )}{" "}
                            </div>
                        </>
                    </div>

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className=" !bg-primaryBg  !w-full md:!w-[130px] !h-[50px]  !mt-[30px] !ml-auto"
                    >
                        {t("pages.SubCategoriesEdit.add.Submit")}
                    </Button>
                </form>
            </div>
        </>
    );
};

export default SubCategoriesEdit;
