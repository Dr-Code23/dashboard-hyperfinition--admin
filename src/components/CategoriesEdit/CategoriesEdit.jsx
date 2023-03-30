import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ImageUploading from 'react-images-uploading';
import img from "../../assets/Img/default.jpg"
import { Tab, Tabs, } from '@mui/material';

const CategoriesEdit = () => {
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
  const [images, setImages] = React.useState([{ data_url: img }]);
  const onChange = (imageList, addUpdateIndex) => {
    // console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  return (
    <>
      <div className='p-[20px] mt-[40px]'>
        <form action="" className="add-box flex  items-start justify-start flex-col px-5 py-[60px]  mb-[40px] add-shadow  " onSubmit={(e) => {
          e.preventDefault()
        }}>
          <Tabs value={value} onChange={handleChange} centered sx={{ mb: '20px' }} className='justify-start'>
            <Tab label="English(en)" className='!p-2' />
            <Tab label="Arabic(ar)" className='!p-2' />
            <Tab label="French(fr)" className='!p-2' />
          </Tabs>
          <hr className=' w-full my-[20px]' />
          <div className='flex justify-center flex-col lg:flex-row items-center w-full  gap-5 h-full'>
            <>

              <div className=' w-full mb-3' style={{ display: value === 0 ? 'block' : 'none' }}>
                <h6 className='mb-[10px] text-[17px] font-[500] capitalize  '>Name(en)</h6>

                <input type="text" placeholder='Name' />
              </div>
              <div className=' w-full mb-3' style={{ display: value === 1 ? 'block' : 'none' }}>
                <h6 className='mb-[10px] text-[17px] font-[500] capitalize  '>Name(ar)</h6>

                <input type="text" placeholder='Name' />
              </div>
              <div className=' w-full mb-3' style={{ display: value === 2 ? 'block' : 'none' }}>
                <h6 className='mb-[10px] text-[17px] font-[500] capitalize  '>Name(fr)</h6>

                <input type="text" placeholder='Name' />
              </div>
            </>
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
                      <div key={index} className="image-item  w-full flex flex-col  items-start ">

                        <h6 className='mb-[10px] text-[17px] font-[500] capitalize  '>Images</h6>
                        <img src={image['data_url']} className="  min-w-[200px] w-full max-w-[500px] max-h-[280px]  rounded-[6px] sm:w-full cursor-pointer object-cover" alt="" {...dragProps} style={isDragging ? { border: '4px dashed #1da231' } : undefined} width="100" onClick={() => onImageUpdate(index)} />

                      </div>
                    ))}
                  </>
                )}
              </ImageUploading>
            </>
          </div>

          <Button variant="contained" color="primary" type='submit' className=' !bg-primaryBg  !w-full md:!w-[130px] !h-[50px]  !mt-5 !ml-auto'  >
            update

          </Button>
        </form>
      </div>

    </>
  );
}

export default CategoriesEdit;
