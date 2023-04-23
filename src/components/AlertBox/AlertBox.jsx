import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';

let AlertDialog = ({ open, setOpen, handleDelete, setDeleteId, deleteId }) => {
  let { t } = useTranslation();
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
          {t("remove_Modal.Are_you_sure_to_Delete_The_Item")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("remove_Modal.the_item_cannot_be_retrieved_after_its_letter")}


          </DialogContentText>
        </DialogContent>
        <DialogActions className=' !flex !justify-center !items-center !gap-[15px]'>
          <Button className=' !bg-primaryBg !text-white !m-0 !px-[10px] py-[8px]' onClick={handleClose}>
            {t("remove_Modal.Disagree")}
          </Button>
          <Button className=' !bg-primaryBg !text-white !m-0 !px-[10px] py-[8px]' onClick={handleDeleteTarget} autoFocus>
            {t("remove_Modal.delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default React.memo(AlertDialog)