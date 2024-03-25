"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
    // State management
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // New state for error message

    // API URL from environment values or use default value
    const API_URL =
        process.env.NEXT_PUBLIC_API_URL === undefined
            ? "http://localhost:8088"
            : process.env.NEXT_PUBLIC_API_URL;

    // Function to handle login
    async function handleLogin(event) {
        event.preventDefault();
        setErrorMessage("");

        if (!username.trim() || !password.trim()) {
            setErrorMessage("Please fill in all fields.");
            return;
        }

        const loginDetails = {
            username,
            password,
        };

        router.push("/dashboard");
    }

    // Footer component
    const Footer = () => (
        <footer className="text-center text-sm text-gray-500 py-4 absolute bottom-0 w-full">
            © {new Date().getFullYear()} Book a Trip. All rights reserved.
        </footer>
    );

    return (
        <main>
            <nav
                className=" text-white p-3 w-full fixed top-0 left-0 z-50 "
                style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
            >
                <div className="container mx-auto flex justify-between items-center">
                    <a href="http://localhost:3000/" rel="noopener noreferrer">
                        <img
                            src="/images/logo.png"
                            alt="Logo"
                            className="px-5 h-20 mr-10"
                        />
                    </a>
                </div>
            </nav>
            <div className="flex flex-1 min-h-screen relative bg-gray-100 items-center justify-center">
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
                            autoComplete="username"
                            placeholder="Username"
                            className={`outline-none duration-300 border-solid border-2 ${
                                errorMessage
                                    ? "border-red-500"
                                    : "border-gray-200"
                            } p-2 w-full max-w-[30ch] rounded-lg bg-white mb-4`} // Change border color on error
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value),
                                    setErrorMessage("");
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
                            className="bg-blue-600 text-gray-100 rounded-lg w-[26ch] py-1.5 select-none hover:bg-blue-700 duration-300 mb-2"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </main>
    );
}
