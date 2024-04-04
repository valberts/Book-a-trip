"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { useAuth } from "/auth/authContext";

export default function Dashboard() {
    // State management
    const { isLoggedIn, email, login, logout } = useAuth();
    const router = useRouter();
    const [bookings, setBookings] = useState([]);

    // API URL from environment values or use default value
    const API_URL = process.env.API_URL || "http://localhost:8888";

    useEffect(() => {
        const delay = setTimeout(async () => {
            if (!isLoggedIn) {
                router.push("/");
                return;
            }
            try {
                const response = await fetch(
                    `${API_URL}/business/getbookings`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email }),
                    }
                );
                const data = await response.json();
                setBookings(data);
            } catch (error) {
                console.error(error);
            }
        }, 100); // delay fetching bookings

        return () => clearTimeout(delay);
        t;
    }, [email, router]);

    return (
        <main>
            <div
                className="flex flex-1 relative bg-gray-100 items-center justify-center"
                style={{ height: "85vh" }}
            >
                {bookings.map((booking) => (
                    <div
                        key={booking.id}
                        className="bg-white shadow-md p-4 m-4 rounded-md"
                    >
                        <p>
                            {booking.id} - {booking.hotelId} -{" "}
                            {booking.startDate} - {booking.nights} -{" "}
                            {booking.guests} - {booking.totalPrice} -{" "}
                            {booking.email}
                        </p>
                    </div>
                ))}
            </div>
        </main>
    );
}
