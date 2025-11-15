export const allSkills = [
  "Python",
  "React",
  "Node.js",
  "UI/UX",
  "Data Science",
  "DevOps",
  "Mobile",
  "ML",
];

export const projectTypes = [
  "Web",
  "Mobile",
  "AI/ML",
  "Data Science",
  "Design",
];

export const opportunities = [
  {
    id: 1,
    name: "AI Recommendation Engine",
    type: "AI/ML",
    members: 4,
    skillsNeeded: ["Python", "Data Science", "ML"],
    status: "Looking for",
    roles: ["Data Scientist", "Backend Dev"],
    description:
      "Building a personalized recommendation system using machine learning.",
    deadline: "6 weeks",
    rating: 4.8,
  },
  {
    id: 2,
    name: "React Dashboard",
    type: "Web",
    members: 3,
    skillsNeeded: ["React", "Node.js", "UI/UX"],
    status: "Open positions",
    roles: ["Frontend Dev", "UI Designer"],
    description:
      "Creating a comprehensive analytics dashboard for enterprise clients.",
    deadline: "4 weeks",
    rating: 4.6,
  },
  {
    id: 3,
    name: "Mobile Fitness App",
    type: "Mobile",
    members: 2,
    skillsNeeded: ["React Native", "Mobile"],
    status: "Looking for",
    roles: ["Mobile Dev"],
    description: "Cross-platform fitness tracking app with social features.",
    deadline: "8 weeks",
    rating: 4.7,
  },
  {
    id: 4,
    name: "DevOps & Cloud Infrastructure",
    type: "DevOps",
    members: 2,
    skillsNeeded: ["DevOps", "Node.js"],
    status: "Open positions",
    roles: ["DevOps Engineer", "Backend Dev"],
    description:
      "Setting up scalable cloud infrastructure and CI/CD pipelines.",
    deadline: "3 weeks",
    rating: 4.5,
  },
  {
    id: 5,
    name: "Data Visualization Platform",
    type: "Data Science",
    members: 3,
    skillsNeeded: ["Python", "Data Science", "React"],
    status: "Looking for",
    roles: ["Data Analyst", "Frontend Dev"],
    description: "Interactive platform for visualizing complex datasets.",
    deadline: "5 weeks",
    rating: 4.9,
  },
  {
    id: 6,
    name: "Design System Project",
    type: "Design",
    members: 1,
    skillsNeeded: ["UI/UX", "React"],
    status: "Open positions",
    roles: ["UI Designer", "Frontend Dev"],
    description:
      "Building a comprehensive design system for multiple products.",
    deadline: "7 weeks",
    rating: 4.4,
  },
];

const exploreData = {
  allSkills,
  projectTypes,
  opportunities,
};

export default exploreData;
