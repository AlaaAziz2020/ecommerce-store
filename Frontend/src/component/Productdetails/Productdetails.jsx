import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { cartContext } from '../../Context/cartContext';
import Loadar from '../Loadar/Loadar';
import toast from 'react-hot-toast';
import { Helmet } from "react-helmet";
import { FaStar } from 'react-icons/fa';
import '../Productdetails/Productdetails.css';

export default function ProductDetails() {
  const { addProductToCart } = useContext(cartContext);
  const navigate = useNavigate();
  const { id, category } = useParams();
  const [details, setDetails] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [rating, setRating] = useState(null); // Store the selected rating
  const [rateColor, setRateColor] = useState(null); // Control color change based on rating

  const getProductDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://672a9094976a834dd023c8c4.mockapi.io/api/Hamzasports/products/${id}`
      );
      console.log("Product details fetched:", data);  // Log to check the structure
      setDetails(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product details:', error);
      setLoading(false);
    }
  };
  
  // Handle the product addition to the cart
const addProductItem = async (product) => {
  try {
    // Create product data
    const productData = {
      id: product.id,
      title: product.title,
      price: product.price,
      img: product.images,
      count: 1,
    };

    // Add product to cart using context
    addProductToCart(productData);
    toast.success("product added successfully", {
      duration: 4000,
      position: "top-left",
    });
  } catch (error) {
    console.error("Something wrong while adding product to cart:", error);
    toast.error("Something wrong while adding product to cart:", {
      duration: 4000,
      position: "top-left",
    });
  }
};

  

  useEffect(() => {
    getProductDetails();
  }, [id]);

  return (
    <div className="container">
      {!isLoading && (
        <Helmet>
          <title>{details?.title || 'Product Details'}</title>
        </Helmet>
      )}

      {isLoading ? (
        <Loadar />
      ) : (
        <div className='productsdetails-container'>
          <div className="row mt-4">
            <div className="col-md-6 mt-4">
              <img
                src={details?.images || 'placeholder.jpg'}
                alt={details?.title || 'Product'}
                className="w-100"
              />
            </div>
            <div className="col-md-6 mt-3">
              <h1>{details?.title}</h1>
              <p className="productsdetails-text">{details?.description}</p>
              <button
                className="btn btn-success w-100 mt-2"
                onClick={() => addProductItem(details)}
              >
                Add To Cart
              </button>
              <button
                className="btn btn-success w-100"
                onClick={() => navigate('/checkout')}
              >
                Check Out
              </button>
            </div>
          </div>

          {/* Rating Section */}
          <div>
            {[...Array(5)].map((star, index) => {
              const currentRate = index + 1;
              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="rate"
                    value={currentRate}
                    onClick={() => setRating(currentRate)}
                  />
                  <FaStar
                    size={50}
                    color={currentRate <= (rateColor || rating) ? "yellow" : "grey"}
                  />
                </label>
              );
            })}
          </div>
          <textarea placeholder="comments" />
          {/* <button>Submit</button> */}
          <div className='submit text-center'>
          <button type="submit" className="btn btn-success btn-sm px-4 py-2 text-center">
                Submit
              </button>
          </div>
        
        </div>
      )}
    </div>
  );
}
