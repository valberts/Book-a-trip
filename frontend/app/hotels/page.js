"use client";
import { useRouter } from "next/navigation";
import Rating from "/components/Rating";
import Link from "next/link";
import Image from "next/image";

export default function Hotels() {
    const router = useRouter();

    // API URL from environment values or use default value
    const API_URL =
        process.env.NEXT_PUBLIC_API_URL === undefined
            ? "http://localhost:8088"
            : process.env.NEXT_PUBLIC_API_URL;

    // This data array would normally come from an API or a database
    // TODO: fetch this content from API, including an image
    const hotels = [
        {
            id: 1,
            name: "Hotel A",
            intro: "Hotel A is a 5-star hotel located in the heart of the city.",
            rating: 5,
        },
        {
            id: 2,
            name: "Hotel B",
            intro: "Hotel B is a 4-star hotel located in the heart of the city.",
            rating: 4,
        },
        {
            id: 3,
            name: "Hotel C",
            intro: "Hotel C is a 3-star hotel located in the heart of the city.",
            rating: 3,
        },
        {
            id: 4,
            name: "Hotel D",
            intro: "Hotel D is a 2-star hotel located in the heart of the city.",
            rating: 2,
        },
        {
            id: 5,
            name: "Hotel E",
            intro: "Hotel E is a 1-star hotel located in the heart of the city.",
            rating: 1,
        },
        {
            id: 6,
            name: "Hotel F",
            intro: "Hotel F is a 5-star hotel located in the heart of the city.",
            rating: 5,
        },
    ];

    return (
        <main>
            <div className="flex flex-1 min-h-screen relative bg-gray-100 items-center justify-center">
                <div className="container mx-auto px-4 py-12">
                    <h2 className="text-3xl font-bold text-center mb-8">
                        Hotels
                    </h2>
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
                                    width={500}
                                    height={300}
                                />
                                <div className="p-6">
                                    <div className="flex items-center mb-2">
                                        <h3 className="text-xl font-semibold mr-2">
                                            {hotel.name}
                                        </h3>
                                        <Rating rating={hotel.rating} />
                                    </div>
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
            </div>
        </main>
    );
}
