import React from 'react'
import { useDispatch } from 'react-redux'
import { AdminLogoutData } from '../Redux/AdminSlice'
import { Link } from 'react-router-dom'
import './AdminNavbar.css'
import { FaSignOutAlt } from 'react-icons/fa'; // Logout icon

function AdminNavbar() {
    var dispatch = useDispatch()

    function logout() {
        dispatch(AdminLogoutData())
    }
    return (
        <div>
            <section className='navbar-main'>
                <div className='nav-left'>
                    <h1>CarRental</h1>

                </div>

                <div className='nav-right'>
                    <Link to={'/Admin-Home'}>Home</Link>
                    {/* <Link to={'/Allcars'}>All Rentals</Link> */}
                    <Link to={'/AllbookingDetails'}>All Booking Details</Link>

                    <span className="logout-link" onClick={logout}>
                        <FaSignOutAlt title="Logout" />
                    </span>

                </div>

            </section>
        </div>
    )
}

export default AdminNavbar