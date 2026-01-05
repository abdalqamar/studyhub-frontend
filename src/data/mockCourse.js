export const mockCourses = [
  {
    _id: "69215b984ce208d1ae4e4515",
    courseName: "Advanced React Patterns",
    courseDescription:
      "Master advanced React concepts including hooks, context, and performance optimization.",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=1200&h=600&fit=crop",
    totalDuration: "24 hrs",
    progressPercentage: 75,
    totalDuration: "18 hrs",
    courseContent: [
      {
        _id: "section1",
        sectionName: "Introduction to Web Development",
        description: "Basics of how web works.",
        lesson: [
          {
            _id: "lesson1",
            title: "What is Web Development?",
            duration: 10,
            description:
              "Understanding web, frontend, backend and how websites work.",
            videoUrl:
              "https://res.cloudinary.com/du7xquzsm/video/upload/v1763637085/StudyHub/aaert2o6ahcudyc3scjn.mp4",
            publicId: "publicId_001",
          },
          {
            _id: "lesson2",
            title: "How the Internet Works",
            duration: 12,
            description: "Overview of browser, server, DNS, hosting.",
            videoUrl:
              "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
            publicId: "publicId_002",
          },
        ],
      },

      {
        _id: "section2",
        sectionName: "HTML Basics",
        description: "Learn HTML fundamentals.",
        lesson: [
          {
            _id: "lesson3",
            title: "HTML Tags",
            duration: 15,
            description: "Learn the most important HTML tags and their usage.",
            videoUrl:
              "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
            publicId: "publicId_003",
          },
          {
            _id: "lesson4",
            title: "Forms & Inputs",
            duration: 18,
            description:
              "Understanding forms, inputs, labels and their attributes.",
            videoUrl:
              "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
            publicId: "publicId_004",
          },
        ],
      },

      {
        _id: "section3",
        sectionName: "CSS Fundamentals",
        description: "Styling the web using CSS.",
        lesson: [
          {
            _id: "lesson5",
            title: "Selectors & Styling",
            duration: 20,
            description: "How CSS selectors work and how to apply style.",
            videoUrl:
              "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
            publicId: "publicId_005",
          },
          {
            _id: "lesson6",
            title: "Flexbox & Layout",
            duration: 25,
            description: "Modern layout system using flexbox.",
            videoUrl:
              "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
            publicId: "publicId_006",
          },
        ],
      },
      {
        _id: "section4",
        sectionName: "CSS Fundamentals",
        description: "Styling the web using CSS.",
        lesson: [
          {
            _id: "lesson6",
            title: "Selectors & Styling",
            duration: 20,
            description: "How CSS selectors work and how to apply style.",
            videoUrl:
              "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
            publicId: "publicId_005",
          },
          {
            _id: "lesson7",
            title: "Flexbox & Layout",
            duration: 25,
            description: "Modern layout system using flexbox.",
            videoUrl:
              "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
            publicId: "publicId_006",
          },
        ],
      },
      {
        _id: "section5",
        sectionName: "CSS Fundamentals",
        description: "Styling the web using CSS.",
        lesson: [
          {
            _id: "lesson6",
            title: "Selectors & Styling",
            duration: 20,
            description: "How CSS selectors work and how to apply style.",
            videoUrl:
              "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
            publicId: "publicId_005",
          },
          {
            _id: "lesson7",
            title: "Flexbox & Layout",
            duration: 25,
            description: "Modern layout system using flexbox.",
            videoUrl:
              "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
            publicId: "publicId_006",
          },
        ],
      },
    ],

    // Optional for your Player logic
    completedVideos: ["lesson1", "lesson3"],
  },
];
