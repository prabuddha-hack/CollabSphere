"use client";

import { useState, ChangeEvent } from "react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Edit2,
  Save,
  X,
  Plus,
  Star,
  Trophy,
  Award,
  Linkedin,
  Github,
  Mail,
} from "lucide-react";
import profileData from "@/data/profile";





interface Profile {
  name: string;
  title: string;
  location: string;
  bio: string;
  avatar: string;
}

interface BadgeInfo {
  id: number;
  name: string;
  icon: string;
  description: string;
}

interface Review {
  id: number;
  from: string;
  date: string;
  rating: number;
  text: string;
}

export default function ProfilePage() {
  const {
    profile: initialProfile,
    skills: initialSkills,
    allAvailableSkills,
    badges,
    reviews,
  }: {
    profile: Profile;
    skills: string[];
    allAvailableSkills: string[];
    badges: BadgeInfo[];
    reviews: Review[];
  } = profileData;

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [skills, setSkills] = useState<string[]>(initialSkills);
  const [newSkill, setNewSkill] = useState("");

  // --------------------
  // HANDLERS
  // --------------------

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleProfileChange = (field: keyof Profile, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
    // TODO: Save to DB
  };

  const suggestedSkills = allAvailableSkills.filter((s) => !skills.includes(s));

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <div className="flex items-end justify-between">
            <div className="flex items-end gap-6">
              <div className="text-5xl">{profile.avatar}</div>

              <div>
                <h1 className="text-3xl font-bold">{profile.name}</h1>
                <p className="text-lg text-primary font-medium">
                  {profile.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {profile.location}
                </p>
              </div>
            </div>

            <Button
              variant={isEditing ? "outline" : "default"}
              className="gap-2"
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-5xl px-4 py-8">
        {/* BIO */}
        {isEditing ? (
          <Card className="p-6 mb-8">
            <h2 className="font-semibold mb-4">Edit Profile</h2>
            <div className="space-y-4">
              {/* NAME */}
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <Input
                  value={profile.name}
                  onChange={(e) => handleProfileChange("name", e.target.value)}
                  className="mt-1"
                />
              </div>

              {/* TITLE */}
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={profile.title}
                  onChange={(e) => handleProfileChange("title", e.target.value)}
                  className="mt-1"
                />
              </div>

              {/* LOCATION */}
              <div>
                <label className="text-sm font-medium">Location</label>
                <Input
                  value={profile.location}
                  onChange={(e) =>
                    handleProfileChange("location", e.target.value)
                  }
                  className="mt-1"
                />
              </div>

              {/* BIO */}
              <div>
                <label className="text-sm font-medium">Bio</label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => handleProfileChange("bio", e.target.value)}
                  className="w-full mt-1 min-h-24 rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
            </div>
          </Card>
        ) : (
          <Card className="p-6 mb-8">
            <p className="text-muted-foreground leading-relaxed">
              {profile.bio}
            </p>
          </Card>
        )}

        {/* TABS */}
        <Tabs defaultValue="skills" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* SKILLS TAB */}
          <TabsContent value="skills" className="space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Your Skills</h2>
                <Badge variant="secondary">{skills.length} skills</Badge>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {skills.map((skill: string) => (
                  <Badge
                    key={skill}
                    variant="default"
                    className="px-3 py-2 gap-2 flex items-center"
                  >
                    {skill}
                    {isEditing && (
                      <X
                        className="w-4 h-4 cursor-pointer hover:text-destructive"
                        onClick={() => handleRemoveSkill(skill)}
                      />
                    )}
                  </Badge>
                ))}
              </div>

              {/* ADD SKILLS */}
              {isEditing && (
                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">Add Skills</h3>

                  <div className="flex gap-2 mb-4">
                    <select
                      value={newSkill}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                        setNewSkill(e.target.value)
                      }
                      className="flex-1 px-3 py-2 rounded-md border text-sm bg-background"
                    >
                      <option value="">Select a skill...</option>

                      {suggestedSkills.map((s: string) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>

                    <Button onClick={handleAddSkill}>
                      <Plus className="w-4 h-4" />
                      Add
                    </Button>
                  </div>

                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-3">
                      Suggested skills:
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {suggestedSkills.slice(0, 10).map((s) => (
                        <Badge
                          key={s}
                          variant="outline"
                          className="cursor-pointer hover:border-primary"
                          onClick={() => setNewSkill(s)}
                        >
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* VISIBILITY */}
            <Card className="p-6">
              <h2 className="font-semibold mb-4">Profile Visibility</h2>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-secondary/30">
                  <input type="radio" name="visibility" defaultChecked />
                  <div>
                    <p className="font-medium">Public</p>
                    <p className="text-xs text-muted-foreground">
                      Anyone can view your profile
                    </p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-secondary/30">
                  <input type="radio" name="visibility" />
                  <div>
                    <p className="font-medium">Private</p>
                    <p className="text-xs text-muted-foreground">
                      Only teammates can view
                    </p>
                  </div>
                </label>
              </div>
            </Card>

            {/* SOCIAL */}
            <Card className="p-6">
              <h2 className="font-semibold mb-4">Social Links</h2>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-muted-foreground" />
                  <Input placeholder="github.com/username" />
                </div>

                <div className="flex items-center gap-3">
                  <Linkedin className="w-5 h-5 text-muted-foreground" />
                  <Input placeholder="linkedin.com/in/username" />
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <Input placeholder="email@example.com" />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* BADGES TAB */}
          <TabsContent value="badges">
            <div className="grid md:grid-cols-2 gap-4">
              {badges.map((b: BadgeInfo) => (
                <Card
                  key={b.id}
                  className="p-6 text-center hover:border-primary/50 transition"
                >
                  <div className="text-4xl mb-3">{b.icon}</div>
                  <h3 className="font-semibold mb-1">{b.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {b.description}
                  </p>
                </Card>
              ))}
            </div>

            <Card className="p-8 mt-4 text-center border-dashed">
              <Trophy className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground">
                Complete more projects to earn additional badges
              </p>
            </Card>
          </TabsContent>


          <TabsContent value="reviews">
            <div className="space-y-4">
              {reviews.map((r: Review) => (
                <Card key={r.id} className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold">{r.from}</p>
                      <p className="text-xs text-muted-foreground">{r.date}</p>
                    </div>

                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < r.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">{r.text}</p>
                </Card>
              ))}
            </div>

            <Card className="p-8 mt-4 text-center border-dashed">
              <Award className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground">
                Complete projects to receive teammate reviews
              </p>
            </Card>
          </TabsContent>
        </Tabs>

        {/* STATS */}
        <div className="grid md:grid-cols-4 gap-4 mt-12 pt-8 border-t">
          <Card className="p-6 text-center">
            <p className="text-3xl font-bold text-primary">12</p>
            <p className="text-sm text-muted-foreground mt-2">
              Projects Completed
            </p>
          </Card>

          <Card className="p-6 text-center">
            <p className="text-3xl font-bold text-primary">4.8</p>
            <p className="text-sm text-muted-foreground mt-2">Average Rating</p>
          </Card>

          <Card className="p-6 text-center">
            <p className="text-3xl font-bold text-primary">24</p>
            <p className="text-sm text-muted-foreground mt-2">Collaborators</p>
          </Card>

          <Card className="p-6 text-center">
            <p className="text-3xl font-bold text-primary">4</p>
            <p className="text-sm text-muted-foreground mt-2">Badges Earned</p>
          </Card>
        </div>
      </main>
    </div>
  );
}
