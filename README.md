# 3D Interactive Portfolio

A stunning 3D interactive portfolio website built with Next.js 15, React Three Fiber, and Tailwind CSS. Dynamically pulls all your GitHub work (repos, stats, languages, timeline) and presents it beautifully.

![Hero Section](https://github.com/user-attachments/assets/5178b095-96f4-4ede-8f22-acc8640dacf4)

## Features

- **3D Hero Section** — Particle field, floating orbs, and glow rings with typewriter effect
- **Project Timeline** — Chronological view of GitHub repos with animated cards
- **Featured Projects Grid** — Hover-tilt cards with modal details and live GitHub links
- **GitHub Stats Dashboard** — Total repos, stars, forks, and top languages bar chart
- **About Me** — Auto-populated from GitHub profile (avatar, bio, location)
- **Contact Form** — Glassmorphism form with success animation
- **Loading Screen** — 3D spinning logo animation
- **Dark Theme** — Neon accents with glassmorphism throughout
- **Responsive** — Mobile, tablet, and desktop optimized
- **SEO Ready** — Open Graph meta tags included

## Tech Stack

- **Next.js 15** (App Router) + TypeScript + Tailwind CSS
- **React Three Fiber** + Three.js + @react-three/drei
- **Framer Motion** for animations
- **Lucide React** icons
- **GitHub REST API** for dynamic data

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/bhrigu-verma/personal-web.git
cd personal-web

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Configuration

Edit `.env.local` and set your GitHub username:

```
NEXT_PUBLIC_GITHUB_USERNAME=your-github-username
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push the repo to GitHub
2. Import into [Vercel](https://vercel.com)
3. Add the environment variable `NEXT_PUBLIC_GITHUB_USERNAME` in Vercel settings
4. Deploy

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Server component (fetches GitHub data)
│   ├── client-page.tsx     # Client component (renders all sections)
│   └── globals.css         # Global styles
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx      # 3D hero with particles & typewriter
│   │   ├── TimelineSection.tsx  # Chronological project timeline
│   │   ├── ProjectsSection.tsx  # Featured projects grid + modal
│   │   ├── StatsSection.tsx     # GitHub stats dashboard
│   │   ├── AboutSection.tsx     # About me section
│   │   └── ContactSection.tsx   # Contact form
│   ├── three/
│   │   ├── ParticleField.tsx    # 3D particles, orbs, glow rings
│   │   └── SpinningLogo.tsx     # Loading screen 3D logo
│   ├── ui/
│   │   ├── button.tsx           # Glassmorphism button component
│   │   ├── card.tsx             # Glass card component
│   │   └── input.tsx            # Form input components
│   ├── Navigation.tsx           # Responsive navbar
│   ├── LoadingScreen.tsx        # 3D loading screen
│   └── Footer.tsx               # Footer
└── lib/
    ├── github.ts           # GitHub API integration
    └── utils.ts            # Utility functions (cn)
```

## License

MIT
