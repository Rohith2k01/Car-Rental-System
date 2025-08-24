import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { UserRequest } from '../Axios/AxiosCreate';
import { useState } from 'react';
import './Booking.css'

function Booking() {

    var { state: car } = useLocation()
    console.log(car);
    var { fullname, email, phone, _id: userId } = car.userID
    var navigate = useNavigate()


    const [rentalDetails, setRentalDetails] = useState({
        pickupLocation: '',
        returnLocation: '',
        pickupDate: '',
        returnDate: ''
    });


    function collectdata(e) {
        const { value, name } = e.target
        setRentalDetails((preview) => ({
            ...preview,
            [name]: value
        }))
    }


    console.log(rentalDetails);


    async function HandleBuyNow() {
        const fullRentalDetails = `Pickup: ${rentalDetails.pickupLocation}, Return: ${rentalDetails.returnLocation}, Pickup Date: ${rentalDetails.pickupDate}, Return Date: ${rentalDetails.returnDate}`;
        try {
            var response = await UserRequest.post('/Booking/Car-booking', {
                amount: car.carPrice,
                carDetails: {
                    carid: car.carID,
                    carname: car.carName,
                    carimage: car.carImage,
                    carprice: car.carPrice
                },
                customerDetails: {
                    name: fullname,
                    rentalDetail: fullRentalDetails, // used for storing in DB
                    phone: phone
                },
                userid: userId,
                rentalid: car._id // RentalSchema's _id
            })
            console.log(response.data);
            var { id: id, amount } = response.data
            amount = amount * 10
            var razorpay = new window.Razorpay({
                key: 'rzp_test_BPZvupEGX3BN1n',
                amount,
                currency: "INR",
                description: "Test Transaction",
                id,
                handler: function (response) {
                    console.log("Payment response:", response);
                    navigate('/BookingDetails');
                }, prefill: {
                    name: fullname,
                    contact: phone
                }, notes: {
                    rentalDetails: fullRentalDetails
                }, theme: { color: '#3399c' }
            })
            razorpay.open()


        } catch (error) {
            console.log("Error from adding new api", error);

        }
    }



    return (
        <div className="booking-container">
            <h1 className="booking-title">Book Your Car Now</h1>

            <div className="booking-content">
                {/* Left Panel: Car + Customer Details */}
                <div className="booking-info-section">
                    <div className="info-card">
                        <h2 className="section-title">🚘 Car Details</h2>
                        <img src={car.carImage} alt="Car" className="car-image" />
                        <p><strong>Name:</strong> {car.carName}</p>
                        <p><strong>Price:</strong> ₹{car.carPrice}</p>
                    </div>

                    <div className="info-card">
                        <h2 className="section-title">👤 Customer Details</h2>
                        <p><strong>Name:</strong> {fullname}</p>
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>Contact:</strong> {phone}</p>
                    </div>
                </div>

                {/* Right Panel: Booking Form */}
                <div className="booking-form-section">
                    <div className="form-card">
                        <h2 className="section-title">📝 Booking Information</h2>

                        <div className="form-group">
                            <label htmlFor="pickupLocation">Pickup Location</label>
                            <input name="pickupLocation" type="text" placeholder="Enter pickup location" onChange={collectdata} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="returnLocation">Return Location</label>
                            <input name="returnLocation" type="text" placeholder="Enter return location" onChange={collectdata} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="pickupDate">Pickup Date</label>
                            <input name="pickupDate" type="date" onChange={collectdata} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="returnDate">Return Date</label>
                            <input name="returnDate" type="date" onChange={collectdata} />
                        </div>

                        <button className="book-btn" onClick={HandleBuyNow}>Book Now</button>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Booking