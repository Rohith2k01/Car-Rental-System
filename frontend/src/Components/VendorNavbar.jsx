import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { VendorLogoutData } from '../Redux/VendorSlice'
import './AdminNavbar.css'
import { FaSignOutAlt } from 'react-icons/fa'; // Logout icon

function VendorNavbar() {
  var dispatch = useDispatch()

  function userLogout() {
    dispatch(VendorLogoutData())
  }
  return (
    <div>
      <section className='navbar-main'>
        <div className='nav-left'>
          <h1>CarRental</h1>

        </div>

        <div className='nav-right'>
          <Link to={'/VendorHome'}>Home</Link>
          <Link to={'/Vendor-Add-Car'}>Add Car</Link>
          <Link to={'/VendorbookingDetails'}>Booking Details</Link>

          <span className="logout-link" onClick={userLogout}>
            <FaSignOutAlt title="Logout" />
          </span>

        </div>

      </section>
    </div>
  )
}

export default VendorNavbar