import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { profileKeys } from "@/lib/queryKeys";
import type { Course } from "@/types";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { OrbitLoader } from "@/shared/components/OrbitLoader";

const MAX_ATTEMPTS = 10;

interface LocationState {
  courseId?: string;
}

function PaymentProcessing() {
  const navigate = useNavigate();
  const location = useLocation();
  const courseId = (location.state as LocationState | null)?.courseId;

  const attemptsRef = useRef(0);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    if (!courseId) navigate("/student/my-courses");
  }, [courseId, navigate]);

  const { data: enrolledCourses } = useQuery<Course[]>({
    queryKey: profileKeys.enrolledCourses(),
    queryFn: async () => {
      const res = await axiosInstance.get(
        API_ENDPOINTS.PROFILE_ENROLLED_COURSES
      );
      return res.data.courses;
    },
    refetchInterval: timedOut ? false : 2000,
    enabled: !!courseId,
  });

  useEffect(() => {
    if (!enrolledCourses) return;

    const found = enrolledCourses.some((c) => c._id === courseId);
    if (found) {
      navigate("/student/my-courses");
      return;
    }

    attemptsRef.current += 1;
    if (attemptsRef.current >= MAX_ATTEMPTS) setTimedOut(true);
  }, [enrolledCourses]);

  if (timedOut) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg text-center px-4 gap-4">
        <h2 className="text-xl font-semibold text-text-1">
          Payment mil gaya, enrollment thodi der lag rahi hai
        </h2>
        <p className="text-text-3 text-sm max-w-md">
          Aapka payment successful hai. Enrollment reflect hone mein thoda time
          lag sakta hai. Agar 5 minute mein bhi na dikhe, support se contact
          karein.
        </p>
        <button
          onClick={() => navigate("/student/my-courses")}
          className="bg-gold text-bg px-5 py-2 rounded-xl font-medium"
        >
          My courses dekhein
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-bg">
      <OrbitLoader text="Payment confirm ho raha hai, ruko thoda..." />
    </div>
  );
}

export default PaymentProcessing;
