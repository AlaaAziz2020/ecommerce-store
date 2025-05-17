import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from './component/Layout/Layout';
import Carts from './component/Carts/Carts';
import Register from './component/Register/Register';
import Login from './component/Login/Login';
import Products from './component/Products/Products';
import Footer from './component/Footer/Footer';
import NotFound from './component/NotFound/NotFound';
import Productdetails from './component/Productdetails/Productdetails';
import Loadar from './component/Loadar/Loadar';
import Category from './component/Category/Category';
import UserContextProvider from './Context/userContext';
import CartContextProvider from './Context/cartContext.jsx';
import Navbar from './component/Navbar/Navbar.jsx';
import Slider from './component/Slider/Slider.jsx';
import ProtectedRoute from './component/protectedRoute/protectedRoute.jsx';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { ReduxStore } from './Redux/reduxStore.js';
import Info from './component/Info/Info';
import CheckoutPage from './component/CheckoutPage/CheckoutPage.jsx';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Register /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'carts', element: <ProtectedRoute><Carts /></ProtectedRoute> },
      { path: 'category', element: <ProtectedRoute><Category /></ProtectedRoute> },
      { path: 'footer', element: <Footer /> },
      { path: 'navbar', element: <Navbar /> },
      { path: 'info', element: <Info /> },
      { path: 'slider', element: <Slider /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'productDetails/:id/:category', element: <Productdetails /> },
      { path: 'loadar', element: <Loadar /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={ReduxStore}>
      <CartContextProvider>
        <UserContextProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <RouterProvider router={Router} />
        </UserContextProvider>
      </CartContextProvider>
    </Provider>
  );
}

export default App;

// Register.jsx
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
