import React, { useContext } from 'react';
import '../Login/Login.css';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { userContext } from '../../Context/userContext';

export default function Login() {
  const { setLogin } = useContext(userContext);
  const navigate = useNavigate();

  async function handleLogin(formsData) {
    try {
      // جلب جميع المستخدمين
      let { data } = await axios.get('https://672a9094976a834dd023c8c4.mockapi.io/api/Hamzasports/users');

      // البحث عن المستخدم المطابق بالبريد وكلمة السر (مراعاة أن الحقل password)
      const matchedUser = data.find(user => user.email === formsData.email && user.password === formsData.pass);

      if (matchedUser) {
        const simulatedToken = 'mocked-jwt-token-12345';
        localStorage.setItem('userToken', simulatedToken);
        setLogin(true);
        console.log("Token saved in localStorage:", simulatedToken);
        navigate('/products');
      } else {
        console.error("Invalid email or password");
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Login Error:', error.message);
      navigate('/notfound');
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Enter a valid email'),
    pass: Yup.string()
      .required('Password is required')
      .matches(/^[A-Z][a-z0-9]{6,8}$/, 'Password must start with an uppercase letter and be 6-8 characters long'),
  });

  const formik = useFormik({
    initialValues: { email: '', pass: '' },
    validationSchema: validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <div>
      <div className="row">
        <div className="col-md-6 mx-auto p-0">
          <form onSubmit={formik.handleSubmit} className="card">
            <div className="form-box">
              <div className="form-snip">
                <label className="tab text-white">Login</label>
                <div className="form-space">
                  <div className="Login-Form">
                    <div className="group">
                      <label htmlFor="email" className="label m-2">Email Address</label>
                      <input
                        id="email"
                        type="text"
                        className="input"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter your email address"
                      />
                      {formik.touched.email && formik.errors.email && (
                        <div className="text-white">{formik.errors.email}</div>
                      )}
                    </div>
                    <div className="group">
                      <label htmlFor="pass" className="label m-2">Password</label>
                      <input
                        id="pass"
                        type="password"
                        name="pass"
                        className="input"
                        value={formik
