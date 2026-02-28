"use client";

import { Github, Heart } from "lucide-react";

export function Footer() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "YOUR_USERNAME_HERE";

  return (
    <footer className="border-t border-white/5 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40 flex items-center gap-1">
            Built with <Heart size={14} className="text-red-400" /> using Next.js &amp; React Three Fiber
          </p>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            <Github size={16} />
            @{username}
          </a>
        </div>
      </div>
    </footer>
  );
}
