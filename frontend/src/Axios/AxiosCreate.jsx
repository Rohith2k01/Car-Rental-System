import axios from "axios"

var Baseurl = import.meta.env.VITE_BASE_URL


export const basicRequest = axios.create({
    baseURL : Baseurl
})

export const AdminTokenRequest = axios.create({
    baseURL : Baseurl
})

AdminTokenRequest.interceptors.request.use(
    (config)=>{
        const persistLogindata = localStorage.getItem('persist:logindata');
        const loginData = persistLogindata ? JSON.parse(persistLogindata):{}
        var LoginInFo = loginData.AdminLogin ? JSON.parse(loginData.AdminLogin).AdminLoginData[0] : null
        var Token = LoginInFo?.Token
        if(Token){
            config.headers.Authorization = `Bearer ${Token}`
        }
        return config

    }
)

// user api Request with token

export const UserRequest = axios.create({
    baseURL:Baseurl
})

// axios interceptor to attach user token dynamcally before every request

UserRequest.interceptors.request.use(
    (config)=>{
        const persistLogindata = localStorage.getItem('persist:logindata')
        var LoginData = persistLogindata ? JSON.parse(persistLogindata) : {}
        var loginInfo = LoginData.UserLogin ? JSON.parse(LoginData.UserLogin).UserLoginData[0] : null
        var Token = loginInfo.Token
        if (Token) {
            config.headers.Authorization = `Bearer ${Token}`

        }
        return config
    }
)

// vendor api Request with token

export const VendorRequest = axios.create({
    baseURL:Baseurl
})

// axios interceptor to attach user token dynamcally before every request

VendorRequest.interceptors.request.use(
    (config)=>{
        const persistLogindata = localStorage.getItem('persist:logindata')
        var LoginData = persistLogindata ? JSON.parse(persistLogindata) : {}
        var loginInfo = LoginData.VendorLogin ? JSON.parse(LoginData.VendorLogin).VendorLoginData[0] : null
        var Token = loginInfo.Token
        if (Token) {
            config.headers.Authorization = `Bearer ${Token}`

        }
        return config
    }
)