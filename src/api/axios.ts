import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_URL,
    timeout: parseInt(process.env.TIMEOUT ?? "")
});

axiosInstance.interceptors.request.use((config) => {
    const {
        headers = {}
    } = config


    config.headers = {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`
    };

    return config;
}, (error) => {
    console.log(error);
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    console.log(error);
    return Promise.reject(error);
});

export default axiosInstance;