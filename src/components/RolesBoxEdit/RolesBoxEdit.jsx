import { Button, FormControl, Grid } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { OneRoleThunk } from "../../RTK/Thunk/OneRoleThunk";
import { closeError, closeRole } from "../../RTK/Reducers/RolesReducer";
import { PermissionsThunk } from "../../RTK/Thunk/PermissionsThunk";
import { UpdateRoleThunk } from "../../RTK/Thunk/UpdateRoleThunk";
import { openMessageAlert } from "../../RTK/Reducers/MessageReducer";
let dataRoles = [
    {
        name: "Order Management",
        status: false,
    },
    {
        name: "User Section",
        status: false,
    },
    {
        name: "Order Management",
        status: true,
    },
    {
        name: "Report & Analytics",
        status: false,
    },
    {
        name: "Refund management",
        status: false,
    },
    {
        name: "Product Management",
        status: true,
    },
    {
        name: "Support Section",
        status: false,
    },
    {
        name: "Order Management",
        status: true,
    },
    {
        name: "Employee Section",
        status: true,
    },
    {
        name: "Dashboard",
        status: false,
    },
];
const RolesBoxEdit = () => {
    let { t, i18n } = useTranslation();
    let param = useParams();
    let dispatch = useDispatch();
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState({
        name: "",
    });
    const [targetData, setTargetData] = useState([]);

    let {
        permissionsData,
        OnePermissionsData,
        oneRoleName,
        nameError,
        roleError,
    } = useSelector((state) => state.RolesReducer);
    // / handle gat data
    useEffect(() => {
        dispatch(OneRoleThunk({ id: param.RolesBoxEdit }));
    }, [dispatch, param.RolesBoxEdit]);
    useEffect(() => {
        if (permissionsData.length < 1) {
            dispatch(PermissionsThunk());
        }
    }, [dispatch, permissionsData, i18n.language]);
    // / handle data on loading
    useEffect(() => {
        if (oneRoleName) {
            setInputValue({ name: oneRoleName });
        }
    }, [dispatch, oneRoleName]);
    // ======= on first open =======
    const roleTarget = useRef(true);
    useEffect(() => {
        if (OnePermissionsData.length) {
            if (roleTarget.current) {
                let data = OnePermissionsData.filter(
                    (el) => el.status === true
                );
                data = data.map((el) => el.id);
                roleTarget.current = false;
                setTargetData(data);
            }
        }
    }, [OnePermissionsData, targetData]);
    useEffect(() => {
        return () => {
            roleTarget.current = true;
            dispatch(closeRole());
        };
    }, []);

    const handleAddData = useCallback(
        (type, id) => {
            if (type === "add") {
                if (!targetData.includes(id)) {
                    setTargetData([...targetData, id]);
                    dispatch(closeError());
                }
            }
            if (type === "remove") {
                let data = targetData.filter((el) => el !== id);
                setTargetData(data);
                dispatch(closeError());
            }
        },
        [targetData, dispatch]
    );

    let handleSubmit = (e) => {
        e.preventDefault();

        dispatch(
            UpdateRoleThunk({
                name: inputValue.name,
                permissions: targetData,
                id: param.RolesBoxEdit,
            })
        )
            .unwrap()
            .then((data) => {
                // console.log(data);
                dispatch(openMessageAlert());

                navigate("/admin/roles");
            })
            .catch((error) => {
                // console.log(error);
                //    setCode(error.code);
            });
    };
    useEffect(() => {
        dispatch(closeError());

        return () => {
            dispatch(closeError());
        };
    }, [inputValue, dispatch]);
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
                                {t("pages.RolesBoxEdit.Role_Name")}
                            </h6>
                            <input
                                type="text"
                                value={inputValue?.name}
                                onChange={(e) => {
                                    setInputValue({
                                        ...inputValue,
                                        name: e.target.value,
                                    });
                                }}
                            />
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
                        {OnePermissionsData.length
                            ? OnePermissionsData.map((el, index) => {
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
                                                          defaultChecked={
                                                              el.status
                                                          }
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
                                                          //   console.log(
                                                          //       "no active"
                                                          //   );
                                                          handleAddData(
                                                              "remove",
                                                              el.id
                                                          );
                                                      } else {
                                                          e.currentTarget.parentElement.parentElement.dataset.name = true;
                                                          //   console.log("active");
                                                          handleAddData(
                                                              "add",
                                                              el.id
                                                          );
                                                      }
                                                      //   console.log(el.id);
                                                  }}
                                                  label={el.name}
                                                  data-name={el.status}
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
                        {t("pages.RolesBoxEdit.Submit")}
                    </Button>
                </form>
            </div>
        </>
    );
};

export default RolesBoxEdit;
