import React from 'react';
import '../Register/Register.css';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  async function handleRegister(formsData) {
    try {
      // إرسال بيانات التسجيل فقط بالحقول الضرورية وبأسماء مناسبة للAPI
      const postData = {
        username: formsData.user,
        email: formsData.email,
        password: formsData.pass,
      };

      let { data } = await axios.get('https://672a9094976a834dd023c8c4.mockapi.io/api/Hamzasports/users', postData);
      console.log('Registration response data', data);

      // التوجيه لصفحة تسجيل الدخول بعد نجاح التسجيل
      navigate('/login');
    } catch (error) {
      console.error('Registration Error:', error.message);
      navigate('/notfound');
    }
  }

  const validationSchema = Yup.object({
    user: Yup.string()
      .required('Username is required')
      .min(3, 'Minimum length is 3 characters')
      .max(10, 'Maximum length is 10 characters'),
    email: Yup.string()
      .required('Email is required')
      .email('Enter a valid email'),
    pass: Yup.string()
      .required('Password is required')
      .matches(/^[A-Z][a-z0-9]{6,8}$/, 'Password must start with an uppercase letter and be 6-8 characters long'),
    cpwd: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('pass'), null], 'Passwords must match'),
  });

  const formik = useFormik({
    initialValues: {
      user: '',
      email: '',
      pass: '',
      cpwd: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <div>
      <div className="row">
        <div className="col-md-6 mx-auto p-0">
          <form onSubmit={formik.handleSubmit} method="post">
            <div className="form-box">
              <div className="form-snip">
                <label htmlFor="tab-2" className="tab text-white">Register</label>
                <div className="form-space">
                  <div className="Register-Form">
                    <div className="group">
                      <label htmlFor="user" className="label m-2">Username</label>
                      <input
                        id="user"
                        type="text"
                        className="input"
                        name="user"
                        value={formik.values.user}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Create your Username"
                      />
                      {formik.touched.user && formik.errors.user ? (
                        <div className="text-white">{formik.errors.user}</div>
                      ) : null}
                    </div>
                    <div className="group">
                      <label htmlFor="email" className="label m-2">Email Address</label>
                      <input
                        id="email"
                        type="email"
                        className="input"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter your email address"
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="text-white">{formik.errors.email}</div>
                      ) : null}
                    </div>
                    <div className="group">
                      <label htmlFor="pass" className="label m-2">Password</label>
                      <input
                        id="pass"
                        type="password"
                        name="pass"
                        className="input"
                        value={formik.values.pass}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Create your password"
                      />
                      {formik.touched.pass && formik.errors.pass ? (
                        <div className="text-white">{formik.errors.pass}</div>
                      ) : null}
                    </div>
                    <div className="group">
                      <label htmlFor="cpwd" className="label m-2">Confirm Password</label>
                      <input
                        id="cpwd"
                        type="password"
                        name="cpwd"
                        className="input"
                        value={formik.values.cpwd}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Confirm your password"
                      />
                      {formik.touched.cpwd && formik.errors.cpwd ? (
                        <div className="text-white">{formik.errors.cpwd}</div>
                      ) : null}
                    </div>
                    <div className="group">
                      <input type="submit" id="register" className="button mt-4" value="Register" />
                    </div>
                    <div className="hr mt-3"></div>
                    <div className="foot mt-3">
                      <Link to="/login" className="register-btn text-white mt-3">Already a Member?</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
