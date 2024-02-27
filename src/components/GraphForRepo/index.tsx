import React, { useEffect } from "react";
import CommitGraph from "../CommitGraph";
import InfiniteScroll from "react-infinite-scroller";
import { BranchType, GitBranch } from "../../helpers/types";
import { useCommitList } from "./useCommitList";
import css from "./index.module.css";

type Props = {
  repoName: string;
  ownerName: string;
  token: string;
};

export default function GraphForRepo({ ownerName, repoName, token }: Props) {
  const [branchHeads, setBranchHeads] = React.useState<BranchType[]>([]);
  const { commits, hasMore, loadMore } = useCommitList(
    ownerName,
    repoName,
    token,
  );

  const getBranches = async () => {
    const apiUrl = `https://api.github.com/repos/${ownerName}/${repoName}/branches`;
    const headers = new Headers({
      Authorization: token,
    });
    try {
      const response = await fetch(apiUrl, { headers });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const branchesHeads: BranchType[] = data.map((branch: GitBranch) => ({
        branchName: branch.name,
        headCommitHash: branch.commit.sha,
        branchLink: branch.commit.url,
      }));
      return branchesHeads;
    } catch (error) {
      console.error("Fetching branches failed:", error);
    }
  };

  useEffect(() => {
    getBranches().then(branches => {
      if (branches) setBranchHeads(branches);
    });
  }, []);

  return (
    <div id="main-content" className={css.container}>
      <InfiniteScroll
        loadMore={async () => loadMore()}
        hasMore={hasMore}
        useWindow={false}
        initialLoad={true}
        loader={<div>Loading graph...</div>}
        getScrollParent={() => document.getElementById("main-content")}
      >
        <CommitGraph commits={commits} branchHeads={branchHeads} />
      </InfiniteScroll>
    </div>
  );
}
