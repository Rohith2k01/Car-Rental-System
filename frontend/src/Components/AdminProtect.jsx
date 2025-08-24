import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function AdminProtect({children}) {
  var AdminLoginInfo = useSelector((state)=>state.AdminLogin.AdminLoginData[0] ? state.AdminLogin.AdminLoginData[0] : null)
      
      var AdminToken = null
      if (AdminLoginInfo){
        AdminToken = AdminLoginInfo.Token
      }


      if(!AdminToken){
        return <Navigate to={'/Admin'}/>
      }else{
        return children
      }
}

export default AdminProtect