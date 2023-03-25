import React, { useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import './BrandModal.css'
import IconButton from '@mui/material/IconButton'
import img from "../../assets/Img/default.jpg"
import ImageUploading from 'react-images-uploading';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTranslation } from 'react-i18next';


const BrandModal = ({ open, setOpen, nameBrand, setNameBrand }) => {
  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen]);
  const [images, setImages] = React.useState([{ data_url: img }]);
  let { i18n } = useTranslation()

  // useEffect(() => {
  //   setImages([{ data_url: editData.img }])
  // }, [editData.img]);
  const onChange = (imageList, addUpdateIndex) => {
    // console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
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
            <>
              <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={'1'}
                dataURLKey="data_url"
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  // write your building UI
                  <>

                    {imageList.map((image, index) => (
                      <div key={index} className="image-item  w-full">

                        <h6 className='mb-[10px] text-[17px] font-[500] capitalize  '>Images</h6>
                        <img src={image['data_url']} className=" w-[200px] max-h-[280px] mx-[auto] rounded-[6px] sm:w-full cursor-pointer object-cover" alt="" {...dragProps} style={isDragging ? { border: '4px dashed #1da231' } : undefined} width="100" onClick={() => onImageUpdate(index)} />

                      </div>
                    ))}
                  </>
                )}
              </ImageUploading>
            </>
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

export default React.memo(BrandModal);
