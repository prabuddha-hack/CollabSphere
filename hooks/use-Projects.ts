"use client";

import { useState, useCallback } from "react";
import type { Project, TeamMember, Task, TeamRole } from "@/lib/types";

export function useProjects(initialProjects: Project[] = []) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  // CREATE PROJECT
  const createProject = useCallback(
    (projectData: Omit<Project, "id" | "createdAt" | "updatedAt">) => {
      const newProject: Project = {
        ...projectData,
        id: `project-${crypto.randomUUID()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        teamMembers: projectData.teamMembers ?? [],
        tasks: projectData.tasks ?? [],
      };

      setProjects((prev) => [newProject, ...prev]);
      return newProject;
    },
    []
  );

  // UPDATE PROJECT
  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : p
      )
    );
  }, []);

  // DELETE PROJECT
  const deleteProject = useCallback((id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // ADD TEAM MEMBER
  const addTeamMember = useCallback(
    (projectId: string, member: Omit<TeamMember, "id">) => {
      const newMember: TeamMember = {
        ...member,
        id: `member-${crypto.randomUUID()}`,
      };

      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? {
                ...p,
                teamMembers: [...(p.teamMembers ?? []), newMember],
                updatedAt: new Date().toISOString(),
              }
            : p
        )
      );

      return newMember;
    },
    []
  );

  // UPDATE TEAM MEMBER ROLE
  const updateTeamMemberRole = useCallback(
    (projectId: string, memberId: string, role: TeamRole) => {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? {
                ...p,
                teamMembers: p.teamMembers.map((m) =>
                  m.id === memberId ? { ...m, role } : m
                ),
                updatedAt: new Date().toISOString(),
              }
            : p
        )
      );
    },
    []
  );

  // REMOVE TEAM MEMBER
  const removeTeamMember = useCallback(
    (projectId: string, memberId: string) => {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? {
                ...p,
                teamMembers: p.teamMembers.filter((m) => m.id !== memberId),
                updatedAt: new Date().toISOString(),
              }
            : p
        )
      );
    },
    []
  );

  // ADD TASK
  const addTask = useCallback(
    (projectId: string, task: Omit<Task, "id" | "createdAt">) => {
      const newTask: Task = {
        ...task,
        id: `task-${crypto.randomUUID()}`,
        createdAt: new Date().toISOString(),
      };

      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? {
                ...p,
                tasks: [...(p.tasks ?? []), newTask],
                updatedAt: new Date().toISOString(),
              }
            : p
        )
      );

      return newTask;
    },
    []
  );

  // UPDATE TASK
  const updateTask = useCallback(
    (projectId: string, taskId: string, updates: Partial<Task>) => {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? {
                ...p,
                tasks: p.tasks.map((t) =>
                  t.id === taskId ? { ...t, ...updates } : t
                ),
                updatedAt: new Date().toISOString(),
              }
            : p
        )
      );
    },
    []
  );

  // DELETE TASK
  const deleteTask = useCallback((projectId: string, taskId: string) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              tasks: p.tasks.filter((t) => t.id !== taskId),
              updatedAt: new Date().toISOString(),
            }
          : p
      )
    );
  }, []);

  // GET SINGLE PROJECT
  const getProject = useCallback(
    (id: string) => projects.find((p) => p.id === id),
    [projects]
  );

  return {
    projects,
    createProject,
    updateProject,
    deleteProject,
    addTeamMember,
    updateTeamMemberRole,
    removeTeamMember,
    addTask,
    updateTask,
    deleteTask,
    getProject,
  };
}
