import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ImageUploading from "react-images-uploading";
import img from "../../assets/Img/default.jpg";
import { Tab, Tabs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { OneCategoriesThunk } from "../../RTK/Thunk/OneCategoriesThunk";
import { UpdateCategoriesThunk } from "../../RTK/Thunk/UpdateCategoriesThunk";
import { closeError } from "../../RTK/Reducers/CategoriesReducer";
import { openMessageAlert } from "../../RTK/Reducers/MessageReducer";

const CategoriesEdit = () => {
    let { t, i18n } = useTranslation();
    let dispatch = useDispatch();
    let param = useParams();
    let navigate = useNavigate();

    const [value, setValue] = React.useState(0);
    const [inputValue, setInputValue] = React.useState({
        input_en: "",
        input_ar: "",
        input_fr: "",
    });
    let {
        name_en_Error,
        name_ar_Error,
        name_fr_Error,
        avatarError,
        categoriesName,
        categoriesImg,
    } = useSelector((state) => state.CategoriesReducer);
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
    const [images, setImages] = React.useState([{ data_url: img }]);
    const onChange = (imageList, addUpdateIndex) => {
        // console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    // ========== convertImg===============
    const [imageFile, setImageFile] = useState(null);

    let convertImage = async (imageUrl) => {
        if (imageUrl) {
            let response = await fetch(imageUrl || "", {
                mode: "no-cors",
            });
            let blob = await response.blob();

            let file = new File([blob], "image.jpg", { type: "image/jpeg" });
            setImageFile(file);
        }

        // =========
    };
    useEffect(() => {
        if (categoriesImg) {
            // console.log(oneImg);
            setImages([{ data_url: categoriesImg }]);
        }
    }, [categoriesImg]);
    useEffect(() => {
        if (
            images[0].data_url !== img &&
            images[0].data_url !== categoriesImg
        ) {
            convertImage(images[0].data_url);
        }
    }, [images, categoriesImg]);

    // handle  on loading data
    useEffect(() => {
        if (categoriesName) {
            setInputValue({
                input_en: categoriesName?.en,
                input_ar: categoriesName?.ar,
                input_fr: categoriesName?.fr,
            });
        }
    }, [categoriesName]);
    //handle get data
    useEffect(() => {
        dispatch(OneCategoriesThunk({ id: param.editCategories }));
    }, [dispatch, param.editCategories]);

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
    useEffect(() => {
        return () => {
            dispatch(closeError({ type: "all" }));
        };
    }, [dispatch]);
    //handle  update
    let handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            UpdateCategoriesThunk({
                id: param.editCategories,
                ar: inputValue?.input_ar,
                en: inputValue?.input_en,
                fr: inputValue?.input_fr,
                img: imageFile,
            })
        )
            .unwrap()
            .then((data) => {
                // console.log(data);
                dispatch(openMessageAlert());

                setImages([{ data_url: img }]);
                navigate("/admin/categories/");
            })
            .catch((error) => {
                // console.log(error);
                // setCode(error.code);
                // handle error here
            });
    };
    return (
        <>
            <div className="p-[20px] mt-[40px]">
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
                                className=" w-full mb-3"
                                style={{
                                    display: value === 0 ? "block" : "none",
                                }}
                            >
                                <h6 className="mb-[10px] text-[17px] font-[500] capitalize  ">
                                    {t("pages.CategoriesEdit.add.name")}
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
                                className=" w-full mb-3"
                                style={{
                                    display: value === 1 ? "block" : "none",
                                }}
                            >
                                <h6 className="mb-[10px] text-[17px] font-[500] capitalize  ">
                                    {t("pages.CategoriesEdit.add.name")}
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
                                className=" w-full mb-3"
                                style={{
                                    display: value === 2 ? "block" : "none",
                                }}
                            >
                                <h6 className="mb-[10px] text-[17px] font-[500] capitalize  ">
                                    {t("pages.CategoriesEdit.add.name")}
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
                        <>
                            <ImageUploading
                                multiple
                                value={images}
                                onChange={onChange}
                                maxNumber={"1"}
                                dataURLKey="data_url"
                            >
                                {({
                                    imageList,
                                    onImageUpload,
                                    onImageRemoveAll,
                                    onImageUpdate,
                                    onImageRemove,
                                    isDragging,
                                    dragProps,
                                }) => (
                                    // write your building UI
                                    <>
                                        {imageList.map((image, index) => (
                                            <div
                                                key={index}
                                                className="image-item  w-full flex flex-col  items-start "
                                            >
                                                <h6 className="mb-[10px] text-[17px] font-[500] capitalize  ">
                                                    {t(
                                                        "pages.CategoriesEdit.add.Images"
                                                    )}
                                                </h6>
                                                <img
                                                    src={image["data_url"]}
                                                    className="  min-w-[200px] w-full max-w-[500px] max-h-[280px]  rounded-[6px] sm:w-full cursor-pointer object-cover"
                                                    alt=""
                                                    {...dragProps}
                                                    style={
                                                        isDragging
                                                            ? {
                                                                  border: "4px dashed #1da231",
                                                              }
                                                            : undefined
                                                    }
                                                    width="100"
                                                    onClick={() =>
                                                        onImageUpdate(index)
                                                    }
                                                />
                                                {avatarError !== null && (
                                                    <span
                                                        style={{
                                                            width: "100%",
                                                            color: "red",
                                                            fontSize: "15px",
                                                            marginTop: "20px",
                                                        }}
                                                    >
                                                        {avatarError}
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </>
                                )}
                            </ImageUploading>
                        </>
                    </div>

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className=" !bg-primaryBg  !w-full md:!w-[130px] !h-[50px]  !mt-5 !ml-auto"
                    >
                        {t("pages.CategoriesEdit.add.Submit")}
                    </Button>
                </form>
            </div>
        </>
    );
};

export default CategoriesEdit;
