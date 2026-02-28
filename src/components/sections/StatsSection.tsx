"use client";

import { motion } from "framer-motion";
import { GitBranch, Star, GitFork, Code2, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { LANGUAGE_COLORS } from "@/lib/github";

interface StatsData {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  topLanguages: [string, number][];
}

function StatCard({ icon: Icon, label, value, delay }: {
  icon: LucideIcon;
  label: string;
  value: number;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="hover:border-cyan-500/30 transition-all duration-300">
        <CardContent className="p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 mb-3">
            <Icon size={22} className="text-cyan-400" />
          </div>
          <p className="text-3xl font-bold text-white mb-1">{value}</p>
          <p className="text-sm text-white/50">{label}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function StatsSection({ stats }: { stats: StatsData }) {
  const maxLangCount = stats.topLanguages.length > 0 ? stats.topLanguages[0][1] : 1;

  return (
    <section id="stats" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 text-sm font-mono tracking-wider mb-2">
            BY THE NUMBERS
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            GitHub Stats
          </h2>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <StatCard icon={Code2} label="Repositories" value={stats.totalRepos} delay={0} />
          <StatCard icon={Star} label="Total Stars" value={stats.totalStars} delay={0.1} />
          <StatCard icon={GitFork} label="Total Forks" value={stats.totalForks} delay={0.2} />
          <StatCard icon={GitBranch} label="Languages" value={stats.topLanguages.length} delay={0.3} />
        </div>

        {/* Top languages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Top Languages</h3>
              <div className="space-y-4">
                {stats.topLanguages.map(([lang, count], i) => (
                  <motion.div
                    key={lang}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: LANGUAGE_COLORS[lang] || "#8b8b8b" }}
                    />
                    <span className="text-sm text-white/80 w-24 shrink-0">{lang}</span>
                    <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: LANGUAGE_COLORS[lang] || "#8b8b8b" }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(count / maxLangCount) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.05 }}
                      />
                    </div>
                    <span className="text-xs text-white/40 w-8 text-right">
                      {count}
                    </span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
