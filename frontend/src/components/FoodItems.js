import React, { useState, useEffect, useRef } from "react";
import { FaStar, FaChevronDown } from "react-icons/fa";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";

function FoodItems() {
  const navigate = useNavigate();
  const { type } = useParams();
  const [items, setItems] = useState([]);
  const [sortBy, setSortBy] = useState("rating");
  const [order, setOrder] = useState("desc");
  const [openSort, setOpenSort] = useState(false);

  const sortRef = useRef(); // Ref for dropdown

  useEffect(() => {
    const url = `http://localhost:4000/api/fooditems/type/${type}?sortBy=${sortBy}&order=${order}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      });
  }, [type, sortBy, order]);

  const handleSort = (value) => {
    const [sortValue, sortOrder] = value.split("-");
    setSortBy(sortValue);
    setOrder(sortOrder);
    setOpenSort(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setOpenSort(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="fooditems-page container">
        {items.length > 0 && (
          <>
            <h1 className="food-catagory">{items[0].foodcatagory}</h1>
            <p>{items[0].fooddescription}</p>
          </>
        )}

        {/* Filter Nav */}
        <nav className="filter-nav" style={{ position: "relative", marginBottom: "20px" }}>
          <div
            ref={sortRef}
            className="items"
            onClick={() => setOpenSort(!openSort)}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              padding: "8px 12px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              width: "115px",
              userSelect: "none",
              position: "relative"
            }}
          >
            <span>Sort By</span>
            <FaChevronDown style={{ marginLeft: "8px" }} />

            {openSort && (
              <div
                style={{
                  position: "absolute",
                  top: "50px",
                  left: "0",
                  background: "#fff",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  borderRadius: "5px",
                  zIndex: 10,
                  width: "160px",
                  animation: "fadeIn 0.3s ease"
                }}
              >
                <div
                  onClick={() => handleSort('rating-desc')}
                  style={{ padding: "10px", cursor: "pointer", borderBottom: "1px solid #eee" }}
                >
                  Rating: High to Low
                </div>
                <div
                  onClick={() => handleSort('rating-asc')}
                  style={{ padding: "10px", cursor: "pointer", borderBottom: "1px solid #eee" }}
                >
                  Rating: Low to High
                </div>
                <div
                  onClick={() => handleSort('time-asc')}
                  style={{ padding: "10px", cursor: "pointer", borderBottom: "1px solid #eee" }}
                >
                  Delivery Time: Fastest
                </div>
                <div
                  onClick={() => handleSort('time-desc')}
                  style={{ padding: "10px", cursor: "pointer" }}
                >
                  Delivery Time: Slowest
                </div>
              </div>
            )}
          </div>
        </nav>

        <h2>Restaurants to Explore</h2>

        <div className="food-container">
          {items.map((item) => (
            <div
              key={item._id}
              className="food-card"
              onClick={() => navigate(`/restuarants/hotel/${item.restuarantname}`)}
            >
              <div className="image-wrapper">
                {item.image ? (
                  <img src={item.image} alt={item.restuarantname} />
                ) : (
                  <p>No Image Available</p>
                )}
              </div>
              <div className="restaurant-details">
                <h3 className="restaurant-name">{item.restuarantname}</h3>
                <p className="rating">
                  <FaStar className="star-icon" style={{ color: "green" }} />{" "}
                  {item.rating} • {item.time}
                </p>
                <p className="description">{item.restuarantdesc}</p>
                <p className="place">{item.place}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FoodItems;
