import {createSlice} from '@reduxjs/toolkit'


const VendorSlice = createSlice({
    name: 'VendorLogin',
    initialState:{
        VendorLoginData:[]
    },
    reducers:{
        VendorLoginData: (state, action)=>{
            state.VendorLoginData.push(action.payload)
        },
        VendorLogoutData: (state, action)=>{
            state.VendorLoginData = []
        }
    }
})
export const {VendorLoginData, VendorLogoutData} = VendorSlice.actions
export default VendorSlice.reducer