import { useState } from "react";
import { Branch, Commit } from "../helpers/types";

type ReturnType = {
  commits: Commit[];
  hasMore: boolean;
  loadMore: () => Promise<void>;
  getBranches:() => Promise<Branch[]| undefined>;
};

export function useGitHubCommitList(
  ownerName: string,
  repoName: string,
  token?: string,
):  ReturnType  {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const apiCommitsUrl = `https://api.github.com/repos/${ownerName}/${repoName}/commits?page=${page}`;
  const headers = new Headers({
    Authorization: token || "",
  });
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
          const newHasMore = data.length === 30;
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

  const getBranches = async () => {
     const apiUrl = `https://api.github.com/repos/${ownerName}/${repoName}/branches`;
 
    try {
      const response = await fetch(apiUrl, { headers });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data as Branch[];
    } catch (error) {
      console.error("Fetching branches failed:", error);
    }
  };
 
  return {
    commits,
    getBranches,
    loadMore,
    hasMore,
  };
}
