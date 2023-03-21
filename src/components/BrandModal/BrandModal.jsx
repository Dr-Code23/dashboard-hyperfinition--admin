import React, { useCallback } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import './BrandModal.css'
import IconButton from '@mui/material/IconButton'




const BrandModal = ({ open, setOpen, nameBrand, setNameBrand }) => {
  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen]);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="brand-modal" >
          <form action="" dir='' onSubmit={(e) => {
            e.preventDefault();

          }}>

            <IconButton aria-label="" onClick={() => {
              setOpen(false)

            }}
              className="close-modal"
            >
              <CloseIcon />

            </IconButton>
            <h5>New Brand Name</h5>
            <input type="text" placeholder='Brand Name' value={nameBrand} onChange={(e) => {

              setNameBrand(e.target.value);
            }} />
            <Button className='submit' variant="contained" type='submit'    >Submit</Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default React.memo(BrandModal);
