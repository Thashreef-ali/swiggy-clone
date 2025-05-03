import React ,{useState}from 'react'
import {FaTimes,FaBars} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function Buisness() {
    const navigate=useNavigate()
    const [menuOpen, setMenuOpen] = useState(false);
    const cards=[
        {
            img: "swiggy-food.webp", 
            title: "Swiggy Food",
            description:"On our Food Delivery marketplace, users can conveniently search and discover multiple restaurant listings, browse their menus, place food orders, pay seamlessly, and track order deliveries. These orders are received and prepared by our restaurant partners and delivered to users through the large fleet of delivery partners on our platform."
        },
        {
            img: "swiggy-instamart.webp",
            title: "Swiggy Instamart",
            description:"On Instamart, users can access and browse a wide selection of grocery and household items. These orders are received by merchant partners, processed through our dark stores, and delivered to users through delivery partners."
        },
        {
            img: "swiggy-dinout.webp",
            title: "Swiggy Dineout",
            description:"Dineout facilitates a user’s eating-out experience, through which users can discover restaurants, access menus and images, make reservations, benefit from attractive promotions, and make digital payments to such restaurants on our platform."
        },
        {
            img: "swiggy-genie.webp",
            title: "Swiggy Genie",
            description:"Genie is an on-demand product pick-up/ drop-off service for users. This service is availed by a user for sending a product from one point to another within a city."
        },
        {
            img: "swiggy-mines.webp",
            title: "Swiggy Minis",
            description:"Swiggy Minis is a direct-to-consumer offering where local homegrown brands can establish their own mini-storefront on our platform, engage with a broader user base and benefit from our technology-enabled logistics capabilities and back-end services such as discovery, check-out and payment."
        },
        {
            img: "logistics.png",
            title: "Lynks Logistics ",
            description:"Lynks is engaged in the business of, inter alia, organisation and transport of goods, providing facilities for design and development of systems to manage such transportation and maintenance of a market on the internet for purpose of providing a platform for transports to avail such transportation services."
        },
    ]

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
              <li onClick={()=>navigate('/buisness')}>Our Businesses</li>
              <li onClick={()=>navigate('/delivering-for-everyone')}>Delivering For Everyone</li>
              {/* <li>Newsroom</li>
              <li>Investor Relations</li>
              <li>Sustainability</li> */}
              <li onClick={()=>navigate('/contact-us')}>Contact Us</li>
            </ul>
          </nav>

          <div className="business-container">
      <header>
        <h1 className="business-title">OUR BUSINESS</h1>
      </header>
      <div className="business-cards">
        {cards.map((business, index) => (
          <div className="business-card" key={index}>
            <div className="cb-img">
              <img src={business.img} alt={business.title} className="business-img" />
            </div>
            <h2>{business.title}</h2>
            <p>{business.description}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default Buisness