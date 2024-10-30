import React from "react";
import CommitGraph from ".";
import { Branch, Commit, CommitNode, Diff, GraphStyle } from "../../types";
import InfiniteScroll from "react-infinite-scroller";
import css from "./index.module.css";

type Props = {
  commits: Commit[];
  branchHeads: Branch[];
  loadMore: () => void;
  hasMore: boolean;
  parentID?: string;
  graphStyle?: GraphStyle;
  dateFormatFn?: (d: string | number | Date) => string;
  currentBranch?: string;
  fullSha?: boolean;
  onCommitClick?: (commit: CommitNode) => void;
  getDiff?: (base: string, head: string) => Promise<Diff | undefined>;
};

export default function WithInfiniteScroll(props: Props) {
  return (
    <div id="scroll-container" className={css.scrollContainer}>
      <InfiniteScroll
        loadMore={props.loadMore}
        hasMore={props.hasMore}
        useWindow={props.parentID ? false : true}
        initialLoad={false}
        loader={
          <div className={css.loader} key={0}>
            Loading graph...
          </div>
        }
        getScrollParent={() =>
          props.parentID ? document.getElementById(props.parentID) : null
        }
      >
        <CommitGraph {...props} />
      </InfiniteScroll>
    </div>
  );
}
