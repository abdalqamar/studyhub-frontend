import { useState, useEffect } from "react";
import {
  X,
  Upload,
  FileText,
  Calendar,
  Award,
  CheckCircle,
  Clock,
} from "lucide-react";

const Assignments = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showSubmitModal, setShowSubmitModal] = useState(null);
  const [submissionFile, setSubmissionFile] = useState(null);
  const [submissionNotes, setSubmissionNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch assignments from backend
  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await fetch("/api/assignments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust based on your auth
        },
      });
      const data = await response.json();
      setAssignments(data.assignments || data);
    } catch (error) {
      console.error("Failed to fetch assignments:", error);
      // Fallback to mock data for demo
      setAssignments(getMockAssignments());
    } finally {
      setLoading(false);
    }
  };

  // Mock data for development
  const getMockAssignments = () => [
    {
      id: 1,
      title: "React Component Library",
      course: "React Masterclass 2024",
      instructor: "Dr. Sarah Johnson",
      dueDate: "2024-01-20",
      status: "pending",
      submitted: false,
      points: 100,
      description:
        "Build a reusable component library with React and TypeScript",
      requirements: [
        "Minimum 5 reusable components",
        "TypeScript type definitions",
        "Storybook documentation",
        "Unit tests with Jest",
      ],
      attachments: [
        { name: "requirements.pdf", url: "#" },
        { name: "starter-template.zip", url: "#" },
      ],
    },
    {
      id: 2,
      title: "REST API Development",
      course: "Node.js Backend Development",
      instructor: "Prof. Michael Chen",
      dueDate: "2024-01-18",
      status: "pending",
      submitted: false,
      points: 150,
      description:
        "Create a complete REST API with authentication and authorization",
      requirements: [
        "User authentication with JWT",
        "CRUD operations for main resources",
        "Role-based access control",
        "API documentation with Swagger",
      ],
      attachments: [],
    },
    {
      id: 3,
      title: "Design System Project",
      course: "UI/UX Design Principles",
      instructor: "Emily Rodriguez",
      dueDate: "2024-01-15",
      status: "submitted",
      submitted: true,
      submittedAt: "2024-01-14T10:30:00",
      points: 120,
      description: "Design and prototype a complete design system",
      requirements: [
        "Color palette and typography",
        "Component library in Figma",
        "Design tokens documentation",
        "Interactive prototype",
      ],
      attachments: [],
      submissionFiles: [{ name: "design-system.fig", size: "2.4 MB" }],
    },
    {
      id: 4,
      title: "JavaScript Algorithms",
      course: "Advanced JavaScript Patterns",
      instructor: "Dr. James Park",
      dueDate: "2024-01-25",
      status: "pending",
      submitted: false,
      points: 80,
      description: "Solve complex algorithms using modern JavaScript",
      requirements: [
        "5 algorithm implementations",
        "Time complexity analysis",
        "Space optimization",
        "Test cases included",
      ],
      attachments: [{ name: "algorithm-problems.pdf", url: "#" }],
    },
    {
      id: 5,
      title: "Data Analysis Report",
      course: "Python for Data Analysis",
      instructor: "Dr. Lisa Wang",
      dueDate: "2024-01-12",
      status: "graded",
      submitted: true,
      submittedAt: "2024-01-11T15:45:00",
      gradedAt: "2024-01-13T09:20:00",
      grade: "A",
      score: 95,
      points: 200,
      description: "Analyze dataset and create comprehensive report",
      requirements: [
        "Exploratory data analysis",
        "Statistical visualizations",
        "Insights and recommendations",
        "Jupyter notebook submission",
      ],
      feedback:
        "Excellent work! Your visualizations were particularly insightful and the statistical analysis was thorough. Consider exploring more advanced clustering techniques in future projects.",
      attachments: [{ name: "dataset.csv", url: "#" }],
      submissionFiles: [
        { name: "analysis-report.ipynb", size: "1.8 MB" },
        { name: "visualizations.pdf", size: "3.2 MB" },
      ],
    },
  ];

  const filteredAssignments = assignments.filter((assignment) => {
    if (activeFilter === "all") return true;
    return assignment.status === activeFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "submitted":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "graded":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "submitted":
        return <Upload className="w-4 h-4" />;
      case "graded":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSubmissionFile(file);
    }
  };

  const handleSubmitAssignment = async () => {
    if (!submissionFile) {
      alert("Please upload a file");
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("file", submissionFile);
      formData.append("notes", submissionNotes);
      formData.append("assignmentId", showSubmitModal.id);

      // Replace with your actual API endpoint
      const response = await fetch(
        `/api/assignments/${showSubmitModal.id}/submit`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        // Refresh assignments
        await fetchAssignments();

        // Close modal and reset
        setShowSubmitModal(null);
        setSubmissionFile(null);
        setSubmissionNotes("");

        alert("Assignment submitted successfully!");
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit assignment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading assignments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">My Assignments</h1>
        <p className="text-slate-400">
          Manage and submit your course assignments
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 rounded-xl p-5 border border-slate-700">
          <div className="text-3xl font-bold text-white mb-1">
            {assignments.length}
          </div>
          <div className="text-slate-400 text-sm">Total Assignments</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 rounded-xl p-5 border border-yellow-500/20">
          <div className="text-3xl font-bold text-yellow-400 mb-1">
            {assignments.filter((a) => a.status === "pending").length}
          </div>
          <div className="text-slate-400 text-sm">Pending</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl p-5 border border-blue-500/20">
          <div className="text-3xl font-bold text-blue-400 mb-1">
            {assignments.filter((a) => a.status === "submitted").length}
          </div>
          <div className="text-slate-400 text-sm">Submitted</div>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-xl p-5 border border-green-500/20">
          <div className="text-3xl font-bold text-green-400 mb-1">
            {assignments.filter((a) => a.status === "graded").length}
          </div>
          <div className="text-slate-400 text-sm">Graded</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800 rounded-xl p-4 mb-6 border border-slate-700">
        <div className="flex flex-wrap gap-2">
          {["all", "pending", "submitted", "graded"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                activeFilter === filter
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
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
            className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all hover:shadow-lg hover:shadow-black/20"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-3">
                  <h3 className="font-bold text-white text-xl">
                    {assignment.title}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 ${getStatusColor(
                      assignment.status
                    )}`}
                  >
                    {getStatusIcon(assignment.status)}
                    {assignment.status.charAt(0).toUpperCase() +
                      assignment.status.slice(1)}
                  </span>
                </div>
                <p className="text-blue-400 text-sm mb-1 font-medium">
                  {assignment.course}
                </p>
                <p className="text-slate-400 text-sm mb-3">
                  {assignment.description}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <div>
                    <span
                      className={`font-medium ${
                        assignment.status === "pending" &&
                        formatDueDate(assignment.dueDate) === "Overdue"
                          ? "text-red-400"
                          : "text-slate-300"
                      }`}
                    >
                      {formatDueDate(assignment.dueDate)}
                    </span>
                    <div className="text-xs text-slate-500">
                      {new Date(assignment.dueDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-slate-400" />
                  <div>
                    <span className="font-medium text-slate-300">
                      {assignment.points}
                    </span>
                    <div className="text-xs text-slate-500">Points</div>
                  </div>
                </div>

                {assignment.grade && (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <div>
                      <span className="font-medium text-green-400 text-lg">
                        {assignment.grade}
                      </span>
                      {assignment.score && (
                        <div className="text-xs text-slate-500">
                          {assignment.score}/{assignment.points}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                {assignment.status === "pending" && (
                  <button
                    onClick={() => setShowSubmitModal(assignment)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
                  >
                    Submit Assignment
                  </button>
                )}
                <button
                  onClick={() => setSelectedAssignment(assignment)}
                  className="border border-slate-600 hover:border-slate-500 hover:bg-slate-700 text-slate-300 px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAssignments.length === 0 && (
        <div className="text-center py-16 bg-slate-800 rounded-xl border border-slate-700">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-medium text-white mb-2">
            No assignments found
          </h3>
          <p className="text-slate-400">
            You don't have any {activeFilter !== "all" ? activeFilter : ""}{" "}
            assignments
          </p>
        </div>
      )}

      {/* Details Modal */}
      {selectedAssignment && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-700">
            {/* Modal Header */}
            <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {selectedAssignment.title}
                </h2>
                <p className="text-blue-400 text-sm">
                  {selectedAssignment.course}
                </p>
                {selectedAssignment.instructor && (
                  <p className="text-slate-400 text-sm mt-1">
                    Instructor: {selectedAssignment.instructor}
                  </p>
                )}
              </div>
              <button
                onClick={() => setSelectedAssignment(null)}
                className="text-slate-400 hover:text-white p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Status and Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900 rounded-lg p-4">
                  <div className="text-slate-400 text-sm mb-1">Status</div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedAssignment.status)}`}
                  >
                    {getStatusIcon(selectedAssignment.status)}
                    {selectedAssignment.status.charAt(0).toUpperCase() +
                      selectedAssignment.status.slice(1)}
                  </span>
                </div>
                <div className="bg-slate-900 rounded-lg p-4">
                  <div className="text-slate-400 text-sm mb-1">Due Date</div>
                  <div className="text-white font-medium">
                    {new Date(selectedAssignment.dueDate).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </div>
                  <div className="text-slate-400 text-sm mt-1">
                    {formatDueDate(selectedAssignment.dueDate)}
                  </div>
                </div>
                <div className="bg-slate-900 rounded-lg p-4">
                  <div className="text-slate-400 text-sm mb-1">Points</div>
                  <div className="text-white font-medium text-xl">
                    {selectedAssignment.points}
                  </div>
                </div>
                {selectedAssignment.grade && (
                  <div className="bg-slate-900 rounded-lg p-4">
                    <div className="text-slate-400 text-sm mb-1">Grade</div>
                    <div className="text-green-400 font-bold text-2xl">
                      {selectedAssignment.grade}
                    </div>
                    {selectedAssignment.score && (
                      <div className="text-slate-400 text-sm">
                        {selectedAssignment.score}/{selectedAssignment.points}{" "}
                        points
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-white font-semibold mb-2">Description</h3>
                <p className="text-slate-300">
                  {selectedAssignment.description}
                </p>
              </div>

              {/* Requirements */}
              {selectedAssignment.requirements && (
                <div>
                  <h3 className="text-white font-semibold mb-3">
                    Requirements
                  </h3>
                  <ul className="space-y-2">
                    {selectedAssignment.requirements.map((req, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-slate-300"
                      >
                        <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Attachments */}
              {selectedAssignment.attachments &&
                selectedAssignment.attachments.length > 0 && (
                  <div>
                    <h3 className="text-white font-semibold mb-3">
                      Course Materials
                    </h3>
                    <div className="space-y-2">
                      {selectedAssignment.attachments.map((file, index) => (
                        <a
                          key={index}
                          href={file.url}
                          className="flex items-center gap-3 bg-slate-900 p-3 rounded-lg hover:bg-slate-700 transition-colors"
                        >
                          <FileText className="w-5 h-5 text-blue-400" />
                          <span className="text-slate-300">{file.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

              {/* Submission Info */}
              {selectedAssignment.submitted &&
                selectedAssignment.submissionFiles && (
                  <div>
                    <h3 className="text-white font-semibold mb-3">
                      Your Submission
                    </h3>
                    <div className="bg-slate-900 rounded-lg p-4 space-y-3">
                      <div className="text-sm text-slate-400">
                        Submitted on:{" "}
                        {new Date(
                          selectedAssignment.submittedAt
                        ).toLocaleString("en-US", {
                          dateStyle: "long",
                          timeStyle: "short",
                        })}
                      </div>
                      <div className="space-y-2">
                        {selectedAssignment.submissionFiles.map(
                          (file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-slate-800 p-3 rounded-lg"
                            >
                              <div className="flex items-center gap-3">
                                <FileText className="w-5 h-5 text-green-400" />
                                <span className="text-slate-300">
                                  {file.name}
                                </span>
                              </div>
                              <span className="text-slate-400 text-sm">
                                {file.size}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}

              {/* Feedback */}
              {selectedAssignment.feedback && (
                <div>
                  <h3 className="text-white font-semibold mb-3">
                    Instructor Feedback
                  </h3>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <p className="text-slate-300">
                      {selectedAssignment.feedback}
                    </p>
                  </div>
                </div>
              )}

              {/* Action Button */}
              {selectedAssignment.status === "pending" && (
                <button
                  onClick={() => {
                    setSelectedAssignment(null);
                    setShowSubmitModal(selectedAssignment);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg shadow-blue-500/20"
                >
                  Submit Assignment
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-2xl max-w-2xl w-full border border-slate-700">
            <div className="border-b border-slate-700 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">
                Submit Assignment
              </h2>
              <button
                onClick={() => {
                  setShowSubmitModal(null);
                  setSubmissionFile(null);
                  setSubmissionNotes("");
                }}
                className="text-slate-400 hover:text-white p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-white font-semibold mb-2">
                  {showSubmitModal.title}
                </h3>
                <p className="text-slate-400 text-sm">
                  {showSubmitModal.course}
                </p>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-white font-medium mb-2">
                  Upload File *
                </label>
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="w-12 h-12 text-slate-400 mb-3" />
                    {submissionFile ? (
                      <div className="text-white font-medium">
                        {submissionFile.name}
                      </div>
                    ) : (
                      <>
                        <div className="text-white font-medium mb-1">
                          Click to upload or drag and drop
                        </div>
                        <div className="text-slate-400 text-sm">
                          PDF, DOC, DOCX, ZIP (Max 10MB)
                        </div>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-white font-medium mb-2">
                  Submission Notes (Optional)
                </label>
                <textarea
                  value={submissionNotes}
                  onChange={(e) => setSubmissionNotes(e.target.value)}
                  placeholder="Add any notes or comments for your instructor..."
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowSubmitModal(null);
                    setSubmissionFile(null);
                    setSubmissionNotes("");
                  }}
                  className="flex-1 border border-slate-600 hover:bg-slate-700 text-slate-300 px-6 py-3 rounded-lg font-medium transition-colors"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitAssignment}
                  disabled={!submissionFile || submitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg shadow-blue-500/20"
                >
                  {submitting ? "Submitting..." : "Submit Assignment"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignments;
