"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { useAuth } from "/auth/authContext";
import Rating from "/components/Rating";
import Image from "next/image";
import Link from "next/link";

export default function Dashboard() {
    // State management
    const { isLoggedIn, email, login, logout } = useAuth();
    // State for loading status
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [bookings, setBookings] = useState([]);
    const [hotels, setHotels] = useState([]);

    // API URL from environment values or use default value
    const API_URL = process.env.API_URL || "http://localhost:8888";

    useEffect(() => {
        setIsLoading(true); // Start loading

        const delay = setTimeout(async () => {
            if (!isLoggedIn) {
                router.push("/");
                return;
            }
            try {
                // Fetch hotels
                const hotelsResponse = await fetch(`${API_URL}/business/hotel`);
                if (!hotelsResponse.ok) {
                    throw new Error("Failed to fetch hotels");
                }
                const hotelsData = await hotelsResponse.json();
                const hotelsWithAmenities = hotelsData.map((hotel) => ({
                    ...hotel,
                    amenities: hotel.amenities.split(", "),
                }));
                setHotels(hotelsWithAmenities); // Set hotels data

                // Fetch bookings
                const bookingsResponse = await fetch(
                    `${API_URL}/business/getbookings`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email }),
                    }
                );
                if (!bookingsResponse.ok) {
                    throw new Error("Failed to fetch bookings");
                }
                const bookingsData = await bookingsResponse.json();
                bookingsData.sort((a, b) => b.id - a.id); // Sort bookings by ID in descending order
                setBookings(bookingsData);

                setIsLoading(false); // End loading
            } catch (error) {
                console.error(error);
            }
        }, 100); // delay fetching bookings

        return () => clearTimeout(delay);
        t;
    }, [email, isLoggedIn, router]);

    const handleCancelBooking = async (bookingId) => {
        await cancelBooking(bookingId);
    };

    async function cancelBooking(bookingId) {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/business/cancelbooking`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    bookingId,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Booking cancelled successfully:", data);
                setBookings((currentBookings) =>
                    currentBookings.filter(
                        (booking) => booking.id !== bookingId
                    )
                );
                // Handle success, update UI or notify the user
            } else {
                console.error("Failed to cancel booking:", data.msg);
                // Handle failure, show error message to the user
            }
        } catch (error) {
            console.error("Error cancelling booking:", error);
            // Handle network errors or unexpected issues
        } finally {
            setIsLoading(false);
        }
    }

    const getHotel = (hotelId) => {
        const hotel = hotels.find((h) => h.id === hotelId);
        return hotel ? hotel : "Unknown Hotel";
    };

    return (
        <main>
            <div className="flex flex-1 min-h-screen relative bg-gray-100 justify-center">
                {isLoading ? (
                    <p>Loading...</p>
                ) : bookings.length > 0 ? (
                    <div className="container mx-auto px-4 py-12">
                        <h2 className="text-3xl font-bold text-center mb-8">
                            Bookings
                        </h2>
                        {bookings.map((booking) => (
                            <div
                                key={booking.id}
                                className="bg-white shadow-md p-4 m-4 rounded-md flex flex-col md:flex-row"
                            >
                                <div className="md:w-1/2 p-2 border-b-2 md:border-b-0 md:border-r-2">
                                    <h3 className="text-xl font-semibold mb-2">
                                        Booking Details
                                    </h3>
                                    <p className="text-gray-800 mb-2">
                                        <span className="font-semibold">
                                            Booking ID:
                                        </span>{" "}
                                        {booking.id}
                                    </p>
                                    <p className="text-gray-800 mb-2">
                                        <span className="font-semibold">
                                            Check-in Date:
                                        </span>{" "}
                                        {booking.startDate}
                                    </p>
                                    <p className="text-gray-800 mb-2">
                                        <span className="font-semibold">
                                            Nights:
                                        </span>{" "}
                                        {booking.nights}
                                    </p>
                                    <p className="text-gray-800 mb-2">
                                        <span className="font-semibold">
                                            Guests:
                                        </span>{" "}
                                        {booking.guests}
                                    </p>
                                    <p className="text-gray-800 mb-2">
                                        <span className="font-semibold">
                                            Total Price:
                                        </span>{" "}
                                        {booking.totalPrice}
                                    </p>
                                    <p className="text-gray-800 mb-2">
                                        <span className="font-semibold">
                                            Email:
                                        </span>{" "}
                                        {booking.email}
                                    </p>
                                    <button
                                        onClick={() =>
                                            handleCancelBooking(booking.id)
                                        }
                                        className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded transition duration-300"
                                    >
                                        Cancel Booking
                                    </button>
                                </div>
                                <div className="md:w-1/2 p-2 flex flex-col items-center md:items-start">
                                    <div className="flex flex-col md:flex-row justify-between items-start w-full">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold mb-2">
                                                Hotel Information
                                            </h3>
                                            <div className="flex items-center mb-2">
                                                <Link
                                                    href={`/hotels/${booking.hotelId}`}
                                                >
                                                    <p className="text-gray-800 mr-2">
                                                        <span className="font-semibold">
                                                            Name:{" "}
                                                        </span>
                                                        {
                                                            getHotel(
                                                                booking.hotelId
                                                            ).name
                                                        }
                                                    </p>
                                                </Link>
                                                <Rating
                                                    rating={
                                                        getHotel(
                                                            booking.hotelId
                                                        ).rating
                                                    }
                                                />
                                            </div>
                                            <p className="text-gray-800 mb-2">
                                                <span className="font-semibold">
                                                    Address:{" "}
                                                </span>
                                                {getHotel(booking.hotelId)
                                                    .city +
                                                    ", " +
                                                    getHotel(booking.hotelId)
                                                        .address}
                                            </p>
                                            <p className="text-gray-800 mb-2">
                                                <span className="font-semibold">
                                                    Phone Number:{" "}
                                                </span>
                                                {
                                                    getHotel(booking.hotelId)
                                                        .contact
                                                }
                                            </p>
                                            <p className="font-semibold">
                                                Amenities
                                            </p>
                                            <ul className="list-disc ml-5 mb-4">
                                                {getHotel(
                                                    booking.hotelId
                                                ).amenities.map(
                                                    (amenity, index) => (
                                                        <li key={index}>
                                                            {amenity}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                        <Link
                                            href={`/hotels/${booking.hotelId}`}
                                        >
                                            <Image
                                                src={
                                                    getHotel(booking.hotelId)
                                                        .imageUrl
                                                }
                                                alt={
                                                    getHotel(booking.hotelId)
                                                        .name
                                                }
                                                className="rounded-lg shadow-lg"
                                                width={250}
                                                height={250}
                                                priority={true}
                                                style={{
                                                    width: "250px",
                                                    height: "250px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="container mx-auto px-4 py-12">
                        <h2 className="text-3xl font-bold text-center mb-8">
                            No bookings found
                        </h2>
                        <p className="text-center">
                            You have no current bookings. Start planning your
                            next trip now!
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}
