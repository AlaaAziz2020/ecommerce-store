import React, { useContext, useEffect } from 'react';
import './Navbar.css';
import logo from '../../assets/images/Logo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { userContext } from '../../Context/userContext';
import { cartContext } from '../../Context/cartContext';

export default function Navbar() {
  const { isLogin, setLogin } = useContext(userContext);
  const { cartNumber, getProductToCart } = useContext(cartContext);
  const navigate = useNavigate();
  const location = useLocation(); // <== مهم

  function handleLogout() {
    localStorage.removeItem('userToken');
    setLogin(null);
    navigate('/login');
  }

  useEffect(() => {
    getProductToCart();
  }, []);

  // صفحات التسجيل أو تسجيل الدخول
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
      <div className="container">
        <Link className="navbar-brand" to={isLogin ? "/products" : "/"}>
          <img src={logo} alt="Logo" width={90} /> Hamza Sports
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Navbar الكامل يظهر فقط لما يكون المستخدم مسجل دخول */}
          {isLogin && !isAuthPage && (
            <ul className="navbar-nav me-auto mb-5 pb-3 pt-3 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/products">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">About us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link position-relative" to="/carts">
                  <i className="fas fa-shopping-cart me-1"></i>
                  Cart
                  {cartNumber > 0 && (
                    <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
                      {cartNumber}
                    </span>
                  )}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">Contact Us</Link>
              </li>
            </ul>
          )}

          <ul className="Registeration d-flex list-unstyled align-items-center">
            {/* Login & Register فقط لما نكون مش مسجلين دخول */}
            {!isLogin && !isAuthPage && (
              <>
                <li className="nav-item pt-3">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item ms-4 mt-3">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}

            {/* Logout فقط لما نكون مسجلين دخول */}
            {isLogin && (
              <li className="nav-item mx-2 mt-3 cursor-pointer">
                <button className="btn btn-link nav-link" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}

            {/* Search دايمًا ظاهر */}
            <form className="d-flex mx-3 pt-2">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
          </ul>
        </div>
      </div>
    </nav>
  );
}
