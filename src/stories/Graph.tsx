import CommitGraph from "../components/CommitGraph";
import { Diff, GraphStyle } from "../types";
import { useGitHubBranchList } from "./useGitHubBranchList";
import { useGitHubCommitList } from "./useGitHubCommitList";
import React from "react";
import css from "./index.module.css";

export type Props = {
  repoName: string;
  ownerName: string;
  graphStyle?: GraphStyle;
  token?: string;
  getDiff?: (base: string, head: string) => Promise<Diff | undefined>;
};

export default function Graph({
  repoName,
  ownerName,
  graphStyle,
  token,
  getDiff,
}: Props) {
  const { commits, hasMore, loadMore, error } = useGitHubCommitList(
    ownerName,
    repoName,
    token,
  );
  const { branches, error: branchError } = useGitHubBranchList(
    ownerName,
    repoName,
    token,
  );
  const repoUrl = `https://github.com/${ownerName}/${repoName}`;

  if (error || branchError) {
    return <div className={css.error}>{error || branchError}</div>;
  }

  return (
    <div>
      <a href={repoUrl}>{repoUrl}</a>
      <CommitGraph.WithInfiniteScroll
        commits={commits}
        loadMore={loadMore}
        hasMore={hasMore}
        branchHeads={branches}
        dateFormatFn={customDateTimeFormatFn}
        graphStyle={graphStyle}
        getDiff={getDiff}
      />
    </div>
  );
}

const customDateTimeFormatFn = (d: string | number | Date): string => {
  return new Date(d).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
