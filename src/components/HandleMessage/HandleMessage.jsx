import React from "react";
import { useTranslation } from "react-i18next";

const HandleMessage = ({ code }) => {
    let { t, i18n } = useTranslation();

    return (
        <>
            {code === 422 && (
                <h2 className=" capitalize text-red-500 ">
                    {t("code_error.The_Main_value_Must_be_entered")}
                </h2>
            )}
        </>
    );
};

export default HandleMessage;
