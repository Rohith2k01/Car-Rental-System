import React from 'react'
import { useState } from 'react'
import '../Components/Login.css'
import { userSignup } from '../Api/CustomerApi'
import { Link, useNavigate } from 'react-router-dom'

function CustomerSignup() {
    var [userData, setUserData] = useState({
        FullName: '',
        Email: '',
        Phone: '',
        Password: ''
    })

    var navigate = useNavigate()

    function TakeValue(e) {
        const { name, value } = e.target
        setUserData((preview) => ({
            ...preview,
            [name]: value
        }))
    }

    function handlesubmit() {
        if (userData.Email && userData.FullName && userData.Password && userData.Phone) {
            userSignup(userData, navigate);
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

                    <button onClick={handlesubmit} className='btn-login' >Customer Signup</button>



                    <Link to="/CustomerLogin" className="login-link">
                        🔑 Already have an account? <span>Login</span>
                    </Link>

                </div>

            </section>

        </div>
    )
}

export default CustomerSignup