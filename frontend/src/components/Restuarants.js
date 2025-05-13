import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { FaStar, FaSearch } from "react-icons/fa";
import { useParams } from "react-router-dom";

function Restaurants() {
  const { hotel } = useParams();
  const [restaurantData, setRestaurantData] = useState(null);
  const [menuCategories, setMenuCategories] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState(""); // success or warning

  useEffect(() => {
    fetch(`https://swiggy-clone-backend-g9z2.onrender.com/api/restuarants/hotel/${hotel}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setRestaurantData(data[0]);
          setMenuCategories(data[0].menu || []);
        }
      })
      .catch((err) => console.error("Error fetching restaurant data:", err));
  }, [hotel]);

  const addToCart = async (item) => {
    const isLogin = localStorage.getItem("islogin");
    const user = JSON.parse(localStorage.getItem("user"));  // Retrieve the full user object
  
    if (isLogin !== "true" || !user || !user._id) {  // Ensure user object exists and has _id
      setPopupMessage("⚠️ Please login to add items to cart");
      setPopupType("warning");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2500);
      return;
    }
    const userId = user._id; 
  
    try {
      const response = await fetch("https://swiggy-clone-backend-g9z2.onrender.com/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, item }), // <-- send userId with item
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setPopupMessage("✅ Item added to cart");
        setPopupType("success");
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
      } else {
        console.error("Error adding item:", data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <Navbar />

      <div className="container restuarant-page">
        <div className="head">
          <h2 className="hotel">{hotel}</h2>
        </div>

        {restaurantData && (
          <div className="food-card-hotel">
            <div className="short-details">
              <p className="rating">
                <FaStar className="star-icon" /> {restaurantData.rating}
              </p>
              <p className="outlet">
                <strong>Outlet:</strong> {restaurantData.outlet}
              </p>
              <p className="delivery-time">
                <strong>Time:</strong> {restaurantData.time}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="f-details">
        {/* Search Bar */}
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search for dishes" />
        </div>

        {/* Filters */}
        <div className="filters">
          <span className="filter-btn">✅ Pure Veg</span>
          <span className="filter-btn">Bestseller</span>
        </div>

        {/* Menu Items */}
        {menuCategories.map((category, idx) => (
          <div key={idx}>
            <h6 className="title">
              {category.category} ({category.items.length})
            </h6>
            <div className="menu-li">
              {category.items.map((item, i) => (
                <div key={i} className="menu-it">
                  <div className="pure-veg"></div>
                  <div className="food-info">
                    <p className="food-name">{item.name}</p>
                    <p className="food-price">{item.price || "₹--"}</p>
                    {item.rating && (
                      <p className="food-rating">
                        <FaStar className="star-icon" /> {item.rating} ({item.review})
                      </p>
                    )}
                    <p className="food-description">{item.description}</p>
                  </div>
                  <div className="food-action">
                    <button className="add-btn" onClick={() => addToCart(item)}>
                      ADD
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar Menu */}
      <div className="menu-container">
        <button className="menu-button" onClick={toggleMenu}>
          MENU
        </button>

        <div className={`menu-details ${menuOpen ? "open" : ""}`}>
          <ul>
            {menuCategories.map((category, idx) => (
              <li key={idx}>
                <span>{category.category?.trim() || `Category ${idx + 1}`}</span>
                <span>{category.items.length}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Popup Message */}
      {showPopup && (
        <div className={`popup ${popupType}`}>
          {popupMessage}
        </div>
      )}
    </>
  );
}

export default Restaurants;
