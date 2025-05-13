import React, { useRef, useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight,  } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "./Footer";

function Homepage() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("https://swiggy-clone-backend-g9z2.onrender.com/api/category")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const [chhindwara, setchhindwara] = useState([]);
  useEffect(() => {
    fetch("https://swiggy-clone-backend-g9z2.onrender.com/api/fslider")
      .then((response) => response.json())
      .then((data) => setchhindwara(data))
      .catch((error) => console.error("Error fetching details:", error));
  }, []);

  const [fooddelivery, setfooddelivery] = useState([]);
  useEffect(() => {
    fetch("https://swiggy-clone-backend-g9z2.onrender.com/api/secslider")
      .then((response) => response.json())
      .then((data) => setfooddelivery(data))
      .catch((error) => console.error("Error fetching details:", error));
  }, []);

  const [cities,setCities] = useState([])
  useEffect(() => {
    fetch("https://swiggy-clone-backend-g9z2.onrender.com/api/city")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched cities:", data); // Check the structure of the data here
        const cityNames = data.map((city) => city.name).filter(Boolean);
        setCities(cityNames);
      })
      .catch((err) => console.error("Error fetching cities:", err));
  }, []);
  
  

 
 
  const firstsliderref = useRef(null);
  const secondsliderref = useRef(null);
  const thirdslider = useRef(null);




  const handleScroll = (direction, ref) => {
    const scrollAmount = 300;
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const navigate = useNavigate();

  return (
    <>
      {/* first slider */}
      <Navbar />
      <div className="slider-container container">
        <h2 className="section-title">What's on your mind?</h2>
        <button
          className="btn btn-left"
          onClick={() => handleScroll("left", firstsliderref)}
        >
          <FaArrowLeft />
        </button>
        <div className="itemsection" ref={firstsliderref}>
          {categories.map((item, index) => (
            <div className="gallery" key={index}>
              <img
                src={`data:${item.image.contentType};base64,${btoa(
                  String.fromCharCode(...new Uint8Array(item.image.data.data))
                )}`}
                alt={item.type}
                onClick={() => {
                  console.log(item.restuarantname);
                  console.log(item);

                  navigate(`/Fooditems/${item.type}`);
                }}
              />
            </div>
          ))}
        </div>
        <button
          className="btn btn-right"
          onClick={() => handleScroll("right", firstsliderref)}
        >
          <FaArrowRight />
        </button>
        <hr style={{ marginTop: 30 }} />
      </div>

      {/* second slider */}

      <div className="second-section">
        <h2 className="section-title">Top restaurant chains in Chhindwara</h2>
        <button
          className="btn btn-left"
          onClick={() => handleScroll("left", secondsliderref)}
        >
          <FaArrowLeft />
        </button>
        <div className="itemsection" ref={secondsliderref}>
          {chhindwara.map((item, index) => (
            <div
              className="restaurant-card"
              key={index}
              onClick={() => {
                console.log(item.restuarantname);
                navigate(`/restuarants/hotel/${item.restuarantname}`);
              }}
            >
              <img
                src={`data:${item.image.contentType};base64,${btoa(
                  new Uint8Array(item.image.data.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ""
                  )
                )}`}
                alt={item.restaurant}
                className="restaurant-img"
              />
              <div className="restaurant-info">
                <h3 className="restaurant-name">{item.restuarantname}</h3>
                <p className="restaurant-desc">{item.restuarantdesc}</p>
                <div className="restaurant-meta">
                  <span className="rating">⭐ {item.rating}</span>
                  <span className="time">{item.time}</span> <br />
                  <span className="place">{item.place}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="btn btn-right"
          onClick={() => handleScroll("right", secondsliderref)}
        >
          <FaArrowRight />
        </button>
        <hr style={{ marginTop: 30 }} />
      </div>

      {/* third slider */}

      <div className="third-section">
        <h2 className="section-title">Top restaurant chains in Chhindwara</h2>
        <div className="itemsection-2" ref={thirdslider}>
          {fooddelivery.map((item, index) => (
            <div
              className="restaurant-card"
              key={index}
              onClick={() => {
                console.log(item.restuarantname);
                navigate(`/restuarants/hotel/${item.restuarantname}`);
              }}
            >
              <img
                src={`data:${item.image.contentType};base64,${btoa(
                  new Uint8Array(item.image.data.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ""
                  )
                )}`}
                alt={item.restaurant}
                className="restaurant-img"
              />
              <div className="restaurant-info">
                <h3 className="restaurant-name">{item.restuarantname}</h3>
                <p className="restaurant-desc">{item.restuarantdesc}</p>
                <div className="restaurant-meta">
                  <span className="rating">⭐ {item.rating}</span>
                  <span className="time">{item.time}</span> <br />
                  <span className="place">{item.place}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <hr style={{ marginTop: 30 }} />
      </div>

      {/*  */}
      <div className="container mt-5 fourth">
        <h3 className="fw-bold section-title">
          Best Places to Eat Across Cities
        </h3>

        <div className="d-flex flex-wrap gap-3">
          {cities.map((city, index) =>
            city ? (
              <div
                className="border rounded p-3 text-center fw-semibold"
                style={{ width: "220px", cursor: "pointer" }}
                key={index}
                onClick={() => navigate(`/city/${city}`)}
              >
                Best Restaurants in{" "}
                {city.charAt(0).toUpperCase() + city.slice(1)}
              </div>
            ) : null
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Homepage;
