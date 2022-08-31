import axios from 'axios';
import { API_URL } from "http/index";

export const $getSecure = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$getSecure.interceptors.request.use((config: any) => {
    config.headers.Authorization = `Bearer ${process.env["REACT_APP_GSKJNSDFKJNSDFGBSDJHFSDKJFHSDBGKSJDHFDSFBJSDNFJ"] || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0bGphd2hkaWxhbm13bGt"}`
    return config;
})
