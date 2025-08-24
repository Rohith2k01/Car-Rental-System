import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { GetCar, ToggleAvailability } from '../Api/VendorApi';
import { useSelector } from 'react-redux';
import './VendorHome.css'
import Swal from 'sweetalert2';

function VendorHome() {

  const [car, setCar] = useState([])

  var VendorLoginInfo = useSelector((state) => state.VendorLogin ? state.VendorLogin.VendorLoginData[0] : null)
  var ID = VendorLoginInfo.id

  useEffect(() => {
    async function CallCarApi() {
      var response = await GetCar(ID)
      console.log(response.data);
      setCar(response.data)

    }
    CallCarApi()
  }, [])

  async function handleAvailabilityToggle(id, currentStatus) {
    try {
      const newStatus = !currentStatus;
      await ToggleAvailability(id, newStatus);

      // ✅ Success SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Status Updated',
        text: `Car marked as ${newStatus ? 'Available' : 'Not Available'}`,
        confirmButtonColor: '#28a745',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      setCar(prevCars =>
        prevCars.map(car =>
          car._id === id ? { ...car, isAvailable: newStatus } : car
        )
      );

    } catch (error) {
      console.log("Error toggling availability", error);

      // ❌ Error SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Failed to Update',
        text: 'Something went wrong while changing availability.',
        confirmButtonColor: '#d33'
      });
    }
  }



  return (
    <div className="admin-cars-container">
      <h2 className="admin-cars-title">All Cars</h2>

      {car.length === 0 ? (
        <p className="admin-no-cars">No cars found.</p>
      ) : (
        car.map((item) => (
          <div className="admin-car-card" key={item._id}>
            <img src={item.carImage} alt={item.carName} className="admin-car-image" />
            <div className="admin-car-details">
              <h3 className="admin-car-name">{item.carName}</h3>

              <p>
                <strong>Status:</strong>{' '}
                <span className={`status-badge ${item.isApproved ? 'approved' : 'not-approved'}`}>
                  {item.isApproved ? 'Approved' : 'Not Approved'}
                </span>
              </p>

              <p><strong>Seats:</strong> {item.carSeat}</p>
              <p><strong>Mileage:</strong> {item.carMileage} km/l</p>
              <p><strong>Rental Price:</strong> ₹{item.carPrice}</p>
              <p><strong>Rental Company:</strong> {item.carDis}</p>

              <p>
                <strong>Availability:</strong>{' '}
                <span className={`status-badge ${item.isAvailable ? 'available' : 'not-available'}`}>
                  {item.isAvailable ? 'Available' : 'Not Available'}
                </span>

                <button
                  className={`toggle-btn ${item.isAvailable ? 'make-unavailable' : 'make-available'}`}
                  onClick={() => handleAvailabilityToggle(item._id, item.isAvailable)}
                >
                  {item.isAvailable ? 'Mark as Not Available' : 'Mark as Available'}
                </button>
              </p>
            </div>
          </div>
        ))
      )}
    </div>

  )
}

export default VendorHome