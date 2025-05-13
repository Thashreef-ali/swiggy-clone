import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { FaSearch,FaStar } from 'react-icons/fa';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const addToCart = ()=>{
    alert("Added to cart")
  }

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(`https://swiggy-clone-backend-g9z2.onrender.com/api/search?query=${query}`);
      const data = await res.json();
      setResults(data.items || []);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="search-container">
        <form className="search-box" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for restaurants and food"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit"><FaSearch /></button>
        </form>

        <div className="menu-li">
              {Array.isArray(results)&& results.map((item, i) => (
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
    </>
  );
}

export default Search;
