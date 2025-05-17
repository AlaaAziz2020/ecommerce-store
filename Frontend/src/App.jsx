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
// import  CartContextProvider  from './Context/cartContext';
import CartContextProvider from './Context/cartContext.jsx';
import Navbar from './component/Navbar/Navbar.jsx';
import Slider from './component/Slider/Slider.jsx'
import ProtectedRoute from './component/protectedRoute/protectedRoute.jsx';
import { Toaster } from 'react-hot-toast';
import {Provider} from 'react-redux'
import { ReduxStore } from './Redux/reduxStore.js';
import Info from './component/Info/Info';
// import ReviewForm from './component/ReviewForm/ReviewForm.jsx';
 import CheckoutPage from './component/CheckoutPage/CheckoutPage.jsx';



const Router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: 'footer', element: <Footer /> },
      // { path: 'sports', element: <ProtectedRoute><Sports/></ProtectedRoute> },
        { path: 'carts', element: <ProtectedRoute><Carts /></ProtectedRoute> },
        { path: '/', element: <Register /> },

      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'category', element:<ProtectedRoute><Category /></ProtectedRoute>  },
      { path: 'navbar', element: <Navbar /> },
      { path: 'info', element: <Info/> },
      { path: 'slider', element: <Slider/> },
      // { path: 'ReviewForm', element: <ReviewForm /> },
       {path:'checkout',element:<CheckoutPage/>},

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
        <Toaster position="top-center" reverseOrder={false} /> {/* Moved above */}
              <RouterProvider router={Router} />
     
    </UserContextProvider>
     </CartContextProvider>
       </Provider>
  
  );
}

export default App;
