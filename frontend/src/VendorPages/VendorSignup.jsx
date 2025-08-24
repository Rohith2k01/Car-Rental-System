import React from 'react'
import { useState } from 'react'
import '../Components/Login.css'
import { vendorSignup } from '../Api/VendorApi'
import { Link, useNavigate } from 'react-router-dom'

function VendorSignup() {
    var [vendorData, setVendorData] = useState({
        FullName: '',
        Email: '',
        Phone: '',
        Password: ''
    })

    var navigate = useNavigate()

    function TakeValue(e) {
        const { name, value } = e.target
        setVendorData((preview) => ({
            ...preview,
            [name]: value
        }))
    }

    function handlesubmit() {
        if (vendorData.Email && vendorData.FullName && vendorData.Password && vendorData.Phone) {
            vendorSignup(vendorData, navigate);
        } else {
            alert("Fill All the input Fields to signup")
        }
    }
    return (
        <div>

            <section className='main-section-login'>
                <div className='inner-login'>

                    <h1>CarRental</h1>

                    <div className='input-main-login'>
                        <label htmlFor="fullname">FullName</label>
                        <input name="FullName" type="text" placeholder='Enter your Fullname'
                            onChange={TakeValue}
                        />
                    </div>

                    <div className='input-main-login'>
                        <label htmlFor="email">Email</label>
                        <input name="Email" type="email" placeholder='Enter your Email'
                            onChange={TakeValue}
                        />
                    </div>

                    <div className='input-main-login'>
                        <label htmlFor="phone">Phone</label>
                        <input name="Phone" type="number" placeholder='Enter your Contact Number'
                            onChange={TakeValue}
                        />
                    </div>

                    <div className='input-main-login'>
                        <label htmlFor="password">Password</label>
                        <input name='Password' type="password" placeholder='Enter your password'
                            onChange={TakeValue}
                        />
                    </div>

                    <button onClick={handlesubmit} className='btn-login' >Vendor Signup</button>



                    <Link to="/VendorLogin" className="login-link">
                        🔑 Already have an account? <span>Login</span>
                    </Link>


                </div>

            </section>


        </div>
    )
}

export default VendorSignup