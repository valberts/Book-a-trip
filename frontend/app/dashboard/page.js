"use client";
import { useRouter } from "next/navigation";
import Nav from '../../components/Nav';

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
            {/*<Nav/>*/}
            <nav className="bg-white shadow-md py-4">
                <div className="max-w-6xl mx-auto px-5 flex justify-between items-center">
                    <span className="text-xl font-semibold">Book a Trip</span>
                    <div className="hidden md:flex space-x-4">
                        <nav className="flex items-center justify-between space-x-4">
                            <a href="#"
                               className="text-gray-600 hover:text-gray-900 transition-colors duration-300">Home</a>
                            <a href="#"
                               className="text-gray-600 hover:text-gray-900 transition-colors duration-300">Book</a>
                            <a href="#"
                               className="text-gray-600 hover:text-gray-900 transition-colors duration-300">Blog</a>
                            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">Contact
                                Us</a>
                            <button
                                onClick={handleLogout}
                                className="text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-300 font-bold py-2 px-4 rounded"
                            >
                                Logout
                            </button>
                        </nav>
                    </div>
                    {/* Mobile menu button here */}
                </div>
            </nav>

            <header className="relative bg-blue-500" style={{height: '80vh'}}>

                <img src="images/header.jpg" className="w-full h-auto object-cover object-center"
                     alt="Tropical Resort"/>
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="absolute top-1/4 w-full text-center">
                    <form>
                        <div
                            className="absolute inset-x-0 top-1/3 md:top-1/2 transform -translate-y-1/2 w-full px-4 sm:px-6 lg:px-8">
                            <h1 className="text-4xl text-white font-bold mb-4 text-center">Book a Trip on us</h1>
                            <p className="text-xl text-white mb-8 text-center">Book Hotels, Flights and Plan your trip.</p>
                            <div className="max-w-3xl mx-auto bg-white rounded-full shadow-lg overflow-hidden flex">
                                <input type="text" placeholder="Where are you going?"
                                       className="flex-grow px-6 py-3 text-lg border-r"/>
                                <input type="date" placeholder="time" className="flex-grow px-6 py-3 text-lg border-r"/>
                                <input type="date" className="flex-grow px-6 py-3 text-lg border-r"/>
                                <input type="number" placeholder="Guests" className="flex-grow px-6 py-3 text-lg"/>
                                <button type="submit"
                                        className="px-4 flex items-center justify-center bg-blue-500 text-white">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </header>
            {/*<nav*/}
            {/*    className="text-white p-3 w-full fixed top-0 left-0 z-50"*/}
            {/*    style={{boxShadow: "0 2px 4px rgba(0,0,0,0.1)"}}*/}
            {/*>*/}
            {/*    <div className="container mx-auto flex justify-between items-center">*/}
            {/*        /!* Logo Section *!/*/}
            {/*        <a*/}
            {/*            href="http://localhost:3000/dashboard"*/}
            {/*            rel="noopener noreferrer"*/}
            {/*        >*/}
            {/*            <img*/}
            {/*                src="/images/logo.png"*/}
            {/*                alt="Logo"*/}
            {/*                className="px-5 h-20"*/}
            {/*            />*/}
            {/*        </a>*/}

            {/*        /!* Logout Button *!/*/}
            {/*        <button*/}
            {/*            onClick={handleLogout}*/}
            {/*            className="px-8 text-blue-600 border border-blue-600 border-2 hover:text-white hover:bg-blue-600 duration-300 font-bold py-2 px-4 rounded"*/}
            {/*        >*/}
            {/*            Logout*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*</nav>*/}
            <div className="flex flex-1 min-h-screen relative bg-gray-100 items-center justify-center">

                <Nav/>
            </div>
            {/*<Footer/>*/}
        </main>
    );
}
