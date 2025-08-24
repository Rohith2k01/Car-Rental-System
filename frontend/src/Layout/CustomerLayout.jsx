import React from 'react'
import CustomerNavbar from '../Components/CustomerNavbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer'

function CustomerLayout() {
  return (
    <div>
        <CustomerNavbar/>

        <div><Outlet/></div>

        <Footer/>
    </div>
  )
}

export default CustomerLayout