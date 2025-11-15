"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, CheckCircle2, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";


import { useProjects } from "@/hooks/use-Projects";
import type { Project } from "@/lib/types";
import dashboardData from "@/data/dashboard";

export default function Dashboard() {
  const {
    projectProgressData,
    contributionData,
    COLORS,
    projects: initialProjects,
    recentActivity,
  } = dashboardData;

  const { projects } = useProjects(initialProjects as Project[]);

  const calcProgress = (project: Project) => {
    const done = project.tasks.filter((t) => t.status === "DONE").length;
    const total = project.tasks.length || 1;
    return Math.round((done / total) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, Prabuddha!</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Here&apos;s what&apos;s happening with your projects
            </p>
          </div>
          {/* <CreateProjectModal
            currentUser={currentUser}
            onCreateProject={handleCreateProject}
          /> */}
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <DashboardStat
            title="Active Projects"
            value={projects.length}
            icon={<TrendingUp className="w-8 h-8 text-primary/60" />}
          />
          <DashboardStat
            title="Tasks Completed"
            value={47}
            icon={<CheckCircle2 className="w-8 h-8 text-primary/60" />}
          />
          <DashboardStat
            title="Team Members"
            value={12}
            icon={<Users className="w-8 h-8 text-primary/60" />}
          />
          <DashboardStat
            title="Avg Progress"
            value="67%"
            icon={
              <div className="w-8 h-8 rounded-full bg-primary/20 grid place-items-center">
                <span className="text-sm font-bold text-primary">67%</span>
              </div>
            }
          />
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Progress Chart */}
          <Card className="lg:col-span-2 p-6">
            <h2 className="font-semibold mb-6">Project Progress Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectProgressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="progress"
                  fill="var(--chart-1)"
                  name="Overall Progress %"
                />
                <Bar
                  dataKey="completed"
                  fill="var(--chart-2)"
                  name="Tasks Completed"
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Contribution Chart */}
          <Card className="p-6">
            <h2 className="font-semibold mb-6">Team Contributions</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={contributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(e) => `${e.value}%`}
                  outerRadius={85}
                  dataKey="value"
                >
                  {contributionData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Projects + Activity */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Projects */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-6">Your Projects</h2>
            <div className="space-y-4">
              {projects.map((project) => {
                const progress = calcProgress(project);
                return (
                  <Card
                    key={project.id}
                    className="p-6 hover:border-primary/50 transition-colors"
                  >
                    <Link href={`/dashboard/projects/${project.id}`}>
                      {/* Title */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">
                              {project.name}
                            </h3>
                            <Badge
                              variant={
                                project.status === "ACTIVE"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {project.status}
                            </Badge>
                          </div>

                          <p className="text-sm text-muted-foreground mb-3">
                            {project.description || "No description"}
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                      </div>

                      {/* Progress */}
                      <DashboardProgress percent={progress} />

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-xs">
                            {project.teamMembers.length} members
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {project.tasks.length} tasks
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {project.leader}
                        </span>
                      </div>
                    </Link>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Activity */}
          <div>
            <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
            <Card className="p-6">
              <div className="space-y-4">
                {recentActivity.map((a, i) => (
                  <div
                    key={i}
                    className="pb-4 border-b border-border last:border-b-0 last:pb-0"
                  >
                    <p className="text-sm">
                      <span className="font-medium">{a.user}</span>
                      <span className="text-muted-foreground">
                        {" "}
                        {a.action}{" "}
                      </span>
                      <span className="font-medium text-primary">
                        {a.target}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {a.time}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

/* --- Small clean helper components --- */

function DashboardStat({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        {icon}
      </div>
    </Card>
  );
}

function DashboardProgress({ percent }: { percent: number }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground">Progress</span>
        <span className="text-xs font-medium">{percent}%</span>
      </div>
      <div className="w-full bg-secondary rounded-full h-2">
        <div
          className="bg-primary rounded-full h-2 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
