import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { GetAllBooking } from '../Api/AdminApi';
import './AllBookingDetails.css'

function AllBookingDetails() {

    const [booking, setBooking] = useState([])

    useEffect(() => {
        async function CallOrderApi() {
            var response = await GetAllBooking()
            console.log(response.data);
            setBooking(response.data)

        }
        CallOrderApi()
    }, [])


    return (

        <div className="booking-details-container">
            {
                booking.map((item, index) => (
                    <div className="booking-card" key={index}>
                        <h4 className="booking-id">Booking ID: {item.booking_id}</h4>

                        <div className="booking-car-section">
                            <img src={item.carDetails.carimage} alt="Car" className="booking-car-image" />
                            <div className="car-info">
                                <h2>Car Name: {item.carDetails.carname}</h2>
                                <h2>Price: ₹ {item.carDetails.carprice}</h2>
                            </div>
                        </div>

                        <div className="booking-info">
                            <h3>Rental Details</h3>
                            <p><strong>Name:</strong> {item.customerDetails.name}</p>
                            <p><strong>Rental Info:</strong> {item.customerDetails.rentalDetail}</p>
                            <p><strong>Contact:</strong> {item.customerDetails.phone}</p>
                        </div>

                        <div className="booking-payment">
                            <h3>Booking & Payment Status</h3>
                            <p><strong>Return Status:</strong> {item.status === 'Returned' ? 'Returned' : 'Ongoing'}</p>
                            <p><strong>Payment Status:</strong> {item.Paymentstatus}</p>
                            <p><strong>Payment ID:</strong> {item.booking_id}</p>
                        </div>

                        {item.feedback && (
                            <div className="booking-feedback">
                                <h3>Customer Feedback</h3>
                                <p>{item.feedback}</p>
                            </div>
                        )}


                    </div>
                ))
            }
        </div>

    )
}

export default AllBookingDetails