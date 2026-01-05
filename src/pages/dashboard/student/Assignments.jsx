import { useState } from "react";

const Assignments = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const assignments = [
    {
      id: 1,
      title: "React Component Library",
      course: "React Masterclass 2024",
      dueDate: "2024-01-20",
      status: "pending",
      submitted: false,
      points: 100,
      description:
        "Build a reusable component library with React and TypeScript",
    },
    {
      id: 2,
      title: "REST API Development",
      course: "Node.js Backend Development",
      dueDate: "2024-01-18",
      status: "pending",
      submitted: false,
      points: 150,
      description:
        "Create a complete REST API with authentication and authorization",
    },
    {
      id: 3,
      title: "Design System Project",
      course: "UI/UX Design Principles",
      dueDate: "2024-01-15",
      status: "submitted",
      submitted: true,
      points: 120,
      description: "Design and prototype a complete design system",
    },
    {
      id: 4,
      title: "JavaScript Algorithms",
      course: "Advanced JavaScript Patterns",
      dueDate: "2024-01-25",
      status: "pending",
      submitted: false,
      points: 80,
      description: "Solve complex algorithms using modern JavaScript",
    },
    {
      id: 5,
      title: "Data Analysis Report",
      course: "Python for Data Analysis",
      dueDate: "2024-01-12",
      status: "graded",
      submitted: true,
      grade: "A",
      points: 200,
      description: "Analyze dataset and create comprehensive report",
    },
  ];

  const filteredAssignments = assignments.filter((assignment) => {
    if (activeFilter === "all") return true;
    return assignment.status === activeFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "submitted":
        return "bg-blue-500";
      case "graded":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Due Soon";
      case "submitted":
        return "Submitted";
      case "graded":
        return "Graded";
      default:
        return status;
    }
  };

  const formatDueDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Due Today";
    if (diffDays === 1) return "Due Tomorrow";
    if (diffDays > 1) return `Due in ${diffDays} days`;
    return "Overdue";
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Assignments</h1>
        <p className="text-slate-400 mt-2">
          View and submit your course assignments
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-white">
            {assignments.length}
          </div>
          <div className="text-slate-400 text-sm">Total</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">
            {assignments.filter((a) => a.status === "pending").length}
          </div>
          <div className="text-slate-400 text-sm">Pending</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">
            {assignments.filter((a) => a.status === "submitted").length}
          </div>
          <div className="text-slate-400 text-sm">Submitted</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-400">
            {assignments.filter((a) => a.status === "graded").length}
          </div>
          <div className="text-slate-400 text-sm">Graded</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800 rounded-xl p-4 mb-6">
        <div className="flex space-x-2">
          {["all", "pending", "submitted", "graded"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${
                activeFilter === filter
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:text-white hover:bg-slate-700"
              }`}
            >
              {filter === "all" ? "All Assignments" : filter}
            </button>
          ))}
        </div>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {filteredAssignments.map((assignment) => (
          <div
            key={assignment.id}
            className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-white text-lg mb-2">
                  {assignment.title}
                </h3>
                <p className="text-slate-400 text-sm mb-1">
                  {assignment.course}
                </p>
                <p className="text-slate-500 text-sm">
                  {assignment.description}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  assignment.status
                )} text-white`}
              >
                {getStatusText(assignment.status)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-6 text-sm text-slate-400">
                <div>
                  <span className="font-medium text-slate-300">
                    {formatDueDate(assignment.dueDate)}
                  </span>
                  <div className="text-xs">
                    {new Date(assignment.dueDate).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-slate-300">
                    {assignment.points}
                  </span>
                  <div className="text-xs">Points</div>
                </div>
                {assignment.grade && (
                  <div>
                    <span className="font-medium text-green-400">
                      {assignment.grade}
                    </span>
                    <div className="text-xs">Grade</div>
                  </div>
                )}
              </div>

              <div className="flex space-x-2">
                {assignment.status === "pending" && (
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Submit Assignment
                  </button>
                )}
                <button className="border border-slate-600 hover:border-slate-500 text-slate-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAssignments.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-lg font-medium text-white mb-2">
            No assignments found
          </h3>
          <p className="text-slate-400">
            You don't have any assignments in this category
          </p>
        </div>
      )}
    </div>
  );
};

export default Assignments;
