"use client";

import { motion } from "framer-motion";
import { Calendar, Star, GitFork, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { GitHubRepo } from "@/lib/github";
import { LANGUAGE_COLORS } from "@/lib/github";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function TimelineSection({ repos }: { repos: GitHubRepo[] }) {
  const timelineRepos = repos.slice(0, 20);

  return (
    <section id="timeline" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Section heading */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-cyan-400 text-sm font-mono tracking-wider mb-2">
            MY JOURNEY
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            Project Timeline
          </h2>
          <p className="text-white/50 max-w-lg mx-auto">
            A chronological view of my GitHub projects, sorted by latest activity.
          </p>
        </motion.div>
      </div>

      {/* Timeline */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative">
        {/* Vertical line */}
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-transparent" />

        {timelineRepos.map((repo, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`relative mb-8 sm:mb-12 flex ${
                isLeft ? "sm:justify-start" : "sm:justify-end"
              } pl-10 sm:pl-0`}
            >
              {/* Dot on the line */}
              <div className="absolute left-3 sm:left-1/2 top-6 w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 -translate-x-1/2 z-10 shadow-lg shadow-cyan-500/30" />

              {/* Card */}
              <div className={`w-full sm:w-[calc(50%-2rem)] ${isLeft ? "" : ""}`}>
                <Card className="group hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors truncate">
                        {repo.name}
                      </h3>
                      <span className="flex items-center gap-1 text-white/40 text-xs whitespace-nowrap">
                        <Calendar size={12} />
                        {formatDate(repo.pushed_at)}
                      </span>
                    </div>

                    {repo.description && (
                      <p className="text-white/50 text-sm mb-3 line-clamp-2">
                        {repo.description}
                      </p>
                    )}

                    <div className="flex items-center gap-3 flex-wrap">
                      {repo.language && (
                        <span className="flex items-center gap-1.5 text-xs text-white/60">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: LANGUAGE_COLORS[repo.language] || "#8b8b8b" }}
                          />
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-xs text-white/50">
                        <Star size={12} /> {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-white/50">
                        <GitFork size={12} /> {repo.forks_count}
                      </span>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto"
                      >
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                          <ExternalLink size={12} className="mr-1" />
                          View
                        </Button>
                      </a>
                    </div>

                    {repo.topics && repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {repo.topics.slice(0, 4).map((topic) => (
                          <span
                            key={topic}
                            className="px-2 py-0.5 text-[10px] rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
