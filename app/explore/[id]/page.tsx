"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, ChangeEvent, KeyboardEvent } from "react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  ArrowLeft,
  Star,
  Users,
  Calendar,
  CheckCircle,
  Send,
} from "lucide-react";
import exploreData from "@/data/explore";




type Message = {
  sender: string;
  text: string;
  time: string;
};

type Project = {
  id: number;
  name: string;
  type: string;
  status: string;
  rating: number;
  description: string;
  members: number;
  deadline: string;
  skillsNeeded: string[];
  roles: string[];
};

export default function ProjectDetailsPage() {
  const params = useParams();
  const projectId = Number(params.id);

  const project: Project | undefined = exploreData.opportunities.find(
    (p: Project) => p.id === projectId
  );

  const [hasJoined, setHasJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "Project Lead",
      text: "Welcome to the team! Excited to collaborate.",
      time: "2h ago",
    },
    {
      sender: "Project Lead",
      text: "The project brief is uploaded under resources.",
      time: "1h ago",
    },
  ]);



  const handleJoin = () => setHasJoined(true);

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "You",
        text: message,
        time: "now",
      },
    ]);

    setMessage("");
  };

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) =>
    setMessage(e.target.value);

  const handleEnterSend = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Project Not Found</h1>
          <Link href="/explore">
            <Button className="mt-3">Back to Explore</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-40">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <Link
            href="/explore"
            className="flex items-center gap-2 text-primary hover:opacity-80 w-fit mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Explore
          </Link>

          <h1 className="text-3xl font-bold">{project.name}</h1>
          <p className="text-sm text-muted-foreground">
            Project details & team information
          </p>
        </div>
      </header>


      <main className="mx-auto max-w-4xl px-4 py-8 grid lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3 flex-wrap">
                <Badge variant="secondary">{project.type}</Badge>
                <Badge variant="outline">{project.status}</Badge>
              </div>

              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{project.rating}</span>
              </div>
            </div>

            <p className="text-muted-foreground mb-6">{project.description}</p>


            <div className="grid md:grid-cols-3 gap-4 border-y py-6">
              <StatItem
                icon={<Users className="w-5 h-5 text-primary" />}
                label="Team Size"
                value={`${project.members} members`}
              />

              <StatItem
                icon={<Calendar className="w-5 h-5 text-primary" />}
                label="Timeline"
                value={project.deadline}
              />

              <StatItem
                icon={<CheckCircle className="w-5 h-5 text-primary" />}
                label="Progress"
                value="45% Complete"
              />
            </div>
          </Card>


          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Skills Required</h3>
            <div className="flex flex-wrap gap-2">
              {project.skillsNeeded.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Open Roles</h3>

            <div className="space-y-3">
              {project.roles.map((role) => (
                <div
                  key={role}
                  className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                >
                  <span className="font-medium">{role}</span>
                  <Button variant="ghost" size="sm">
                    Apply
                  </Button>
                </div>
              ))}
            </div>
          </Card>


          {hasJoined && (
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Team Chat</h3>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
                {messages.map((msg, index) => (
                  <MessageItem key={index} msg={msg} />
                ))}
              </div>

              <div className="flex gap-2 border-t pt-4">
                <input
                  className="flex-1 px-3 py-2 rounded-lg border bg-background text-sm"
                  placeholder="Type a message..."
                  value={message}
                  onChange={handleMessageChange}
                  onKeyDown={handleEnterSend}
                />
                <Button size="sm" onClick={sendMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          )}
        </div>


        <div className="space-y-6">
          {!hasJoined ? (
            <Button size="lg" className="w-full" onClick={handleJoin}>
              Join Project
            </Button>
          ) : (
            <Button size="lg" disabled className="w-full">
              ✓ Joined
            </Button>
          )}


          <Card className="p-6">
            <h3 className="font-semibold mb-4">Quick Info</h3>

            <div className="space-y-4 text-sm">
              <QuickInfo label="Project Type" value={project.type} />
              <QuickInfo label="Status" value={project.status} />
              <QuickInfo
                label="Rating"
                value={
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {project.rating}
                  </div>
                }
              />
              <QuickInfo label="Members" value={`${project.members} active`} />
            </div>
          </Card>


          <Card className="p-6">
            <h3 className="font-semibold mb-4">Project Lead</h3>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-semibold">
                JD
              </div>

              <div>
                <p className="font-medium text-sm">Jane Doe</p>
                <p className="text-xs text-muted-foreground">Project Manager</p>
              </div>
            </div>

            <Button variant="outline" size="sm" className="w-full mt-4">
              Message
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
}


function StatItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}

function QuickInfo({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-muted-foreground mb-1">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function MessageItem({ msg }: { msg: Message }) {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold">
        {msg.sender[0]}
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">{msg.sender}</span>
          <span className="text-xs text-muted-foreground">{msg.time}</span>
        </div>
        <p className="text-sm text-muted-foreground">{msg.text}</p>
      </div>
    </div>
  );
}
