import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTimes,
  FaBars,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";

function Contact() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
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
          <li onClick={() => navigate("/corporate")}>About Swiggy</li>
          <li onClick={() => navigate("/buisness")}>Our Businesses</li>
          <li onClick={() => navigate("/delivering-for-everyone")}>
            Delivering For Everyone
          </li>
          {/* <li>Newsroom</li>
                  <li>Investor Relations</li>
                  <li>Sustainability</li> */}
          <li onClick={() => navigate("/contact-us")}>Contact Us</li>
        </ul>
      </nav>
      <div className="container contact-container">
      <div className="row">
        {/* Left Section */}
        <div className="col-md-6 contact-left">
          <h1>Customer Support</h1>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:support@swiggy.in">support@swiggy.in</a>
          </p>

          <h5>Find us on</h5>
          <div className="social-icons">
            <a href="#"><FaLinkedin /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaPinterest /></a>
            <a href="#"><FaTwitter /></a>
          </div>

          <h5>Corporate Office</h5>
          <p>
            No. 55, Sy No. 8-14, Ground Floor, I&J Block, Embassy TechVillage,
            Outer Ring Road, Devarbisanahalli, Bengaluru 560 103, Karnataka, India
          </p>
          <button>Get Directions</button>
        </div>

        {/* Right Section */}
        <div className="col-md-6 contact-right">
          <form>
            <h3>Get In Touch</h3>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Enter Name" required />
            </div>
            <div className="mb-3">
              <input type="email" className="form-control" placeholder="Enter Email Address" required />
            </div>
            <div className="mb-3">
              <textarea className="form-control" rows="4" placeholder="Enter Message" required></textarea>
            </div>
            <button type="submit" onClick={()=>alert('your message submited')}>Submit</button>
          </form>
          <p className="terms-text">
            By contacting us, you agree to the <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
    </>
  );
}

export default Contact;
