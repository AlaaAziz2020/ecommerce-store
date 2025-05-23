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
      const { data } = await axios.get('https://672a9094976a834dd023c8c4.mockapi.io/api/Hamzasports/users');

      // البحث عن المستخدم المطابق
      const matchedUser = data.find(user => user.email === formsData.email && user.password === formsData.pass);

      if (matchedUser) {
        const simulatedToken = 'mocked-jwt-token-12345';
        localStorage.setItem('userToken', simulatedToken);
        setLogin(true);
        console.log("Token saved in localStorage:", simulatedToken);
        navigate('/products');
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Login Error:', error.response ? error.response.data : error.message);
      alert('Login failed: ' + (error.response?.data?.message || error.message));
      // لا توجه ل notfound مباشرة في حالة الخطأ في البيانات
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
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
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
                      value={formik.values.pass}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Create your password"
                    />
                    {formik.touched.pass && formik.errors.pass && (
                      <div className="text-white">{formik.errors.pass}</div>
                    )}
                  </div>
                  <div className="group">
                    <input type="submit" id="Login" className="button mt-4" value="Login" />
                  </div>
                  <div className="hr mt-3"></div>
                  <div className="foot mt-3">
                    <Link to="/register" className='register-btn text-white mt-3'>Create your account?</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
