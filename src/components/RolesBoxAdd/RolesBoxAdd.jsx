import { Button, FormControl, Grid } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PermissionsThunk } from "../../RTK/Thunk/PermissionsThunk";
import { AddRoleThunk } from "../../RTK/Thunk/AddRoleThunk";
import { closeError } from "../../RTK/Reducers/RolesReducer";

const RolesBoxAdd = () => {
    const navigate = useNavigate();
    let dispatch = useDispatch();

    let { t, i18n } = useTranslation();
    let { permissionsData, nameError, roleError } = useSelector(
        (state) => state.RolesReducer
    );
    const [targetData, setTargetData] = useState([]);
    const [inputValue, setInputValue] = useState({
        name: "",
    });
    useEffect(() => {
        dispatch(closeError())

        return () => {
            dispatch(closeError())

        };
    }, [inputValue, dispatch]);
    useEffect(() => {
        if (permissionsData.length < 1) {
            dispatch(PermissionsThunk());
        }
    }, [dispatch, permissionsData, i18n.language]);
    const handleAddData = useCallback((type, id) => {
        if (type === 'add') {
            if (!targetData.includes(id)) {
                setTargetData([...targetData, id]);
                dispatch(closeError())
            }
        }
        if (type === 'remove') {
            let data = targetData.filter((el) => el !== id)
            setTargetData(data);
            dispatch(closeError())

        }


    }
        , [targetData, dispatch]);
    let handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            AddRoleThunk({
                name: inputValue.name,
                permissions: targetData,
            })
        )
            .unwrap()
            .then((data) => {
                // //console.log(data);
                navigate("/admin/roles")
            })
            .catch((error) => {
                // //console.log(error);
                //    setCode(error.code);
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
                    <div className=" flex flex-wrap  w-full gap-[30px] justify-start items-center">
                        <FormControl className="min-h-[75.5px] min-w-[250px] w-full ">
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t("pages.RolesBoxAdd.Role_Name")}
                            </h6>
                            <input type="text" value={inputValue?.name}
                                onChange={(e) => {
                                    setInputValue({
                                        ...inputValue,
                                        name: e.target.value,
                                    });
                                }} />
                            {nameError !== null && (
                                <span
                                    style={{
                                        width: "100%",
                                        color: "red",
                                        fontSize: "15px",
                                        marginTop: "20px",
                                        display: "block",
                                    }}
                                >
                                    {nameError}
                                </span>
                            )}
                        </FormControl>
                    </div>
                    {/* ======================== */}
                    <hr className=" w-full my-[40px]" />
                    <Grid
                        container
                        spacing={0}
                        className=" w-full bg-slate-50 min-h-[300px]"
                    >
                        {permissionsData.length
                            ? permissionsData.map((el, index) => {
                                return (
                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                        lg={4}
                                        className="p-5"
                                        key={el.id}
                                    >
                                        <div className=" w-full  bg-white px-[20px] py-[10px]">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                    // defaultChecked={el.status}
                                                    />
                                                }
                                                onChange={(e) => {
                                                    if (
                                                        e.currentTarget
                                                            .parentElement
                                                            .parentElement
                                                            .dataset.name ==
                                                        "true"
                                                    ) {
                                                        e.currentTarget.parentElement.parentElement.dataset.name = false;
                                                        //   //console.log(
                                                        //       "no active"
                                                        //   );
                                                        handleAddData('remove', el.id);

                                                    } else {
                                                        e.currentTarget.parentElement.parentElement.dataset.name = true;
                                                        //   //console.log("active");
                                                        handleAddData('add', el.id);
                                                    }
                                                    //   //console.log(el.id);
                                                }}
                                                label={el.name}
                                                data-name={"false"}
                                            />
                                        </div>
                                    </Grid>
                                );
                            })
                            : null}
                    </Grid>
                    {roleError !== null && (
                        <span
                            style={{
                                width: "100%",
                                color: "red",
                                fontSize: "15px",
                                marginTop: "20px",
                                display: "block",
                            }}
                        >
                            {roleError}
                        </span>
                    )}
                    <hr className=" w-full my-[40px]" />

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className=" !bg-primaryBg  !w-full md:!w-[130px] !h-[50px]  !mt-[30px] !ml-auto"
                    >
                        {t("pages.RolesBoxAdd.Submit")}
                    </Button>
                </form>
            </div>
        </>
    );
};

export default RolesBoxAdd;
