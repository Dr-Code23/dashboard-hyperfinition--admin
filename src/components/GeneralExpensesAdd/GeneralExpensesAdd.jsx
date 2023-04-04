import { Button } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import "./GeneralExpensesAdd.css";

const GeneralExpensesAdd = () => {
    let { t, i18n } = useTranslation();

    return (
        <>
            <>
                <div className="p-[20px] mt-[40px]">
                    <form
                        action=""
                        className="add-box flex  items-start justify-start flex-col px-5 py-[60px]  mb-[40px] add-shadow  "
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <hr className=" w-full my-[40px]" />
                        <div className="flex justify-center flex-col lg:flex-row lg:items-start items-center w-full   gap-[30px] h-full">
                            <div className=" w-full ">
                                <h6 className=" text-[17px] mb-3 font-[500] capitalize  ">
                                    {t("pages.GeneralExpensesAdd.Price")}
                                </h6>
                                <input type="text" />
                            </div>
                            <div className=" w-full ">
                                <h6 className=" text-[17px] mb-3 font-[500] capitalize  ">
                                    {t("pages.GeneralExpensesAdd.Price")}
                                </h6>
                                <textarea className=" min-h-[150px]"></textarea>
                            </div>
                        </div>

                        <hr className=" w-full my-[40px]" />

                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className=" !bg-primaryBg  !w-full md:!w-[130px] !h-[50px]  !mt-[30px] !ml-auto"
                        >
                            {t("pages.GeneralExpensesAdd.Submit")}
                        </Button>
                    </form>
                </div>
            </>
        </>
    );
};

export default React.memo(GeneralExpensesAdd);
