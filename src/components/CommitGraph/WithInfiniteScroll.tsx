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
  dateFormatFn?: (d: string | number | Date) => string;
};

export default function WithInfiniteScroll({
  commits,
  branchHeads,
  loadMore,
  hasMore,
  parentID,
  graphStyle,
  dateFormatFn,
}: Props) {
   return (
    <div id="scroll-container" className={css.scrollContainer}>
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={hasMore}
        useWindow={parentID?false:true}
        initialLoad={false}
        loader={
          <div className={css.loader} key={0}>
            Loading graph...
          </div>
        }
        getScrollParent={() => parentID?document.getElementById(parentID):null}
      >
        <CommitGraph commits={commits} branchHeads={branchHeads} graphStyle={graphStyle} dateFormatFn={dateFormatFn}/>
      </InfiniteScroll>
    </div>
  );
}
