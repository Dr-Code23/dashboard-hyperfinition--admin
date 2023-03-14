import React, { useCallback } from 'react';
import './LoginBox.css'
import { border, Box } from '@mui/system';
import { Button, FormControl, IconButton, Input, InputAdornment, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { useFormik } from 'formik';

import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { LoginThunk } from '../../RTK/Thunk/LoginThunk';

// =====validation===========
const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('must be a valid email')
    .required('Required'),

  //.matches(/^[A-Z]/, 'The first letter must be capitalize'),

  pass: Yup.string()
    .min(4, 'Too Short!')
    .max(14, 'Too Long!')
    .required('Required'),

});
const LoginBox = () => {
  let dispatch = useDispatch()
  const [showPassword, setShowPassword] = React.useState(false);
  let navigate = useNavigate()
  const handleClickShowPassword = useCallback(() => {
    setShowPassword((show) => !show)

  }, []);

  const handleMouseDownPassword = useCallback((event) => {

    event.preventDefault();
  }, [])
  const formik = useFormik({
    initialValues: {
      email: '',
      pass: '',
    },
    onSubmit: values => {
      // console.log(values)
      dispatch(LoginThunk(values))
    },
    validationSchema: SignupSchema,
  });


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
            <Typography component={'form'} className={'box'} onSubmit={formik.handleSubmit}>
              <Typography variant="body1" component={'div'} className='content-box' sx={{ width: '100%' }} >
                <h5>Email</h5>

                <TextField sx={{ width: '100%', }} id="outlined-basic" className='input-box' variant="standard" name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email} />
                {formik.errors.email && formik.touched.email ? (
                  <span style={{ width: "100%", color: 'red', fontSize: '15px', marginTop: '5px' }}>{formik.errors.email}</span>
                ) : null}
              </Typography>
              <Typography variant="body1" component={'div'} className='content-box' sx={{ width: '100%' }} >
                <h5>Password</h5>
                <FormControl variant="standard" fullWidth className='input-box'>
                  <Input
                    id="standard-adornment-password"
                    className='input-pass'
                    type={showPassword ? 'text' : 'password'}
                    name="pass"
                    onChange={formik.handleChange}
                    value={formik.values.pass}
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
                {formik.errors.pass && formik.touched.pass ? (
                  <span style={{ width: "100%", color: 'red', fontSize: '15px', marginTop: '5px' }}>{formik.errors.pass}</span>
                ) : null}
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
