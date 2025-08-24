import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from '../Components/AdminNavbar'
import Footer from '../Components/Footer'

function AdminLayout() {
  return (
    <div>
        <AdminNavbar/>
        <div>
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default AdminLayout