import React from 'react'
import './AdminNavbar.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userLogoutData } from '../Redux/CustomerSlice'
import './CustomerNavbar.css'
import { FaSignOutAlt } from 'react-icons/fa'; // Logout icon

function CustomerNavbar() {

    var dispatch = useDispatch()

    function userLogout() {
      dispatch(userLogoutData())
    }

  return (
    <div>
        <header className="navbar-main">
      <div className="nav-left">
        <h1>CarRental</h1>
      </div>

      <nav className="nav-right">
        <Link to="/CustomerHome">Home</Link>
        <Link to="/Rental">Rental</Link>
        <Link to="/BookingDetails">Bookings</Link>

        
        <span className="logout-link" onClick={userLogout}>
          <FaSignOutAlt title="Logout" />
        </span>
      </nav>
    </header>
    </div>
  )
}

export default CustomerNavbar