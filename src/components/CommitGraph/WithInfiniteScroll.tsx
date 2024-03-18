import React from "react";
import CommitGraph from ".";
import { Branch, Commit } from "../../helpers/types";
import InfiniteScroll from "react-infinite-scroller";
import css from "./index.module.css";

type Props = {
  commits: Commit[];
  branchHeads: Branch[];
  loadMore: () => void;
  hasMore: boolean;
};

export default function WithInfiniteScroll({
  commits,
  branchHeads,
  loadMore,
  hasMore,
}: Props) {
  return (
    <div id="scroll-container" className={css.scrollContainer}>
      <InfiniteScroll
        loadMore={async () => loadMore()}
        hasMore={hasMore}
        initialLoad={true}
        loader={<div>Loading graph...</div>}
      >
        <CommitGraph commits={commits} branchHeads={branchHeads} />
      </InfiniteScroll>
    </div>
  );
}
