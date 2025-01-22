import axios from "axios";
import { createContext, useState, useEffect, ReactNode } from "react";
import {jwtDecode} from 'jwt-decode';
import dayjs from "dayjs";
import {apiBaseUrl} from "@app-settings";

interface AuthTokens {
    access_token: string;
    refresh_token: string;
}

export interface AuthContextType {
    user: string | null;
    loginUser: (email: string, password: string, additionalData?: Record<string, string>) => Promise<void>;
    logoutUser: () => void;
    authTokens: AuthTokens | null;
    setAuthTokens: React.Dispatch<React.SetStateAction<AuthTokens | null>>;
    setUser: React.Dispatch<React.SetStateAction<string | null>>;
    error: string | null;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authTokens, setAuthTokens] = useState<AuthTokens | null>(() => {
        const savedTokens = localStorage.getItem('authTokens');
        return savedTokens ? JSON.parse(savedTokens) : null;
    });
    const [user, setUser] = useState<string | null>(() => {
        const savedTokens = localStorage.getItem('authTokens');
        return savedTokens ? jwtDecode(JSON.parse(savedTokens).access_token) : null;
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loginUser = async (email: string, password: string, additionalData?: Record<string, string>) => {
        const nextDestination = additionalData?.nextDestination;

        try {
            const response = await axios.post(
                `${apiBaseUrl}/api/v1/auth/token/`,
                {username: email, password: password},
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            );

            if (response.status === 200) {
                const response_data = response.data;
                setAuthTokens(response_data);
                setUser(jwtDecode(response_data.access_token));
                localStorage.setItem("authTokens", JSON.stringify(response_data));
                localStorage.removeItem("cartUuid");

                if (nextDestination) {
                    window.location.assign(nextDestination);
                } else {
                    window.location.assign("/");
                }
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 400) {
                    setError("Incorrect password or email");
                } else {
                    setError("Something went wrong");
                }
            } else {
                console.error('Unexpected error:', error);
            }
        }
    };

    const logoutUser = () => {
        try {
            setAuthTokens(null);
            setUser(null);
            localStorage.removeItem('authTokens');
            window.location.assign("/");
        } catch {
            console.log("Unable to logout");
        }
    };

    const contextData: AuthContextType = {
        user,
        loginUser,
        logoutUser,
        authTokens,
        setAuthTokens,
        setUser,
        error,
        setError,
    };

    useEffect(() => {
        if (authTokens) {
            setUser(jwtDecode(authTokens.access_token));

            const token = jwtDecode(authTokens?.refresh_token);
            const isExpired = token?.exp !== undefined ? dayjs.unix(token.exp).diff(dayjs()) < 1 : true;

            if (isExpired) {
                setAuthTokens(null);
                setUser(null);
                localStorage.removeItem('authTokens');
            }
        }
        setLoading(false);
    }, [authTokens]);

    return (
        <AuthContext.Provider value={contextData}>
            {!loading && children}
        </AuthContext.Provider>
);
};
