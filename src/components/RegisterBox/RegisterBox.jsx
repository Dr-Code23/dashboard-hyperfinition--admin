import './RegisterBox.css'
import { Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';

import * as Yup from 'yup';
// =====validation===========

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('must be a valid email')
    .required('Required'),

  //.matches(/^[A-Z]/, 'The first letter must be capitalize'),


});
const RegisterBox = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: values => {
      console.log(values)
    },
    validationSchema: SignupSchema,
  });



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
              <Button className='submit' variant="contained" type='submit' >Reset</Button>
            </Typography>
          </div>

        </div>

      </div>
    </>
  );
}

export default RegisterBox;
