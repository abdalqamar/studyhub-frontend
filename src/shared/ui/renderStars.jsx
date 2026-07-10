import { Star } from "lucide-react";

const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      // Full star
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    } else if (i === fullStars && hasHalfStar) {
      // Half star
      stars.push(
        <div key={i} className="relative w-4 h-4">
          <Star className="w-4 h-4 text-gray-600 absolute" />
          <div className="overflow-hidden w-2 absolute">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    } else {
      // Empty star
      stars.push(<Star key={i} className="w-4 h-4 text-gray-600" />);
    }
  }
  return stars;
};

export default renderStars;
