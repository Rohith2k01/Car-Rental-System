import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { GetBooking, UpdateBookingStatus } from '../Api/CustomerApi'
import { useSelector } from 'react-redux'
import './BookingDetails.css'
import { UserRequest } from '../Axios/AxiosCreate'
import Swal from 'sweetalert2';

function BookingDetails() {

    var UserLoginInfo = useSelector((state) => state.UserLogin ? state.UserLogin.UserLoginData[0] : null)
    var ID = UserLoginInfo.id

    const [booking, setBooking] = useState([])

    const [feedbacks, setFeedbacks] = useState({});

    useEffect(() => {
        async function CallOrderApi() {
            var response = await GetBooking(ID)
            console.log(response.data);
            setBooking(response.data)

        }
        CallOrderApi()
    }, [])

    // Update status handler
    async function handleStatusUpdate(bookingId) {
        const response = await UpdateBookingStatus(bookingId, "Returned");
        if (response && response.data) {
            setBooking(prev =>
                prev.map(item =>
                    item._id === bookingId ? { ...item, status: "Returned" } : item
                )
            );
        }
    }

    // Feedback submition

    async function submitFeedback(bookingId) {
        try {
            const res = await UserRequest.put(`/Booking/add-feedback/${bookingId}`, {
                feedback: feedbacks[bookingId]
            });

            Swal.fire({
                icon: 'success',
                title: 'Feedback Submitted!',
                text: 'Thank you for your valuable feedback.',
                confirmButtonColor: '#28a745'
            });

            // Optionally reload after a delay
            setTimeout(() => window.location.reload(), 1500);

        } catch (err) {
            console.error('Error submitting feedback:', err);
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: 'Please try again later.',
                confirmButtonColor: '#d33'
            });
        }
    }

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

                        <div className="booking-vendor">
                            <h3>Vendor Details</h3>
                            <p><strong>Name:</strong> {item.vendorName}</p>
                            <p><strong>Phone:</strong> {item.vendorPhone}</p>
                        </div>

                        <div className="booking-payment">
                            <h3>Booking & Payment Status</h3>
                            <p><strong>Return Status:</strong> {item.status === 'Returned' ? 'Returned' : 'Ongoing'}</p>
                            <p><strong>Payment Status:</strong> {item.Paymentstatus}</p>
                            <p><strong>Payment ID:</strong> {item.booking_id}</p>
                        </div>


                        {/* Show button only if not already returned */}
                        {item.status !== 'Returned' && (
                            <button
                                className="return-btn"
                                onClick={() => handleStatusUpdate(item._id)}
                            >
                                Return the Car
                            </button>
                        )}


                        {item.status === 'Returned' && !item.feedback && (
                            <div className="feedback-form-container">
                                <textarea
                                    className="feedback-textarea"
                                    placeholder="Write your feedback..."
                                    value={feedbacks[item._id] || ''}
                                    onChange={(e) =>
                                        setFeedbacks({ ...feedbacks, [item._id]: e.target.value })
                                    }
                                />
                                <button
                                    className="feedback-submit-btn"
                                    onClick={() => submitFeedback(item._id)}
                                >
                                    Submit Feedback
                                </button>
                            </div>
                        )}

                        {item.feedback && (
                            <div className="feedback-display-box">
                                <p><strong>Your Feedback:</strong> {item.feedback}</p>
                            </div>
                        )}



                    </div>
                ))
            }
        </div>

    )
}

export default BookingDetails