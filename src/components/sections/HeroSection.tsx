"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { ParticleField, FloatingOrb, GlowRing } from "@/components/three/ParticleField";
import { ArrowDown, Github, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { GitHubUser } from "@/lib/github";

const titles = ["Full-Stack Developer", "Open Source Enthusiast", "Creative Coder", "UI/UX Engineer"];

function useTypewriter(words: string[], typingSpeed = 80, deletingSpeed = 40, pause = 1500) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const current = words[wordIndex];
    if (isDeleting) {
      setText(current.substring(0, text.length - 1));
      if (text.length === 0) {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    } else {
      setText(current.substring(0, text.length + 1));
      if (text.length === current.length) {
        setTimeout(() => setIsDeleting(true), pause);
        return;
      }
    }
  }, [text, wordIndex, isDeleting, words, pause]);

  useEffect(() => {
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, typingSpeed, deletingSpeed]);

  return text;
}

export function HeroSection({ user }: { user: GitHubUser | null }) {
  const typed = useTypewriter(titles);
  const name = user?.name || user?.login || "YOUR_USERNAME_HERE";

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <ParticleField count={600} />
          <FloatingOrb color="#06b6d4" radius={0.25} speed={0.4} orbit={3.5} />
          <FloatingOrb color="#a855f7" radius={0.18} speed={0.6} orbit={2.5} />
          <FloatingOrb color="#ec4899" radius={0.15} speed={0.8} orbit={4} />
          <GlowRing radius={2.5} color="#06b6d4" />
          <GlowRing radius={3.5} color="#a855f7" />
        </Canvas>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {user?.avatar_url && (
              <motion.img
                src={user.avatar_url}
                alt={name}
                className="w-20 h-20 rounded-full border-2 border-cyan-500/50 mb-6 shadow-lg shadow-cyan-500/20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.4 }}
              />
            )}
            <p className="text-cyan-400 text-sm font-mono tracking-wider mb-3">
              Hello, I&apos;m
            </p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
              {name}
            </h1>
            <div className="h-8 sm:h-10 mb-6">
              <span className="text-lg sm:text-2xl text-white/70">
                {typed}
                <span className="animate-pulse text-cyan-400">|</span>
              </span>
            </div>
            {user?.bio && (
              <p className="text-white/50 text-base sm:text-lg max-w-xl mb-2">
                {user.bio}
              </p>
            )}
            {user?.location && (
              <p className="text-white/40 text-sm flex items-center gap-1 mb-8">
                <MapPin size={14} /> {user.location}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap gap-3"
          >
            <Button size="lg" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
              View My Work
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open(user?.html_url || "#", "_blank")}
            >
              <Github size={18} className="mr-2" />
              GitHub Profile
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ArrowDown className="text-white/30" size={24} />
      </motion.div>
    </section>
  );
}
