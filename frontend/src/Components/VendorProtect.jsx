import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function VendorProtect({children}) {
   var VendorLoginInfo = useSelector((state) =>  state.VendorLogin ? state.VendorLogin.VendorLoginData[0] : null )
    var VendorToken = null
    console.log(VendorLoginInfo);
    


    if (VendorLoginInfo) {
        VendorToken = VendorLoginInfo.Token
    }

    if (!VendorToken) {
        return <Navigate to={'/'} replace />
    } else {
        return children
    }

}

export default VendorProtect