import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import './App.css'
import AdminLogin from './AdminPages/AdminLogin'
import AdminHome from './AdminPages/AdminHome'
import AdminLayout from './Layout/AdminLayout'
import AdminProtect from './Components/AdminProtect'
import VendorSignup from './VendorPages/VendorSignup'
import VendorLogin from './VendorPages/VendorLogin'
import VendorProtect from './Components/VendorProtect'
import VendorLayout from './Layout/VendorLayout'
import VendorHome from './VendorPages/VendorHome'
import CustomerSignup from './CustomerPages/CustomerSignup'
import CustomerLogin from './CustomerPages/CustomerLogin'
import CustomerProtect from './Components/CustomerProtect'
import CustomerLayout from './Layout/CustomerLayout'
import CustomerHome from './CustomerPages/CustomerHome'
import CommonHome from './Components/CommonHome'
import VendorAddCar from './VendorPages/VendorAddCar'
import AllCars from './AdminPages/AllCars'
import Booking from './CustomerPages/Booking'
import BookingDetails from './CustomerPages/BookingDetails'
import CustomerRental from './CustomerPages/CustomerRental'
import AllBookingDetails from './AdminPages/AllBookingDetails'
import VendorBookingDetails from './VendorPages/VendorBookingDetails'


function App() {
  

  return (
    <>
    <Router>
      <Routes>
        {/* Admin public Route */}
          <Route path='/Admin' element={<AdminLogin/>}/>

          {/* Admin Protected Route */}
          <Route element={<AdminProtect> <AdminLayout/> </AdminProtect>}>

          <Route path='/Admin-Home' element={<AdminHome/>}/>
          <Route path='/Allcars' element={<AllCars/>}/>
          <Route path='/AllbookingDetails' element={<AllBookingDetails/>}/>

          </Route>

           {/* vendor public Routes */}
          <Route path='/Vendorsignup' element={<VendorSignup/>} />
          <Route path='/VendorLogin' element={<VendorLogin/>}/>

          {/* vendor Protected Route */}
          <Route element={<VendorProtect> <VendorLayout/> </VendorProtect>}>

          <Route path='/VendorHome' element={<VendorHome/>}/>
          <Route path='/Vendor-Add-Car' element={<VendorAddCar/>}/>
          <Route path='/VendorbookingDetails' element={<VendorBookingDetails/>}/>

          </Route>

          {/* customer public Routes */}
          <Route path='/Customersignup' element={<CustomerSignup/>} />
          <Route path='/CustomerLogin' element={<CustomerLogin/>}/>
          <Route path='/' element={<CommonHome/>}/>

          {/* customer Protected Route */}
          <Route element={<CustomerProtect> <CustomerLayout/> </CustomerProtect>}>

          <Route path='/CustomerHome' element={<CustomerHome/>}/>
          <Route path='/Rental' element={<CustomerRental/>}/>
          <Route path='/Booking' element={<Booking/>}/>
          <Route path='/BookingDetails' element={<BookingDetails/>}/>

          </Route>

      </Routes>
    </Router>
     
    </>
  )
}

export default App
