import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/cartContext";
import { useNavigate } from "react-router-dom";

export default function Carts() {
  const [cartItems, setCartItems] = useState(null);
  const { getProductToCart, updateProductToCart, deleteProductToCart } = useContext(cartContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const items = await getProductToCart();
      console.log("Fetched Cart Items:", items); // Debugging the response
      setCartItems(items);
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
      setCartItems([]);
    }
  };

  const updateQuantity = async (id, newCount) => {
    if (newCount < 1) return;
    try {
      await updateProductToCart(id, newCount);
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, count: newCount } : item
        )
      );
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };

  const removeItem = async (id) => {
    try {
      await deleteProductToCart(id);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  const calculateTotal = () => {
    return cartItems?.reduce((total, item) => {
      const price = parseFloat(item.price);
      return total + (isNaN(price) ? 0 : price * item.count);
    }, 0).toFixed(2) || "0.00";
  };

  if (cartItems === null) return <p className="text-center">Loading your cart...</p>;

  return (
    <div className="container my-4">
      <div className="table-responsive shadow rounded">
        <table className="table align-middle table-hover">
          <thead className="table-light">
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-muted">
                  🛒 Your cart is empty.
                </td>
              </tr>
            ) : (
              cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.img} alt={item.title || "No Image"} style={{ width: "70px" }} />
                  </td>
                  <td>{item.title || "No Name Available"}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <button
                        onClick={() => updateQuantity(item.id, item.count - 1)}
                        className="btn btn-outline-secondary btn-sm"
                        disabled={item.count === 0} // Prevent reducing below 0
                      >
                        -
                      </button>
                      <input
                        type="text"
                        readOnly
                        value={item.count}
                        className="form-control mx-2 text-center"
                        style={{ width: "50px" }}
                      />
                      <button
                        onClick={() => updateQuantity(item.id, item.count + 1)}
                        className="btn btn-outline-secondary btn-sm"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    <strong>
                      ${parseFloat(item.price) * item.count ? (parseFloat(item.price) * item.count).toFixed(2) : "0.00"}
                    </strong>
                  </td>
                  <td>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="btn btn-outline-danger btn-sm"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded mt-3">
        <h5 className="mb-0">Total: ${calculateTotal()}</h5>
        {cartItems.length > 0 && (
          <button
            onClick={() => navigate("/checkout")}
            className="btn btn-primary"
          >
            Go to Checkout
          </button>
        )}
      </div>
    </div>
  );
}
