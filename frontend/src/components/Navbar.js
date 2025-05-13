import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Main.css";
import {
  FaChevronDown,
  // FaBriefcase,
  FaSearch,
  FaPercentage,
  FaLifeRing,
  FaUser,
  FaShoppingBasket,
  FaBars,
  FaTimes,
} from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [logo,setLogo]= useState([])

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("islogin");
    setIsLogin(false);
    setUsername("");
    navigate("/login");
  };

  useEffect(() => {
    setIsLogin(localStorage.getItem("islogin") === "true");
    setUsername(JSON.parse(localStorage.getItem("user"))?.name || "");

    const checkLoginStatus = () => {
      setIsLogin(localStorage.getItem("islogin") === "true");
      setUsername(JSON.parse(localStorage.getItem("user"))?.name || "");
    };

    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  useEffect(() => {
    fetch("https://swiggy-clone-backend-g9z2.onrender.com/api/logo")
      .then((response) => response.json())
      .then((data) => setLogo(data))
      .catch((err) => console.error("Error fetching logo:", err));
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="left-side">
        <div style={{cursor:"pointer"}}>
      {logo.map((item, index) => (
        <img
          key={index}
          src={`data:${item.img.contentType};base64,${btoa(
            String.fromCharCode(...new Uint8Array(item.img.data.data))
          )}`}
          alt="Swiggy Logo"
          className="logo"
          onClick={()=>navigate('/')}
        />
      ))}
    </div>
          <div className="location" onClick={() => setIsSidebarOpen(true)}>
            <b className="others">Other</b>
            <FaChevronDown className="down-arrow" />
          </div>
        </div>

        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>

        <div className={`right-items ${menuOpen ? "open" : ""}`}>
          <ul>
            {/* <li onClick={() => navigate("/corporate")}>
              <FaBriefcase className="icon" />
              Swiggy Corporate
            </li> */}
            <li onClick={() => navigate("/search")}>
              <FaSearch className="icon" />
              Search
            </li>
            <li className="offers" onClick={() => navigate("/offers")}>
              <FaPercentage className="icon" />
              Offers <span className="new-label">NEW</span>
            </li>
            <li onClick={() => navigate("/help")}>
              <FaLifeRing className="icon" />
              Help
            </li>

            {/* Login / Profile Dropdown */}
            {isLogin ? (
              <li
                className="dropdown"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <div className="dropdown-toggle">
                  <FaUser className="icon" />
                  {username || "Profile"}
                </div>
                {dropdownOpen && (
                  <ul className="dropdown-menu">
                    <li onClick={() => navigate("/profile")}>Profile</li>
                    <li onClick={handleLogout}>Logout</li>
                  </ul>
                )}
              </li>
            ) : (
              <li onClick={() => navigate("/login")}>
                <FaUser className="icon" />
                Sign In
              </li>
            )}

            <li onClick={() => navigate("/cart")}>
              <FaShoppingBasket className="icon" />
              Cart
            </li>
          </ul>
        </div>
      </nav>

      {/* Sidebar & Overlay */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <FaTimes className="close-btn" onClick={() => setIsSidebarOpen(false)} />
        </div>
        <input
          type="text"
          className="location-input"
          placeholder="Enter your location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button className="get-location-btn" onClick={setLocation}>
          Get Current Location
        </button>
      </div>
      {isSidebarOpen && (
        <div className="overlay" onClick={() => setIsSidebarOpen(false)}></div>
      )}
    </>
  );
}

export default Navbar;
