// src/pages/Instructor/Dashboard/components/RecentEnrollments.jsx
const RecentEnrollments = () => {
  const enrollments = [
    {
      id: 1,
      student: "John Doe",
      course: "React Mastery",
      date: "2 hours ago",
      amount: "$49",
    },
    {
      id: 2,
      student: "Sarah Wilson",
      course: "Node.js Advanced",
      date: "5 hours ago",
      amount: "$79",
    },
    {
      id: 3,
      student: "Mike Johnson",
      course: "JavaScript Fundamentals",
      date: "1 day ago",
      amount: "$29",
    },
    {
      id: 4,
      student: "Emily Davis",
      course: "Python for Data",
      date: "2 days ago",
      amount: "$99",
    },
    {
      id: 5,
      student: "Alex Brown",
      course: "UX Design",
      date: "3 days ago",
      amount: "$59",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Recent Enrollments
      </h3>
      <div className="space-y-4">
        {enrollments.map((enrollment) => (
          <div
            key={enrollment.id}
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
          >
            <div className="flex-1">
              <p className="font-medium text-gray-900">{enrollment.student}</p>
              <p className="text-sm text-gray-500">{enrollment.course}</p>
              <p className="text-xs text-gray-400">{enrollment.date}</p>
            </div>
            <span className="font-semibold text-green-600">
              {enrollment.amount}
            </span>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 text-center text-blue-600 hover:text-blue-700 text-sm font-medium">
        View All Enrollments →
      </button>
    </div>
  );
};

export default RecentEnrollments;
