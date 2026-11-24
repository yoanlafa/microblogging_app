/* eslint-disable react-refresh/only-export-components */
import {createContext, useState} from "react";
import {logIn as loginApi, signUp} from "../api/authApi.js";

export const AuthContext = createContext(null);

export function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const login = async (username, password) => {
        const data = await loginApi(username, password);

        console.log("Full response:", data);
        console.log("Access token:", data.access_token);


        setUser(data.user);
        setToken(data.access_token);
    };

    const signup = async (username, password) => {
        const data = await signUp(username, password);

        setUser(data.user);
        setToken(data.access_token);
    }

    const logout = () => {
        setUser(null);
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{
            user,
            token,
            login,
            logout,
            signup
        }}>{children}</AuthContext.Provider>
    );
}