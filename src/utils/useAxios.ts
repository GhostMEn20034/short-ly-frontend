import axios, {AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig} from 'axios'
import dayjs from 'dayjs'
import {jwtDecode} from "jwt-decode";
import { useContext } from 'react'
import AuthContext, { AuthContextType } from '../context/AuthContext';


const useAxios = (baseURL: string): AxiosInstance => {
    const { logoutUser, authTokens, setUser, setAuthTokens } = useContext(AuthContext) as AuthContextType;

    const axiosInstance: AxiosInstance = axios.create({
        baseURL: baseURL,
    });


    axiosInstance.interceptors.request.use(async (req: InternalAxiosRequestConfig) => {
        const user = authTokens ? jwtDecode(authTokens.access_token) : null;

        if (!user) {
            return req;
        }

        const isExpired = dayjs.unix(user.exp!).diff(dayjs()) < 1;

        if (!isExpired) {
            req.headers!.Authorization = `Bearer ${authTokens?.access_token}`;
            return req;
        }

        try {
            const response: AxiosResponse = await axios.post(`${baseURL}/api/auth/token/refresh/`, {
                refresh: authTokens?.refresh_token,
            });

            localStorage.setItem('authTokens', JSON.stringify(response.data))

            setAuthTokens(response.data);
            setUser(jwtDecode(response.data.access));

            req.headers!.Authorization = `Bearer ${response.data.access}`;
            return req;
        } catch (error: unknown) {
            const err = error as AxiosError;

            if (err.response?.status === 401) {
                logoutUser();
                window.location.assign("/");
                return Promise.reject("Session Expired");
            } else {
                logoutUser();
                return Promise.reject("Entered invalid token");
            }
        }
    });


    // response interceptor
    return axiosInstance;
}

export default useAxios;
