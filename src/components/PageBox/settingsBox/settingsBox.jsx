import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./settingsBox.css";
import img from "../../../assets/Img/default.jpg";
import ImageUploading from "react-images-uploading";

import { useDispatch, useSelector } from "react-redux";
import { OneSettingThunk } from "../../../RTK/Thunk/OneSettingThunk";
import { UpdateSettingThunk } from "../../../RTK/Thunk/UpdateSettingThunk";
import { closeError } from "../../../RTK/Reducers/SettingReducer";
import { useNavigation } from "react-router-dom";
import UpdateDataFn from "../../UpdateDataFn/UpdateDataFn";
import { openMessageAlert } from "../../../RTK/Reducers/MessageReducer";
const SettingsBox = () => {
    let { t, i18n } = useTranslation();
    const [images, setImages] = React.useState([{ data_url: img }]);

    let dispatch = useDispatch();
    let navigate = useNavigation();
    let {
        settingData,
        error_phones,
        avatarError,
        error_email,
        error_facebook,
        error_instagram,
        error_youtube,
        error_whatsapp,
        settingImg,
        error_address,
    } = useSelector((state) => state.SettingReducer);

    const [inputValue, setInputValue] = React.useState({
        input_phones: "",
        input_facebook: "",
        input_instagram: "",
        input_youtube: "",
        input_whatsapp: "",
        input_address: "",
        email: "",
    });
    const onChange = (imageList, addUpdateIndex) => {
        // console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };
    useEffect(() => {
        dispatch(OneSettingThunk());
    }, [dispatch]);
    // handle data on loading
    useEffect(() => {
        if (settingImg) {
            // console.log(oneImg);
            setImages([{ data_url: settingImg }]);
        }
    }, [settingImg]);

    useEffect(() => {
        if (settingData) {
            setInputValue({
                input_phones: settingData?.phones,
                input_facebook: settingData?.facebook,
                input_instagram: settingData?.instagram,
                input_youtube: settingData?.youtube,
                input_whatsapp: settingData?.whatsapp,
                input_address: settingData?.address,
                email: settingData?.email,
            });
        }
    }, [settingData]);
    // handle error input
    // =====en=======
    useEffect(() => {
        if (inputValue.input_phones) {
            dispatch(closeError({ type: "ph" }));
        }
    }, [inputValue.input_phones, dispatch]);
    // =====ar=======
    useEffect(() => {
        if (inputValue.input_facebook) {
            dispatch(closeError({ type: "fa" }));
        }
    }, [inputValue.input_facebook, dispatch]);
    // =====fr=======

    useEffect(() => {
        if (inputValue.input_instagram) {
            dispatch(closeError({ type: "in" }));
        }
    }, [inputValue.input_instagram, dispatch]);
    // =============
    useEffect(() => {
        if (inputValue.input_youtube) {
            dispatch(closeError({ type: "yo" }));
        }
    }, [inputValue.input_youtube, dispatch]);
    // =============
    useEffect(() => {
        if (inputValue.input_whatsapp) {
            dispatch(closeError({ type: "wh" }));
        }
    }, [inputValue.input_whatsapp, dispatch]);
    // =============
    // =============
    useEffect(() => {
        if (inputValue.input_address) {
            dispatch(closeError({ type: "ad" }));
        }
    }, [inputValue.input_address, dispatch]);
    useEffect(() => {
        if (inputValue.email) {
            dispatch(closeError({ type: "em" }));
        }
    }, [inputValue.email, dispatch]);
    // =============
    let handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            UpdateSettingThunk({
                phones: inputValue.input_phones,
                facebook: inputValue.input_facebook,
                instagram: inputValue.input_instagram,
                youtube: inputValue.input_youtube,
                whatsapp: inputValue.input_whatsapp,
                address: inputValue.input_address,
                email: inputValue.email,
                logo: images[0]?.file,
            })
        )
            .unwrap()
            .then((data) => {
                dispatch(openMessageAlert());

                if (images[0]?.file) {
                    localStorage.setItem("logo_dh", images[0].data_url);
                }
            });
        // .catch((error) => {
        //     // console.log(error);
        //     // setCode(error.code);
        //     // handle error here
        // });
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
            <div className=" w-full add-box mt-[40px] mx-auto pb-[120px] h-full flex justify-center items-start">
                <form
                    className="box   w-full add-shadow max-w-[600px] gap-[30px] flex flex-col justify-start items-start  py-[60px]  px-[20px] "
                    onSubmit={handleSubmit}
                >
                    <div className=" flex flex-col justify-start items-start w-full gap-[10px]">
                        <h6 className=" text-[17px]   font-[500] capitalize  ">
                            {t("pages.SettingsBox.Facebook")} :
                        </h6>
                        <input
                            type="text"
                            value={inputValue?.input_facebook}
                            onChange={(e) => {
                                setInputValue({
                                    ...inputValue,
                                    input_facebook: e.target.value,
                                });
                            }}
                        />
                        {error_facebook !== null && (
                            <span
                                style={{
                                    width: "100%",
                                    color: "red",
                                    fontSize: "15px",
                                    marginTop: "20px",
                                    display: "block",
                                }}
                            >
                                {error_facebook}
                            </span>
                        )}
                    </div>
                    <div className=" flex flex-col justify-start items-start w-full gap-[10px]">
                        <h6 className=" text-[17px]   font-[500] capitalize  ">
                            {t("pages.SettingsBox.Instagram")} :
                        </h6>
                        <input
                            type="text"
                            value={inputValue?.input_instagram}
                            onChange={(e) => {
                                setInputValue({
                                    ...inputValue,
                                    input_instagram: e.target.value,
                                });
                            }}
                        />
                        {error_instagram !== null && (
                            <span
                                style={{
                                    width: "100%",
                                    color: "red",
                                    fontSize: "15px",
                                    marginTop: "20px",
                                    display: "block",
                                }}
                            >
                                {error_instagram}
                            </span>
                        )}{" "}
                    </div>
                    <div className=" flex flex-col justify-start items-start w-full gap-[10px]">
                        <h6 className=" text-[17px]   font-[500] capitalize  ">
                            {t("pages.SettingsBox.Whatsapp")} :
                        </h6>
                        <input
                            type="text"
                            value={inputValue?.input_whatsapp}
                            onChange={(e) => {
                                setInputValue({
                                    ...inputValue,
                                    input_whatsapp: e.target.value,
                                });
                            }}
                        />
                        {error_whatsapp !== null && (
                            <span
                                style={{
                                    width: "100%",
                                    color: "red",
                                    fontSize: "15px",
                                    marginTop: "20px",
                                    display: "block",
                                }}
                            >
                                {error_whatsapp}
                            </span>
                        )}{" "}
                    </div>
                    <div className=" flex flex-col justify-start items-start w-full gap-[10px]">
                        <h6 className=" text-[17px]   font-[500] capitalize  ">
                            {t("pages.SettingsBox.Youtube")} :
                        </h6>
                        <input
                            type="text"
                            value={inputValue?.input_youtube}
                            onChange={(e) => {
                                setInputValue({
                                    ...inputValue,
                                    input_youtube: e.target.value,
                                });
                            }}
                        />
                        {error_youtube !== null && (
                            <span
                                style={{
                                    width: "100%",
                                    color: "red",
                                    fontSize: "15px",
                                    marginTop: "20px",
                                    display: "block",
                                }}
                            >
                                {error_youtube}
                            </span>
                        )}{" "}
                    </div>
                    <div className=" flex flex-col justify-start items-start w-full gap-[10px]">
                        <h6 className=" text-[17px]   font-[500] capitalize  ">
                            {t("print.Email")} :
                        </h6>
                        <input
                            type="text"
                            value={inputValue?.email}
                            onChange={(e) => {
                                setInputValue({
                                    ...inputValue,
                                    email: e.target.value,
                                });
                            }}
                        />
                        {error_email !== null && (
                            <span
                                style={{
                                    width: "100%",
                                    color: "red",
                                    fontSize: "15px",
                                    marginTop: "20px",
                                    display: "block",
                                }}
                            >
                                {error_email}
                            </span>
                        )}{" "}
                    </div>
                    <div className=" flex flex-col justify-start items-start w-full gap-[10px]">
                        <h6 className=" text-[17px]   font-[500] capitalize  ">
                            {t("pages.SettingsBox.Phones")} :
                        </h6>
                        <textarea
                            className="min-h-[150px]"
                            value={inputValue?.input_phones}
                            onChange={(e) => {
                                setInputValue({
                                    ...inputValue,
                                    input_phones: e.target.value,
                                });
                            }}
                        ></textarea>
                        {error_phones !== null && (
                            <span
                                style={{
                                    width: "100%",
                                    color: "red",
                                    fontSize: "15px",
                                    marginTop: "20px",
                                    display: "block",
                                }}
                            >
                                {error_phones}
                            </span>
                        )}{" "}
                    </div>
                    <div className=" flex flex-col justify-start items-start w-full gap-[10px]">
                        <h6 className=" text-[17px]   font-[500] capitalize  ">
                            {t("pages.SettingsBox.Address")} :
                        </h6>
                        <textarea
                            className="min-h-[150px]"
                            value={inputValue?.input_address}
                            onChange={(e) => {
                                setInputValue({
                                    ...inputValue,
                                    input_address: e.target.value,
                                });
                            }}
                        ></textarea>
                        {error_address !== null && (
                            <span
                                style={{
                                    width: "100%",
                                    color: "red",
                                    fontSize: "15px",
                                    marginTop: "20px",
                                    display: "block",
                                }}
                            >
                                {error_address}
                            </span>
                        )}{" "}
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
                        {t("pages.SettingsBox.Submit")}
                    </Button>
                </form>
            </div>
            <UpdateDataFn
                openAlert={openAlertFn}
                setOpenAlert={setOpenAlertFn}
                Data={Message}
            />
        </>
    );
};

export default SettingsBox;
