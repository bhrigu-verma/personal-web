"use client";

import { motion } from "framer-motion";
import { MapPin, Briefcase, Users, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { GitHubUser } from "@/lib/github";

export function AboutSection({ user }: { user: GitHubUser | null }) {
  if (!user) return null;

  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 text-sm font-mono tracking-wider mb-2">
            GET TO KNOW ME
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            About Me
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative">
              <img
                src={user.avatar_url}
                alt={user.name || user.login}
                className="w-48 h-48 sm:w-64 sm:h-64 rounded-2xl object-cover border-2 border-white/10 shadow-2xl"
              />
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 -z-10 blur-xl" />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-white mb-3">
              {user.name || user.login}
            </h3>
            {user.bio && (
              <p className="text-white/60 mb-6 leading-relaxed">{user.bio}</p>
            )}

            <div className="space-y-3 mb-6">
              {user.location && (
                <div className="flex items-center gap-2 text-white/50 text-sm">
                  <MapPin size={16} className="text-cyan-400" />
                  {user.location}
                </div>
              )}
              {user.company && (
                <div className="flex items-center gap-2 text-white/50 text-sm">
                  <Briefcase size={16} className="text-cyan-400" />
                  {user.company}
                </div>
              )}
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <Users size={16} className="text-cyan-400" />
                {user.followers} followers · {user.following} following
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                <Button>
                  <ExternalLink size={16} className="mr-2" />
                  GitHub Profile
                </Button>
              </a>
              {user.blog && (
                <a href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline">
                    <ExternalLink size={16} className="mr-2" />
                    Website
                  </Button>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
