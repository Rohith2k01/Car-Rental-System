import React from 'react'
import VendorNavbar from '../Components/VendorNavbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer'

function VendorLayout() {
  return (
    <div>
        <VendorNavbar/>

        <div><Outlet/></div>

        <Footer/>
    </div>
  )
}

export default VendorLayout