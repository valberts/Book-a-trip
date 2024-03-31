import Link from 'next/link';

export default function PlacesOfInterest() {
    // This data array would normally come from an API or a database
    const places = [
        { id: 1, name: "Den haag", image: "/images/hotel-1.jpg", locality: "New York City, USA" },
        { id: 2, name: "Rotterdam", image: "/images/hotel-2.jpg", locality: "Paris, France" },
        { id: 3, name: "Amsterdam", image: "/images/hotel-3.jpg", locality: "Hong Kong" },
        // Add more places as needed
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-8">Places of Interests</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {places.map((place) => (
                    <div key={place.id} className="bg-white rounded-lg overflow-hidden shadow-lg">
                        <img src={place.image} alt={place.name} className="w-full h-64 object-cover" />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2">{place.name}</h3>
                            <p className="text-gray-800">{place.locality}</p>
                            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Locality
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


