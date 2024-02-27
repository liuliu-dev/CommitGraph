import { useState } from "react";
import { Commit, GitCommit } from "../../helpers/types";

type ReturnType = {
  commits: Commit[];
  hasMore: boolean;
  loadMore: () => Promise<void>;
};

export function useCommitList(
  ownerName: string,
  repoName: string,
  token: string,
): ReturnType {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const apiCommitsUrl = `https://api.github.com/repos/${ownerName}/${repoName}/commits?page=${page}`;
  const headers = new Headers({
    Authorization: token,
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
          const newCommits: Commit[] = data.map((commit: GitCommit) => {
            return {
              hash: commit.sha,
              ownerName: ownerName,
              repoName: repoName,
              committer: {
                username: commit.author?.login || commit.commit.author.name,
                displayName: commit.commit.author.name,
                emailAddress: commit.commit.author.email,
              },
              message: commit.commit.message,
              parents: commit.parents.map(p => p.sha),
              committedAt: Date.parse(commit.commit.committer.date),
              commitLink: commit.html_url,
            };
          });
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

  return {
    commits,
    loadMore,
    hasMore,
  };
}
