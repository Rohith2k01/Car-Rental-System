import React from 'react'
import { AddCarRental, GetApprovedCars } from '../Api/CustomerApi';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './CustomerHome.css'


function CustomerHome() {

  const [car, setCar] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCars, setFilteredCars] = useState([]);


  var UserLoginInfo = useSelector((state) => state.UserLogin ? state.UserLogin.UserLoginData[0] : null)
  var ID = UserLoginInfo.id



  useEffect(() => {
    async function fetchApproved() {
      const response = await GetApprovedCars();
      setCar(response.data);
      setFilteredCars(response.data); // initialize filteredCars to all
    }
    fetchApproved();
  }, []);


  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === '') {
      setFilteredCars(car); // Show all if search is empty
    } else {
      const result = car.filter((item) =>
        item.carName.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredCars(result); // Show only matching cars
    }
  };




  function AddingCarToRental(cart) {

    AddCarRental({ rental: cart, ID })


  }



  return (
    <div className="all-cars-container">
      <div className="banner-container">
        <img src="/images/Car-Rental Banner.jpeg" alt="Banner" className="banner-image" />
        <div className="banner-text">
          <h1>Drive with Confidence</h1>
          <p>Explore our premium fleet and book your perfect ride today.</p>
        </div>
      </div>

      <h2 className="all-cars-title">Available Cars</h2>

      {/* Search Bar */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search by car name..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      {filteredCars.length === 0 ? (
        <p className="no-cars-message">No cars found.</p>
      ) : (
        <div className="cars-grid">
          {filteredCars.map((item) => (
            <div className="car-card" key={item._id}>
              <img src={item.carImage} alt={item.carName} className="car-image" />
              <div className="car-details">
                <h3 className="car-name">{item.carName}</h3>
                <div className="icons">
                  <span>🚗 {item.carSeat} Seats</span>
                  <span>⚙️ Auto</span>
                  <span>⛽ {item.carMileage} km/l</span>
                </div>
                <br />
                <p>Rental Company: {item.carDis}</p>
                <br />
                <p className="price">Starting from ₹{item.carPrice}</p>
                <button
                  className="book-btn"
                  onClick={() => AddingCarToRental(item)}
                  disabled={!item.isAvailable}
                  style={{
                    backgroundColor: item.isAvailable ? '#0d1b2a' : '#ccc',
                    cursor: item.isAvailable ? 'pointer' : 'not-allowed',
                  }}                                                                    
                >
                  {item.isAvailable ? 'Rent Car' : 'Unavailable'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>


  )
}

export default CustomerHome