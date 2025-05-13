import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Navbar from "./Navbar";

const City = () => {
  const { name } = useParams();
  const [city, setCity] = useState(null);

  useEffect(() => {
    fetch(`https://swiggy-clone-backend-g9z2.onrender.com/api/city/${name}`)
      .then((res) => res.json())
      .then((data) => setCity(data))
      .catch((err) => console.error("Error loading city:", err));
  }, [name]);
  const [restuarents, setRestuarents] = useState([]);
  useEffect(() => {
    fetch(`https://swiggy-clone-backend-g9z2.onrender.com/api/cityresto/${name}`)
      .then((res) => res.json())
      .then((data) => setRestuarents(data))
      .catch((err) => console.error("Error loading restaurants: ", err));
  }, [name]);

  return (
    <>
      <Navbar />
    <div className="container py-4 offers-page">
            <div className="row g-4 d-flex flex-wrap align-items-stretch">
              {restuarents.map((item, index) => (
                <div className="col-md-4 d-flex" key={index}>
                  <div
                    className="card shadow rounded-4 overflow-hidden w-100 h-100 d-flex flex-column"
                    style={{ cursor: "pointer" }}
                  >
                      <img
        src={`data:${item.img?.contentType};base64,${btoa(
          String.fromCharCode(...new Uint8Array(item.img?.data?.data || []))
        )}`}
        className="card-img-top"
        alt={city.name}
        style={{ height: "180px", objectFit: "cover" }}
      />
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h5
                            className="card-title mb-0 text-truncate"
                            title={item.hotel}
                          >
                            {item.hotel}
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

export default City;