import React, { useCallback } from 'react';
import './LoginBox.css'
import { border, Box } from '@mui/system';
import { Button, FormControl, IconButton, Input, InputAdornment, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router';
const LoginBox = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  let navigate = useNavigate()
  const handleClickShowPassword = useCallback(() => {
    setShowPassword((show) => !show)

  }, []);

  const handleMouseDownPassword = useCallback((event) => {

    event.preventDefault();
  }, [])
  return (
    <>
      <div className="login-box">
        <div className="container ">
          <div className="content">
            <h2>
              Sign In
            </h2>
            <h6>
              Sign in to stay connected.
            </h6>
            <Typography component={'form'} className={'box'}>
              <Typography variant="body1" component={'div'} className='content-box' sx={{ width: '100%' }} >
                <h5>Email</h5>

                <TextField sx={{ width: '100%', }} id="outlined-basic" className='input-box' variant="standard" onChange={(e) => {
                  // console.log(e.target.value)


                }} />

              </Typography>
              <Typography variant="body1" component={'div'} className='content-box' sx={{ width: '100%' }} >
                <h5>Password</h5>
                <FormControl variant="standard" fullWidth className='input-box'>
                  <Input
                    id="standard-adornment-password"
                    className='input-pass'
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e) => {
                      // console.log(e.target.value)


                    }}
                    endAdornment={
                      <InputAdornment position="end">
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

              </Typography>
              <span onClick={() => {
                navigate('/register')

              }} >Forgot Password</span>
              <Button className='submit' variant="contained" type='submit'  >contact</Button>

            </Typography>
          </div>

        </div>

      </div>
    </>
  );
}

export default LoginBox;
