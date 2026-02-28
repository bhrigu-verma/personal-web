"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Timeline", href: "#timeline" },
  { label: "Projects", href: "#projects" },
  { label: "Stats", href: "#stats" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-black/60 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <a href="#hero" className="flex items-center gap-2 group">
              <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
              </div>
              <span className="text-white font-semibold hidden sm:block">
                Portfolio
              </span>
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME || "YOUR_USERNAME_HERE"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-all"
              >
                <Github size={18} />
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 text-white/70 hover:text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-40 bg-black/90 backdrop-blur-xl border-b border-white/10 md:hidden"
          >
            <div className="p-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
