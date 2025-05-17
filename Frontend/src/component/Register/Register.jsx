import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    pass: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: { name: '', email: '', pass: '' },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(
          'https://672a9094976a834dd023c8c4.mockapi.io/api/Hamzasports/users',
          values
        );
        console.log('Register success', data);
        navigate('/login');
      } catch (err) {
        console.error('Register error:', err);
        navigate('/notfound');
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <input name="name" onChange={formik.handleChange} value={formik.values.name} placeholder="Name" />
        {formik.errors.name && <div>{formik.errors.name}</div>}

        <input name="email" onChange={formik.handleChange} value={formik.values.email} placeholder="Email" />
        {formik.errors.email && <div>{formik.errors.email}</div>}

        <input name="pass" onChange={formik.handleChange} value={formik.values.pass} placeholder="Password" />
        {formik.errors.pass && <div>{formik.errors.pass}</div>}

        <button type="submit">Register</button>
        <Link to="/login">Already have an account?</Link>
      </form>
    </div>
  );
}
