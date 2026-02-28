"use client";

import dynamic from "next/dynamic";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/Footer";
import type { GitHubUser, GitHubRepo } from "@/lib/github";

const LoadingScreen = dynamic(
  () => import("@/components/LoadingScreen").then((m) => m.LoadingScreen),
  { ssr: false }
);

interface ClientPageProps {
  user: GitHubUser | null;
  repos: GitHubRepo[];
  stats: {
    totalRepos: number;
    totalStars: number;
    totalForks: number;
    topLanguages: [string, number][];
  };
}

export function ClientPage({ user, repos, stats }: ClientPageProps) {
  return (
    <>
      <LoadingScreen />
      <Navigation />
      <main>
        <HeroSection user={user} />
        <TimelineSection repos={repos} />
        <ProjectsSection repos={repos} />
        <StatsSection stats={stats} />
        <AboutSection user={user} />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
