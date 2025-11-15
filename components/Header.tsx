"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Menu, X } from "lucide-react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full border-b bg-background/95 backdrop-blur z-50 supports-backdrop-filter:bg-background/60">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="CollabSphere Logo"
            width={140}
            height={60}
            className="h-10 w-auto object-contain"
          />
        </Link>


        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/explore"
            className="text-sm font-medium hover:text-primary transition"
          >
            Explore
          </Link>

          <Link
            href="/how-it-works"
            className="text-sm font-medium hover:text-primary transition"
          >
            How It Works
          </Link>
        </div>


        <div className="flex items-center gap-4">

          <button className="md:hidden p-2" onClick={() => setOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>


          <div className="hidden md:flex items-center gap-4">
            <SignedIn>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="inline-flex items-center gap-2 hover:text-primary hover:border-primary transition"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>

              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                    userButtonPopoverCard: "shadow-xl",
                    userPreviewMainIdentifier: "font-semibold",
                  },
                }}
                afterSignOutUrl="/"
              />
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost">Sign In</Button>
              </SignInButton>

              <SignUpButton mode="modal">
                <Button className="bg-primary hover:bg-primary/90 border-none">
                  Get Started
                </Button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>
      </nav>


      {open && (
        <div className="fixed inset-0 z-999 bg-black/40 backdrop-blur-sm md:hidden">
          <div className="absolute top-0 right-0 w-64 h-full bg-background shadow-xl p-6 flex flex-col gap-6 animate-in slide-in-from-right duration-200">
            <button className="self-end p-2" onClick={() => setOpen(false)}>
              <X className="h-6 w-6" />
            </button>


            <Link
              href="/explore"
              onClick={() => setOpen(false)}
              className="text-base font-medium hover:text-primary transition"
            >
              Explore
            </Link>

            <Link
              href="/how-it-works"
              onClick={() => setOpen(false)}
              className="text-base font-medium hover:text-primary transition"
            >
              How It Works
            </Link>

            <SignedIn>
              <Link href="/dashboard" onClick={() => setOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 hover:text-primary hover:border-primary"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>

              <UserButton
                appearance={{
                  elements: { avatarBox: "w-10 h-10" },
                }}
                afterSignOutUrl="/"
              />
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" className="w-full justify-start">
                  Sign In
                </Button>
              </SignInButton>

              <SignUpButton mode="modal">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Get Started
                </Button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>
      )}
    </header>
  );
}
