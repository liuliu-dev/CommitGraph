import CommitGraph from "../components/CommitGraph";
import { Commit, GraphStyle } from "../helpers/types";
import { useGitHubBranchList } from "./useGitHubBranchList";
import { useGitHubCommitList } from "./useGitHubCommitList";
import React from "react";

export type Props = {
  repoName: string;
  ownerName: string;
  graphStyle?: GraphStyle;
};

export default function Graph({ repoName, ownerName, graphStyle }: Props) {
  const { commits, hasMore, loadMore } = useGitHubCommitList(
    ownerName,
    repoName,
  );

  const { branches } = useGitHubBranchList(ownerName, repoName);
  const repoUrl = `https://github.com/${ownerName}/${repoName}`;

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
        onClick={(commit: Commit) => console.log("Clicked", commit)}
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
