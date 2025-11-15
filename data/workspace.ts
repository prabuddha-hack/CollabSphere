export const teamMembers = [
  { id: 1, name: "Prabuddha Datta", role: "LEADER", avatar: "👩‍💻" },
  { id: 2, name: "Soham Parekh", role: "DEVELOPER", avatar: "👨‍💼" },
  { id: 3, name: "Sayan Ghosh", role: "DESIGNER", avatar: "👩‍🎨" },
  { id: 4, name: "Shriya Banerjee", role: "DEVELOPER", avatar: "👨‍💻" },
  { id: 5, name: "Pankaj Gupta", role: "TESTER", avatar: "👨‍🔧" },
];

export const initialTasks = {
  todo: [
    {
      id: 1,
      title: "Design API Schema",
      assignee: "Prabuddha Datta",
      priority: "high",
      dueDate: "2025-11-18",
    },
    {
      id: 2,
      title: "Setup Database",
      assignee: "Soham Parekh",
      priority: "high",
      dueDate: "2025-11-17",
    },
    {
      id: 3,
      title: "Create UI Mockups",
      assignee: "Shriya Banerjee",
      priority: "medium",
      dueDate: "2025-11-16",
    },
  ],
  inProgress: [
    {
      id: 4,
      title: "Implement Authentication",
      assignee: "Soham Parekh",
      priority: "high",
      dueDate: "2025-11-17",
    },
    {
      id: 5,
      title: "Build API Endpoints",
      assignee: "Oishi Dey",
      priority: "high",
      dueDate: "2025-11-21",
    },
  ],
  review: [
    {
      id: 8,
      title: "Code Review - Auth Module",
      assignee: "Prabuddha Datta",
      priority: "high",
      dueDate: "2025-11-18",
    },
    {
      id: 9,
      title: "Design System Review",
      assignee: "Sayan Ghosh",
      priority: "medium",
      dueDate: "2025-11-19",
    },
  ],
  done: [
    {
      id: 6,
      title: "Project Setup",
      assignee: "Shriya Banerjee",
      priority: "medium",
      dueDate: "2025-11-16",
    },
    {
      id: 7,
      title: "Research Libraries",
      assignee: "Shriya Banerjee",
      priority: "low",
      dueDate: "2025-11-16",
    },
  ],
};

const workspaceData = {
  teamMembers,
  initialTasks,
};

export default workspaceData;
