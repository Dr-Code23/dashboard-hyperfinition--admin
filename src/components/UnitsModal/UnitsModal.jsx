import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import "./UnitsModal.css";
import IconButton from "@mui/material/IconButton";

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { OneUnitThunk } from "../../RTK/Thunk/OneUnitThunk";
import HandleMessage from "../HandleMessage/HandleMessage";
import { UpdateUnitThunk } from "../../RTK/Thunk/UpdateUnitThunk";
import { AllUnitsThunk } from "../../RTK/Thunk/AllUnitsThunk";
import { closeModal } from "../../RTK/Reducers/UnitsReducer";
import { AddUnitThunk } from "../../RTK/Thunk/AddUnitThunk";
import UpdateData from "../UpdateData/UpdataData";
const UnitsModal = ({ open, setOpen, typeUnit, setTypeUnit }) => {
    const [openAlert, setOpenAlert] = React.useState(false);
    const [Message, setMessage] = React.useState("");
    const handleClose = useCallback(() => {
        setOpen(false);
    }, [setOpen]);
    let { t } = useTranslation();
    let dispatch = useDispatch();

    const [inputValue, setInputValue] = useState("");
    const [code, setCode] = useState(0);
    let { nameUnit, currentPage } = useSelector((state) => state.UnitsReducer);
    // change input value after open modal

    useEffect(() => {
        if (typeUnit.type === "update") {
            setInputValue(nameUnit);
        }
        if (typeUnit.type === "add") {
            // console.log("add");
        }
    }, [typeUnit.type, nameUnit]);
    useEffect(() => {
        if (typeUnit.type === "update") {
            dispatch(OneUnitThunk({ id: typeUnit?.id }));
        }
        if (typeUnit.type === "add") {
            // console.log("add");
        }
    }, [typeUnit.type, dispatch, typeUnit?.id]);
    //handle sub form

    let handleSubmit = (e) => {
        e.preventDefault();
        if (typeUnit.type === "update") {
            // console.log("update");
            dispatch(
                UpdateUnitThunk({
                    name: inputValue,
                    id: typeUnit.id,
                })
            )
                .unwrap()
                .then((data) => {
                    // console.log(data);
                    setMessage(t("code_error.The_Data_Has_Been_Updated"));
                    setOpenAlert(true);
                    dispatch(AllUnitsThunk({ page: currentPage, search: "" }));
                    setCode(0);

                    setOpen(false);
                    setTypeUnit({ type: "", id: "" });
                    setInputValue("");
                    dispatch(closeModal());
                })
                .catch((error) => {
                    // console.log(error);
                    setCode(error.code);
                    // handle error here
                });

            dispatch(closeModal());
        }
        if (typeUnit.type === "add") {
            // console.log("add");
            dispatch(
                AddUnitThunk({
                    name: inputValue,
                })
            )
                .unwrap()
                .then((data) => {
                    // console.log(data);
                    setMessage(t("code_error.The_Data_Has_Been_Updated"));
                    setOpenAlert(true);
                    dispatch(AllUnitsThunk({ page: currentPage, search: "" }));
                    setCode(0);
                    setOpen(false);
                    setTypeUnit({ type: "", id: "" });
                    setInputValue("");
                    dispatch(closeModal());
                })
                .catch((error) => {
                    // console.log(error);
                    setCode(error.code);
                    // handle error here
                });
        }
    };
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="units-modal">
                    <form action="" dir="" onSubmit={handleSubmit}>
                        <IconButton
                            aria-label=""
                            onClick={() => {
                                setCode(0);
                                setOpen(false);
                                setTypeUnit({ type: "", id: "" });
                                setInputValue("");
                                dispatch(closeModal());
                            }}
                            className="close-modal"
                        >
                            <CloseIcon />
                        </IconButton>
                        <h5>{t("pages.UnitsModal.New_Unit_Name")}</h5>
                        <div className=" w-full">
                            <h6 className="mb-[10px] text-[17px] font-[500] capitalize  ">
                                {t("pages.UnitsModal.Name")}
                            </h6>

                            <input
                                type="text"
                                placeholder={t("pages.UnitsModal.placeholder")}
                                value={inputValue}
                                onChange={(e) => {
                                    setInputValue(e.target.value);
                                }}
                            />
                        </div>

                        <Button
                            className="submit  !bg-primaryBg"
                            variant="contained"
                            type="submit"
                        >
                            {t("pages.UnitsModal.Submit")}
                        </Button>
                        <HandleMessage code={code} />
                    </form>
                </Box>
            </Modal>
            <UpdateData
                setOpenAlert={setOpenAlert}
                openAlert={openAlert}
                Data={Message}
            />
        </>
    );
};

export default UnitsModal;
