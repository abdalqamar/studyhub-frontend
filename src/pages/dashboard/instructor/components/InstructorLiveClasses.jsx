import { useState, useEffect } from "react";
import {
  Edit3,
  Trash2,
  Clock,
  Users,
  Video,
  Calendar,
  Plus,
  X,
  CheckCircle,
  Play,
  MoreVertical,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const InstructorLiveClasses = () => {
  const [liveClasses, setLiveClasses] = useState([
    {
      id: 1,
      date: "2024-01-15",
      time: "14:00 - 15:30",
      course: "React Masterclass",
      status: "upcoming",
      students: 45,
      action: "join",
      startTime: "14:00",
      endTime: "15:30",
      description: "Advanced React patterns and performance optimization",
      meetingLink: "https://meet.google.com/abc-def-ghi",
    },
    {
      id: 2,
      date: "2024-01-16",
      time: "11:00 - 12:00",
      course: "Node.js Backend",
      status: "upcoming",
      students: 32,
      action: "join",
      startTime: "11:00",
      endTime: "12:00",
      description: "Building scalable backend services with Node.js",
      meetingLink: "https://meet.google.com/jkl-mno-pqr",
    },
    {
      id: 3,
      date: "2024-01-12",
      time: "16:00 - 17:30",
      course: "UI/UX Design",
      status: "completed",
      students: 28,
      action: "view",
      startTime: "16:00",
      endTime: "17:30",
      description: "Design thinking and user experience principles",
      recordingLink: "https://drive.google.com/recording/123",
    },
    {
      id: 4,
      date: "2024-01-18",
      time: "10:00 - 11:30",
      course: "JavaScript Fundamentals",
      status: "upcoming",
      students: 51,
      action: "join",
      startTime: "10:00",
      endTime: "11:30",
      description: "Master JavaScript basics and modern ES6+ features",
      meetingLink: "https://meet.google.com/stu-vwx-yz",
    },
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [newClassData, setNewClassData] = useState({
    course: "",
    date: "",
    startTime: "",
    endTime: "",
    description: "",
    meetingLink: "",
  });

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      weekday: "short",
    });
  };

  const getClassStatus = (classItem) => {
    const classDate = new Date(classItem.date);
    const [startHours, startMinutes] = classItem.startTime
      .split(":")
      .map(Number);
    const [endHours, endMinutes] = classItem.endTime.split(":").map(Number);

    const classStartTime = new Date(classDate);
    classStartTime.setHours(startHours, startMinutes, 0, 0);

    const classEndTime = new Date(classDate);
    classEndTime.setHours(endHours, endMinutes, 0, 0);

    if (currentTime < classStartTime) {
      return "upcoming";
    } else if (currentTime >= classStartTime && currentTime <= classEndTime) {
      return "live";
    } else {
      return "completed";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-500 text-blue-100";
      case "live":
        return "bg-green-500 text-green-100 animate-pulse";
      case "completed":
        return "bg-gray-500 text-gray-100";
      case "cancelled":
        return "bg-red-500 text-red-100";
      default:
        return "bg-gray-500 text-gray-100";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "upcoming":
        return <Clock className="w-3 h-3" />;
      case "live":
        return <Play className="w-3 h-3" />;
      case "completed":
        return <CheckCircle className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "upcoming":
        return "Upcoming";
      case "live":
        return "Live Now";
      case "completed":
        return "Completed";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  const canJoinClass = (classItem) => {
    const status = getClassStatus(classItem);
    return status === "live";
  };

  const getTimeUntilClass = (classItem) => {
    const classDate = new Date(classItem.date);
    const [startHours, startMinutes] = classItem.startTime
      .split(":")
      .map(Number);

    const classStartTime = new Date(classDate);
    classStartTime.setHours(startHours, startMinutes, 0, 0);

    const timeDiff = classStartTime.getTime() - currentTime.getTime();

    if (timeDiff <= 0) return "Class started";

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) {
      return `Starts in ${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `Starts in ${minutes}m`;
    } else {
      return "Starting soon";
    }
  };

  const handleScheduleClass = () => {
    setNewClassData({
      course: "",
      date: "",
      startTime: "",
      endTime: "",
      description: "",
      meetingLink: "",
    });
    setShowScheduleModal(true);
  };

  const handleEditClass = (classItem) => {
    setSelectedClass(classItem);
    setNewClassData({
      course: classItem.course,
      date: classItem.date,
      startTime: classItem.startTime,
      endTime: classItem.endTime,
      description: classItem.description || "",
      meetingLink: classItem.meetingLink || "",
    });
    setShowEditModal(true);
    setActiveDropdown(null);
  };

  const handleDeleteClass = (classItem) => {
    setSelectedClass(classItem);
    setShowDeleteModal(true);
    setActiveDropdown(null);
  };

  const confirmDelete = () => {
    setLiveClasses((prev) => prev.filter((c) => c.id !== selectedClass.id));
    setShowDeleteModal(false);
    setSelectedClass(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClassData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitSchedule = (e) => {
    e.preventDefault();

    if (
      !newClassData.course ||
      !newClassData.date ||
      !newClassData.startTime ||
      !newClassData.endTime
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const selectedDate = new Date(newClassData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      alert("Cannot schedule class in the past");
      return;
    }

    if (newClassData.startTime >= newClassData.endTime) {
      alert("End time must be after start time");
      return;
    }

    const newClass = {
      id: liveClasses.length + 1,
      date: newClassData.date,
      time: `${newClassData.startTime} - ${newClassData.endTime}`,
      course: newClassData.course,
      status: "upcoming",
      students: 0,
      action: "join",
      startTime: newClassData.startTime,
      endTime: newClassData.endTime,
      description: newClassData.description,
      meetingLink: newClassData.meetingLink,
    };

    setLiveClasses((prev) => [newClass, ...prev]);
    setShowScheduleModal(false);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();

    if (
      !newClassData.course ||
      !newClassData.date ||
      !newClassData.startTime ||
      !newClassData.endTime
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const updatedClasses = liveClasses.map((c) =>
      c.id === selectedClass.id
        ? {
            ...c,
            course: newClassData.course,
            date: newClassData.date,
            time: `${newClassData.startTime} - ${newClassData.endTime}`,
            startTime: newClassData.startTime,
            endTime: newClassData.endTime,
            description: newClassData.description,
            meetingLink: newClassData.meetingLink,
          }
        : c
    );

    setLiveClasses(updatedClasses);
    setShowEditModal(false);
    setSelectedClass(null);
  };

  const handleJoinClass = (classItem) => {
    if (!canJoinClass(classItem)) {
      const status = getClassStatus(classItem);
      if (status === "upcoming") {
        alert(`This class hasn't started yet. ${getTimeUntilClass(classItem)}`);
      } else if (status === "completed") {
        alert("This class has already ended. You can view the recording.");
      }
      return;
    }

    // Open meeting link in new tab
    if (classItem.meetingLink) {
      window.open(classItem.meetingLink, "_blank");
    } else {
      alert(`Joining live class: ${classItem.course}`);
    }
  };

  const handleViewRecording = (classItem) => {
    if (classItem.recordingLink) {
      window.open(classItem.recordingLink, "_blank");
    } else {
      alert(`Opening recording for: ${classItem.course}`);
    }
  };

  const toggleDropdown = (e, classId) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === classId ? null : classId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Live Classes Management
              </h1>
              <p className="text-slate-400 text-sm mt-2 flex items-center flex-wrap gap-2">
                <Clock className="w-4 h-4" />
                Current time:{" "}
                {currentTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                <span className="hidden sm:inline">•</span>
                <span className="text-slate-500">
                  Manage your scheduled live classes
                </span>
              </p>
            </div>
            <button
              onClick={handleScheduleClass}
              className="w-full lg:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center group"
            >
              <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
              Schedule New Class
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Upcoming Classes</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {
                    liveClasses.filter((c) => getClassStatus(c) === "upcoming")
                      .length
                  }
                </p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Live Now</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {
                    liveClasses.filter((c) => getClassStatus(c) === "live")
                      .length
                  }
                </p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Play className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Students</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {liveClasses.reduce((sum, c) => sum + c.students, 0)}
                </p>
              </div>
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Classes List */}
        <div className="space-y-4">
          {liveClasses.map((classItem) => {
            const status = getClassStatus(classItem);
            const canJoin = canJoinClass(classItem);

            return (
              <div
                key={classItem.id}
                className={`bg-gradient-to-r rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:shadow-xl border ${
                  status === "live"
                    ? "from-green-500/10 to-emerald-500/10 border-green-500/30"
                    : "from-slate-700/50 to-slate-800/50 border-slate-600 hover:border-slate-500"
                }`}
              >
                <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                  {/* Left Section - Class Info */}
                  <div className="flex flex-col sm:flex-row items-start gap-4 flex-1 w-full">
                    {/* Date Badge */}
                    <div className="flex-shrink-0">
                      <div className="bg-slate-600 rounded-xl p-3 text-center min-w-20">
                        <Calendar className="w-6 h-6 text-blue-400 mx-auto mb-1" />
                        <div className="text-white font-bold text-lg">
                          {new Date(classItem.date).getDate()}
                        </div>
                        <div className="text-slate-400 text-xs uppercase">
                          {new Date(classItem.date).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                            }
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Class Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <div
                          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            status
                          )}`}
                        >
                          {getStatusIcon(status)}
                          {getStatusText(status)}
                        </div>
                        {status === "upcoming" && (
                          <span className="text-blue-400 text-xs font-medium">
                            {getTimeUntilClass(classItem)}
                          </span>
                        )}
                      </div>

                      <h4 className="font-bold text-white text-lg mb-2 line-clamp-1">
                        {classItem.course}
                      </h4>

                      <p className="text-slate-300 text-sm mb-3 line-clamp-2">
                        {classItem.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-slate-400 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{classItem.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{classItem.students} enrolled</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Video className="w-4 h-4" />
                          <span>
                            {classItem.meetingLink ? "Online" : "Offline"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Section - Actions */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                    {/* Primary Action Button */}
                    <button
                      onClick={() =>
                        status === "completed"
                          ? handleViewRecording(classItem)
                          : handleJoinClass(classItem)
                      }
                      disabled={status === "upcoming"}
                      className={`flex-1 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base ${
                        status === "live"
                          ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg transform hover:scale-105"
                          : status === "upcoming"
                          ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                      }`}
                    >
                      {status === "live"
                        ? "Join Now"
                        : status === "upcoming"
                        ? "Join Class"
                        : "View Recording"}
                    </button>

                    {/* Dropdown Menu */}
                    <div className="relative">
                      <button
                        onClick={(e) => toggleDropdown(e, classItem.id)}
                        className="p-2 hover:bg-slate-600 rounded-lg transition-colors w-10 h-10 flex items-center justify-center"
                      >
                        <MoreVertical className="w-5 h-5 text-slate-400" />
                      </button>

                      {activeDropdown === classItem.id && (
                        <div className="absolute right-0 top-12 bg-slate-700 border border-slate-600 rounded-xl shadow-2xl z-10 min-w-48">
                          <button
                            onClick={() => handleEditClass(classItem)}
                            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-slate-300 hover:bg-slate-600 first:rounded-t-xl last:rounded-b-xl transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                            Edit Class
                          </button>
                          <button
                            onClick={() => handleDeleteClass(classItem)}
                            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-400 hover:bg-slate-600 first:rounded-t-xl last:rounded-b-xl transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete Class
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {liveClasses.length === 0 && (
          <div className="text-center py-12 bg-slate-800/30 rounded-2xl border border-slate-700/30">
            <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Video className="w-8 h-8 text-slate-400" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">
              No Live Classes Scheduled
            </h4>
            <p className="text-slate-400 mb-6 max-w-sm mx-auto">
              Schedule your first live class to start engaging with your
              students in real-time
            </p>
            <button
              onClick={handleScheduleClass}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Schedule First Class
            </button>
          </div>
        )}

        {/* Schedule/Edit Class Modal */}
        {(showScheduleModal || showEditModal) && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-2xl p-4 sm:p-6 max-w-md w-full border border-slate-700 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">
                  {showScheduleModal
                    ? "Schedule Live Class"
                    : "Edit Live Class"}
                </h3>
                <button
                  onClick={() => {
                    setShowScheduleModal(false);
                    setShowEditModal(false);
                    setSelectedClass(null);
                  }}
                  className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-700 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={
                  showScheduleModal ? handleSubmitSchedule : handleSubmitEdit
                }
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    name="course"
                    value={newClassData.course}
                    onChange={handleInputChange}
                    placeholder="Enter course title"
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={newClassData.date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Start Time *
                    </label>
                    <input
                      type="time"
                      name="startTime"
                      value={newClassData.startTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      End Time *
                    </label>
                    <input
                      type="time"
                      name="endTime"
                      value={newClassData.endTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Meeting Link *
                  </label>
                  <input
                    type="url"
                    name="meetingLink"
                    value={newClassData.meetingLink}
                    onChange={handleInputChange}
                    placeholder="https://meet.google.com/abc-def-ghi"
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={newClassData.description}
                    onChange={handleInputChange}
                    placeholder="Add class description or notes"
                    rows="3"
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowScheduleModal(false);
                      setShowEditModal(false);
                      setSelectedClass(null);
                    }}
                    className="flex-1 px-6 py-3 border border-slate-600 text-slate-300 rounded-xl hover:bg-slate-700 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-medium transform hover:scale-105"
                  >
                    {showScheduleModal ? "Schedule Class" : "Update Class"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-2xl p-6 max-w-sm w-full border border-slate-700 shadow-2xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8 text-red-400" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  Delete Class
                </h3>
                <p className="text-slate-400 mb-6">
                  Are you sure you want to delete "{selectedClass?.course}"?
                  This action cannot be undone.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-6 py-3 border border-slate-600 text-slate-300 rounded-xl hover:bg-slate-700 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl hover:from-red-700 hover:to-pink-700 transition-all font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorLiveClasses;
