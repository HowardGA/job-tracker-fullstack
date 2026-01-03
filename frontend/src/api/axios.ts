import axios, { AxiosError } from 'axios';
import type { ErrorResponse } from '../types/authTypes';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ErrorResponse>) => {
        const message = error.response?.data?.message || 'Something went wrong';

        return Promise.reject(message);
    }
)

export default api;