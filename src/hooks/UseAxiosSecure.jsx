import axios from "axios";
import { useEffect } from "react";
import UseAuth from "./UseAuth";
import { Navigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})
const UseAxiosSecure = () => {

    const {logOut} = UseAuth();
    useEffect(()=>{
        axiosSecure.interceptors.response.use(res => {
            return res;
        },
        error => {
            console.log('error trace',error.response);

            if (error.response.status === 401 || error.response.status === 403) {
                console.log('user logged out');
                logOut().then(() => {
                    Navigate('/login')
                }).catch(error => console.log(error))
            }
        }
        )
    },[])
    return axiosSecure;
}

export default UseAxiosSecure;