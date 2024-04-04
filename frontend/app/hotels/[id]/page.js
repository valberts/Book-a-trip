"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "../../../auth/authContext";
import Image from "next/image";
import Rating from "/components/Rating";

export default function HotelPage() {
    const params = useParams();
    const id = params.id;
    const today = new Date().toISOString().split("T")[0];

    //State management
    const { isLoggedIn, email, login, logout } = useAuth();
    const [errorMessage, setErrorMessage] = useState(""); // State for error message
    const [startDate, setStartDate] = useState(today); //For date selection, defaults to today
    const [guests, setGuests] = useState(1); // Default to 1 guest
    const [nights, setNights] = useState(1); // Default to 1 night

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
                    // Parse amenities string into array
                    const hotelsWithAmenities = data.map((hotel) => ({
                        ...hotel,
                        amenities: hotel.amenities.split(", "),
                    }));
                    setHotels(hotelsWithAmenities); // Set hotels data
                }
            } catch (error) {
                console.error("Failed to fetch hotels:", error);
            } finally {
                console.log("Loaded hotels");
                setIsLoading(false); // End loading
            }
        }
        fetchHotels();
    }, []);

    const handleBooking = async () => {
        if (!isLoggedIn) {
            // User is not logged in, set an error message
            setErrorMessage("Please log in to make a booking.");
            // Optionally, redirect to login page:
            // router.push('/login');
            return; // Stop further execution
        }

        // Prepare the booking details JSON object to send to the backend
        const bookingDetails = {
            hotelId: id,
            startDate: startDate,
            nights: nights,
            guests: guests,
            totalPrice: totalPrice,
            email: email, // Ensure you have the user's email available here
        };

        // Log the booking details to console (for debugging purposes)
        console.log("Booking Details:", bookingDetails);

        try {
            // Perform the POST request to the `/bookhotel` endpoint
            const response = await fetch(`${API_URL}/business/bookroom`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookingDetails),
            });

            // Parse the JSON response from the server
            const responseData = await response.json();

            if (response.ok) {
                // Handle successful booking here
                console.log("Booking successful:", responseData);
                // Optionally, redirect the user to a confirmation page or display a success message
            } else {
                // Handle errors or unsuccessful booking attempts here
                console.log("Booking failed:", responseData);
                setErrorMessage(
                    responseData.msg ||
                        "Failed to book the hotel. Please try again."
                );
            }
        } catch (error) {
            // Handle network errors or issues communicating with the server
            console.error("Booking error:", error);
            setErrorMessage(
                "An error occurred while trying to book the hotel. Please check your network connection and try again."
            );
        }
    };

    // Find the hotel with matching ID if the ID is valid
    const hotel = id ? hotels.find((hotel) => hotel.id === parseInt(id)) : null;
    const totalPrice = hotel ? hotel.price * nights : 0;

    // Check if hotel details are available, if not, display loading or error state
    if (!hotel) {
        return (
            <div className="flex justify-center items-center h-screen">
                Loading...
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-100 py-10">
            <div className="container mx-auto px-4">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="xl:flex">
                        <Image
                            src={hotel.imageUrl || "/images/location-2.jpeg"}
                            alt={hotel.name}
                            width={500}
                            height={500}
                            priority={true}
                            style={{
                                width: "100%",
                                height: "auto",
                                objectFit: "cover",
                            }}
                        />
                        <div className="w-full max-w-lg mx-auto py-12 px-6 lg:max-w-none lg:w-1/2">
                            <div className="flex items-center mb-2">
                                <h3 className="text-3xl font-semibold mr-2">
                                    {hotel.name}
                                </h3>
                                <Rating rating={hotel.rating} />
                            </div>
                            <p className="mt-4 text-gray-600">
                                {hotel.description}
                            </p>
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold">
                                    Amenities
                                </h3>
                                <ul className="list-disc ml-5 mt-2">
                                    {hotel.amenities.map((amenity, index) => (
                                        <li key={index}>{amenity}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-4">
                                <label
                                    htmlFor="start-date"
                                    className="block text-sm font-semibold"
                                >
                                    Start Date:
                                </label>
                                <input
                                    type="date"
                                    id="start-date"
                                    value={startDate}
                                    onChange={(event) => {
                                        setStartDate(event.target.value);
                                    }}
                                    className="mt-1 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border rounded-md"
                                />
                            </div>
                            <div className="mt-4">
                                <label
                                    htmlFor="guests"
                                    className="block text-sm font-semibold"
                                >
                                    Number of Guests:
                                </label>
                                <select
                                    id="guests"
                                    value={guests}
                                    onChange={(event) => {
                                        setGuests(event.target.value);
                                    }}
                                    className="mt-1 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border rounded-md"
                                >
                                    {[...Array(6)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>
                                            {i + 1} Guest(s)
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mt-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <label
                                            htmlFor="nights"
                                            className="block text-sm font-semibold"
                                        >
                                            Number of Nights:
                                        </label>
                                        <select
                                            id="nights"
                                            value={nights}
                                            onChange={(event) => {
                                                setNights(event.target.value);
                                            }}
                                            className="mt-1 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border rounded-md"
                                        >
                                            {[...Array(30)].map((_, i) => (
                                                <option
                                                    key={i + 1}
                                                    value={i + 1}
                                                >
                                                    {i + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <p className="text-lg">
                                            Price:{" "}
                                            <span className="font-semibold">
                                                ${totalPrice}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <button
                                    onClick={handleBooking}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                                >
                                    Book Now
                                </button>
                                {errorMessage && ( // Conditionally render error message
                                    <div className="text-red-500">
                                        {errorMessage}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
