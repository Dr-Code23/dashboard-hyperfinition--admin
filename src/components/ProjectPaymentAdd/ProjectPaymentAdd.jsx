import { Button, FormControl } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SelectBox from "../SelectBox/SelectBox";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SelectProjectThunk } from "../../RTK/Thunk/SelectProjectThunk";
import { AddPaymentThunk } from "../../RTK/Thunk/AddPaymentThunk";
import { closeError } from "../../RTK/Reducers/PaymentReducer";
import { openMessageAlert } from "../../RTK/Reducers/MessageReducer";
let selectData = ["name", "email", "pass"];
const ProjectPaymentAdd = () => {
    let { t, i18n } = useTranslation();
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const [selectTarget, setSelectTarget] = React.useState({
        Project: "",
    });
    const [inputValue, setInputValue] = useState({
        price: "",
        desc: "",
    });
    const [targetIdSelect, setTargetIdSelect] = React.useState({
        main: "",
    });
    let { descError, priceError, projectSelectData } = useSelector(
        (state) => state.PaymentReducer
    );
    // handle select on loading
    useEffect(() => {
        if (targetIdSelect.main === "" && projectSelectData.length) {
            setTargetIdSelect({
                ...targetIdSelect,
                main: projectSelectData[0]?.id,
            });
        }
    }, [projectSelectData, targetIdSelect]);

    // console.log(targetIdSelect);

    useEffect(() => {
        dispatch(SelectProjectThunk());
    }, [dispatch]);
    let handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            AddPaymentThunk({
                price: inputValue.price,
                project_id: targetIdSelect.main,
            })
        )
            .unwrap()
            .then((data) => {
                // console.log(data);
                dispatch(openMessageAlert());

                navigate("/admin/projectPayment");
            })
            .catch((error) => {
                // console.log(error);
                //    setCode(error.code);
            });
    };
    useEffect(() => {
        dispatch(closeError());
    }, [dispatch, inputValue]);
    useEffect(() => {
        return () => {
            dispatch(closeError());
        };
    }, []);
    return (
        <>
            <div className="p-[20px] mt-[40px]">
                <form
                    action=""
                    className="add-box flex  items-start justify-start flex-col px-5 py-[60px]  mb-[40px] add-shadow  "
                    onSubmit={handleSubmit}
                >
                    <div className=" flex flex-wrap  w-full gap-[30px] justify-start items-center">
                        <FormControl
                            className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[440px]"
                            onClick={(e) => {
                                // console.log(e.target.textContent)
                                // setSelectTarget({
                                //     ...selectTarget,
                                //     Project: e.target.textContent,
                                // });
                                // console.log(e.target.textContent)
                                if (e.target.tagName == "LI") {
                                    // console.log(e.target.textContent);
                                    setSelectTarget({
                                        ...selectTarget,
                                        Main_Category: e.target.textContent,
                                    });
                                    let data = projectSelectData.filter(
                                        (el) => el.name === e.target.textContent
                                    );
                                    setTargetIdSelect({
                                        ...targetIdSelect,
                                        main: data[0].id,
                                    });
                                    // dispatch(
                                    //     SelectSubCategoriesThunk({
                                    //         id: data[0].id,
                                    //     })
                                    // )
                                    //     .unwrap()
                                    //     .then((data) => {
                                    //         // console.log(data);
                                    //         setTargetIdSelect({
                                    //             ...targetIdSelect,
                                    //             sub: data.data[0]?.id,
                                    //         });
                                    //     });
                                }
                            }}
                        >
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t("pages.ProjectPaymentAdd.Project")}
                            </h6>
                            <SelectBox TargetData={projectSelectData} />
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
                            )}{" "}
                        </FormControl>
                        <FormControl className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[440px]">
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t("pages.ProjectPaymentAdd.Price")}
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
                            )}{" "}
                        </FormControl>
                    </div>
                    {/* ======================== */}
                    <hr className=" w-full my-[40px]" />

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className=" !bg-primaryBg  !w-full md:!w-[130px] !h-[50px]  !mt-[30px] !ml-auto"
                    >
                        {t("pages.ProjectPaymentAdd.Submit")}
                    </Button>
                </form>
            </div>
        </>
    );
};

export default ProjectPaymentAdd;
