import React from 'react'
import './Login.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { AdminLoginApi } from '../Api/AdminApi';
import { AdminLoginData } from '../Redux/AdminSlice';
import { useNavigate } from 'react-router-dom';
import { Vendorlogin } from '../Api/VendorApi';
import { VendorLoginData } from '../Redux/VendorSlice';
import { Userlogin } from '../Api/CustomerApi';
import { UserLoginData } from '../Redux/CustomerSlice';

function Login(props) {
    console.log(props.owner);

    var dispatch = useDispatch()
    var navigate = useNavigate()

    const [loginData, setLoginData] = useState({
        Email: '',
        Password: ''
    })
    // take value to state
    function takevalues(e) {
        const { name, value } = e.target
        setLoginData((preview) => ({
            ...preview,
            [name]: value
        })
        )
    }

    // calling admin login api
    async function handleAdminsubmit() {
        try {
            var response = await AdminLoginApi(loginData)
            console.log(response.data);
            dispatch(AdminLoginData(response.data))
            navigate('/Admin-Home')

        } catch (error) {
            console.log("error from Admin login", error);

        }

    }

    // calling vendor login api
    async function vendorloginHandle() {
        var response = await Vendorlogin(loginData)
        dispatch(VendorLoginData(response.data))
        navigate('/VendorHome')
    }

     // calling user login api
    async function CustomerloginHandle(){
        var response = await Userlogin(loginData)
        dispatch(UserLoginData(response.data))
        navigate('/CustomerHome')
    }

    return (
        <section className='main-section-login'>
            <div className='inner-login'>

                <h1>CarRental</h1>

                <div className='input-main-login'>
                    <label htmlFor="email">Email</label>
                    <input name="Email" type="email" placeholder='Enter your Email'
                        onChange={takevalues} />
                </div>

                <div className='input-main-login'>
                    <label htmlFor="password">Password</label>
                    <input name='Password' type="password" placeholder='Enter your password'
                        onChange={takevalues} />
                </div>

                {
                    props.owner === 'vendor' ? (
                        <button className='btn-login' onClick={vendorloginHandle}>Vendor Login</button>
                    ) : props.owner === 'admin' ? (
                        <button className='btn-login' onClick={handleAdminsubmit}>Admin Login</button>
                    ) : (
                        <button className='btn-login' onClick={CustomerloginHandle}>User Login</button>
                    )
                }

            </div>
        </section>
    )
}

export default Login