import React from 'react'
import './AdminNavbar.css'
import { Link } from 'react-router-dom'

function CommonNavBar() {
  return (
    <div>
        <section className='navbar-main'>
                <div className='nav-left'>
                    <h1>CarRental</h1>

                </div>

                <div className='nav-right'>
                    <Link to={'/VendorSignup'}>Vendor Signup</Link>
                    <Link to={'/CustomerSignup'}>Customer Signup</Link>

                </div>

            </section>
    </div>
  )
}

export default CommonNavBar