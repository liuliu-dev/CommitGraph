import { useEffect, useState } from "react";
import { Commit } from "../helpers/types";

type ReturnType = {
  commits: Commit[];
  hasMore: boolean;
  loadMore: () => Promise<void>;
  error?: string;
};

export function useGitHubCommitList(
  ownerName: string,
  repoName: string,
  token?: string,
): ReturnType {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");
  const pageSize = 30;
  const apiCommitsUrl = `https://api.github.com/repos/${ownerName}/${repoName}/commits?page=${page}&per_page=${pageSize}`;
  const headers = new Headers({
    Authorization: token ? `Bearer ${token}` : "",
  });

  const getCommits = async () => {
    try {
      const res = await fetch(apiCommitsUrl, { headers });
      if (res.ok) {
        const data = await res.json();
        const newCommits: Commit[] = data as Commit[];
        const newHasMore = data.length === pageSize;
        setCommits(newCommits);
        setHasMore(newHasMore);
        setError("");
        if (newHasMore) {
          setPage(page + 1);
        } else {
          const errorData = await res.json();
          const errorMessage =
            errorData.message || `HTTP error! status: ${res.status}`;
          setError(errorMessage);
          throw new Error(errorMessage);
        }
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      setError(`Fetching commits failed: ${errorMessage}`);
      console.error("Fetching commits failed:", errorMessage);
    }
  };

  useEffect(() => {
    getCommits();
  }, []);

  const loadMore = async () => {
    if (!hasMore) {
      return;
    }
    if (hasMore) {
      try {
        const res = await fetch(apiCommitsUrl, { headers });
        if (res.ok) {
          const data = await res.json();
          const newCommits: Commit[] = data as Commit[];
          const newHasMore = data.length === pageSize;
          const allCommits = (commits ?? []).concat(newCommits);
          setCommits(allCommits);
          if (newHasMore) {
            setPage(page + 1);
          }
          setHasMore(newHasMore);
          setError("");
        } else {
          const errorData = await res.json();
          const errorMessage =
            errorData.message || `HTTP error! status: ${res.status}`;
          setError(errorMessage);
          throw new Error(errorMessage);
        }
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        setError(`Fetching commits failed:${errorMessage}`);
        console.error("Fetching commits failed:", errorMessage);
      }
    }
  };

  return {
    commits,
    loadMore,
    hasMore,
    error,
  };
}
