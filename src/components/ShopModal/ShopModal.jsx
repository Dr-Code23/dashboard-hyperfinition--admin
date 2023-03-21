import React, { useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import './ShopModal.css'
import IconButton from '@mui/material/IconButton'
import ImageUploading from 'react-images-uploading';
import img from "../../assets/Img/default.jpg";

const ShopModal = ({ open, setOpen, editData, setEditData }) => {
  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen]);
  const [images, setImages] = React.useState([]);
  useEffect(() => {
    setImages([{ data_url: editData.img }])
  }, [editData.img]);
  const onChange = (imageList, addUpdateIndex) => {
    // console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="shop-modal" >
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
            <h5>Edit shop detail </h5>
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
                      <div key={index} className="image-item">
                        <h6>Images</h6>
                        <img src={image['data_url']} className=" w-[200px] max-h-[280px] mx-[auto] sm:w-full cursor-pointer object-cover" alt="" {...dragProps} style={isDragging ? { border: '4px dashed #000' } : undefined} width="100" onClick={() => onImageUpdate(index)} />

                      </div>
                    ))}
                  </>
                )}
              </ImageUploading>
            </>

            <div>
              <h6>name</h6>
              <input type="text" placeholder='Name ' value={editData.name} onChange={(e) => {
                setEditData({ ...editData, name: e.target.value });
              }} />
            </div>
            <div>
              <h6>Phone</h6>
              <input type="text" placeholder='Number' value={editData.phone} onChange={(e) => {
                setEditData({ ...editData, phone: e.target.value });
              }} />
            </div>
            <div>
              <h6>Address</h6>
              <input type="text" placeholder='Address' value={editData.address} onChange={(e) => {
                setEditData({ ...editData, address: e.target.value });
              }} />
            </div>
            <Button className='submit' variant="contained" type='submit'    >Submit</Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default ShopModal;
