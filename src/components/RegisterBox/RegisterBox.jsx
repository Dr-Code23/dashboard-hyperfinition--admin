import React, { useCallback } from 'react';
import './RegisterBox.css'
import { border, Box } from '@mui/system';
import { Button, FormControl, IconButton, Input, InputAdornment, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
const RegisterBox = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = useCallback(() => {
    setShowPassword((show) => !show)

  }, []);

  const handleMouseDownPassword = useCallback((event) => {

    event.preventDefault();
  }, [])
  return (
    <>
      <div className="register-box">
        <div className="container ">
          <div className="content">
            <h2>
              Reset Password

            </h2>
            <h6>
              Enter your email address and we’ll send you an email with instructions to reset your password            </h6>
            <Typography component={'form'} className={'box'}>
              <Typography variant="body1" component={'div'} className='content-box' sx={{ width: '100%' }} >
                <h5>Email</h5>

                <TextField sx={{ width: '100%', }} id="outlined-basic" className='input-box' variant="standard" onChange={(e) => {
                  // console.log(e.target.value)


                }} />

              </Typography>
              <Button className='submit' variant="contained" type='submit' >Reset</Button>
            </Typography>
          </div>

        </div>

      </div>
    </>
  );
}

export default RegisterBox;
