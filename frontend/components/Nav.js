"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/authContext";

export default function Nav() {
    const router = useRouter();
    const { isLoggedIn, login, logout } = useAuth();

    // Function to handle logout
    const handleLogout = () => {
        // Call the logout function
        logout();
        // Redirect to home page
        router.push("/");
    };

    // Function to handle login
    const handleLogin = () => {
        // Redirect to home page
        router.push("/login");
    };

    return (
        <nav className="bg-white shadow-md py-4">
            <div className="max-w-6xl mx-auto px-5 flex justify-between items-center">
                <Link href="/">
                    <span className="text-xl font-semibold">Book a Trip</span>
                </Link>
                <div className="hidden md:flex space-x-4">
                    <nav className="flex items-center justify-between space-x-4">
                        {isLoggedIn && (
                            <Link
                                href="/dashboard"
                                className="hover:text-gray-500 duration-200 font-medium"
                            >
                                My Bookings
                            </Link>
                        )}
                        {/* <a
                            href="#"
                            className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
                        >
                            Home
                        </a>
                        <a
                            href="#"
                            className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
                        >
                            Book
                        </a>
                        <a
                            href="#"
                            className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
                        >
                            Blog
                        </a>
                        <a
                            href="#"
                            className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
                        >
                            Contact Us
                        </a> */}
                        <button
                            onClick={isLoggedIn ? handleLogout : handleLogin}
                            className="text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-200 font-bold py-2 px-4 rounded"
                        >
                            {isLoggedIn ? "Logout" : "Log in"}
                        </button>
                    </nav>
                </div>
            </div>
        </nav>
    );
}
