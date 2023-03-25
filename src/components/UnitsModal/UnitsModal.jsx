
import React, { useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import './UnitsModal.css'
import IconButton from '@mui/material/IconButton'

import { useTranslation } from 'react-i18next';
const UnitsModal = ({ open, setOpen, nameBrand, setNameBrand }) => {

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen]);
  let { i18n } = useTranslation()



  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="units-modal" >
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
            <h5>New Attribute Name</h5>


            <div className=' w-full' >
              <h6 className='mb-[10px] text-[17px] font-[500] capitalize  '>Name</h6>

              <input type="text" placeholder='Brand Name' onChange={(e) => {

                // setNameBrand(e.target.value);
              }} />
            </div>

            <Button className='submit  !bg-primaryBg' variant="contained" type='submit'    >Submit</Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default UnitsModal;
