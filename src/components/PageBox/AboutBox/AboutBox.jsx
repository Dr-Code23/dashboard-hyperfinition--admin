import React, { useEffect, useState } from "react";
import "./AboutBox.css";
import ImageUploading from "react-images-uploading";
import img from "../../../assets/Img/default.jpg";
import { Tab, Tabs, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { OneAboutThunk } from "../../../RTK/Thunk/OneAboutThunk";
import { closeAbout, closeError } from "../../../RTK/Reducers/AboutReducer";
import { UpdateAboutThunk } from "../../../RTK/Thunk/UpdateAboutThunk";
import { openMessageAlert } from "../../../RTK/Reducers/MessageReducer";
import UpdateDataFn from "../../UpdateDataFn/UpdateDataFn";
const AboutBox = () => {
    const [images, setImages] = React.useState([{ data_url: img }]);
    let { t, i18n } = useTranslation();
    let dispatch = useDispatch();

    const [value, setValue] = React.useState(0);
    const [inputValue, setInputValue] = useState({
        name_en: "",
        name_ar: "",
        name_fr: "",
        desc_en: "",
        desc_ar: "",
        desc_fr: "",
    });

    let {
        oneImg,
        nameError_en,
        nameError_ar,
        nameError_fr,
        descError_en,
        descError_ar,
        descError_fr,
        avatarError,
        oneAbout,
    } = useSelector((state) => state.AboutReducer);
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
    const onChange = (imageList, addUpdateIndex) => {
        // console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };
    // ============= handle get data user================
    // console.log(!!oneAbout);

    useEffect(() => {
        dispatch(closeError());
    }, [dispatch, inputValue]);
    useEffect(() => {
        return () => {
            dispatch(closeError());
        };
    }, []);
    useEffect(() => {
        if (oneAbout == "") {
            dispatch(OneAboutThunk());
        }
    }, [dispatch, oneAbout]);
    useEffect(() => {
        return () => {
            dispatch(closeAbout());
        };
    }, [dispatch]);

    // handle input value
    useEffect(() => {
        if (oneAbout) {
            setInputValue({
                name_en: oneAbout?.name?.en,
                name_ar: oneAbout?.name?.ar,
                name_fr: oneAbout?.name?.fr,
                desc_en: oneAbout?.description?.en,
                desc_ar: oneAbout?.description?.ar,
                desc_fr: oneAbout?.description?.fr,
            });
        }
    }, [oneAbout]);
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
    // handle img value on loading
    useEffect(() => {
        if (oneImg) {
            // console.log(oneImg);
            setImages([{ data_url: oneImg }]);
        }
    }, [oneImg]);
    // handle img fil value on change

    useEffect(() => {
        if (images[0].data_url !== img && images[0].data_url !== oneImg) {
            convertImage(images[0].data_url);
        }
    }, [images, oneImg]);

    let handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            UpdateAboutThunk({
                name: {
                    en: inputValue.name_en,
                    ar: inputValue.name_ar,
                    fr: inputValue.name_fr,
                },
                desc: {
                    en: inputValue.desc_en,
                    ar: inputValue.desc_ar,
                    fr: inputValue.desc_fr,
                },
                img: imageFile,
            })
        )
            .unwrap()
            .then((data) => {
                dispatch(openMessageAlert());

                // console.log(data);
            })
            .catch((error) => {
                // console.log(error);
                //    setCode(error.code);
            });
    };
    // ===================================
    const [openAlertFn, setOpenAlertFn] = React.useState(false);
    const [Message, setMessage] = React.useState("");
    let { typeAlert } = useSelector((state) => state.MessageReducer);

    useEffect(() => {
        if (typeAlert) {
            setMessage(t("code_error.The_Data_Has_Been_Updated"));
            setOpenAlertFn(true);
        }
        return () => {
            setOpenAlertFn(false);
        };
    }, [typeAlert, t]);
    return (
        <>
            <div className="p-[20px] my-[60px]">
                <div className="about-box add-box w-full flex justify-center add-shadow  items-center h-full py-[40px] px-[20px]">
                    <form
                        className="box  flex justify-start gap-[40px] items-center flex-col  w-full max-w-[750px]  h-full p-[20px]"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex justify-start w-full items-start  mt-[40px] ">
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                centered
                                sx={{ mb: "20px" }}
                                className="justify-start"
                            >
                                <Tab
                                    label={t("Language.English")}
                                    className="!p-2"
                                />
                                <Tab
                                    label={t("Language.Arabic")}
                                    className="!p-2"
                                />
                                <Tab
                                    label={t("Language.French")}
                                    className="!p-2"
                                />
                            </Tabs>
                        </div>
                        <div
                            className=" w-full"
                            style={{ display: value === 0 ? "block" : "none" }}
                        >
                            <>
                                <div className="flex justify-start w-full items-start  flex-col gap-[15px]">
                                    <h6 className=" text-[17px] font-[500] capitalize  ">
                                        {t("pages.AboutBox.Title")}
                                    </h6>
                                    <input
                                        type="text"
                                        className=" mb-[20px]"
                                        value={inputValue?.name_en}
                                        onChange={(e) => {
                                            setInputValue({
                                                ...inputValue,
                                                name_en: e.target.value,
                                            });
                                        }}
                                    />{" "}
                                    {nameError_en !== null && (
                                        <span
                                            style={{
                                                width: "100%",
                                                color: "red",
                                                fontSize: "15px",
                                                marginTop: "0px",
                                                display: "block",
                                            }}
                                        >
                                            {nameError_en}
                                        </span>
                                    )}
                                </div>
                                <div className="flex justify-start w-full items-start  flex-col gap-[15px]">
                                    <h6 className=" text-[17px] font-[500] capitalize  ">
                                        {t("pages.AboutBox.Description")}
                                    </h6>
                                    <textarea
                                        className="min-h-[150px]"
                                        value={inputValue?.desc_en}
                                        onChange={(e) => {
                                            setInputValue({
                                                ...inputValue,
                                                desc_en: e.target.value,
                                            });
                                        }}
                                    ></textarea>
                                    {descError_en !== null && (
                                        <span
                                            style={{
                                                width: "100%",
                                                color: "red",
                                                fontSize: "15px",
                                                marginTop: "0px",
                                                display: "block",
                                            }}
                                        >
                                            {descError_en}
                                        </span>
                                    )}
                                </div>
                            </>
                        </div>
                        <div
                            className=" w-full"
                            style={{ display: value === 1 ? "block" : "none" }}
                        >
                            <>
                                <div className="flex justify-start w-full items-start  flex-col gap-[15px]">
                                    <h6 className=" text-[17px] font-[500] capitalize  ">
                                        {t("pages.AboutBox.Title")}
                                    </h6>
                                    <input
                                        type="text"
                                        className=" mb-[20px]"
                                        value={inputValue?.name_ar}
                                        onChange={(e) => {
                                            setInputValue({
                                                ...inputValue,
                                                name_ar: e.target.value,
                                            });
                                        }}
                                    />
                                    {nameError_ar !== null && (
                                        <span
                                            style={{
                                                width: "100%",
                                                color: "red",
                                                fontSize: "15px",
                                                marginTop: "0px",
                                                display: "block",
                                            }}
                                        >
                                            {nameError_ar}
                                        </span>
                                    )}
                                </div>
                                <div className="flex justify-start w-full items-start  flex-col gap-[15px]">
                                    <h6 className=" text-[17px] font-[500] capitalize  ">
                                        {t("pages.AboutBox.Description")}
                                    </h6>
                                    <textarea
                                        className="min-h-[150px]"
                                        value={inputValue?.desc_ar}
                                        onChange={(e) => {
                                            setInputValue({
                                                ...inputValue,
                                                desc_ar: e.target.value,
                                            });
                                        }}
                                    ></textarea>
                                    {descError_ar !== null && (
                                        <span
                                            style={{
                                                width: "100%",
                                                color: "red",
                                                fontSize: "15px",
                                                marginTop: "0px",
                                                display: "block",
                                            }}
                                        >
                                            {descError_ar}
                                        </span>
                                    )}
                                </div>
                            </>
                        </div>
                        <div
                            className=" w-full"
                            style={{ display: value === 2 ? "block" : "none" }}
                        >
                            <>
                                <div className="flex justify-start w-full items-start  flex-col gap-[15px]">
                                    <h6 className=" text-[17px] font-[500] capitalize  ">
                                        {t("pages.AboutBox.Title")}
                                    </h6>
                                    <input
                                        type="text"
                                        className=" mb-[20px]"
                                        value={inputValue?.name_fr}
                                        onChange={(e) => {
                                            setInputValue({
                                                ...inputValue,
                                                name_fr: e.target.value,
                                            });
                                        }}
                                    />
                                    {nameError_fr !== null && (
                                        <span
                                            style={{
                                                width: "100%",
                                                color: "red",
                                                fontSize: "15px",
                                                marginTop: "0px",
                                                display: "block",
                                            }}
                                        >
                                            {nameError_fr}
                                        </span>
                                    )}
                                </div>
                                <div className="flex justify-start w-full items-start  flex-col gap-[15px]">
                                    <h6 className=" text-[17px] font-[500] capitalize  ">
                                        {t("pages.AboutBox.Description")}
                                    </h6>
                                    <textarea
                                        className="min-h-[150px]"
                                        value={inputValue?.desc_fr}
                                        onChange={(e) => {
                                            setInputValue({
                                                ...inputValue,
                                                desc_fr: e.target.value,
                                            });
                                        }}
                                    ></textarea>
                                    {descError_fr !== null && (
                                        <span
                                            style={{
                                                width: "100%",
                                                color: "red",
                                                fontSize: "15px",
                                                marginTop: "0px",
                                                display: "block",
                                            }}
                                        >
                                            {descError_fr}
                                        </span>
                                    )}
                                </div>
                            </>
                        </div>
                        <div className="flex justify-start w-full items-start  flex-col gap-[15px]">
                            <h6 className=" text-[17px] font-[500] capitalize  ">
                                {t("pages.AboutBox.Image")}
                            </h6>
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
                                                <img
                                                    src={image["data_url"]}
                                                    key={index}
                                                    className=" max-h-[350px] mx-[auto] w-full cursor-pointer object-cover"
                                                    alt=""
                                                    {...dragProps}
                                                    style={
                                                        isDragging
                                                            ? {
                                                                  border: "4px dashed #000",
                                                              }
                                                            : undefined
                                                    }
                                                    width="100"
                                                    onClick={() =>
                                                        onImageUpdate(index)
                                                    }
                                                />
                                            ))}
                                        </>
                                    )}
                                </ImageUploading>
                            </>
                            {avatarError !== null && (
                                <span
                                    style={{
                                        width: "100%",
                                        color: "red",
                                        fontSize: "15px",
                                        marginTop: "0px",
                                        display: "block",
                                    }}
                                >
                                    {avatarError}
                                </span>
                            )}
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className=" !bg-primaryBg  !w-full md:!w-[150px] !h-[50px] !ml-auto"
                        >
                            {t("pages.AboutBox.Submit")}
                        </Button>
                    </form>
                </div>
            </div>
            <UpdateDataFn
                openAlert={openAlertFn}
                setOpenAlert={setOpenAlertFn}
                Data={Message}
            />
        </>
    );
};

export default AboutBox;
