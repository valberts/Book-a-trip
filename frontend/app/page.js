"use client";
import Locations from "../components/Locations";

import Link from "next/link";
import Image from "next/image";

export default function Home() {
    // API URL from environment values or use default value
    const API_URL =
        process.env.NEXT_PUBLIC_API_URL === undefined
            ? "http://localhost:8088"
            : process.env.NEXT_PUBLIC_API_URL;

    return (
        <main>
            <header className="relative bg-blue-500" style={{ height: "80vh" }}>
                <Image
                    src="/images/header.jpeg"
                    className="w-full h-auto object-cover object-center"
                    alt="Background"
                    width={500}
                    height={300}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="absolute top-1/4 w-full text-center">
                    <form>
                        <div className="absolute inset-x-0 top-1/3 md:top-1/2 transform -translate-y-1/2 w-full px-4 sm:px-6 lg:px-8">
                            <h1 className="text-4xl text-white font-bold mb-4 text-center">
                                Book a Trip on us
                            </h1>
                            <p className="text-xl text-white mb-8 text-center">
                                Book Hotels, Flights and Points of Interest to
                                plan your trip.
                            </p>
                            <div className="max-w-5xl mx-auto bg-white rounded-full shadow-lg overflow-hidden flex">
                                <input
                                    type="text"
                                    placeholder="Where are you going?"
                                    className="flex-grow px-6 py-3 text-lg border-r"
                                />
                                <input
                                    type="date"
                                    placeholder="time"
                                    className="flex-grow px-6 py-3 text-lg border-r"
                                />
                                <input
                                    type="date"
                                    className="flex-grow px-6 py-3 text-lg border-r"
                                />
                                <input
                                    type="number"
                                    placeholder="Guests"
                                    className="flex-grow px-6 py-3 text-lg"
                                />
                                <Link
                                    href="/hotels"
                                    type="submit"
                                    className="px-4 flex items-center justify-center bg-blue-500 text-white"
                                >
                                    <svg
                                        className="w-8 h-8"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                                        ></path>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </header>
            <div className="flex flex-1 relative bg-gray-100 items-center justify-center">
                <Locations />
            </div>
        </main>
    );
}
