import axios from "axios"

export const instance = axios.create({
    baseURL: "https://art-be.vercel.app",
    // baseURL: "http://localhost:5001",
})

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})
