export type ProjectStatus = "ACTIVE" | "ARCHIVED" | "COMPLETED";
export type TaskStatus = "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE";
export type TeamRole =
  | "LEADER"
  | "DEVELOPER"
  | "DESIGNER"
  | "RESEARCHER"
  | "TESTER";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  avatar?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: "LOW" | "MEDIUM" | "HIGH";
  assignedTo?: string;
  dueDate?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  leader: string;
  teamMembers: TeamMember[];
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
}
