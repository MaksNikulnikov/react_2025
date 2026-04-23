const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
const isGitHubPagesDemoApi = import.meta.env.VITE_DEPLOY_TARGET === "github-pages";

export const API_BASE_URL = configuredApiBaseUrl
  ? configuredApiBaseUrl.replace(/\/$/, "")
  : "http://localhost:3001/api";

export const IS_GITHUB_PAGES_DEMO_API = isGitHubPagesDemoApi;
export const GITHUB_PAGES_SEED_URL = `${import.meta.env.BASE_URL}mock-api/seed.json`;
