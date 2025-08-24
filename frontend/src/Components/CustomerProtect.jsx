import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function CustomerProtect({children}) {
   var UserLoginInfo = useSelector((state) =>  state.UserLogin ? state.UserLogin.UserLoginData[0] : null )
    var UserToken = null
    console.log(UserLoginInfo);
    


    if (UserLoginInfo) {
        UserToken = UserLoginInfo.Token
    }

    if (!UserToken) {
        return <Navigate to={'/'} replace />
    } else {
        return children
    }
}

export default CustomerProtect