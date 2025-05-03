import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar"; 

const Offers = () => {
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/api/offers")
      .then((res) => res.json())
      .then((data) => setOffers(data))
      .catch((error) => console.error("Error fetching offers:", error));
  }, []);
  return (
    <>
      <Navbar />
      <div className="container py-4 offers-page">
        <div className="row g-4 d-flex flex-wrap align-items-stretch">
          {offers.map((item, index) => (
            <div className="col-md-4 d-flex" key={index}>
              <div
                className="card shadow rounded-4 overflow-hidden w-100 h-100 d-flex flex-column"
                style={{ cursor: "pointer" }}
              >
                <img
                  src={item.img}
                  className="card-img-top"
                  alt={item.name}
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5
                        className="card-title mb-0 text-truncate"
                        title={item.name}
                      >
                        {item.name}
                      </h5>
                      <span className="badge bg-success">
                        <FaStar className="me-1" />
                        {item.rating}
                      </span>
                    </div>
                    <p className="text-muted mb-1">{item.cuisines}</p>
                    <p className="text-muted mb-1">{item.price}</p>
                    <p className="text-muted mb-2">
                      {item.location} • {item.distance}
                    </p>
                    <span className="badge bg-light text-dark mb-2 d-inline-block">
                      🪑 Table booking
                    </span>
                    <div className="mb-2">
                      <span className="badge bg-success me-2">
                        {item.prebooking}
                      </span>
                      <span className="text-muted">{item.extraOffers}</span>
                    </div>
                    <div className="mb-1 text-success">{item.bankOffer}</div>
                    <div className="text-primary">{item.coupon}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Offers;
