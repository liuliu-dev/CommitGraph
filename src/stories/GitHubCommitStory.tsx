import CommitGraph from "../components/CommitGraph";
import { useGitHubBranchList } from "./useGitHubBranchList";
import { useGitHubCommitList } from "./useGitHubCommitList";
import React from "react";

type Props = {
  repoName: string;
  ownerName: string;
};

export default function GitHubCommitStory({ repoName, ownerName }: Props) {
  const { commits, hasMore, loadMore } = useGitHubCommitList(
    ownerName,
    repoName,
  );

  const { branches } = useGitHubBranchList(ownerName, repoName);

  return (
    <CommitGraph.WithInfiniteScroll
      commits={commits}
      loadMore={loadMore}
      hasMore={hasMore}
      branchHeads={branches}
      dateFormatFn={customDateTimeFormatFn}
    />
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
