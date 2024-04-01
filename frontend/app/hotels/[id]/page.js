"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import Rating from "/components/Rating";

export default function HotelPage() {
    const params = useParams();
    const id = params.id;
    // This data array would normally come from an API or a database
    // TODO: fetch this content from API, including an image
    const hotels = [
        {
            id: 1,
            name: "Hotel A",
            intro: "Hotel A is a 5-star hotel located in the heart of the city.",
            description:
                "Hotel A stands as a beacon of luxury and comfort, boasting a prestigious 5-star rating. Nestled in the vibrant heart of the city, this hotel offers an escape to opulence and serenity amidst the bustling city life. Guests can enjoy panoramic views of the city skyline from elegantly designed rooms that blend classic charm with modern sophistication. The hotel's world-class amenities include a state-of-the-art fitness center, a serene spa offering bespoke treatments, and an exquisite collection of culinary experiences in our award-winning restaurants. With unparalleled service and attention to detail, Hotel A promises an unforgettable stay.",

            rating: 5,
        },
        {
            id: 2,
            name: "Hotel B",
            intro: "Hotel B is a 4-star hotel located in the heart of the city.",
            description:
                "Hotel B, a distinguished 4-star establishment, offers a blend of comfort, style, and convenience in the urban core of the city. Perfect for both leisure and business travelers, the hotel prides itself on its contemporary rooms and suites equipped with all the modern amenities. Guests can take advantage of the hotel's prime location to explore the city's major attractions, vibrant nightlife, and shopping districts. The hotel features several dining options, a fully equipped fitness center, and flexible meeting spaces. Hotel B is dedicated to providing a memorable experience with its exceptional service and hospitality.",
            rating: 4,
        },
        {
            id: 3,
            name: "Hotel C",
            intro: "Hotel C is a 3-star hotel located in the heart of the city.",
            description:
                "Hotel B, a distinguished 4-star establishment, offers a blend of comfort, style, and convenience in the urban core of the city. Perfect for both leisure and business travelers, the hotel prides itself on its contemporary rooms and suites equipped with all the modern amenities. Guests can take advantage of the hotel's prime location to explore the city's major attractions, vibrant nightlife, and shopping districts. The hotel features several dining options, a fully equipped fitness center, and flexible meeting spaces. Hotel B is dedicated to providing a memorable experience with its exceptional service and hospitality.",
            rating: 3,
        },
        {
            id: 4,
            name: "Hotel D",
            intro: "Hotel D is a 2-star hotel located in the heart of the city.",
            description:
                "Discover the charm of Hotel D, a 2-star hotel situated in the dynamic center of the city. Designed for budget-conscious travelers, this hotel offers a no-frills accommodation option without compromising on cleanliness and comfort. The rooms are modestly furnished, providing a comfortable place to rest after a day of urban exploration. Guests can enjoy complimentary Wi-Fi and a selection of basic amenities, along with easy access to public transport and local eateries. Hotel D is an excellent choice for travelers looking for practicality and convenience.",
            rating: 2,
        },
        {
            id: 5,
            name: "Hotel E",
            intro: "Hotel E is a 1-star hotel located in the heart of the city.",
            description:
                "Hotel E provides a straightforward, 1-star lodging experience in the heart of the city. Catering to backpackers and budget travelers, this hotel emphasizes simplicity and efficiency. Guests can expect clean, basic rooms equipped with essential amenities. The hotel's location is perfect for those looking to immerse themselves in the local culture and explore the city on foot. With friendly staff and a welcoming atmosphere, Hotel E offers a viable option for guests who prioritize location and value over luxury.",
            rating: 1,
        },
        {
            id: 6,
            name: "Hotel F",
            intro: "Hotel F is a 5-star hotel located in the heart of the city.",
            description:
                "Immerse yourself in the epitome of luxury at Hotel F, a distinguished 5-star hotel located in the city's epicenter. Each aspect of the hotel is meticulously designed to provide an unparalleled guest experience, from the lavishly appointed rooms and suites to the impeccable service. Guests can indulge in gourmet dining experiences, relax in the tranquil spa, or stay active in the state-of-the-art fitness center. Hotel F is the perfect urban retreat for discerning travelers seeking sophistication, luxury, and an unforgettable stay in the heart of the city.",
            rating: 5,
        },
    ];

    // Find the hotel with matching ID if the ID is valid
    const hotel = id ? hotels.find((hotel) => hotel.id === parseInt(id)) : null;

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
                    <div className="lg:flex">
                        <Image
                            src={hotel.imageUrl || "/images/location-2.jpeg"}
                            alt={hotel.name}
                            width={500}
                            height={300}
                            layout="responsive"
                            objectFit="cover"
                        />

                        <div className="w-full max-w-lg mx-auto py-12 px-6 lg:max-w-none lg:w-1/2">
                            <div className="flex items-center mb-2">
                                <h3 className="text-3xl font-semibold mr-2">
                                    {hotel.name}
                                </h3>
                                <Rating rating={hotel.rating} />
                            </div>
                            <div className="mt-4 text-gray-600">
                                {hotel.description}
                            </div>

                            {/* Example of amenities  */}
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold">
                                    Amenities
                                </h3>
                                <ul className="list-disc ml-5 mt-2">
                                    <li>Free Wi-Fi</li>
                                    <li>24/7 Room Service</li>
                                    <li>Gym and Spa</li>
                                </ul>
                            </div>

                            <div className="mt-8">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
