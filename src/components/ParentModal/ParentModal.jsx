import React, { useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import './ParentModal.css'
import IconButton from '@mui/material/IconButton'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTranslation } from 'react-i18next';


const ParentModal = ({ openParent, setOpenParent }) => {
  const handleClose = useCallback(() => {
    setOpenParent(false)
  }, [setOpenParent]);
  let { i18n } = useTranslation()
  const [value, setValue] = React.useState('');
  //handle input language
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (i18n.language === 'en') {
      setValue(0)
    }
    if (i18n.language === 'ar') {
      setValue(1)
    }
    if (i18n.language === 'fr') {
      setValue(2)
    }
  }, [i18n.language]);
  return (
    <>
      <Modal
        open={openParent}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="parent-modal" >
          <form action="" dir='' onSubmit={(e) => {
            e.preventDefault();

          }}>

            <IconButton aria-label="" onClick={() => {
              setOpenParent(false)

            }}
              className="close-modal"
            >
              <CloseIcon />

            </IconButton>
            <h5>Parent Category </h5>

            <Tabs value={value} onChange={handleChange} centered sx={{ mb: '20px' }}>
              <Tab label="English(en)" />
              <Tab label="Arabic(ar)" />
              <Tab label="French(fr)" />
            </Tabs>
            <div className=' w-full' style={{ display: value === 0 ? 'block' : 'none' }}>
              <h6 className='mb-[10px] text-[17px] font-[500] capitalize  '>Name(en)</h6>

              <input type="text" placeholder='Brand Name' onChange={(e) => {

                // setNameBrand(e.target.value);
              }} />
            </div>
            <div className=' w-full' style={{ display: value === 1 ? 'block' : 'none' }}>
              <h6 className='mb-[10px] text-[17px] font-[500] capitalize  '>Name(ar)</h6>

              <input type="text" placeholder='Brand Name' onChange={(e) => {

                // setNameBrand(e.target.value);
              }} />
            </div>
            <div className=' w-full' style={{ display: value === 2 ? 'block' : 'none' }}>
              <h6 className='mb-[10px] text-[17px] font-[500] capitalize  '>Name(fr)</h6>

              <input type="text" placeholder='Brand Name' onChange={(e) => {

                // setNameBrand(e.target.value);
              }} />
            </div>
            <Button className='submit !bg-primaryBg' variant="contained" type='submit'    >Submit</Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default React.memo(ParentModal
);
