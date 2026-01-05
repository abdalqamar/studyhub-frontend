import React, { useState, useEffect } from "react";
import {
  Clock,
  Trophy,
  Target,
  BookOpen,
  CheckCircle,
  XCircle,
  Play,
  RotateCcw,
} from "lucide-react";

const QuizDashboard = ({ userStats, recentQuizzes }) => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Quiz Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Quizzes</p>
                <p className="text-2xl font-bold text-gray-800">
                  {userStats?.totalQuizzesTaken || 0}
                </p>
              </div>
              <BookOpen className="text-blue-500" size={24} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Passed</p>
                <p className="text-2xl font-bold text-gray-800">
                  {userStats?.totalQuizzesPassed || 0}
                </p>
              </div>
              <CheckCircle className="text-green-500" size={24} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-gray-800">
                  {userStats?.averageScore?.toFixed(1) || 0}%
                </p>
              </div>
              <Target className="text-yellow-500" size={24} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Best Score</p>
                <p className="text-2xl font-bold text-gray-800">
                  {userStats?.bestScore || 0}%
                </p>
              </div>
              <Trophy className="text-purple-500" size={24} />
            </div>
          </div>
        </div>

        {/* Recent Quizzes */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Quiz Results</h2>
          <div className="space-y-4">
            {recentQuizzes?.map((quiz, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-2 rounded-full ${
                      quiz.isPassed ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {quiz.isPassed ? (
                      <CheckCircle className="text-green-600" size={20} />
                    ) : (
                      <XCircle className="text-red-600" size={20} />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{quiz.title}</h3>
                    <p className="text-sm text-gray-600">
                      Attempted on{" "}
                      {new Date(quiz.attemptedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lg">{quiz.percentage}%</p>
                  <p className="text-sm text-gray-600">
                    {quiz.totalAttempts} attempts
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const QuizInterface = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const quizData = {
    title: "JavaScript Fundamentals",
    description: "Test your JavaScript knowledge",
    timeLimit: 30,
    totalQuestions: 5,
    questions: [
      {
        id: 1,
        questionText:
          "What is the correct way to declare a variable in JavaScript?",
        options: [
          { id: "a", text: "var x = 5;", isCorrect: true },
          { id: "b", text: "variable x = 5;", isCorrect: false },
          { id: "c", text: "v x = 5;", isCorrect: false },
          { id: "d", text: "declare x = 5;", isCorrect: false },
        ],
        marks: 2,
      },
      {
        id: 2,
        questionText:
          "Which method is used to add an element to the end of an array?",
        options: [
          { id: "a", text: "push()", isCorrect: true },
          { id: "b", text: "add()", isCorrect: false },
          { id: "c", text: "append()", isCorrect: false },
          { id: "d", text: "insert()", isCorrect: false },
        ],
        marks: 2,
      },
    ],
  };

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted]);

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleAnswerSelect = (questionId, answerId) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    // Submit logic here
  };

  const question = quizData.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {quizData.title}
              </h1>
              <p className="text-gray-600">
                Question {currentQuestion + 1} of {quizData.totalQuestions}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock size={20} className="text-red-500" />
                <span className="text-lg font-mono text-red-500">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    ((currentQuestion + 1) / quizData.totalQuestions) * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="mb-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Q{currentQuestion + 1}. {question.questionText}
              </h2>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {question.marks} marks
              </span>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map(option => (
              <label
                key={option.id}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${
                  selectedAnswers[question.id] === option.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option.id}
                  checked={selectedAnswers[question.id] === option.id}
                  onChange={() => handleAnswerSelect(question.id, option.id)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                    selectedAnswers[question.id] === option.id
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  {selectedAnswers[question.id] === option.id && (
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  )}
                </div>
                <span className="text-gray-700">{option.text}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition-colors"
          >
            Previous
          </button>

          <div className="flex space-x-3">
            {currentQuestion === quizData.totalQuestions - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={() =>
                  setCurrentQuestion(
                    Math.min(quizData.totalQuestions - 1, currentQuestion + 1)
                  )
                }
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </div>

        {/* Question Navigation */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h3 className="font-medium text-gray-800 mb-4">
            Question Navigation
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {quizData.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                  index === currentQuestion
                    ? "bg-blue-600 text-white"
                    : selectedAnswers[quizData.questions[index].id]
                    ? "bg-green-100 text-green-800 border border-green-300"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Quiz Results Component
const QuizResults = ({ result }) => {
  const sampleResult = {
    title: "JavaScript Fundamentals Quiz",
    totalQuestions: 5,
    correctAnswers: 4,
    totalMarks: 10,
    obtainedMarks: 8,
    percentage: 80,
    isPassed: true,
    passingScore: 70,
    timeTaken: "12:45",
    attemptNumber: 1,
    feedback: "Good performance! Focus more on array methods.",
  };

  const resultData = result || sampleResult;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div
              className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
                resultData.isPassed ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {resultData.isPassed ? (
                <Trophy className="text-green-600" size={32} />
              ) : (
                <XCircle className="text-red-600" size={32} />
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {resultData.isPassed
                ? "Congratulations!"
                : "Better Luck Next Time"}
            </h1>
            <p className="text-gray-600">{resultData.title}</p>
          </div>

          {/* Score Display */}
          <div className="text-center mb-8">
            <div
              className={`text-6xl font-bold mb-2 ${
                resultData.isPassed ? "text-green-600" : "text-red-600"
              }`}
            >
              {resultData.percentage}%
            </div>
            <p className="text-gray-600">
              {resultData.obtainedMarks} out of {resultData.totalMarks} marks
            </p>
          </div>

          {/* Detailed Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-lg mb-2">
                <Target className="text-blue-600 mx-auto" size={24} />
              </div>
              <p className="text-sm text-gray-600">Correct Answers</p>
              <p className="text-xl font-bold">
                {resultData.correctAnswers}/{resultData.totalQuestions}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-lg mb-2">
                <Clock className="text-purple-600 mx-auto" size={24} />
              </div>
              <p className="text-sm text-gray-600">Time Taken</p>
              <p className="text-xl font-bold">{resultData.timeTaken}</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 p-4 rounded-lg mb-2">
                <RotateCcw className="text-yellow-600 mx-auto" size={24} />
              </div>
              <p className="text-sm text-gray-600">Attempt</p>
              <p className="text-xl font-bold">#{resultData.attemptNumber}</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-lg mb-2">
                <CheckCircle className="text-green-600 mx-auto" size={24} />
              </div>
              <p className="text-sm text-gray-600">Passing Score</p>
              <p className="text-xl font-bold">{resultData.passingScore}%</p>
            </div>
          </div>

          {/* Feedback */}
          {resultData.feedback && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-medium text-blue-800 mb-2">
                Instructor Feedback
              </h3>
              <p className="text-blue-700">{resultData.feedback}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-center space-x-4">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              View Detailed Results
            </button>
            <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component showing all three views
const App = () => {
  const [currentView, setCurrentView] = useState("dashboard");

  const userStats = {
    totalQuizzesTaken: 15,
    totalQuizzesPassed: 12,
    averageScore: 78.5,
    bestScore: 95,
  };

  const recentQuizzes = [
    {
      title: "JavaScript Fundamentals",
      percentage: 85,
      isPassed: true,
      attemptedAt: "2024-01-15",
      totalAttempts: 1,
    },
    {
      title: "React Basics",
      percentage: 65,
      isPassed: false,
      attemptedAt: "2024-01-10",
      totalAttempts: 2,
    },
  ];

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <QuizDashboard userStats={userStats} recentQuizzes={recentQuizzes} />
        );
      case "quiz":
        return <QuizInterface />;
      case "results":
        return <QuizResults />;
      default:
        return (
          <QuizDashboard userStats={userStats} recentQuizzes={recentQuizzes} />
        );
    }
  };

  return (
    <div>
      {/* Navigation */}
      <nav className="bg-white shadow-md p-4">
        <div className="max-w-6xl mx-auto flex space-x-6">
          <button
            onClick={() => setCurrentView("dashboard")}
            className={`px-4 py-2 rounded ${
              currentView === "dashboard"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setCurrentView("quiz")}
            className={`px-4 py-2 rounded ${
              currentView === "quiz"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600"
            }`}
          >
            Take Quiz
          </button>
          <button
            onClick={() => setCurrentView("results")}
            className={`px-4 py-2 rounded ${
              currentView === "results"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600"
            }`}
          >
            Results
          </button>
        </div>
      </nav>

      {renderView()}
    </div>
  );
};

export default App;
