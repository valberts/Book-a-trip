"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { useAuth } from "../../auth/authContext";

export default function Login() {
    // State management
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // New state for error message
    const { isLoggedIn, login, logout } = useAuth();

    // API URL from environment values or use default value
    const API_URL = process.env.API_URL || "http://localhost:8888";

    // Function to handle login
    async function handleLogin(event) {
        event.preventDefault();
        setErrorMessage("");

        if (!email.trim() || !password.trim()) {
            setErrorMessage("Please fill in all fields.");
            return;
        }

        const loginDetails = {
            email,
            password,
        };

        try {
            const response = await fetch(`${API_URL}/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginDetails),
            });

            if (!response.ok) {
                const errorMessage = await response.json();
                setErrorMessage(errorMessage.msg || "User not found.");
                return;
            }

            const data = await response.json();
            if (data.code === 200) {
                login(email);
                router.push("/");
            } else {
                setErrorMessage(data.msg || "Invalid email or password.");
            }
        } catch (error) {
            console.error("Failed to login:", error);
            setErrorMessage("Failed to login. Please try again later.");
        }
    }

    return (
        <main>
            <div
                className="flex flex-1 relative bg-gray-100 items-center justify-center"
                style={{ height: "85vh" }}
            >
                <div className="flex flex-col bg-white shadow-lg py-16 px-32 items-center justify-center">
                    <h1 className="text-blue-600 text-4xl font-bold pb-4 select-none">
                        Book a Trip
                    </h1>
                    <form
                        onSubmit={handleLogin}
                        className="flex flex-col items-center justify-center w-full"
                    >
                        <input
                            type="text"
                            autoComplete="email"
                            placeholder="Email"
                            className={`outline-none duration-300 border-solid border-2 ${
                                errorMessage
                                    ? "border-red-500"
                                    : "border-gray-200"
                            } p-2 w-full max-w-[30ch] rounded-lg bg-white mb-4`} // Change border color on error
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value), setErrorMessage("");
                            }}
                        />
                        <input
                            type="password"
                            autoComplete="current-password"
                            placeholder="Password"
                            className={`outline-none duration-300 border-solid border-2 ${
                                errorMessage
                                    ? "border-red-500"
                                    : "border-gray-200"
                            } p-2 w-full max-w-[30ch] rounded-lg bg-white mb-4`}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value),
                                    setErrorMessage("");
                            }}
                        />
                        {errorMessage && ( // Conditionally render error message
                            <div className="text-red-500 mb-4">
                                {errorMessage}
                            </div>
                        )}
                        <button
                            type="submit"
                            className="bg-blue-600 text-gray-100 rounded-lg w-[26ch] py-1.5 select-none hover:bg-blue-700 duration-200 mb-2"
                        >
                            Log in
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
