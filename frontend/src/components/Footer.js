import React, { useEffect, useState } from 'react';

const Footer = () => {
  const [logo, setLogo] = useState([]);

  useEffect(() => {
    fetch("https://swiggy-clone-backend-g9z2.onrender.com/api/logo")
      .then((response) => response.json())
      .then((data) => setLogo(data))
      .catch((err) => console.error("Error fetching logo:", err));
  }, []);

  return (
    <footer style={{ backgroundColor: '#f5f5f5', padding: '30px 20px', fontSize: '14px', color: '#666' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        
        {/* Logo */}
        <div style={{ flex: '1', minWidth: '150px', display: 'flex', alignItems: 'center', marginLeft: '100px' }}>
  {logo && logo.length > 0 && logo.map((item, index) => (
    <React.Fragment key={index}>
      <img
        src={`data:${item.img.contentType};base64,${btoa(
          String.fromCharCode(...new Uint8Array(item.img.data.data))
        )}`}
        alt="Swiggy Logo"
        style={{ 
          width: '70px', 
          height: '70px', 
          objectFit: 'cover', 
          borderRadius: '20%',
          marginRight: '10px' // small space between logo and text
        }}
      />
      <span style={{ fontSize: '24px', color: '#FF5400', fontWeight: 'bold' }}>Swiggy</span>
    </React.Fragment>
  ))}
</div>


        {/* Available Cities */}
        <div style={{ flex: '1', minWidth: '150px', textAlign: 'left' }}>
          <h4>Available in</h4>
          <p>Delhi</p>
          <p>Mumbai</p>
          <p>Bengaluru</p>
          <p>Hyderabad</p>
          <p>Chennai</p>
          <p>Kolkata</p>
        </div>

        {/* Social Links */}
        <div style={{ flex: '1', minWidth: '150px', textAlign: 'left' }}>
          <h4>Follow us</h4>
          <p><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#666', textDecoration: 'none' }}>Facebook</a></p>
          <p><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#666', textDecoration: 'none' }}>Instagram</a></p>
          <p><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#666', textDecoration: 'none' }}>Twitter</a></p>
        </div>

      </div>

      {/* Bottom copyright */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>&copy; 2025 Swiggy Clone. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
