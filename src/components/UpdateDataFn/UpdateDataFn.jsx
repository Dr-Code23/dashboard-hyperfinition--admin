import CloseIcon from "@mui/icons-material/Close";
import { Alert, IconButton, Snackbar } from "@mui/material";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { closeAlert } from "../../RTK/Reducers/MessageReducer";
import { useEffect } from "react";
import { useState } from "react";
const UpdateDataFn = ({ setOpenAlert, openAlert, Data }) => {
    // console.log(openAlert);
    let dispatch = useDispatch();
    const [time, setTime] = useState(0);
    const handleClose = useCallback(
        (event, reason) => {
            if (reason === "clickaway") {
                return;
            }
            dispatch(closeAlert());
            setOpenAlert(false);
        },
        [dispatch, setOpenAlert]
    );
    const action = useCallback(
        (e) => {
            <>
                <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleClose}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            </>;
        },
        [handleClose]
    );

    useEffect(() => {
        return () => {
            if (openAlert) {
                setOpenAlert(false);
                dispatch(closeAlert());
                // setTime(0);
                // console.log("said");
            }
        };
    }, [openAlert, setOpenAlert, dispatch]);
    return (
        <>
            <Snackbar
                open={openAlert}
                autoHideDuration={openAlert ? 1600 : 0}
                onClose={handleClose}
                message="Note archived"
                action={action}
                className=" !right-0  !mx-auto w-fit  max-[450px]:!max-w-[80%]"
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    className=" !w-full !max-w-full"
                    sx={{
                        backgroundColor: "#4baf16",
                        color: "#fff",
                    }}
                >
                    {Data}
                </Alert>
            </Snackbar>
        </>
    );
};

export default React.memo(UpdateDataFn);

//     const [openAlert, setOpenAlert] = React.useState(false);
//     const [Message, setMessage] = React.useState("");

//             <UpdateData
//                 setOpenAlert={setOpenAlert}
//                 openAlert={openAlert}
//                 Data={Message}
//             />

// =====update=========
//   setMessage(t("code_error.The_Data_Has_Been_Updated"));
//   setOpenAlert(true);
