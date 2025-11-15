import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Users, Zap, BarChart3, Heart, LucideIcon } from "lucide-react";


import features from "@/data/features";
import testimonials from "@/data/testimonials";

const iconMap: Record<string, LucideIcon> = {
  Users,
  Zap,
  BarChart3,
  Heart,
};


export default function LandingPage() {
  return (
    <div className="bg-linear-to-r from-background via-background to-secondary/10 text-orange-500">
      <section className="relative mx-auto max-w-6xl px-4 py-28">
        <div className="absolute inset-0 -z-10 blur-[120px] opacity-40 bg-linear-to-r from-primary/30 via-purple-400/30 to-blue-400/30" />

        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
              Collaborate. Create.
              <span className="text-primary"> Grow Together.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The smarter way for students to find teammates, manage projects,
              and build long-term partnerships.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/auth/sign-up">
              <Button size="lg" className="gap-2">
                Join Now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <Link href="/explore">
              <Button size="lg" variant="outline">
                Explore Teams
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Why Students Love CollabSphere
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Powerful tools designed to help you work smarter, not harder.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <Card
                key={index}
                className="p-6 bg-white/50 backdrop-blur border border-secondary/40 hover:border-primary/30 transition-all hover:shadow-lg"
              >
                <Icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Loved by Students</h2>
          <p className="text-muted-foreground text-lg">
            Hear from students already collaborating on meaningful projects.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <Card
              key={index}
              className="p-8 bg-white/50 backdrop-blur border border-secondary/40 hover:shadow-md transition"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{t.avatar}</span>
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic">{t.quote}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4  text-center">
        <div className="bg-linear-to-r from-primary/10 to-accent/10 p-14 rounded-3xl border border-primary/20 shadow-sm">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Collaborating Today
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join CollabSphere and unlock a smarter, more fun way to manage your
            projects.
          </p>

          <Link href="/auth/sign-up">
            <Button size="lg" className="gap-2">
              Join Now
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
