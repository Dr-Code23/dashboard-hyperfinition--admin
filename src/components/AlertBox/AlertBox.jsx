import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

let AlertDialog = ({ open, setOpen, handleDelete, setDeleteId, deleteId }) => {


  const handleClose = () => {
    setOpen(false);
    setDeleteId(0)

  };
  let handleDeleteTarget = () => {


    handleDelete(deleteId)
    handleClose()
  }
  return (
    <div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className=''>
          {"Are You sure to Delete The Item ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            the item cannot be retrieved after its letter
          </DialogContentText>
        </DialogContent>
        <DialogActions className=' !flex !justify-center !items-center !gap-[15px]'>
          <Button className=' !bg-primaryBg !text-white !m-0 !px-[10px] py-[8px]' onClick={handleClose}>Disagree</Button>
          <Button className=' !bg-primaryBg !text-white !m-0 !px-[10px] py-[8px]' onClick={handleDeleteTarget} autoFocus>
            delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default React.memo(AlertDialog)