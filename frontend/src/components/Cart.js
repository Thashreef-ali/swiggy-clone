import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  const navigate = useNavigate();

  // Fetch cart data from backend
  useEffect(() => {
    const fetchCart = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("Retrieved User:", user); 
      const userId = user ? user._id : null;
      console.log("User ID:", userId); 
      if (!userId) return;

      try {
        const response = await fetch(
          `http://localhost:4000/api/upload?userId=${userId}`
        );
        const data = await response.json();

        // Log the data to check the structure
        console.log("Fetched cart data:", data);

        if (response.ok) {
          setCart(data.items);
        } else {
          console.error("Error fetching cart:", data.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchCart();
  }, []);

  // Handle removal of items from the cart
  const removeFromCart = async (index) => {
    try {
      const itemToRemove = cart[index];
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user ? user._id : null;
      if (!userId) return;

      const response = await fetch("http://localhost:4000/api/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, item: itemToRemove }),
      });

      const data = await response.json();

      if (response.ok) {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);

        setPopupMessage("✅ Item removed from cart");
        setPopupType("success");
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
      } else {
        console.error("Error removing item:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [logo, setLogo] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/api/logo")
      .then((response) => response.json())
      .then((data) => setLogo(data))
      .catch((err) => console.error("Error fetching logo:", err));
  }, []);

  return (
    <>
      <nav className="cart-nav">
        <div style={{ cursor: "pointer" }}>
          {logo.map((item, index) => (
            <img
              key={index}
              src={`data:${item.img.contentType};base64,${btoa(
                String.fromCharCode(...new Uint8Array(item.img.data.data))
              )}`}
              alt="Swiggy Logo"
              className="logo"
              onClick={() => navigate("/")}
            />
          ))}
        </div>
        <span>SECURE CHECKOUT</span>
      </nav>

      <div className="cart-container">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <img src="cart.avif" className="cart-img" alt="Empty Cart" />
            <p className="empty-text">Your cart is empty.</p>
            <p>You can go to home page to view more restaurants</p>
            <button className="cart-btn" onClick={() => navigate("/")}>
              SEE RESTAURANTS NEAR YOU
            </button>
          </div>
        ) : (
          <div className="menu-li">
            {cart.map((item, index) => (
              <div key={`${item._id}-${index}`} className="menu-it">
              <div className="pure-veg"></div>
                <div className="food-info">
                  <p className="food-name">{item.name}</p>
                  <p className="food-price">{item.price || "₹--"}</p>
                  {item.rating && (
                    <p className="food-rating">
                      <FaStar className="star-icon" /> {item.rating} (
                      {item.review})
                    </p>
                  )}
                  <p className="food-description">{item.description}</p>
                </div>
                <div className="food-action">
                  <button
                    className="add-btn"
                    onClick={() => removeFromCart(index)}
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Global Popup */}
      {showPopup && <div className={`popup ${popupType}`}>{popupMessage}</div>}
    </>
  );
}

export default Cart;
