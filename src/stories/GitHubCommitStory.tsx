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
    />
  );
}
