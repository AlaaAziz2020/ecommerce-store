import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loadar from '../Loadar/Loadar';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { fetchProducts } from '../../Redux/productActions';
import Info from '../../component/Info/Info';
import '../Products/Products.css';
import { cartContext } from '../../Context/cartContext';

export default function Products() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.productState);
  const { addProductToCart } = useContext(cartContext);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  async function addProductItem(product) {
    try {
      console.log("Adding product to cart:", product);

      const cartProduct = {
        id: product.id,
        name: product.name,
        title: product.title,
        price: product.rating,
        img: product.images || 'placeholder.jpg',
        // rating: product.rating,
        count: 1,
      };

      await addProductToCart(cartProduct);
      toast.success('Product added successfully!', { duration: 4000, position: 'top-left' });
    } catch (error) {
      console.error("Error while adding to cart:", error);
      toast.error('Something went wrong while adding to cart.', { duration: 4000, position: 'top-left' });
    }
  }

  if (loading) return <Loadar />;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
      <div className="container px-0">
      {/* Carousel Section */}
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={i}
              className={i === 0 ? 'active' : ''}
              aria-current={i === 0}
              aria-label={`Slide ${i + 1}`}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" id="first">
            <div className="carousel-caption">
              <h1>Welcome to Our Store</h1>
              <p className="text-white">Find the best products here!</p>
            </div>
          </div>
          <div className="carousel-item" id="second">
            <div className="carousel-caption">
              <h1>Shirts Products</h1>
              <p className="text-white">Don't miss our amazing discounts!</p>
            </div>
          </div>
          <div className="carousel-item" id="third">
            <div className="carousel-caption">
              <h1>Shop Now</h1>
              <p className="text-white">Explore our wide range of products.</p>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* Products Section */}
      <div className="row px-4 justify-content-between text-center mt-4">
        <h3 className="pt-3 text-dark fw-bold">Our Products</h3>
        <p className="pt-2">There are a lot of products as following:</p>
        {products.map((product) => (
          <div className="col-md-3 products-list px-3" key={product.id}>
            <div>
              <Link to={`/productDetails/${product.id}/${product.name}`}>
                <img
                  className="w-100"
                  src={product.images || 'placeholder.jpg'}
                  alt={product.name}
                />
                <span className="block text-xl text-success">{product.title}</span>
                <span className="text-lg fw-bold text-muted d-block">{product.name ? product.name.slice(0, 3) : 'N/A'}</span>
                <div className="d-flex justify-content-between">
                  <span>{product.price} EGP</span>
                  <span>{product.rating} <i className="fas fa-star text-warning" /></span>
                </div>
              </Link>
              <button
                className="btn btn-success w-100 mt-2"
                onClick={() => addProductItem(product)} 
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}
        <Info />
      </div>
    </div>
  );
}
