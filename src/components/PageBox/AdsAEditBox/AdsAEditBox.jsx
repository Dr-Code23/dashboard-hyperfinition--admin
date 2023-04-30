import React, { useEffect, useState } from "react";
import "./AdsAEditBox.css";
import ImageUploading from "react-images-uploading";
import img from "../../../assets/Img/default.jpg";
import { Tab, Tabs, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { closeError } from "../../../RTK/Reducers/AdsReducer";
import { useNavigate, useParams } from "react-router-dom";
import { OneAdsThunk } from "../../../RTK/Thunk/OneAdsThunk";
import { UpdateAdsThunk } from "../../../RTK/Thunk/UpdateAdsThunk";
import { openMessageAlert } from "../../../RTK/Reducers/MessageReducer";
const AdsAEditBox = () => {
    let { t, i18n } = useTranslation();
    let dispatch = useDispatch();
    let param = useParams();
    let navigate = useNavigate();
    const [value, setValue] = React.useState(0);
    const [inputValue, setInputValue] = useState({
        name_en: "",
        name_ar: "",
        name_fr: "",
        desc_en: "",
        desc_ar: "",
        desc_fr: "",
        discount: "",
    });
    const [images, setImages] = React.useState([{ data_url: img }]);
    const onChange = (imageList, addUpdateIndex) => {
        // console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    let {
        oneImg,
        nameError_en,
        nameError_ar,
        nameError_fr,
        descError_en,
        descError_ar,
        descError_fr,
        avatarError,
        discountError,
        oneAds,
    } = useSelector((state) => state.AdsReducer);
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

    // ============= handle get data user================
    // console.log(!!oneAds);
    useEffect(() => {
        if (param.editAds) {
            dispatch(OneAdsThunk({ id: param.editAds }));
        }
    }, [dispatch, param.editAds]);
    useEffect(() => {
        dispatch(closeError());
    }, [dispatch, inputValue]);
    useEffect(() => {
        return () => {
            dispatch(closeError());
        };
    }, []);
    // handle input value
    useEffect(() => {
        if (oneAds) {
            setInputValue({
                name_en: oneAds?.title?.en,
                name_ar: oneAds?.title?.ar,
                name_fr: oneAds?.title?.fr,
                desc_en: oneAds?.description?.en,
                desc_ar: oneAds?.description?.ar,
                desc_fr: oneAds?.description?.fr,
                discount: oneAds?.discount,
            });
        }
    }, [oneAds]);
    useEffect(() => {
        if (oneImg) {
            setImages([{ data_url: oneImg }]);
        }
    }, [oneImg]);

    let handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            UpdateAdsThunk({
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
                discount: inputValue.discount,
                id: param.editAds,
                img: images[0].data_url === oneImg ? "" : images[0].file,
            })
        )
            .unwrap()
            .then((data) => {
                // console.log(data);
                dispatch(openMessageAlert());

                navigate("/admin/ads");
            })
            .catch((error) => {
                // console.log(error);
                //    setCode(error.code);
            });
    };
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
                        <div className=" w-full">
                            <>
                                <div className="flex justify-start w-full items-start mb-5  flex-col gap-[15px]">
                                    <h6 className=" text-[17px] font-[500] capitalize  ">
                                        {t("pages.adsAdd.discount")}
                                    </h6>
                                    <input
                                        type="text"
                                        className=" "
                                        value={inputValue?.discount}
                                        onChange={(e) => {
                                            setInputValue({
                                                ...inputValue,
                                                discount: e.target.value,
                                            });
                                        }}
                                    />
                                    {discountError !== null && (
                                        <span
                                            style={{
                                                width: "100%",
                                                color: "red",
                                                fontSize: "15px",
                                                marginBottom: "15px",
                                                display: "block",
                                            }}
                                        >
                                            {discountError}
                                        </span>
                                    )}
                                </div>
                            </>
                        </div>
                        <div
                            className=" w-full"
                            style={{ display: value === 0 ? "block" : "none" }}
                        >
                            <>
                                <div className="flex justify-start w-full items-start mb-5  flex-col gap-[15px]">
                                    <h6 className=" text-[17px] font-[500] capitalize  ">
                                        {t("pages.adsAdd.Title")}
                                    </h6>
                                    <input
                                        type="text"
                                        className=" "
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
                                                marginBottom: "15px",
                                                display: "block",
                                            }}
                                        >
                                            {nameError_en}
                                        </span>
                                    )}
                                </div>
                                <div className="flex justify-start w-full items-start mb-5  flex-col gap-[15px]">
                                    <h6 className=" text-[17px] font-[500] capitalize  ">
                                        {t("pages.adsAdd.Description")}
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
                                                marginBottom: "15px",
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
                                <div className="flex justify-start w-full items-start mb-5  flex-col gap-[15px]">
                                    <h6 className=" text-[17px] font-[500] capitalize  ">
                                        {t("pages.adsAdd.Title")}
                                    </h6>
                                    <input
                                        type="text"
                                        className=" "
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
                                                marginBottom: "15px",
                                                display: "block",
                                            }}
                                        >
                                            {nameError_ar}
                                        </span>
                                    )}
                                </div>
                                <div className="flex justify-start w-full items-start mb-5  flex-col gap-[15px]">
                                    <h6 className=" text-[17px] font-[500] capitalize  ">
                                        {t("pages.adsAdd.Description")}
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
                                                marginBottom: "15px",
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
                                <div className="flex justify-start w-full items-start mb-5  flex-col gap-[15px]">
                                    <h6 className=" text-[17px] font-[500] capitalize  ">
                                        {t("pages.adsAdd.Title")}
                                    </h6>
                                    <input
                                        type="text"
                                        className=" "
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
                                                marginBottom: "15px",

                                                display: "block",
                                            }}
                                        >
                                            {nameError_fr}
                                        </span>
                                    )}
                                </div>
                                <div className="flex justify-start w-full items-start mb-5  flex-col gap-[15px]">
                                    <h6 className=" text-[17px] font-[500] capitalize  ">
                                        {t("pages.adsAdd.Description")}
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
                                                marginBottom: "15px",
                                                display: "block",
                                            }}
                                        >
                                            {descError_fr}
                                        </span>
                                    )}
                                </div>
                            </>
                        </div>
                        <div className="flex justify-start w-full items-start mb-5  flex-col gap-[15px]">
                            <h6 className=" text-[17px] font-[500] capitalize  ">
                                {t("pages.adsAdd.Image")}
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
                                        marginBottom: "15px",
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
                            {t("pages.adsAdd.Submit")}
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AdsAEditBox;
