import { useState } from "react";

const CourseApprovalSystem = () => {
  const [filter, setFilter] = useState("pending");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
    {
      id: 1,
      title: "Advanced React Patterns 2024",
      instructor: "John Doe",
      category: "Web Development",
      date: "2024-01-15",
      status: "pending",
      description:
        "Learn advanced React patterns and best practices for building scalable applications. This course covers performance optimization, state management, and modern React features.",
      price: 79,
      duration: "12 hours",
      students: 0,
      level: "Advanced",
      language: "English",
      thumbnail: "🎨",
      objectives: [
        "Master advanced React patterns",
        "Optimize application performance",
        "Implement complex state management",
        "Build scalable component architectures",
      ],
      curriculum: [
        { title: "Introduction to Advanced Patterns", duration: "45 min" },
        { title: "Performance Optimization Techniques", duration: "1.5 hours" },
        { title: "State Management Deep Dive", duration: "2 hours" },
        { title: "Real-world Project", duration: "4 hours" },
      ],
    },
    {
      id: 2,
      title: "Machine Learning Fundamentals with Python",
      instructor: "Sarah Wilson",
      category: "Data Science",
      date: "2024-01-14",
      status: "pending",
      description:
        "Comprehensive introduction to machine learning concepts and algorithms using Python. Perfect for beginners starting their ML journey.",
      price: 99,
      duration: "18 hours",
      students: 0,
      level: "Beginner",
      language: "English",
      thumbnail: "🤖",
      objectives: [
        "Understand ML fundamentals",
        "Implement algorithms with Python",
        "Work with real datasets",
        "Build and evaluate models",
      ],
      curriculum: [
        { title: "ML Basics and Terminology", duration: "1 hour" },
        { title: "Python for Data Science", duration: "2 hours" },
        { title: "Supervised Learning Algorithms", duration: "4 hours" },
        { title: "Model Evaluation Techniques", duration: "2 hours" },
      ],
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass",
      instructor: "Mike Johnson",
      category: "Design",
      date: "2024-01-13",
      status: "approved",
      description:
        "Complete guide to user interface and user experience design principles for modern web and mobile applications.",
      price: 89,
      duration: "15 hours",
      students: 245,
      level: "Intermediate",
      language: "English",
      thumbnail: "🎯",
    },
    {
      id: 4,
      title: "Node.js Backend Development",
      instructor: "Alex Brown",
      category: "Web Development",
      date: "2024-01-12",
      status: "rejected",
      description:
        "Build scalable backend applications with Node.js and Express framework.",
      price: 69,
      duration: "10 hours",
      students: 0,
      level: "Intermediate",
      language: "English",
      thumbnail: "⚙️",
    },
    {
      id: 5,
      title: "Mobile App Development with Flutter",
      instructor: "Emily Davis",
      category: "Mobile Development",
      date: "2024-01-11",
      status: "pending",
      description:
        "Learn to build cross-platform mobile applications using Flutter and Dart.",
      price: 79,
      duration: "14 hours",
      students: 0,
      level: "Beginner",
      language: "English",
      thumbnail: "📱",
    },
  ];

  const filteredCourses =
    filter === "all"
      ? courses
      : courses.filter((course) => course.status === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "approved":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Pending Review";
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      default:
        return status;
    }
  };

  const handleApprove = (courseId) => {
    // API call to approve course
    console.log("Approving course:", courseId);
    // Update local state for demo
    const updatedCourses = courses.map((course) =>
      course.id === courseId ? { ...course, status: "approved" } : course
    );
    // In real app, this would be setCourses(updatedCourses)
    setSelectedCourse(null);
  };

  const handleReject = (courseId) => {
    // API call to reject course
    console.log("Rejecting course:", courseId);
    // Update local state for demo
    const updatedCourses = courses.map((course) =>
      course.id === courseId ? { ...course, status: "rejected" } : course
    );
    // In real app, this would be setCourses(updatedCourses)
    setSelectedCourse(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          Course Approval System
        </h2>
        <div className="flex space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="text-2xl font-bold text-blue-400">
            {courses.length}
          </div>
          <div className="text-slate-400 text-sm">Total Submissions</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="text-2xl font-bold text-yellow-400">
            {courses.filter((c) => c.status === "pending").length}
          </div>
          <div className="text-slate-400 text-sm">Pending Review</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="text-2xl font-bold text-green-400">
            {courses.filter((c) => c.status === "approved").length}
          </div>
          <div className="text-slate-400 text-sm">Approved</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="text-2xl font-bold text-red-400">
            {courses.filter((c) => c.status === "rejected").length}
          </div>
          <div className="text-slate-400 text-sm">Rejected</div>
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Course Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Instructor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Category
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {filteredCourses.map((course) => (
                <tr
                  key={course.id}
                  className="hover:bg-slate-750 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-slate-600 rounded-lg flex items-center justify-center text-2xl">
                        {course.thumbnail}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-white">
                          {course.title}
                        </div>
                        <div className="text-slate-400 text-sm mt-1 line-clamp-2">
                          {course.description}
                        </div>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-slate-500">
                          <span>${course.price}</span>
                          <span>•</span>
                          <span>{course.duration}</span>
                          <span>•</span>
                          <span>{course.language}</span>
                        </div>
                        <div className="text-slate-500 text-xs mt-1">
                          Submitted: {course.date}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">
                    {course.instructor}
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">
                      {course.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        course.status
                      )} text-white`}
                    >
                      {getStatusText(course.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedCourse(course)}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                      >
                        Preview
                      </button>
                      {course.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(course.id)}
                            className="text-green-400 hover:text-green-300 text-sm font-medium"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() => handleReject(course.id)}
                            className="text-red-400 hover:text-red-300 text-sm font-medium"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-lg font-medium text-white mb-2">
              No courses found
            </h3>
            <p className="text-slate-400">
              {filter !== "all"
                ? `No courses with ${filter} status`
                : "No courses available for review"}
            </p>
          </div>
        )}
      </div>

      {/* Course Preview Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Course Preview</h3>
              <button
                onClick={() => setSelectedCourse(null)}
                className="text-slate-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Course Header */}
              <div className="flex items-start space-x-6">
                <div className="w-24 h-24 bg-slate-600 rounded-xl flex items-center justify-center text-4xl">
                  {selectedCourse.thumbnail}
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-white">
                    {selectedCourse.title}
                  </h4>
                  <p className="text-slate-400 mt-2">
                    {selectedCourse.description}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                    <div>
                      <span className="text-slate-400">Instructor:</span>
                      <div className="text-white font-medium">
                        {selectedCourse.instructor}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400">Category:</span>
                      <div className="text-white font-medium">
                        {selectedCourse.category}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400">Level:</span>
                      <div className="text-white font-medium">
                        {selectedCourse.level}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400">Language:</span>
                      <div className="text-white font-medium">
                        {selectedCourse.language}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-700 rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-3">
                    Pricing & Duration
                  </h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Price:</span>
                      <span className="text-white font-bold">
                        ${selectedCourse.price}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Duration:</span>
                      <span className="text-white">
                        {selectedCourse.duration}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Students:</span>
                      <span className="text-white">
                        {selectedCourse.students}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-700 rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-3">
                    Learning Objectives
                  </h5>
                  <ul className="space-y-1 text-sm">
                    {selectedCourse.objectives?.map((objective, index) => (
                      <li
                        key={index}
                        className="text-slate-300 flex items-start"
                      >
                        <span className="text-green-400 mr-2">✓</span>
                        {objective}
                      </li>
                    )) || (
                      <li className="text-slate-400">
                        No objectives specified
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Curriculum */}
              {selectedCourse.curriculum && (
                <div className="bg-slate-700 rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-3">
                    Course Curriculum
                  </h5>
                  <div className="space-y-2">
                    {selectedCourse.curriculum.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-slate-600 rounded"
                      >
                        <span className="text-slate-300">{item.title}</span>
                        <span className="text-slate-400 text-sm">
                          {item.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Approval Actions */}
              {selectedCourse.status === "pending" && (
                <div className="border-t border-slate-700 pt-6">
                  <h5 className="font-semibold text-white mb-4">
                    Review Actions
                  </h5>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleReject(selectedCourse.id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Reject Course
                    </button>
                    <button
                      onClick={() => handleApprove(selectedCourse.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Approve Course
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseApprovalSystem;
