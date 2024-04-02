export default function Rating({ rating }) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars.push(
                <span key={i} className="text-yellow-500">
                    ★
                </span>
            );
        } else {
            stars.push(
                <span key={i} className="text-gray-400">
                    ★
                </span>
            );
        }
    }
    return <div className="flex">{stars}</div>;
}
