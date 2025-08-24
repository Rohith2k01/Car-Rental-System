import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { GetAllCars } from '../Api/AdminApi';
import { ApproveCar } from '../Api/AdminApi';
import './AdminHome.css'
import Swal from 'sweetalert2';

function AdminHome() {

  const [car, setCar] = useState([])

  useEffect(() => {
    async function GetCarApi() {
      var response = await GetAllCars()
      console.log(response.data);
      setCar(response.data)

    }
    GetCarApi()
  }, [])


  async function handleApprove(id, currentStatus) {
    try {
      const newStatus = !currentStatus;
      await ApproveCar(id, newStatus);

      // ✅ Show success SweetAlert
      Swal.fire({
        icon: 'success',
        title: `Car ${newStatus ? 'Approved' : 'Unapproved'}!`,
        text: `The car has been successfully ${newStatus ? 'approved' : 'unapproved'}.`,
        confirmButtonColor: '#28a745',
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      });

      // Update local state
      setCar(prevCars =>
        prevCars.map(car =>
          car._id === id ? { ...car, isApproved: newStatus } : car
        )
      );

    } catch (err) {
      console.log("Toggle approval error", err);

      // ❌ Show error SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update car approval status.',
        confirmButtonColor: '#d33',
      });
    }
  }




  return (
    <div className="admin-car-approval-container">
      <h2 className="admin-car-title">All Cars</h2>
      {car.length === 0 ? (
        <p className="admin-no-car">No cars found.</p>
      ) : (
        car.map((item) => (
          <div className="admin-approval-card" key={item._id}>
            <img
              src={item.carImage}
              alt={item.carName}
              className="admin-approval-image"
            />
            <div className="admin-approval-details">
              <h3>{item.carName}</h3>
              <p><strong>Seats:</strong> {item.carSeat}</p>
              <p><strong>Mileage:</strong> {item.carMileage} km/l</p>
              <p><strong>Rental Price:</strong> ₹{item.carPrice}</p>
              <p><strong>Rental Company:</strong> {item.carDis}</p>

              <button
                className={`approve-btn ${item.isApproved ? 'unapprove' : 'approve'}`}
                onClick={() => handleApprove(item._id, item.isApproved)}
              >
                {item.isApproved ? 'Unapprove' : 'Approve for Rental'}
              </button>
            </div>
          </div>
        ))
      )}
    </div>

  )
}

export default AdminHome