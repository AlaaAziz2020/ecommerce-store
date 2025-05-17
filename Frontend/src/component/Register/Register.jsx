import React from 'react';
import '../Register/Register.css';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  async function handleRegister(values) {
    try {
      const { data } = await axios.post(
        'https://672a9094976a834dd023c8c4.mockapi.io/api/Hamzasports/users',
        values
      );
      console.log('✅ Registered:', data);
      alert('✔️ Registration successful! You can now log in.');
      navigate('/login');
    } catch (error) {
      console.error('❌ Registration error:', error.message);
      alert('Something went wrong. Please try again.');
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required').min(3, 'Minimum 3 characters'),
    email: Yup.string().required('Email is required').email('Enter a valid email'),
    pass: Yup.string()
      .required('Password is required')
      .matches(
        /^[A-Z][a-z0-9]{6,8}$/,
        'Password must start with an uppercase letter and be 6-8 characters long'
      ),
  });

  const formik = useFormik({
    initialValues: { name: '', email: '', pass: '' },
    validationSchema: validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <div className="row">
      <div className="col-md-6 mx-auto p-0">
        <form onSubmit={formik.handleSubmit} className="card">
          <div className="form-box">
            <div className="form-snip">
              <label className="tab text-white">Register</label>
              <div className="form-space">
                <div className="Register-Form">
                  <div className="group">
                    <label htmlFor="name" className="label m-2">Name</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      className="input"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter your name"
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className="text-danger">{formik.errors.name}</div>
                    )}
                  </div>
                  <div className="group">
                    <label htmlFor="email" className="label m-2">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      className="input"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter your email"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-danger">{formik.errors.email}</div>
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
                      placeholder="Create a password"
                    />
                    {formik.touched.pass && formik.errors.pass && (
                      <div className="text-danger">{formik.errors.pass}</div>
                    )}
                  </div>
                  <div className="group">
                    <input type="submit" className="button mt-4" value="Register" />
                  </div>
                  <div className="hr mt-3"></div>
                  <div className="foot mt-3">
                    <Link to="/login" className="login-btn text-white mt-3">Already have an account? Login</Link>
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
