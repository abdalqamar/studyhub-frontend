import {
  BookOpen,
  Users,
  Trophy,
  Target,
  Rocket,
  Briefcase,
  DollarSign,
  TrendingUp,
  Settings,
  FileText,
  GraduationCap,
  BarChart3,
  NotebookPen,
  CirclePlus,
  Video,
  Bell,
  CreditCard,
  Heart,
  LifeBuoy,
  UsersRound,
  HelpCircle,
} from "lucide-react";

const partners = [
  {
    name: "Google",
    logo: "https://logo.clearbit.com/google.com",
  },
  {
    name: "Microsoft",
    logo: "https://logo.clearbit.com/microsoft.com",
  },
  {
    name: "Amazon",
    logo: "https://logo.clearbit.com/amazon.com",
  },
  {
    name: "Meta",
    logo: "https://logo.clearbit.com/meta.com",
  },
  {
    name: "Apple",
    logo: "https://logo.clearbit.com/apple.com",
  },
  {
    name: "Netflix",
    logo: "https://logo.clearbit.com/netflix.com",
  },
  {
    name: "Tesla",
    logo: "https://logo.clearbit.com/tesla.com",
  },
  {
    name: "Spotify",
    logo: "https://logo.clearbit.com/spotify.com",
  },
  {
    name: "Oracle",
    logo: "https://logo.clearbit.com/oracle.com",
  },
  {
    name: "Nvidia",
    logo: "https://logo.clearbit.com/nvidia.com",
  },
  {
    name: "Salesforce",
    logo: "https://logo.clearbit.com/salesforce.com",
  },
  {
    name: "Intel",
    logo: "https://logo.clearbit.com/intel.com",
  },
];

const statsData = [
  {
    id: 1,
    icon: BookOpen,
    number: "120+",
    label: "Expert Courses",
    delay: 0,
  },
  {
    id: 2,
    icon: Users,
    number: "50K+",
    label: "Active Learners",
    delay: 200,
  },
  {
    id: 3,
    icon: Trophy,
    number: "15K+",
    label: "Certificates Earned",
    delay: 400,
  },
  {
    id: 4,
    icon: Target,
    number: "89%",
    label: "Job Success Rate",
    delay: 600,
  },
];

const features = [
  {
    icon: Target,
    title: "Beginner-Friendly",
    desc: "Step-by-step courses designed for absolute beginners to kickstart their coding journey.",
  },
  {
    icon: Rocket,
    title: "Advanced Concepts",
    desc: "Deep dive into advanced topics and frameworks to level up your skills.",
  },
  {
    icon: Briefcase,
    title: "Real-World Projects",
    desc: "Learn by building real-world projects and gain hands-on experience.",
  },
  {
    icon: DollarSign,
    title: "Affordable Pricing",
    desc: "Access premium courses at prices tailored for students and professionals.",
  },
  {
    icon: BookOpen,
    title: "Comprehensive Resources",
    desc: "Gain access to templates, documentation, and code snippets to enhance learning.",
  },
  {
    icon: TrendingUp,
    title: "Industry Insights",
    desc: "Stay updated with the latest trends and insights from the tech industry.",
  },
];

const instructors = [
  {
    name: "Abdal Qamar",
    title: "Founder - StudyHub, Ex-Amazon, Ex-Microsoft",
    image:
      "https://res.cloudinary.com/du7xquzsm/image/upload/v1764320764/Abdal_Instructor_lkrvjh.png",
    description:
      "Abdal Qamar is a Software Engineer , primarily known for his Coding and Software Engineering skills. He is quite a popular figure among students as well as working professionals on various social media platforms, his  LinkedIn profiles amassing almost",
    students: "500k+ students",
    education:
      "He's also mentored students so far. He has done his B.Tech (IT) from the Netaji Subhash Institute of Technology (NSIT), Delhi, and worked in",
    companies: ["Amazon", "Microsoft"],
  },
  {
    name: "Ishtiyaque Ahmad",
    title: "Co-Founder - StudyHub, Senior Software Engineer, Ex-Google",
    image:
      "https://res.cloudinary.com/du7xquzsm/image/upload/v1764321095/ishtiyague_ac92ui.png",
    description:
      "Ishtiyage Ahmad is an experienced software engineer specializing in System Design and competitive programming. With years of experience at top tech companies, he brings real-world insights to teaching.",
    students: "300k+ students",
    education:
      "He has mentored thousands of students and helped them crack interviews at FAANG companies. IIT Delhi graduate with expertise in",
    companies: ["Google", "Meta"],
  },
];

