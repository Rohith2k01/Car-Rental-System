import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { CollectRentalCar } from '../Api/CustomerApi'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './CustomerRental.css'

function CustomerRental() {

    var [rental, setRental] = useState([])

    var UserLoginInfo = useSelector((state) => state.UserLogin ? state.UserLogin.UserLoginData[0] : null)
    var ID = UserLoginInfo.id

    async function callRentalApi() {
        var response = await CollectRentalCar(ID)
        console.log(response.data);
        setRental(response.data)

    }

    useEffect(() => {

        callRentalApi()
    }, [])



    var navigate = useNavigate()
    function HandleBuyNow(car) {
        navigate('/Booking', { state: car })

    }
    return (
        <div>
            <section className="main-cart-sec">
                <h1 className="cart-heading">Available Cars for Rent</h1>
                <div className="cart-grid">
                    {rental.map((item, index) => (
                        <div key={index} className="cart-card-flex">
                            <img src={item.carImage} alt={item.carName} className="cart-img-flex" />

                            <div className="car-details-box">
                                <h2 className="car-name">{item.carName}</h2>

                        

                                <div className="vendor-details">
                                    <p><strong>Vendor:</strong> {item.vendorName}</p>
                                    <br />
                                    <p><strong>Contact:</strong> {item.vendorPhone}</p>
                                </div>

                                <p className="car-price">
                                    <span className="starting-from">Starting from</span>
                                    ₹{item.carPrice}
                                </p>

                                <button className="cart-btn" onClick={() => HandleBuyNow(item)}>
                                    Book Car
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>


    )
}

export default CustomerRental