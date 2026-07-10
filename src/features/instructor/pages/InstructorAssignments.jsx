import { useState, useEffect } from "react";
import {
  X,
  Download,
  FileText,
  Calendar,
  User,
  CheckCircle,
  Clock,
  Search,
  Eye,
  Star,
  MessageSquare,
} from "lucide-react";

const InstructorAssignments = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [assignments, setAssignments] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showGradeModal, setShowGradeModal] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  // Grading form state
  const [gradeData, setGradeData] = useState({
    grade: "",
    score: "",
    feedback: "",
  });

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    setAssignments(getMockSubmissions());
  };

  // Mock data for development
  const getMockSubmissions = () => [
    {
      id: 1,
      assignmentTitle: "React Component Library",
      course: "React Masterclass 2024",
      student: {
        id: "s1",
        name: "John Doe",
        email: "john.doe@student.edu",
        rollNumber: "CS-2024-001",
      },
      submittedAt: "2024-01-14T10:30:00",
      dueDate: "2024-01-20T23:59:59",
      isLate: false,
      points: 100,
      status: "submitted",
      submittedFiles: [
        {
          name: "component-library.zip",
          size: "4.2 MB",
          url: "/uploads/component-library.zip",
        },
      ],
      notes:
        "I've implemented all 5 components with TypeScript definitions and Storybook docs. Please check the README for setup instructions.",
    },
    {
      id: 2,
      assignmentTitle: "REST API Development",
      course: "Node.js Backend Development",
      student: {
        id: "s2",
        name: "Sarah Johnson",
        email: "sarah.j@student.edu",
        rollNumber: "CS-2024-002",
      },
      submittedAt: "2024-01-17T15:45:00",
      dueDate: "2024-01-18T23:59:59",
      isLate: false,
      points: 150,
      status: "submitted",
      submittedFiles: [
        {
          name: "api-project.zip",
          size: "2.8 MB",
          url: "/uploads/api-project.zip",
        },
        {
          name: "api-documentation.pdf",
          size: "1.2 MB",
          url: "/uploads/api-docs.pdf",
        },
      ],
      notes:
        "Complete REST API with JWT authentication. Postman collection included.",
    },
    {
      id: 3,
      assignmentTitle: "Design System Project",
      course: "UI/UX Design Principles",
      student: {
        id: "s3",
        name: "Mike Chen",
        email: "mike.chen@student.edu",
        rollNumber: "DES-2024-001",
      },
      submittedAt: "2024-01-19T08:20:00",
      dueDate: "2024-01-15T23:59:59",
      isLate: true,
      daysLate: 4,
      points: 120,
      status: "submitted",
      submittedFiles: [
        {
          name: "design-system.fig",
          size: "5.6 MB",
          url: "/uploads/design-system.fig",
        },
      ],
      notes: "Sorry for late submission. Had some technical issues.",
    },
    {
      id: 4,
      assignmentTitle: "JavaScript Algorithms",
      course: "Advanced JavaScript Patterns",
      student: {
        id: "s1",
        name: "John Doe",
        email: "john.doe@student.edu",
        rollNumber: "CS-2024-001",
      },
      submittedAt: "2024-01-10T14:30:00",
      dueDate: "2024-01-25T23:59:59",
      isLate: false,
      points: 80,
      status: "graded",
      grade: "A",
      score: 75,
      percentage: 93.75,
      feedback:
        "Excellent implementation! Your time complexity analysis was thorough. Consider adding more edge case tests.",
      gradedAt: "2024-01-12T10:00:00",
      submittedFiles: [
        {
          name: "algorithms.js",
          size: "45 KB",
          url: "/uploads/algorithms.js",
        },
      ],
      notes: "All 5 algorithms implemented with test cases.",
    },
    {
      id: 5,
      assignmentTitle: "Data Analysis Report",
      course: "Python for Data Analysis",
      student: {
        id: "s4",
        name: "Emma Wilson",
        email: "emma.w@student.edu",
        rollNumber: "DS-2024-001",
      },
      submittedAt: "2024-01-11T16:20:00",
      dueDate: "2024-01-12T23:59:59",
      isLate: false,
      points: 200,
      status: "graded",
      grade: "A+",
      score: 198,
      percentage: 99,
      feedback:
        "Outstanding work! Your visualizations are professional grade and insights are deep. This is publication-quality work.",
      gradedAt: "2024-01-13T09:30:00",
      submittedFiles: [
        {
          name: "analysis.ipynb",
          size: "2.3 MB",
          url: "/uploads/analysis.ipynb",
        },
        {
          name: "report.pdf",
          size: "4.1 MB",
          url: "/uploads/report.pdf",
        },
      ],
      notes:
        "Complete analysis with statistical tests and machine learning models.",
    },
  ];

  const filteredSubmissions = assignments.filter((submission) => {
    // Filter by tab
    if (activeTab === "pending" && submission.status !== "submitted")
      return false;
    if (activeTab === "graded" && submission.status !== "graded") return false;

    // Filter by search
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        submission.student.name.toLowerCase().includes(search) ||
        submission.student.email.toLowerCase().includes(search) ||
        submission.assignmentTitle.toLowerCase().includes(search) ||
        submission.course.toLowerCase().includes(search)
      );
    }

    return true;
  });

  const handleGradeSubmit = async () => {
    if (!gradeData.grade || !gradeData.score) {
      alert("Please provide both grade and score");
      return;
    }
  };

  const handleDownloadFile = (fileUrl) => {
    window.open(fileUrl, "_blank");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getGradeColor = (grade) => {
    if (!grade) return "";
    const firstChar = grade.charAt(0);
    if (firstChar === "A") return "text-green-400";
    if (firstChar === "B") return "text-gold";
    if (firstChar === "C") return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="min-h-screen bg-surface text-slate-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Instructor Panel</h1>
        <p className="text-text-2">Review and grade student submissions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl p-5 border border-gold/20">
          <div className="text-3xl font-bold text-gold mb-1">
            {assignments.filter((s) => s.status === "submitted").length}
          </div>
          <div className="text-text-2 text-sm">Pending Review</div>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-xl p-5 border border-green-500/20">
          <div className="text-3xl font-bold text-green-400 mb-1">
            {assignments.filter((s) => s.status === "graded").length}
          </div>
          <div className="text-text-2 text-sm">Graded</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 rounded-xl p-5 border border-yellow-500/20">
          <div className="text-3xl font-bold text-yellow-400 mb-1">
            {assignments.filter((s) => s.isLate).length}
          </div>
          <div className="text-text-2 text-sm">Late Submissions</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-xl p-5 border border-purple-500/20">
          <div className="text-3xl font-bold text-purple-400 mb-1">
            {assignments.length}
          </div>
          <div className="text-text-2 text-sm">Total Submissions</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-surface-2 rounded-xl p-4 mb-6 border border-border">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-2" />
            <input
              type="text"
              placeholder="Search by student name, email, or assignment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface border border-border-strong rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-text-3 focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          {/* Tab Filters */}
          <div className="flex gap-2">
            {["all", "pending", "graded"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                  activeTab === tab
                    ? "bg-gold text-white shadow-lg shadow-gold-glow/20"
                    : "text-text-2 hover:text-white hover:bg-surface-2"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {filteredSubmissions.map((submission) => (
          <div
            key={submission.id}
            className="bg-surface-2 rounded-xl p-6 border border-border hover:border-border-strong transition-all hover:shadow-lg hover:shadow-black/20"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-2">
                  <h3 className="font-bold text-white text-lg">
                    {submission.assignmentTitle}
                  </h3>
                  {submission.isLate && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">
                      Late by {submission.daysLate} days
                    </span>
                  )}
                  {submission.status === "graded" && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Graded
                    </span>
                  )}
                </div>

                <p className="text-gold text-sm mb-2">
                  {submission.course}
                </p>

                <div className="flex items-center gap-4 text-sm text-text-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="text-text-2 font-medium">
                      {submission.student.name}
                    </span>
                    <span className="text-text-3">
                      ({submission.student.rollNumber})
                    </span>
                  </div>
                </div>
              </div>

              {submission.status === "graded" && (
                <div className="text-right">
                  <div
                    className={`text-3xl font-bold ${getGradeColor(submission.grade)}`}
                  >
                    {submission.grade}
                  </div>
                  <div className="text-text-2 text-sm">
                    {submission.score}/{submission.points} (
                    {submission.percentage.toFixed(1)}%)
                  </div>
                </div>
              )}
            </div>

            {/* Submission Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 bg-surface rounded-lg p-4">
              <div>
                <div className="text-text-3 text-xs mb-1">Submitted At</div>
                <div className="text-text-2 text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-text-2" />
                  {formatDate(submission.submittedAt)}
                </div>
              </div>
              <div>
                <div className="text-text-3 text-xs mb-1">Due Date</div>
                <div className="text-text-2 text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4 text-text-2" />
                  {formatDate(submission.dueDate)}
                </div>
              </div>
            </div>

            {/* Student Notes */}
            {submission.notes && (
              <div className="mb-4 bg-surface rounded-lg p-4 border-l-4 border-gold">
                <div className="text-text-2 text-xs mb-1 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Student Notes
                </div>
                <p className="text-text-2 text-sm italic">
                  "{submission.notes}"
                </p>
              </div>
            )}

            {/* Submitted Files */}
            <div className="mb-4">
              <div className="text-text-2 text-xs mb-2">Submitted Files</div>
              <div className="flex flex-wrap gap-2">
                {submission.submittedFiles.map((file, index) => (
                  <button
                    key={index}
                    onClick={() => handleDownloadFile(file.url)}
                    className="flex items-center gap-2 bg-surface hover:bg-surface-2 px-4 py-2 rounded-lg border border-border-strong hover:border-border-strong transition-colors"
                  >
                    <FileText className="w-4 h-4 text-gold" />
                    <span className="text-text-2 text-sm">{file.name}</span>
                    <span className="text-text-3 text-xs">
                      ({file.size})
                    </span>
                    <Download className="w-4 h-4 text-text-2 ml-2" />
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback (if graded) */}
            {submission.feedback && (
              <div className="mb-4 bg-green-500/10 rounded-lg p-4 border border-green-500/30">
                <div className="text-green-400 text-xs mb-1 font-medium">
                  Your Feedback
                </div>
                <p className="text-text-2 text-sm">{submission.feedback}</p>
                <div className="text-text-3 text-xs mt-2">
                  Graded on {formatDate(submission.gradedAt)}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedSubmission(submission)}
                className="flex-1 border border-border-strong hover:border-border-strong hover:bg-surface-2 text-text-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View Details
              </button>

              {submission.status === "submitted" ? (
                <button
                  onClick={() => setShowGradeModal(submission)}
                  className="flex-1 bg-gold hover:bg-gold-dim text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all shadow-lg shadow-gold-glow/20 flex items-center justify-center gap-2"
                >
                  <Star className="w-4 h-4" />
                  Grade Assignment
                </button>
              ) : (
                <button
                  onClick={() => setShowGradeModal(submission)}
                  className="flex-1 bg-surface-2 hover:bg-surface-2 text-text-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2"
                >
                  <Star className="w-4 h-4" />
                  Update Grade
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredSubmissions.length === 0 && (
        <div className="text-center py-16 bg-surface-2 rounded-xl border border-border">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-xl font-medium text-white mb-2">
            No submissions found
          </h3>
          <p className="text-text-2">
            {searchTerm
              ? "Try adjusting your search"
              : "No submissions to review yet"}
          </p>
        </div>
      )}

      {/* Details Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-surface-2 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-border">
            <div className="sticky top-0 bg-surface-2 border-b border-border p-6 flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {selectedSubmission.assignmentTitle}
                </h2>
                <p className="text-gold text-sm">
                  {selectedSubmission.course}
                </p>
              </div>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-text-2 hover:text-white p-2 hover:bg-surface-2 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Student Info */}
              <div className="bg-surface rounded-lg p-4">
                <h3 className="text-white font-semibold mb-3">
                  Student Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-2">Name:</span>
                    <span className="text-white font-medium">
                      {selectedSubmission.student.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-2">Email:</span>
                    <span className="text-white">
                      {selectedSubmission.student.email}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-2">Roll Number:</span>
                    <span className="text-white">
                      {selectedSubmission.student.rollNumber}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submission Info */}
              <div className="bg-surface rounded-lg p-4">
                <h3 className="text-white font-semibold mb-3">
                  Submission Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-2">Submitted:</span>
                    <span className="text-white">
                      {formatDate(selectedSubmission.submittedAt)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-2">Due Date:</span>
                    <span className="text-white">
                      {formatDate(selectedSubmission.dueDate)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-2">Status:</span>
                    <span
                      className={
                        selectedSubmission.isLate
                          ? "text-red-400"
                          : "text-green-400"
                      }
                    >
                      {selectedSubmission.isLate
                        ? `Late (${selectedSubmission.daysLate} days)`
                        : "On Time"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-2">Total Points:</span>
                    <span className="text-white font-medium">
                      {selectedSubmission.points}
                    </span>
                  </div>
                </div>
              </div>

              {/* Files */}
              <div>
                <h3 className="text-white font-semibold mb-3">
                  Submitted Files
                </h3>
                <div className="space-y-2">
                  {selectedSubmission.submittedFiles.map((file, index) => (
                    <button
                      key={index}
                      onClick={() => handleDownloadFile(file.url)}
                      className="w-full flex items-center justify-between bg-surface p-4 rounded-lg hover:bg-surface-2 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gold" />
                        <div className="text-left">
                          <div className="text-text-2 font-medium">
                            {file.name}
                          </div>
                          <div className="text-text-3 text-xs">
                            {file.size}
                          </div>
                        </div>
                      </div>
                      <Download className="w-5 h-5 text-text-2" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Student Notes */}
              {selectedSubmission.notes && (
                <div>
                  <h3 className="text-white font-semibold mb-3">
                    Student Notes
                  </h3>
                  <div className="bg-gold/10 border border-gold/30 rounded-lg p-4">
                    <p className="text-text-2">{selectedSubmission.notes}</p>
                  </div>
                </div>
              )}

              {/* Grade Info (if graded) */}
              {selectedSubmission.status === "graded" && (
                <div>
                  <h3 className="text-white font-semibold mb-3">Grading</h3>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-text-2">Grade:</span>
                      <span
                        className={`text-2xl font-bold ${getGradeColor(selectedSubmission.grade)}`}
                      >
                        {selectedSubmission.grade}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-2">Score:</span>
                      <span className="text-white font-medium">
                        {selectedSubmission.score}/{selectedSubmission.points} (
                        {selectedSubmission.percentage.toFixed(1)}%)
                      </span>
                    </div>
                    {selectedSubmission.feedback && (
                      <div>
                        <div className="text-text-2 text-sm mb-2">
                          Feedback:
                        </div>
                        <p className="text-text-2">
                          {selectedSubmission.feedback}
                        </p>
                      </div>
                    )}
                    <div className="text-text-3 text-xs pt-2 border-t border-green-500/20">
                      Graded on {formatDate(selectedSubmission.gradedAt)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Grade Modal */}
      {showGradeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-surface-2 rounded-2xl max-w-2xl w-full border border-border">
            <div className="border-b border-border p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">
                Grade Assignment
              </h2>
              <button
                onClick={() => {
                  setShowGradeModal(null);
                  setGradeData({ grade: "", score: "", feedback: "" });
                }}
                className="text-text-2 hover:text-white p-2 hover:bg-surface-2 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Assignment Info */}
              <div className="bg-surface rounded-lg p-4">
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-text-2">Student:</span>
                    <span className="text-white font-medium">
                      {showGradeModal.student.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-2">Assignment:</span>
                    <span className="text-white">
                      {showGradeModal.assignmentTitle}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-2">Total Points:</span>
                    <span className="text-white font-medium">
                      {showGradeModal.points}
                    </span>
                  </div>
                </div>
              </div>

              {/* Grade Input */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">
                    Grade (Letter) *
                  </label>
                  <select
                    value={gradeData.grade}
                    onChange={(e) =>
                      setGradeData({ ...gradeData, grade: e.target.value })
                    }
                    className="w-full bg-surface border border-border-strong rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <option value="">Select Grade</option>
                    <option value="A+">A+ (95-100%)</option>
                    <option value="A">A (90-94%)</option>
                    <option value="A-">A- (85-89%)</option>
                    <option value="B+">B+ (80-84%)</option>
                    <option value="B">B (75-79%)</option>
                    <option value="B-">B- (70-74%)</option>
                    <option value="C+">C+ (65-69%)</option>
                    <option value="C">C (60-64%)</option>
                    <option value="C-">C- (55-59%)</option>
                    <option value="D">D (50-54%)</option>
                    <option value="F">F (Below 50%)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Score (Points) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={showGradeModal.points}
                    step="0.5"
                    value={gradeData.score}
                    onChange={(e) =>
                      setGradeData({ ...gradeData, score: e.target.value })
                    }
                    placeholder={`Out of ${showGradeModal.points}`}
                    className="w-full bg-surface border border-border-strong rounded-lg px-4 py-2.5 text-white placeholder-text-3 focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                  {gradeData.score && (
                    <div className="text-text-2 text-xs mt-1">
                      Percentage:{" "}
                      {(
                        (parseFloat(gradeData.score) / showGradeModal.points) *
                        100
                      ).toFixed(1)}
                      %
                    </div>
                  )}
                </div>
              </div>

              {/* Feedback */}
              <div>
                <label className="block text-white font-medium mb-2">
                  Feedback
                </label>
                <textarea
                  value={gradeData.feedback}
                  onChange={(e) =>
                    setGradeData({ ...gradeData, feedback: e.target.value })
                  }
                  placeholder="Provide detailed feedback to help the student improve..."
                  rows="6"
                  className="w-full bg-surface border border-border-strong rounded-lg px-4 py-3 text-white placeholder-text-3 focus:outline-none focus:ring-2 focus:ring-gold"
                />
                <div className="text-text-2 text-xs mt-1">
                  Good feedback includes: what was done well, areas for
                  improvement, and specific suggestions
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowGradeModal(null);
                    setGradeData({ grade: "", score: "", feedback: "" });
                  }}
                  className="flex-1 border border-border-strong hover:bg-surface-2 text-text-2 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGradeSubmit}
                  disabled={!gradeData.grade || !gradeData.score}
                  className="flex-1 bg-gold hover:bg-gold-dim disabled:bg-surface-2 disabled:text-text-3 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg shadow-gold-glow/20"
                >
                  Submit Grade
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorAssignments;
