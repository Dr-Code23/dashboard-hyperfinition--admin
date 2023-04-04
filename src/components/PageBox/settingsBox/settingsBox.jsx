import { Button } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import "./settingsBox.css";
const SettingsBox = () => {
    let { t, i18n } = useTranslation();

    return (
        <>
            <div className=" w-full add-box mt-[40px] mx-auto pb-[120px] h-full flex justify-center items-start">
                <div className="box   w-full add-shadow max-w-[600px] gap-[30px] flex flex-col justify-start items-start  py-[60px]  px-[20px] ">
                    <div className=" flex flex-col justify-start items-start w-full gap-[10px]">
                        <h6 className=" text-[17px]   font-[500] capitalize  ">
                            {t("pages.SettingsBox.Facebook")} :
                        </h6>
                        <input type="text" />
                    </div>
                    <div className=" flex flex-col justify-start items-start w-full gap-[10px]">
                        <h6 className=" text-[17px]   font-[500] capitalize  ">
                            {t("pages.SettingsBox.Instagram")} :
                        </h6>
                        <input type="text" />
                    </div>
                    <div className=" flex flex-col justify-start items-start w-full gap-[10px]">
                        <h6 className=" text-[17px]   font-[500] capitalize  ">
                            {t("pages.SettingsBox.Whatsapp")} :
                        </h6>
                        <input type="text" />
                    </div>
                    <div className=" flex flex-col justify-start items-start w-full gap-[10px]">
                        <h6 className=" text-[17px]   font-[500] capitalize  ">
                            {t("pages.SettingsBox.Youtube")} :
                        </h6>
                        <input type="text" />
                    </div>
                    <div className=" flex flex-col justify-start items-start w-full gap-[10px]">
                        <h6 className=" text-[17px]   font-[500] capitalize  ">
                            {t("pages.SettingsBox.Phones")} :
                        </h6>
                        <textarea className="min-h-[150px]"></textarea>
                    </div>
                    <div className=" flex flex-col justify-start items-start w-full gap-[10px]">
                        <h6 className=" text-[17px]   font-[500] capitalize  ">
                            {t("pages.SettingsBox.Address")} :
                        </h6>
                        <textarea className="min-h-[150px]"></textarea>
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className=" !bg-primaryBg  !w-full md:!w-[150px] !h-[50px] !ml-auto"
                    >
                        {t("pages.SettingsBox.Submit")}
                    </Button>
                </div>
            </div>
        </>
    );
};

export default SettingsBox;
