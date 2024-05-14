import React from "react";
import CommitGraph from ".";
import { Branch, Commit, GraphStyle } from "../../helpers/types";
import InfiniteScroll from "react-infinite-scroller";
import css from "./index.module.css";

type Props = {
  commits: Commit[];
  branchHeads: Branch[];
  loadMore: () => void;
  hasMore: boolean;
  parentID?: string;
  graphStyle?: GraphStyle;
};

export default function WithInfiniteScroll({
  commits,
  branchHeads,
  loadMore,
  hasMore,
  parentID,
  graphStyle,
}: Props) {
  return (
    <div id="scroll-container" className={css.scrollContainer}>
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={hasMore}
        useWindow={false}
        initialLoad={false}
        loader={
          <div className={css.loader} key={0}>
            Loading graph...
          </div>
        }
        getScrollParent={() => parentID?document.getElementById(parentID):null}
      >
        <CommitGraph commits={commits} branchHeads={branchHeads} graphStyle={graphStyle}/>
      </InfiniteScroll>
    </div>
  );
}
