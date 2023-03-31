import { Alert, IconButton, Snackbar } from '@mui/material';
import React, { useCallback } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const ErrorBox = ({ setOpen, open, Data }) => {
  // const [open, setOpen] = React.useState(false);

  const handleClose = useCallback((event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);

  }, [setOpen]);
  const action = useCallback((e) => {
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}

      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  }, [handleClose]);
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Note archived"
        action={action}
        className=' !right-0  !mx-auto w-fit'
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%', backgroundColor: '#d84646', color: '#fff' }}>
          {Data}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ErrorBox;
