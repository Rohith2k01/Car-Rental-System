import {createSlice} from '@reduxjs/toolkit'


const LoginSlice = createSlice({
    name: 'UserLogin',
    initialState:{
        UserLoginData:[]
    },
    reducers:{
        UserLoginData: (state, action)=>{
            state.UserLoginData.push(action.payload)
        },
        userLogoutData: (state, action)=>{
            state.UserLoginData = []
        }
    }
})
export const {UserLoginData, userLogoutData} = LoginSlice.actions
export default LoginSlice.reducer