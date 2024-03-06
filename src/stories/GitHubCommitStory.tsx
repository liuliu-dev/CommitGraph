import CommitGraph from "../components/CommitGraph";
import { Branch } from "../helpers/types";
import { useGitHubCommitList } from "./useGitHubCommitList";
import React, { use, useEffect, useState } from "react";

type Props = {
  repoName: string;
  ownerName: string;
};

export default function GitHubCommitStory({ repoName, ownerName }: Props) {
  const { commits, hasMore, loadMore,getBranches } = useGitHubCommitList(
    ownerName,
    repoName,
  );
  const [branchHeads, setBranchHeads] = useState<Branch[]| undefined>([]);
  useEffect(() => {
  try {
    getBranches().then((branches) => {
      setBranchHeads(branches);
    });
  }catch (e) {
    console.error("Fetching branches failed:", e);
  }},[])

  return (
    <CommitGraph.WithPagination
      commits={commits}
      loadMore={loadMore}
      hasMore={hasMore}
      branchHeads={branchHeads||[]}
    />
  );
}
