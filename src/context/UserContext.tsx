import {ReactNode, useState, useEffect, createContext, useContext} from "react";
import {AxiosInstance} from "axios";
import AuthContext, {AuthContextType} from "@app-context/AuthContext.tsx";
import {User} from '@app-types/user.ts';

export interface UserContextType {
    userInfo: User | null;
    updateUserInfo: (newData: User | null) => void;
    fetchUserInfo: () => Promise<void>;
    refreshUserInfo: () => void;
}

// Create a UserContext with an empty object as the default value
const UserContext = createContext({});

export function UserProvider({ api, children }: { api: AxiosInstance, children: ReactNode }) {

    const [userInfo, setUserInfo] = useState<User | null>(null);

    const { user } = useContext(AuthContext) as AuthContextType;

    // Define a function that updates the user info with new data

    const updateUserInfo = (newData: User | null) => {
        // Use the spread operator to merge the new data with the existing user info
        if (newData !== null) {
            setUserInfo({ ...userInfo, ...newData });
        } else {
            setUserInfo(null);
        }
    };

    const fetchUserInfo = async () => {
        const apiRoute = `/api/v1/users/details`;

        try {
            // Await the response from the API
            const response = await api.get(apiRoute);
            const data = await response.data;
            updateUserInfo({
                email: data.email,
                firstName: data.first_name,
                lastName: data.last_name,
            });
        } catch {
            updateUserInfo(null);
        }
    }

    const refreshUserInfo = () => {
        fetchUserInfo();
    };

    const contextData: UserContextType = {
        userInfo,
        updateUserInfo,
        fetchUserInfo,
        refreshUserInfo,
    };

    useEffect(() => {
        if (!userInfo && user) {
            fetchUserInfo();
        }
    }, []);

    // Return a UserContext.Provider component that passes the user info and update function as value
    return (
        <UserContext.Provider value={contextData}>
            {children}
        </UserContext.Provider>
    );
}


export default UserContext;