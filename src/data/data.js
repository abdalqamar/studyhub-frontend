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
  BarChart3,
  NotebookPen,
  CirclePlus,
  Video,
  Bell,
  CreditCard,
  Heart,
  UsersRound,
  HelpCircle,
} from "lucide-react";

const partners = [
  { name: "Google", logo: "/logos/google.svg" },
  { name: "Amazon", logo: "/logos/amazon.svg" },
  { name: "Apple", logo: "/logos/apple.svg" },
  { name: "Microsoft", logo: "/logos/microsoft.svg" },
  { name: "Meta", logo: "/logos/meta.svg" },
  { name: "Netflix", logo: "/logos/netflix.svg" },
  { name: "NVIDIA", logo: "/logos/nvidia.svg" },
  { name: "Oracle", logo: "/logos/oracle.svg" },
  { name: "Spotify", logo: "/logos/spotify.svg" },
  { name: "DMS", logo: "/logos/dms.svg" },
  { name: "IBM", logo: "/logos/ibm.svg" },
  { name: "Adobe", logo: "/logos/adobe.svg" },
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
    name: "Manage Students",
    path: "/instructor/manage-students",
    icon: Users,
    type: "instructor",
  },
  {
    id: 13,
    name: "Live Classes",
    path: "/instructor/live-classes",
    icon: Video,
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
    path: "/admin/users",
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
    name: "Settings",
    path: "/admin/settings",
    icon: Settings,
    type: "admin",
  },
  {
    id: 23,
    name: "Notifications",
    path: "/admin/notifications",
    icon: Bell,
    type: "admin",
  },
  {
    id: 24,
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

const faqData = [
  {
    id: 1,
    title: "Getting Started",
    questions: [
      {
        q: "How do I create an account?",
        a: "Click the 'Sign Up' button at the top right corner. Enter your email, create a password, and follow the verification steps. It's completely free to create a student account!",
      },
      {
        q: "Is the platform free to use?",
        a: "Yes! Creating an account is completely free. You can browse courses, and many instructors offer free courses. Paid courses have clear pricing displayed before purchase.",
      },
      {
        q: "Can I use the platform on my phone?",
        a: "Absolutely! Our platform works perfectly on phones, tablets, and computers. You can download our mobile app from the App Store or Google Play.",
      },
      {
        q: "How do I find courses that interest me?",
        a: "Use the search bar or browse categories on the homepage. You can filter by topic, difficulty level, price (free or paid), and instructor ratings.",
      },
      {
        q: "What do I need to start learning?",
        a: "Just a device (phone, tablet, or computer) with internet access. No special software needed - everything runs in your browser or through our app.",
      },
    ],
  },
  {
    id: 2,
    title: "Account & Profile",
    questions: [
      {
        q: "How do I change my password?",
        a: "Go to 'Account Settings' → 'Security' → 'Change Password'. Enter your current password, then create a new one. Remember to save your changes!",
      },
      {
        q: "Can I update my email address?",
        a: "Yes! Go to 'Account Settings' → 'Profile' → 'Email Address'. You'll need to verify your new email address before it becomes active.",
      },
      {
        q: "How do I delete my account?",
        a: "Go to 'Account Settings' → 'Advanced' → 'Delete Account'. Please note: this action is permanent and cannot be undone. All your course progress and certificates will be lost.",
      },
      {
        q: "What if I forget my password?",
        a: "Click 'Forgot Password' on the login page. Enter your email address, and we'll send you a link to reset your password. Check your spam folder if you don't see the email.",
      },
      {
        q: "Can I have multiple accounts?",
        a: "No, each person should have only one account. Multiple accounts may be considered a violation of our terms of service and could result in account suspension.",
      },
    ],
  },
  {
    id: 3,
    title: "Courses & Learning",
    questions: [
      {
        q: "How do I enroll in a course?",
        a: "Browse to the course you want, click the 'Enroll' button. For free courses, you'll get immediate access. For paid courses, you'll proceed to checkout.",
      },
      {
        q: "Can I take multiple courses at once?",
        a: "Yes! You can enroll in as many courses as you like and learn at your own pace. Your progress is saved separately for each course.",
      },
      {
        q: "How long do I have access to a course?",
        a: "Once enrolled, you have lifetime access to the course content. You can review materials anytime, even after completion.",
      },
      {
        q: "Can I download course videos?",
        a: "Most videos are streaming-only for copyright protection. However, some instructors may offer downloadable resources. Look for the download icon next to individual lessons.",
      },
      {
        q: "What if I don't like a course?",
        a: "We offer a 30-day money-back guarantee for paid courses if they don't meet your expectations. Contact support within 30 days of purchase for a refund.",
      },
    ],
  },
  {
    id: 4,
    title: "Payments & Billing",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept credit/debit cards (Visa, MasterCard, American Express), PayPal, and in some regions, mobile payment options and bank transfers.",
      },
      {
        q: "How do I know if a course is paid or free?",
        a: "Free courses have a 'FREE' badge and a 'Enroll for Free' button. Paid courses show the price and a 'Buy Now' button.",
      },
      {
        q: "Can I get a refund?",
        a: "Yes! We offer a 30-day refund policy for all paid courses. Contact our support team with your purchase details for assistance.",
      },
      {
        q: "Will I be billed monthly?",
        a: "No, courses are one-time purchases unless specified as a subscription. You pay once and get lifetime access with no recurring charges.",
      },
      {
        q: "How do I view my purchase history?",
        a: "Go to 'Account' → 'Purchase History'. Here you'll see all your course purchases, dates, and amounts paid.",
      },
    ],
  },
  {
    id: 5,
    title: "Certificates",
    questions: [
      {
        q: "How do I get my certificate?",
        a: "Complete all required lessons and pass any required quizzes/exams. Once you finish, your certificate will be available in your 'Achievements' section.",
      },
      {
        q: "Are certificates downloadable?",
        a: "Yes! You can download your certificate as a PDF or share it directly to LinkedIn from your account dashboard.",
      },
      {
        q: "Do certificates expire?",
        a: "No, your certificates never expire. They remain in your account forever as proof of your accomplishment.",
      },
      {
        q: "Can I share my certificate on social media?",
        a: "Absolutely! Click the 'Share' button on your certificate to post it to LinkedIn, Twitter, Facebook, or copy a shareable link.",
      },
      {
        q: "What if I lose my certificate?",
        a: "No problem! All your certificates are stored securely in your account. You can download them again anytime from your 'Achievements' section.",
      },
    ],
  },
  {
    id: 6,
    title: "Instructors / Teaching on the Platform",
    questions: [
      {
        q: "How do I become an instructor?",
        a: "Click 'Teach on [Platform Name]' at the top of the page, or go to your account settings and select 'Become an Instructor'. Follow the application process.",
      },
      {
        q: "How do I create a course?",
        a: "After becoming an instructor, go to your instructor dashboard and click 'Create New Course'. Our step-by-step guide will help you through the process.",
      },
      {
        q: "How do I get paid?",
        a: "We handle all payments and pay instructors monthly. Set up your payment method in your instructor settings. Payments are sent around the 15th of each month.",
      },
      {
        q: "Can I offer my course for free?",
        a: "Yes! You can choose to make your course free or paid. For paid courses, you set the price within our pricing guidelines.",
      },
      {
        q: "How much control do I have over my course?",
        a: "You have full control over your course content, pricing (within guidelines), and can update it anytime. You also decide when to publish or unpublish.",
      },
    ],
  },
  {
    id: 7,
    title: "Technical Issues",
    questions: [
      {
        q: "What if videos won't load?",
        a: "First, check your internet connection. Try refreshing the page or clearing your browser cache. If issues persist, try a different browser or contact support.",
      },
      {
        q: "What are the system requirements?",
        a: "Any modern browser (Chrome, Firefox, Safari, Edge) and a stable internet connection. For best experience, use the latest browser version.",
      },
      {
        q: "How do I clear my browser cache?",
        a: "In your browser settings, find 'Privacy' or 'History' section, then select 'Clear Browsing Data'. Make sure to select 'Cached images and files'.",
      },
      {
        q: "What if I can't log in?",
        a: "First, ensure you're using the correct email and password. Try the 'Forgot Password' option. If still having issues, clear your browser cache or try a different browser.",
      },
      {
        q: "The app keeps crashing. What should I do?",
        a: "Update to the latest app version, restart your device, or reinstall the app. If problems continue, contact support with your device model and OS version.",
      },
    ],
  },
  {
    id: 8,
    title: "Support & Contact",
    questions: [
      {
        q: "How do I contact support?",
        a: "Click the 'Help' or 'Support' link at the bottom of any page, or email support@yourplatform.com. We typically respond within 24 hours.",
      },
      {
        q: "What information should I include when contacting support?",
        a: "Include your account email, a clear description of the issue, steps to reproduce it, and any screenshots or error messages you're seeing.",
      },
      {
        q: "What are your support hours?",
        a: "Our support team is available Monday-Friday, 9 AM to 6 PM (your local time). We aim to respond to all inquiries within 24 hours.",
      },
      {
        q: "Is there a community forum?",
        a: "Yes! Visit our Community Forum from the main menu. Connect with other learners, ask questions, and share your learning journey.",
      },
      {
        q: "Can I suggest new features?",
        a: "Absolutely! We love hearing from our users. Use the 'Feedback' button or visit our Community Forum's 'Suggestions' section.",
      },
    ],
  },
];

