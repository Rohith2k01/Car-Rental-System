import {createSlice} from "@reduxjs/toolkit"

const AdminLoginSlice = createSlice({
    name:'Adminlogin',
    initialState:{
        AdminLoginData:[]
    },
    reducers:{
        AdminLoginData:(state,action)=>{
            state.AdminLoginData.push(action.payload)

        },
        AdminLogoutData:(state,action)=>{
            state.AdminLoginData =[]
        }
    }
})
export const {AdminLoginData, AdminLogoutData} = AdminLoginSlice.actions
export default AdminLoginSlice.reducer