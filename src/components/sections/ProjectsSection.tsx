"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, GitFork, ExternalLink, X, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { GitHubRepo } from "@/lib/github";
import { LANGUAGE_COLORS } from "@/lib/github";

function ProjectModal({ repo, onClose }: { repo: GitHubRepo; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-gray-900/95 backdrop-blur-xl p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-white mb-2">{repo.name}</h2>
        {repo.description && (
          <p className="text-white/60 text-sm mb-4">{repo.description}</p>
        )}

        <div className="flex items-center gap-4 mb-4">
          {repo.language && (
            <span className="flex items-center gap-1.5 text-sm text-white/70">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: LANGUAGE_COLORS[repo.language] || "#8b8b8b" }}
              />
              {repo.language}
            </span>
          )}
          <span className="flex items-center gap-1 text-sm text-white/60">
            <Star size={14} /> {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-1 text-sm text-white/60">
            <GitFork size={14} /> {repo.forks_count}
          </span>
        </div>

        {repo.topics && repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {repo.topics.map((topic) => (
              <span
                key={topic}
                className="px-2.5 py-1 text-xs rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
              >
                {topic}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-3">
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button className="w-full">
              <ExternalLink size={16} className="mr-2" />
              View on GitHub
            </Button>
          </a>
          {repo.homepage && (
            <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button variant="outline" className="w-full">
                <Globe size={16} className="mr-2" />
                Live Demo
              </Button>
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProjectsSection({ repos }: { repos: GitHubRepo[] }) {
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  const featuredRepos = repos.slice(0, 12);

  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 text-sm font-mono tracking-wider mb-2">
            FEATURED WORK
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            Projects
          </h2>
          <p className="text-white/50 max-w-lg mx-auto">
            A curated selection of my top repositories, showcasing diverse skills and technologies.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredRepos.map((repo, i) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Card
                className="h-full cursor-pointer group hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-1"
                onClick={() => setSelectedRepo(repo)}
              >
                <CardContent className="p-5 flex flex-col h-full">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors truncate">
                      {repo.name}
                    </h3>
                    <ExternalLink size={14} className="text-white/30 group-hover:text-cyan-400 transition-colors shrink-0 mt-1" />
                  </div>

                  {repo.description && (
                    <p className="text-white/50 text-sm mb-4 line-clamp-2 flex-1">
                      {repo.description}
                    </p>
                  )}

                  <div className="flex items-center gap-3 flex-wrap mt-auto">
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
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedRepo && (
          <ProjectModal repo={selectedRepo} onClose={() => setSelectedRepo(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
