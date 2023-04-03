import React, { useEffect } from 'react';
import './AboutBox.css'
import ImageUploading from 'react-images-uploading';
import img from "../../../assets/Img/default.jpg"
import { Tab, Tabs, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
const AboutBox = () => {
  const [images, setImages] = React.useState([{ data_url: img }]);
  let { i18n } = useTranslation()
  const [value, setValue] = React.useState(0);
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
  const onChange = (imageList, addUpdateIndex) => {
    // console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  return (
    <>
      <div className="p-[20px] my-[60px]">
        <div className="about-box add-box w-full flex justify-center add-shadow  items-center h-full py-[40px] px-[20px]">
          <form className="box  flex justify-start gap-[40px] items-center flex-col  w-full max-w-[750px]  h-full p-[20px]">
            <div className='flex justify-start w-full items-start  mt-[40px] '>
              <Tabs value={value} onChange={handleChange} centered sx={{ mb: '20px' }} className='justify-start'>
                <Tab label="English(en)" className='!p-2' />
                <Tab label="Arabic(ar)" className='!p-2' />
                <Tab label="French(fr)" className='!p-2' />
              </Tabs>
            </div>
            <div className=' w-full' style={{ display: value === 0 ? 'block' : 'none' }}>
              <>
                <div className='flex justify-start w-full items-start  flex-col gap-[15px]'>
                  <h6 className=' text-[17px] font-[500] capitalize  '>Title(en)</h6>
                  <input type="text" placeholder='Title' className='' />
                </div>
                <div className='flex justify-start w-full items-start  flex-col gap-[15px]'>
                  <h6 className=' text-[17px] font-[500] capitalize  '>Description(en)</h6>
                  <textarea className='min-h-[150px]'></textarea>
                </div>
              </>
            </div>
            <div className=' w-full' style={{ display: value === 1 ? 'block' : 'none' }}>
              <>
                <div className='flex justify-start w-full items-start  flex-col gap-[15px]'>
                  <h6 className=' text-[17px] font-[500] capitalize  '>Title(ar)</h6>
                  <input type="text" placeholder='Title' className='' />
                </div>
                <div className='flex justify-start w-full items-start  flex-col gap-[15px]'>
                  <h6 className=' text-[17px] font-[500] capitalize  '>Description(ar)</h6>
                  <textarea className='min-h-[150px]'></textarea>
                </div>
              </>
            </div>
            <div className=' w-full' style={{ display: value === 2 ? 'block' : 'none' }}>
              <>
                <div className='flex justify-start w-full items-start  flex-col gap-[15px]'>
                  <h6 className=' text-[17px] font-[500] capitalize  '>Title(fr)</h6>
                  <input type="text" placeholder='Title' className='' />
                </div>
                <div className='flex justify-start w-full items-start  flex-col gap-[15px]'>
                  <h6 className=' text-[17px] font-[500] capitalize  '>Description(fr)</h6>
                  <textarea className='min-h-[150px]'></textarea>
                </div>
              </>
            </div>
            <div className='flex justify-start w-full items-start  flex-col gap-[15px]'>
              <h6 className=' text-[17px] font-[500] capitalize  '>image</h6>
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


                        <img src={image['data_url']} key={index} className=" max-h-[350px] mx-[auto] w-full cursor-pointer object-cover" alt="" {...dragProps} style={isDragging ? { border: '4px dashed #000' } : undefined} width="100" onClick={() => onImageUpdate(index)} />


                      ))}
                    </>
                  )}
                </ImageUploading>
              </>

            </div>
            <Button variant="contained" color="primary" type='submit' className=' !bg-primaryBg  !w-full md:!w-[150px] !h-[50px] !ml-auto'  >
              submit
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AboutBox;
