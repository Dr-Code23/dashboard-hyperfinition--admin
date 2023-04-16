import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./settingsBox.css";
import { useDispatch, useSelector } from "react-redux";
import { OneSettingThunk } from "../../../RTK/Thunk/OneSettingThunk";
import { UpdateSettingThunk } from "../../../RTK/Thunk/UpdateSettingThunk";
import { closeError } from "../../../RTK/Reducers/SettingReducer";
import { useNavigation } from "react-router-dom";
const SettingsBox = () => {
    let { t, i18n } = useTranslation();
    let dispatch = useDispatch();
    let navigate = useNavigation();
    let {
        settingData,
        error_phones,
        error_facebook,
        error_instagram,
        error_youtube,
        error_whatsapp,
        error_address,
    } = useSelector((state) => state.SettingReducer);
    const [inputValue, setInputValue] = React.useState({
        input_phones: "",
        input_facebook: "",
        input_instagram: "",
        input_youtube: "",
        input_whatsapp: "",
        input_address: "",
    });
    useEffect(() => {
        dispatch(OneSettingThunk());
    }, [dispatch]);
    useEffect(() => {
        if (settingData) {
            setInputValue({
                input_phones: settingData?.phones,
                input_facebook: settingData?.facebook,
                input_instagram: settingData?.instagram,
                input_youtube: settingData?.youtube,
                input_whatsapp: settingData?.whatsapp,
                input_address: settingData?.address,
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
            })
        );
        // .unwrap()
        // .then((data) => {
        //     // //console.log(data);
        //     navigate();
        // })
        // .catch((error) => {
        //     // //console.log(error);
        //     // setCode(error.code);
        //     // handle error here
        // });
    };
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
        </>
    );
};

export default SettingsBox;
