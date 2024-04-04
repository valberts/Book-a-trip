"use client";

import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState("");

    useEffect(() => {
        // Check local storage to see if user is logged in
        const loggedIn = localStorage.getItem("isLoggedIn") === "true";
        const storedEmail = localStorage.getItem("email") || "";
        setIsLoggedIn(loggedIn);
        setEmail(storedEmail);
    }, []);

    const login = (email) => {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("email", email);
        setIsLoggedIn(true);
        setEmail(email);
    };

    const logout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("email");
        setIsLoggedIn(false);
        setEmail("");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, email, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