const termsSections = [
  { id: "acceptance", title: "1. Acceptance of Terms" },
  { id: "eligibility", title: "2. Eligibility" },
  { id: "user-accounts", title: "3. User Accounts" },
  {
    id: "instructor-accounts",
    title: "4. Instructor Accounts & Responsibilities",
  },
  { id: "course-access", title: "5. Course Access & Usage" },
  { id: "payments", title: "6. Payments, Pricing & Taxes" },
  { id: "refund-policy", title: "7. Refund & Cancellation Policy" },
  { id: "intellectual-property", title: "8. Intellectual Property Rights" },
  { id: "user-content", title: "9. User-Generated Content" },
  { id: "prohibited-activities", title: "10. Prohibited Activities" },
  { id: "termination", title: "11. Termination & Suspension of Accounts" },
  { id: "warranties", title: "12. Disclaimer of Warranties" },
  { id: "liability", title: "13. Limitation of Liability" },
  { id: "indemnification", title: "14. Indemnification" },
  { id: "governing-law", title: "15. Governing Law & Jurisdiction" },
  { id: "changes", title: "16. Changes to Terms" },
  { id: "contact", title: "17. Contact Information" },
];

export {
  statsData,
  partners,
  features,
  instructors,
  dashboardLinks,
  testimonials,
  faqData,
  termsSections,
};
