import { Alert, IconButton, Snackbar } from "@mui/material";
import React, { useCallback } from "react";
import CloseIcon from "@mui/icons-material/Close";
const UpdateData = ({ setOpenAlert, openAlert, Data }) => {
    const handleClose = useCallback(
        (event, reason) => {
            if (reason === "clickaway") {
                return;
            }
            setOpenAlert(false);
        },
        [setOpenAlert]
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
    return (
        <>
            <Snackbar
                open={openAlert}
                autoHideDuration={1500}
                onClose={handleClose}
                message="Note archived"
                action={action}
                className=" !right-0  !mx-auto w-fit"
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{
                        width: "100%",
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

export default UpdateData;

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
