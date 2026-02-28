import { fetchGitHubUser, fetchGitHubRepos, computeStats } from "@/lib/github";
import { ClientPage } from "./client-page";

export default async function Home() {
  let user = null;
  let repos: Awaited<ReturnType<typeof fetchGitHubRepos>> = [];
  let stats = { totalRepos: 0, totalStars: 0, totalForks: 0, topLanguages: [] as [string, number][] };

  try {
    [user, repos] = await Promise.all([fetchGitHubUser(), fetchGitHubRepos()]);
    stats = computeStats(repos);
  } catch {
    // GitHub API might fail — render with empty data
  }

  return <ClientPage user={user} repos={repos} stats={stats} />;
}