const dashboardLinks = [
  //  Student Links

  {
    id: 1,
    name: "Dashboard",
    path: "/student",
    icon: BarChart3,
    type: "student",
  },

  //  My Courses
  {
    id: 2,
    name: "My Courses",
    path: "/student/my-courses",
    icon: BookOpen,
    type: "student",
  },

  // Assignments
  {
    id: 3,
    name: "Assignments",
    path: "/student/assignments",
    icon: NotebookPen,
    type: "student",
  },

  //  Live Classes
  {
    id: 4,
    name: "Live Classes",
    path: "/student/live-classes",
    icon: Video,
    type: "student",
  },

  {
    id: 5,
    name: "Wishlist",
    path: "/student/wishlist",
    icon: Heart,
    type: "student",
  },

  {
    id: 6,
    name: "Community",
    path: "/student/community",
    icon: UsersRound,
    type: "student",
  },

  {
    id: 7,
    name: "Help & Support",
    path: "/student/support",
    icon: HelpCircle,
    type: "student",
  },

  {
    id: 8,
    name: "Notifications",
    path: "/student/notifications",
    icon: Bell,
    type: "student",
  },

  //  My Profile
  {
    id: 9,
    name: "My Profile",
    path: "/student/profile",
    icon: Users,
    type: "student",
  },

  //  Instructor Links

  {
    id: 9,
    name: "Dashboard",
    path: "/instructor",
    icon: BarChart3,
    type: "instructor",
  },
  {
    id: 10,
    name: "Add Course",
    path: "/instructor/add-course",
    icon: CirclePlus,
    type: "instructor",
  },
  {
    id: 11,
    name: "Manage Courses",
    path: "/instructor/manage-courses",
    icon: BookOpen,
    type: "instructor",
  },
  {
    id: 12,
    name: "Live Classes",
    path: "/instructor/live-classes",
    icon: Video,
    type: "instructor",
  },
  {
    id: 13,
    name: "Manage Students",
    path: "/instructor/manage-students",
    icon: Users,
    type: "instructor",
  },
  {
    id: 14,
    name: "Earnings",
    path: "/instructor/earnings",
    icon: CreditCard,
    type: "instructor",
  },
  {
    id: 15,
    name: "Notifications",
    path: "/instructor/notifications",
    icon: Bell,
    type: "instructor",
  },
  {
    id: 16,
    name: "My Profile",
    path: "/instructor/profile",
    icon: Users,
    type: "instructor",
  },

  //  Admin Links

  {
    id: 17,
    name: "Dashboard",
    path: "/admin",
    icon: BarChart3,
    type: "admin",
  },
  {
    id: 18,
    name: "Manage Users",
    path: "/admin/manage-users",
    icon: Users,
    type: "admin",
  },
  {
    id: 19,
    name: "Courses",
    path: "/admin/courses",
    icon: BookOpen,
    type: "admin",
  },

  {
    id: 21,
    name: "Payments",
    path: "/admin/transactions",
    icon: CreditCard,
    type: "admin",
  },
  {
    id: 22,
    name: "Reports",
    path: "/admin/reports",
    icon: FileText,
    type: "admin",
  },
  {
    id: 23,
    name: "Settings",
    path: "/admin/settings",
    icon: Settings,
    type: "admin",
  },
  {
    id: 24,
    name: "Notifications",
    path: "/admin/notifications",
    icon: Bell,
    type: "admin",
  },
  {
    id: 25,
    name: "My Profile",
    path: "/admin/profile",
    icon: Users,
    type: "admin",
  },
];

const testimonials = [
  {
    name: "Vedant Jain",
    role: "Final year student",
    avatar: "VJ",
    text: "I've tried understanding DSA many times earlier through different resources, but Supreme batch really stood out on the top. The way and quality of teaching is unmatched.",
  },
  {
    name: "Avi Juneja",
    role: "BCE Intern",
    avatar: "AJ",
    text: "I have been following Babbar bhaiya from my first year of College. I belong to ECE branch and had no one to guide me for my future. Babbar Bhaiya's achievements from Amazon to Microsoft and now Codehelp, motivated me to achieve my goals and I was able to crack 2 offers of 10+LPA CTC.",
  },
  {
    name: "Anshika Aggarwal",
    role: "I.S YOE at MTS",
    avatar: "AA",
    text: "When I started this course I was not at all confident in DSA but now I feel so confident and literally I want to say thanks to Love Bhaiya and Lakshay bhaiya from bottom of heart. Thank you so much for sharing so much of knowledge with us.",
  },
  {
    name: "Rishi Kant",
    role: "BBA Student",
    avatar: "RK",
    text: "This was the best. course I ever completed. You won't believe I'm graduating from BBA, but his teaching made me start loving coding. Now just because of this course I am looking for a job in IT.",
  },
  {
    name: "Raj Shrivastava",
    role: "Assistant System Engineer at TCS",
    avatar: "RS",
    text: "Codehelp played a very important role during my placement session. All the lectures of placement related subjects like DSA, OS, DBMS were available there.",
  },
  {
    name: "Bhavya Bhatla",
    role: "Student",
    avatar: "BB",
    text: "This course is beginner friendly starting from basics of C++ to advanced concepts such as Graphs and DP. Before this course, I was very much afraid of DP but the rules taught here can be used on most of the DP problems.",
  },
  {
    name: "Chirag Arora",
    role: "Student",
    avatar: "CA",
    text: "Best DSA paid Course one could ever come across online. Affordable but got delivered more than that what it costed. Variety of question too notch Definitely better than those costing 20-25 K.",
  },
  {
    name: "Anuj Thakur",
    role: "Data Analyst at Scaler by InterviewBit",
    avatar: "AT",
    text: "I watched the whole DSA and DBMS course by CodeHelp which helped me a lot in improving my problem solving skills. This helped me understand the core concepts of Databases and hence got me placed.",
  },
  {
    name: "Rohan Kumar Sah",
    role: "Software Engineer at Bosch",
    avatar: "RKS",
    text: "CodeHelp groomed me from being a beginner in DSA to a proficient level in which I was able to sit in various competitive exams and succeed amongst thousands of candidates.",
  },
];

export {
  statsData,
  partners,
  features,
  instructors,
  dashboardLinks,
  testimonials,
};
