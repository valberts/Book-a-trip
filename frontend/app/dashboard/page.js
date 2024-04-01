"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

export default function Dashboard() {
    // State management
    const router = useRouter();

    // API URL from environment values or use default value
    const API_URL =
        process.env.NEXT_PUBLIC_API_URL === undefined
            ? "http://localhost:8088"
            : process.env.NEXT_PUBLIC_API_URL;

    // Load users bookings here
    return (
        <main>
            <div
                className="flex flex-1 relative bg-gray-100 items-center justify-center"
                style={{ height: "85vh" }}
            >
                My Bookings
            </div>
        </main>
    );
}
