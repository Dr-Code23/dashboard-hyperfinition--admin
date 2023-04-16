import React, { useCallback } from 'react';
import { Button, FormControl, IconButton, Input, InputAdornment, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import './UserModal.css';
const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('must be a valid email')
    .required('Required'),


  pass: Yup.string()
    .required('Required'),
  ConPass: Yup.string()
    .required('Required'),
  Name: Yup.string()
    .required('Required'),

});
let selectData = ['name', 'email', 'pass']
const UnitsModal = ({ open, setOpen, nameBrand, setNameBrand }) => {

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen]);
  useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showErrorForm] = React.useState(false);
  const [age, setAge] = React.useState('0');

  const handleClickShowPassword = useCallback(() => {
    setShowPassword((show) => !show)

  }, []);
  const handleMouseDownPassword = useCallback((event) => {

    event.preventDefault();
  }, [])
  const handleChange = useCallback((event) => {

    setAge(event.target.value);

  }, [])
  // fun handel validation
  const formik = useFormik({
    initialValues: {
      Name: '',
      email: '',
      pass: '',
      ConPass: '',
    },
    onSubmit: values => {

    },
    validationSchema: SignupSchema,
  });


  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="user-modal" >

          <Typography component={'form'} className={'box'} onSubmit={formik.handleSubmit}>
            <IconButton aria-label="" onClick={() => {
              setOpen(false)

            }}
              className="close-modal"
            >
              <CloseIcon />

            </IconButton>
            <Typography variant="body1" component={'div'} className='content-box' sx={{ width: '100%' }} >
              <h5>Name</h5>
              <TextField sx={{ width: '100%', }} id="outlined-basic" className='input-box' variant="standard" name="Name"
                onChange={formik.handleChange}
                value={formik.values.Name} />
              {formik.errors.Name && formik.touched.Name ? (
                <span style={{ width: "100%", color: 'red', fontSize: '15px', marginTop: '5px' }}>{formik.errors.Name}</span>
              ) : null}
            </Typography>
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
            <Typography variant="body1" component={'div'} className='content-box' sx={{ width: '100%' }} >
              <h5>Confirm Password</h5>
              <FormControl variant="standard" fullWidth className='input-box'>
                <Input
                  id="standard-adornment-password"
                  className='input-pass'
                  type={showPassword ? 'text' : 'password'}
                  name="ConPass"
                  onChange={formik.handleChange}
                  value={formik.values.ConPass}
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
              {formik.errors.ConPass && formik.touched.ConPass ? (
                <span style={{ width: "100%", color: 'red', fontSize: '15px', marginTop: '5px' }}>{formik.errors.ConPass}</span>
              ) : null}
            </Typography>
            <Typography variant="body1" component={'div'} className='content-box' sx={{ width: '100%' }} >
              <h5>Rule </h5>
              <FormControl fullWidth >
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  onChange={handleChange}
                  className='input-box'
                  sx={{ height: '60px' }}
                >
                  {
                    selectData.length && selectData.map((el, index) => {
                      return (
                        <MenuItem value={index} key={index}>
                          {el}
                        </MenuItem>
                      )



                    })
                  }

                </Select>
              </FormControl>
            </Typography>

            <Button className='submit' variant="contained" type='submit'  >contact</Button>
            <span style={{ display: showErrorForm ? 'block' : 'none', color: 'red', textAlign: 'center', width: '100%' }}>email or password is wrong</span>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default UnitsModal;

