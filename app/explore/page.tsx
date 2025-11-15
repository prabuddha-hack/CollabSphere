"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, X, Filter, Star, Users, CheckCircle } from "lucide-react";
import Link from "next/link";

import exploreData from "@/data/explore";

export default function ExplorePage() {
  const { opportunities, allSkills, projectTypes } = exploreData;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);


  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      opp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSkills =
      selectedSkills.length === 0 ||
      selectedSkills.some((skill) => opp.skillsNeeded.includes(skill));

    const matchesType = !selectedType || opp.type === selectedType;

    return matchesSearch && matchesSkills && matchesType;
  });

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSkills([]);
    setSelectedType(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <h1 className="text-3xl font-bold">Explore Opportunities</h1>
          <p className="text-sm text-muted-foreground">
            Find teams and projects that match your skills
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search projects, teams, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm font-medium">Filter by Skills</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {allSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant={
                      selectedSkills.includes(skill) ? "default" : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() => toggleSkill(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Project Type</p>
              <div className="flex flex-wrap gap-2">
                {projectTypes.map((type) => (
                  <Badge
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() =>
                      setSelectedType(selectedType === type ? null : type)
                    }
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
          </div>


          {(searchQuery || selectedSkills.length || selectedType) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="gap-2"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </Button>
          )}
        </div>


        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Found{" "}
            <span className="font-semibold text-foreground">
              {filteredOpportunities.length}
            </span>{" "}
            opportunities
          </p>
        </div>


        {filteredOpportunities.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredOpportunities.map((opp) => (
              <Card
                key={opp.id}
                className="p-6 hover:border-primary/50 transition-colors flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{opp.name}</h3>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="secondary">{opp.type}</Badge>
                      <Badge variant="outline">{opp.status}</Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{opp.rating}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  {opp.description}
                </p>


                <div className="mb-4">
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    Skills Needed
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {opp.skillsNeeded.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>


                <div className="mb-4">
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    Open Roles
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {opp.roles.map((role) => (
                      <span
                        key={role}
                        className="text-xs bg-secondary px-2 py-1 rounded"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>


                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{opp.members} members</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      <span>{opp.deadline}</span>
                    </div>
                  </div>

                  <Link href={`/explore/${opp.id}`}>
                    <Button size="sm">View Details</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-4">
              No opportunities found
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
