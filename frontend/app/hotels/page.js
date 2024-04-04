"use client";
import { useRouter } from "next/navigation";
import Rating from "/components/Rating";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Hotels() {
    const router = useRouter();

    // API URL from environment values or use default value
    const API_URL = process.env.API_URL || "http://localhost:8888";

    // State for storing the list of hotels
    const [hotels, setHotels] = useState([]);
    // State for loading status
    const [isLoading, setIsLoading] = useState(false);

    // Fetch hotels from API
    useEffect(() => {
        // Function to fetch hotels
        async function fetchHotels() {
            setIsLoading(true); // Start loading
            try {
                const response = await fetch(`${API_URL}/business/hotel`);
                if (!response.ok) {
                    throw new Error("Data could not be fetched!");
                } else {
                    const data = await response.json();
                    setHotels(data); // Set hotels data
                    console.log("Loaded hotels");
                    setIsLoading(false); // End loading
                }
            } catch (error) {
                console.error("Failed to fetch hotels:", error);
            }
        }
        fetchHotels();
    }, []);

    return (
        <main>
            <div className="flex flex-1 min-h-screen relative bg-gray-100 items-center justify-center">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="container mx-auto px-4 py-12">
                        {/* <h2 className="text-3xl font-bold text-center mb-8">
                            Hotels
                        </h2> */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {hotels.map((hotel) => (
                                <div
                                    key={hotel.id}
                                    className="bg-white rounded-lg overflow-hidden shadow-lg"
                                >
                                    <Image
                                        src={
                                            hotel.imageUrl ||
                                            "/images/location-2.jpeg"
                                        }
                                        alt={hotel.name}
                                        className="object-cover object-center"
                                        width={600}
                                        height={300}
                                        priority={true}
                                        style={{
                                            width: "600px", // Fixed width
                                            height: "300px", // Fixed height
                                            objectFit: "cover",
                                        }}
                                    />
                                    <div className="p-6">
                                        <div className="flex items-center mb-2">
                                            <h3 className="text-xl font-semibold mr-2">
                                                {hotel.name}
                                            </h3>
                                            <Rating rating={hotel.rating} />
                                        </div>
                                        <p className="text-gray-800 mb-2 text-sm">
                                            {hotel.city + ", " + hotel.address}
                                        </p>
                                        <p className="text-gray-800 mb-4">
                                            {hotel.intro}
                                        </p>
                                        <Link
                                            href={`/hotels/${hotel.id}`}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Check in
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
