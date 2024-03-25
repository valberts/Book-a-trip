"use client";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();

    // API URL from environment values or use default value
    const API_URL =
        process.env.NEXT_PUBLIC_API_URL === undefined
            ? "http://localhost:8088"
            : process.env.NEXT_PUBLIC_API_URL;

    // Function to handle logout
    const handleLogout = () => {
        // Redirect to login page or any other page you consider as the logout landing page
        router.push("/login");
    };

    // Footer component
    const Footer = () => (
        <footer className="text-center text-sm text-gray-500 py-4 absolute bottom-0 w-full">
            © {new Date().getFullYear()} Book a Trip. All rights reserved.
        </footer>
    );

    return (
        <main>
            <nav
                className="text-white p-3 w-full fixed top-0 left-0 z-50"
                style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
            >
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo Section */}
                    <a
                        href="http://localhost:3000/dashboard"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="/images/logo.png"
                            alt="Logo"
                            className="px-5 h-20"
                        />
                    </a>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="px-8 text-blue-600 border border-blue-600 border-2 hover:text-white hover:bg-blue-600 duration-300 font-bold py-2 px-4 rounded"
                    >
                        Logout
                    </button>
                </div>
            </nav>
            <div className="flex flex-1 min-h-screen relative bg-gray-100 items-center justify-center">
                Dashboard
            </div>
            <Footer />
        </main>
    );
}
