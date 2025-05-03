import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Delivering() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const delivering = [
    {
      title: "Swiggy One",
      img: "swiggy-one.webp",
    },
    {
      title: "HDFC Credit Card",
      img: "hdfc.webp",
    },
    {
      title: "Ride With Swiggy",
      img: "ride.webp",
    },
    {
      title: "Partner Programme",
      img: "home-2.webp",
    },
    {
      title: "Flavour Meets Fame",
      img: "flavour.webp",
    },
  ];
  return (
    <>
      <nav className="about-nav">
        {/* Logo */}
        <div className="logo">
          <img src="about-logo.webp" alt="Swiggy Logo" />
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li  onClick={() => navigate("/corporate")}>About Swiggy</li>
          <li onClick={() => navigate("/buisness")}>Our Businesses</li>
          <li onClick={() => navigate("/delivering-for-everyone")}>
            Delivering For Everyone
          </li>
          {/* <li>Newsroom</li>
          <li>Investor Relations</li>
          <li>Sustainability</li> */}
          <li onClick={()=>navigate('/contact-us')}>Contact Us</li>
        </ul>
      </nav>
      <div className="delivery-container">
        <h1 className="delivery-heading">DELIVERING FOR EVERYONE</h1>
        <p className="delivery-subheading">
          Multiple benefits across the ecosystem for consumers, partners and
          riders
        </p>
        <div className="delivery-cards">
          {delivering.map((business, index) => (
            <div className="delivery-card" key={index}>
              <img
                src={business.img}
                alt={business.title}
                className="delivery-img"
              />
              <p className="delivery-title">{business.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="container details">
      <div className="details-image">
        <img src="swiggy-one.webp" alt="Swiggy One" />
      </div>
      <div className="details-text">
        <h3>Swiggy One</h3>
        <p>
          Swiggy One is our membership programme, accessible across offerings,
          that offers members discounts and promotions on our platform,
          including free delivery on select orders. Users can become Swiggy One
          members by paying a membership fee.
        </p>
        <button className="details-button">Know more</button>
      </div>
    </div>

    <div className="container hdfc-card-container">
      <div className="hdfc-card-content">
        <h3>HDFC Bank Credit Card</h3>
        <p>
          Get ready to experience the awesome world of cashback and benefits
          with the Swiggy HDFC Bank Credit Card!
        </p>
        <button className="hdfc-apply-button">Apply now</button>
      </div>
      <div className="hdfc-card-image">
        <img src="hdfc.webp" alt="HDFC Credit Card" />
      </div>
    </div>
    
    <div className="container ride-container">
      <div className="ride-content">
        <h3>Ride with Swiggy</h3>
        <p>
          Join our platform and earn regular payouts with exciting bonuses and 
          incentives, along with other benefits.
        </p>
        <button className="ride-apply-button">Apply now</button>
      </div>
      <div className="ride-image">
        <img src="Desktop-3.png" alt="Ride with Swiggy" />
      </div>
    </div>
    </>
  );
}

export default Delivering;
