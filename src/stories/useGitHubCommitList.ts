import { useEffect, useState } from "react";
import { Commit } from "../helpers/types";

type ReturnType = {
  commits: Commit[];
  hasMore: boolean;
  loadMore: () => Promise<void>;
};

export function useGitHubCommitList(
  ownerName: string,
  repoName: string,
  token?: string,
): ReturnType {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 30;
  const apiCommitsUrl = `https://api.github.com/repos/${ownerName}/${repoName}/commits?page=${page}&per_page=${pageSize}`;
  const headers = new Headers({
    Authorization: `Bearer ${token}` || "",
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
        if (newHasMore) {
          setPage(page + 1);
        }
      }
    } catch (e) {
      console.error("Fetching commits failed:", e);
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
        }
      } catch (e) {
        console.error("Fetching commits failed:", e);
      }
    }
  };

  return {
    commits,
    loadMore,
    hasMore,
  };
}
