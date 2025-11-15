export const projectProgressData = [
  { name: "Week 1", progress: 20, completed: 5 },
  { name: "Week 2", progress: 35, completed: 8 },
  { name: "Week 3", progress: 55, completed: 14 },
  { name: "Week 4", progress: 75, completed: 18 },
  { name: "Week 5", progress: 90, completed: 22 },
];

export const contributionData = [
  { name: "You", value: 40 },
  { name: "Prabuddha", value: 30 },
  { name: "Sayan", value: 20 },
  { name: "Shriya", value: 10 },
];

export const COLORS = ["#7366F9", "#3B82F6", "#06B6D4", "#8B5CF6"];

export const projects = [
  {
    id: 1,
    name: "AI Chat Platform",
    status: "active",
    members: 4,
    progress: 75,
    dueDate: "2 weeks",
    tags: ["Python", "React", "ML"],
  },
  {
    id: 2,
    name: "Mobile Fitness App",
    status: "active",
    members: 3,
    progress: 55,
    dueDate: "3 weeks",
    tags: ["React Native", "Firebase"],
  },
  {
    id: 3,
    name: "Data Visualization Tool",
    status: "planning",
    members: 2,
    progress: 20,
    dueDate: "4 weeks",
    tags: ["D3.js", "Node.js"],
  },
];

export const recentActivity = [
  {
    type: "comment",
    user: "Pankaj Gupta",
    action: "commented on",
    target: "API Integration Task",
    time: "2 hours ago",
  },
  {
    type: "complete",
    user: "Oishi Dey",
    action: "completed",
    target: "Database Schema",
    time: "5 hours ago",
  },
  {
    type: "join",
    user: "Priyanka Das",
    action: "joined",
    target: "AI Chat Platform",
    time: "1 day ago",
  },
  {
    type: "update",
    user: "Soumili Banerjee",
    action: "updated",
    target: "Mobile App Design",
    time: "2 days ago",
  },
];

const dashboardData = {
  projectProgressData,
  contributionData,
  COLORS,
  projects,
  recentActivity,
};

export default dashboardData;
