import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import "./GeneralExpensesAdd.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddGeneralThunk } from "../../RTK/Thunk/AddGeneralThunk";
import { closeError } from "../../RTK/Reducers/GeneralReducer";

const GeneralExpensesAdd = () => {
    let { t, i18n } = useTranslation();
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        price: "",
        desc: "",
    });
    let { descError, priceError } = useSelector(
        (state) => state.GeneralReducer
    );
    useEffect(() => {
        dispatch(closeError());
    }, [dispatch, inputValue]);
    useEffect(() => {
        return () => {
            dispatch(closeError());
        };
    }, []);
    let handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            AddGeneralThunk({
                price: inputValue.price,
                reason: inputValue.desc,
            })
        )
            .unwrap()
            .then((data) => {
                // //console.log(data);
                navigate("/admin/generalExpenses");
            })
            .catch((error) => {
                // //console.log(error);
                //    setCode(error.code);
            });
    };
    return (
        <>
            <>
                <div className="p-[20px] mt-[40px]">
                    <form
                        action=""
                        className="add-box flex  items-start justify-start flex-col px-5 py-[60px]  mb-[40px] add-shadow  "
                        onSubmit={handleSubmit}
                    >
                        <hr className=" w-full my-[40px]" />
                        <div className="flex justify-center flex-col lg:flex-row lg:items-start items-center w-full   gap-[30px] h-full">
                            <div className=" w-full ">
                                <h6 className=" text-[17px] mb-3 font-[500] capitalize  ">
                                    {t("pages.GeneralExpensesAdd.Price")}
                                </h6>
                                <input
                                    type="text"
                                    value={inputValue?.price}
                                    onChange={(e) => {
                                        setInputValue({
                                            ...inputValue,
                                            price: e.target.value,
                                        });
                                    }}
                                />
                                {priceError !== null && (
                                    <span
                                        style={{
                                            width: "100%",
                                            color: "red",
                                            fontSize: "15px",
                                            marginBottom: "15px",
                                            marginTop: "15px",
                                            display: "block",
                                        }}
                                    >
                                        {priceError}
                                    </span>
                                )}
                            </div>
                            <div className=" w-full ">
                                <h6 className=" text-[17px] mb-3 font-[500] capitalize  ">
                                    {t("pages.GeneralExpensesAdd.Description")}
                                </h6>
                                <textarea
                                    className=" min-h-[150px]"
                                    value={inputValue?.desc}
                                    onChange={(e) => {
                                        setInputValue({
                                            ...inputValue,
                                            desc: e.target.value,
                                        });
                                    }}
                                ></textarea>
                                {descError !== null && (
                                    <span
                                        style={{
                                            width: "100%",
                                            color: "red",
                                            fontSize: "15px",
                                            marginBottom: "15px",
                                            marginTop: "15px",
                                            display: "block",
                                        }}
                                    >
                                        {descError}
                                    </span>
                                )}
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
