export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  pushed_at: string;
  created_at: string;
  updated_at: string;
  fork: boolean;
}

export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  location: string | null;
  blog: string | null;
  company: string | null;
}

export interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
}

const GITHUB_API = "https://api.github.com";

function getUsername(): string {
  return process.env.NEXT_PUBLIC_GITHUB_USERNAME || "YOUR_USERNAME_HERE";
}

export async function fetchGitHubUser(): Promise<GitHubUser> {
  const res = await fetch(`${GITHUB_API}/users/${getUsername()}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const repos: GitHubRepo[] = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const res = await fetch(
      `${GITHUB_API}/users/${getUsername()}/repos?per_page=${perPage}&page=${page}&sort=pushed&type=owner`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) break;
    const data: GitHubRepo[] = await res.json();
    if (data.length === 0) break;
    repos.push(...data);
    if (data.length < perPage) break;
    page++;
  }

  return repos.filter((r) => !r.fork).sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
}

export async function fetchGitHubEvents(): Promise<GitHubEvent[]> {
  const res = await fetch(
    `${GITHUB_API}/users/${getUsername()}/events/public?per_page=100`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  return res.json();
}

/** Compute aggregate stats from repos */
export function computeStats(repos: GitHubRepo[]) {
  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);
  const languages: Record<string, number> = {};
  for (const repo of repos) {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
  }
  const topLanguages = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  return { totalStars, totalForks, totalRepos: repos.length, topLanguages };
}

/** Language color map */
export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  "C++": "#f34b7d",
  C: "#555555",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Lua: "#000080",
  R: "#198CE7",
  Scala: "#c22d40",
  Elixir: "#6e4a7e",
  Haskell: "#5e5086",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Jupyter: "#F37626",
  "Jupyter Notebook": "#DA5B0B",
  "C#": "#178600",
};
