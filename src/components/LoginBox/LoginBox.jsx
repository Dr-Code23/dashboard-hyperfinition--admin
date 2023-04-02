import React, { useCallback, useEffect } from 'react';
import './LoginBox.css'
import { Button, FormControl, IconButton, Input, InputAdornment, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { LoginThunk } from '../../RTK/Thunk/LoginThunk';

// =====validation===========
const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('must be a valid email')
    .required('Required'),


  pass: Yup.string()
    .required('Required'),

});
const LoginBox = () => {
  let dispatch = useDispatch()
  let navigate = useNavigate()
  let { code } = useSelector((state) => state.LoginReducer);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showErrorForm, setShowErrorForm] = React.useState(false);
  const handleClickShowPassword = useCallback(() => {
    setShowPassword((show) => !show)

  }, []);
  const handleMouseDownPassword = useCallback((event) => {

    event.preventDefault();
  }, [])
  // handel path and error form
  useEffect(() => {
    if (localStorage.AccessToken) {
      navigate('/admin')
    }

  }, [navigate]);

  useEffect(() => {
    if (code === 200) {
      if (localStorage.AccessToken) {
        setShowErrorForm(false)
        navigate('/admin')
      }
    }
    else {
      if (code !== null) {
        setShowErrorForm(true)
      }

    }

  }, [code, navigate]);

  // fun handel validation
  const formik = useFormik({
    initialValues: {
      email: 'super_admin@admin.com',
      pass: 'super_admin',
    },
    onSubmit: values => {
      dispatch(LoginThunk(values))

    },
    validationSchema: SignupSchema,
  });
  return (
    <>
      <div className="login-box" >
        <div className="container ">
          <div className="content">
            <h2>
              {/* {t('title.ti')} */}
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

              <Button className='submit' variant="contained" type='submit'  >Sign In</Button>
              <span style={{ display: showErrorForm ? 'block' : 'none', color: 'red', textAlign: 'center', width: '100%' }}>email or password is wrong</span>
            </Typography>
          </div>

        </div>

      </div>
    </>
  );
}

export default LoginBox;
