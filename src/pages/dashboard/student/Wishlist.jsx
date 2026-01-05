import { useState } from "react";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      title: "Advanced React Patterns",
      instructor: "John Doe",
      price: 89,
      originalPrice: 129,
      rating: 4.9,
      students: 1247,
      duration: "15h 30m",
      category: "Web Development",
      thumbnail: "⚛️",
      description:
        "Master advanced React patterns and best practices used by senior developers",
      onSale: true,
    },
    {
      id: 2,
      title: "Full Stack Development",
      instructor: "Sarah Wilson",
      price: 99,
      originalPrice: 149,
      rating: 4.8,
      students: 892,
      duration: "22h 15m",
      category: "Web Development",
      thumbnail: "🚀",
      description:
        "Complete full-stack development course with modern technologies",
      onSale: true,
    },
    {
      id: 3,
      title: "Machine Learning Fundamentals",
      instructor: "Mike Johnson",
      price: 79,
      originalPrice: 79,
      rating: 4.7,
      students: 1563,
      duration: "18h 00m",
      category: "Data Science",
      thumbnail: "🤖",
      description: "Learn machine learning concepts from scratch with Python",
      onSale: false,
    },
    {
      id: 4,
      title: "Mobile App Development",
      instructor: "Emily Davis",
      price: 69,
      originalPrice: 99,
      rating: 4.9,
      students: 734,
      duration: "20h 45m",
      category: "Mobile Development",
      thumbnail: "📱",
      description: "Build cross-platform mobile apps with React Native",
      onSale: true,
    },
  ]);

  const removeFromWishlist = (courseId) => {
    setWishlist(wishlist.filter((course) => course.id !== courseId));
  };

  const moveAllToCart = () => {
    // Implementation for moving all to cart
    alert("All courses moved to cart!");
  };

  const totalSavings = wishlist.reduce((total, course) => {
    return total + (course.onSale ? course.originalPrice - course.price : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Wishlist</h1>
          <p className="text-slate-400 mt-2">Your saved courses for later</p>
        </div>
        {wishlist.length > 0 && (
          <button
            onClick={moveAllToCart}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Move All to Cart
          </button>
        )}
      </div>

      {/* Stats */}
      {wishlist.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">
              {wishlist.length}
            </div>
            <div className="text-slate-400 text-sm">Courses Saved</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-400">
              ${wishlist.reduce((total, course) => total + course.price, 0)}
            </div>
            <div className="text-slate-400 text-sm">Total Price</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">
              ${totalSavings}
            </div>
            <div className="text-slate-400 text-sm">Total Savings</div>
          </div>
        </div>
      )}

      {/* Wishlist Courses */}
      <div className="space-y-4">
        {wishlist.map((course) => (
          <div
            key={course.id}
            className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors"
          >
            <div className="flex items-start space-x-4">
              <div className="w-20 h-20 bg-slate-700 rounded-lg flex items-center justify-center text-2xl">
                {course.thumbnail}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-white text-lg mb-1">
                      {course.title}
                    </h3>
                    <p className="text-slate-400 text-sm">
                      By {course.instructor}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromWishlist(course.id)}
                    className="text-red-400 hover:text-red-300 text-lg"
                  >
                    ❌
                  </button>
                </div>

                <p className="text-slate-400 text-sm mb-3">
                  {course.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-slate-400">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400">⭐</span>
                      <span>{course.rating}</span>
                      <span>({course.students})</span>
                    </div>
                    <span>{course.duration}</span>
                    <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">
                      {course.category}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    {course.onSale && (
                      <span className="text-slate-400 line-through text-sm">
                        ${course.originalPrice}
                      </span>
                    )}
                    <span className="text-xl font-bold text-white">
                      ${course.price}
                    </span>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {wishlist.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">💝</div>
          <h3 className="text-lg font-medium text-white mb-2">
            Your wishlist is empty
          </h3>
          <p className="text-slate-400 mb-6">
            Start saving courses you're interested in!
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Browse Courses
          </button>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
