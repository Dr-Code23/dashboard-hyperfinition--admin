import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import "./AttributesModal.css";
import IconButton from "@mui/material/IconButton";
import { HandleMessage } from "../index";

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { OneAttributeThunk } from "../../RTK/Thunk/OneAttributeThunk";
import { closeModal } from "../../RTK/Reducers/AttributeReducer";
import { UpdateAttributeThunk } from "../../RTK/Thunk/UpdateAttributeThunk";
import { AttributeThunk } from "../../RTK/Thunk/AttributeThunk";
import { AddAttributeThunk } from "../../RTK/Thunk/AddAttributeThunk";
const AttributesModal = ({
    open,
    setOpen,
    typeAttributes,
    setTypeAttributes,
}) => {
    let { t } = useTranslation();
    let dispatch = useDispatch();

    const handleClose = useCallback(() => {
        setOpen(false);
    }, [setOpen]);
    const [inputValue, setInputValue] = useState("");
    const [code, setCode] = useState(0);
    let { nameAttribute, currentPage } = useSelector(
        (state) => state.AttributeReducer
    );

    // change input value after open modal

    useEffect(() => {
        if (typeAttributes.type === "update") {
            setInputValue(nameAttribute);
        }
        if (typeAttributes.type === "add") {
            // //console.log("add");
        }
    }, [typeAttributes.type, nameAttribute]);
    //handle update

    useEffect(() => {
        if (typeAttributes.type === "update") {
            dispatch(OneAttributeThunk({ id: typeAttributes?.id }));
        }
        if (typeAttributes.type === "add") {
            // //console.log("add");
        }
    }, [typeAttributes.type, dispatch, typeAttributes?.id]);

    //handle sub form

    let handleSubmit = (e) => {
        e.preventDefault();
        if (typeAttributes.type === "update") {
            // //console.log("update");
            dispatch(
                UpdateAttributeThunk({
                    name: inputValue,
                    id: typeAttributes.id,
                })
            )
                .unwrap()
                .then((data) => {
                    // //console.log(data);
                    dispatch(AttributeThunk({ page: currentPage }));
                    setCode(0);

                    setOpen(false);
                    setTypeAttributes({ type: "", id: "" });
                    setInputValue("");
                    dispatch(closeModal());
                })
                .catch((error) => {
                    // //console.log(error);
                    setCode(error.code);
                    // handle error here
                });

            dispatch(closeModal());
        }
        if (typeAttributes.type === "add") {
            // //console.log("add");
            dispatch(
                AddAttributeThunk({
                    name: inputValue,
                })
            )
                .unwrap()
                .then((data) => {
                    // //console.log(data);
                    dispatch(AttributeThunk({ page: currentPage }));
                    setCode(0);
                    setOpen(false);
                    setTypeAttributes({ type: "", id: "" });
                    setInputValue("");
                })
                .catch((error) => {
                    // //console.log(error);
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
                <Box className="attribute-modal">
                    <form action="" dir="" onSubmit={handleSubmit}>
                        <IconButton
                            aria-label=""
                            onClick={() => {
                                setOpen(false);
                                setTypeAttributes({ type: "", id: "" });
                                setInputValue("");
                                setCode(0);

                                dispatch(closeModal());
                            }}
                            className="close-modal"
                        >
                            <CloseIcon />
                        </IconButton>
                        <h5>{t("pages.AttributesModal.New_Unit_Name")}</h5>

                        <div className=" w-full">
                            <h6 className="mb-[10px] text-[17px] font-[500] capitalize  ">
                                {t("pages.AttributesModal.Name")}
                            </h6>

                            <input
                                type="text"
                                placeholder={t(
                                    "pages.AttributesModal.placeholder"
                                )}
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
                            {t("pages.AttributesModal.Submit")}
                        </Button>
                        <HandleMessage code={code} />
                    </form>
                </Box>
            </Modal>
        </>
    );
};

export default AttributesModal;
