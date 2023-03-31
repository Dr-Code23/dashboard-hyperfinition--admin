
import React, { useCallback } from 'react';
import { Button, FormControl, IconButton, Input, InputAdornment, Typography } from '@mui/material';
import { AddAPhoto, Shortcut, Visibility, VisibilityOff } from '@mui/icons-material';
import './ProfileBox.css'
import img from "../../../assets/Img/default.jpg"
import ImageUploading from 'react-images-uploading';

const ProfileBox = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = useCallback(() => {
    setShowPassword((show) => !show)

  }, []);
  const handleMouseDownPassword = useCallback((event) => {

    event.preventDefault();
  }, [])
  const [images, setImages] = React.useState([{ data_url: img }]);
  console.log(images[0])

  // useEffect(() => {
  //   setImages([{ data_url: editData.img }])
  // }, [editData.img]);
  const onChange = (imageList, addUpdateIndex) => {
    // console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  return (
    <>
      <div className='p-[20px] mt-[60px]'>
        <form action="" className="add-box flex  relative items-start justify-start flex-col px-5 pb-[60px] pt-[130px]  mb-[40px] add-shadow  " onSubmit={(e) => {
          e.preventDefault()
        }}>

          <div className=' flex  w-full gap-[30px] justify-center items-center flex-col lg:flex-row'>

            <div className=' min-w-[250px] gap-[20px] flex   flex-col justify-center items-center  w-full lg:max-w-[500px]'>
              <FormControl className='min-h-[75.5px] min-w-[250px] w-full lg:max-w-[500px]' >
                <h6 className=' text-[17px]  mb-3 font-[500] capitalize  '>Full Name *</h6>
                <input type="text" placeholder='Name' />

              </FormControl>
              <FormControl className='min-h-[75.5px] min-w-[250px] w-full lg:max-w-[500px]' >
                <h6 className=' text-[17px]  mb-3 font-[500] capitalize  '>Email *</h6>
                <input type="email" placeholder='Email' />

              </FormControl>
            </div>

            <div className=' min-w-[250px]  gap-[20px] flex   flex-col justify-center items-center w-full lg:max-w-[500px]'>
              <FormControl className='min-h-[75.5px] min-w-[250px] w-full lg:max-w-[500px]' >
                <h6 className=' text-[17px]  mb-3 font-[500] capitalize  '>New Password *</h6>
                <FormControl variant="standard" fullWidth className='input-box'>
                  <Input
                    id="standard-adornment-password"
                    className='input-pass'
                    type={showPassword ? 'text' : 'password'}
                    name="pass"
                    endAdornment={
                      <InputAdornment position="end" >
                        <IconButton
                          disableRipple
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>


              </FormControl>
              <FormControl className='min-h-[75.5px] min-w-[250px] w-full lg:max-w-[500px]' >
                <h6 className=' text-[17px]  mb-3 font-[500] capitalize  '>Confirm Password *</h6>
                <FormControl variant="standard" fullWidth className='input-box'>
                  <Input
                    id="standard-adornment-password"
                    className='input-pass'
                    type={showPassword ? 'text' : 'password'}
                    name="pass"
                    endAdornment={
                      <InputAdornment position="end" >
                        <IconButton
                          disableRipple
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>


              </FormControl>
            </div>








          </div>

          <Button variant="contained" color="primary" className=' !bg-primaryBg  !w-full md:!w-[150px] !h-[50px]  !mt-[30px] !ml-auto'  >
            Save Changes

          </Button>
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
                    <div className=' cursor-pointer bg-white w-[150px] img-shadow  h-[150px] absolute top-[-75px] left-[50%] translate-x-[-50%] rounded-full overflow-hidden'>
                      <img src={image['data_url']} className='w-full h-full object-cover' alt="" onClick={() => onImageUpdate(index)} />

                    </div>
                  ))}
                </>
              )}
            </ImageUploading>
          </>
          <hr className=' w-full my-[40px]' />


        </form>
      </div>
    </>
  );
}

export default ProfileBox;