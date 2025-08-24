import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { GetAllCars } from '../Api/AdminApi';
import { ApproveCar } from '../Api/AdminApi';  

function AllCars() {
    const [car, setCar] = useState([])

    useEffect(() => {
        async function GetCarApi() {
            var response = await GetAllCars()
            console.log(response.data);
            setCar(response.data)

        }
        GetCarApi()
    }, [])

    async function handleApprove(id) {
        try {
            await ApproveCar(id);
            alert("Car Approved!");
            // Refresh the list
            const response = await GetAllCars();
            setCar(response.data);
        } catch (err) {
            console.log("Approval error", err);
        }
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>All Cars</h2>
            {car.length === 0 ? (
                <p>No cars found.</p>
            ) : (
                car.map((item) => (
                    <div
                        key={item._id}
                        style={{
                            padding: '20px',
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                            width: '80%',
                            margin: '20px auto',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                            display: 'flex',
                            gap: '20px',
                        }}
                    >
                        <img
                            src={item.carImage}
                            alt={item.carName}
                            style={{ width: '250px', height: '180px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                        <div style={{ flex: 1 }}>
                            <h3>{item.carName}</h3>
                            <br />
                            <p><strong>Seats:</strong> {item.carSeat}</p>
                            <br />
                            <p><strong>Mileage:</strong> {item.carMileage} km/l</p>
                            <br />
                            <p><strong>Rental Price:</strong> ₹{item.carPrice}</p>
                            <br />
                            <p><strong>Description:</strong> {item.carDis}</p>
                            <br />
                            <button
                                onClick={() => handleApprove(item._id)}
                                style={{ backgroundColor: 'green', color: 'white', border: 'none', padding: '10px 20px', fontSize: '16px', borderRadius: '8px' }}>
                                Approve for Rental
                            </button>

                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default AllCars