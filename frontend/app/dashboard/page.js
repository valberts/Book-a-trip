"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

export default function Login() {
    // State management
    const router = useRouter();

    // API URL from environment values or use default value
    const API_URL =
        process.env.NEXT_PUBLIC_API_URL === undefined
            ? "http://localhost:8088"
            : process.env.NEXT_PUBLIC_API_URL;

    return (
        <main>
            <Nav />
            <div
                className="flex flex-1 relative bg-gray-100 items-center justify-center"
                style={{ height: "85vh" }}
            >
                Dashboard
            </div>

            <Footer />
        </main>
    );
}
