import React, { useState, } from "react";
import { FaBars, FaTimes,} from "react-icons/fa";
import {useNavigate} from "react-router-dom"

function Corporate() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("management");
  const navigate = useNavigate()
  const managementTeam = [
    {
      name: "Sriharsha Majety",
      role: "Managing Director and Group CEO",
      img: "ceo.webp",
    },
    {
      name: "Nandan Reddy",
      role: "Whole-time Director and Head of Innovation",
      img: "nandan.webp",
    },
    { name: "Rohit Kapoor", role: "CEO - Food Marketplace", img: "rohith.webp" },
    {
      name: "Madhusudhan Rao",
      role: "Chief Technology officer",
      img: "madhusudhan.webp",
    },
    {
      name: "Girish Menon",
      role: "Chief Human Resources Officer",
      img: "girish.webp",
    },
    { name: "Amithesh Jha", role: "CEO-Instamart", img: "amitesh.webp" },
  ];
  const boardOfDirectors = [
    {
      name: "Anand Karipalu",
      role: "Chairman,Independend Director",
      img: "anand.webp",
    },
    {
      name: "Shailesh Haribhakthi",
      role: "Independend Director",
      img: "shailesh.webp",
    },
    { name: "Suparna Mitra", role: "Independend Director", img: "suparna.webp" },
    { name: "Sahil Barua", role: "Independend Director", img: "sahil.webp" },
    { name: "Roger Clarks Robalias", role: "Non-Executive Director", img: "roger.webp" },
    {
      name: "Ashuthosh Sharma",
      role: "Non-Executive Director",
      img: "ashutosh.webp",
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
          <li onClick={()=>navigate('/corparate')}>About Swiggy</li>
          <li onClick={()=>navigate('/buisness')}>Our Businesses</li>
          <li onClick={()=>navigate('/delivering-for-everyone')}>Delivering For Everyone</li>
          <li onClick={()=>navigate('/contact-us')}>Contact Us</li>
        </ul>
      </nav>

      <div className="about-page">
        <h2 className="about">ABOUT US</h2>
        <p className="about-p">
          Swiggy is a new-age consumer-first organization offering an
          easy-to-use convenience platform, accessible through a
        </p>
        <p className="about-p">unified app.</p>
      </div>
      {/*  */}

      <div className="service-container">
        <div className="service-grid">
          {/* Swiggy Logo in Center */}
          <div className="swiggy-logo">
            <img src="swiggy-sign.webp" alt="Swiggy" />
          </div>

          {/* Surrounding Services */}
          <div className="food service-box">
            <img src="food.webp" alt="Food" />
          </div>
          <div className="instamart service-box">
            <img src="instamart.webp" alt="Instamart" />
          </div>
          <div className="dineout service-box">
            <img src="dineout.webp" alt="Dineout" />
          </div>
          <div className="genie service-box">
            <img src="genie.webp" alt="Genie" />
          </div>
          <div className="minis service-box">
            <img src="minis.webp" alt="Minis" />
          </div>
        </div>
      </div>

      {/*  */}
      <div className="container video-div">
        <h1 className="v-head">
          <span className="v-span">-</span>IPO DELIVERED - NOVEMBER-2024
          <span className="v-span">-</span>
        </h1>
      </div>
      <div className="for-v">
        <video controls muted autoPlay playsInline>
          <source src="swiggy-video.mp4" type="video/mp4" />
        </video>
      </div>


       <div className="container management">
      {/* Tabs */}
      <div className="tabs">
        <button className={activeTab === "management" ? "active" : ""} onClick={() => setActiveTab("management")}>
          Management Team
        </button>
        <button className={activeTab === "board" ? "active" : ""} onClick={() => setActiveTab("board")}>
          Board of Directors
        </button>
      </div>

      {/* Display Team Members */}
      <div className="team-container">
        {activeTab === "management"
          ? managementTeam.map((member, index) => (
              <div key={index} className="team-card">
                <img src={member.img} alt={member.name} />
                <h4>{member.name}</h4>
                <p>{member.role}</p>
              </div>
            ))
          : boardOfDirectors.map((member, index) => (
              <div key={index} className="team-card">
                <img src={member.img} alt={member.name} />
                <h4>{member.name}</h4>
                <p>{member.role}</p>
              </div>
            ))}
      </div>
    </div>
    </>
  );
}

export default Corporate;
