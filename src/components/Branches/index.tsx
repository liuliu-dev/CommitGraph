import React from "react";
import { BranchPathType, CommitNode } from "../../helpers/types";
import { setCommitNodeColor } from "../../helpers/utils";
import BranchPath from "./BranchPath";

type Props = {
  columns: BranchPathType[][];
  commitSpacing: number;
  branchSpacing: number;
  nodeRadius: number;
  commitsMap: Map<string, CommitNode>;
};

export default function Branches({
  columns,
  commitsMap,
  commitSpacing,
  branchSpacing,
  nodeRadius,
}: Props) {
  return (
    <>
      {columns.map((column, i) => {
        return column.map((c) => {
          const end =
            c.end === Infinity ? commitsMap.get(c.endCommit.hash).x : c.end;
          return (
            <BranchPath
              key={`branch-path-${i}-${c.start}-${c.end}`}
              start={c.start}
              end={end}
              commitSpacing={commitSpacing}
              branchSpacing={branchSpacing}
              branchColor={c.color}
              branchOrder={i}
              nodeRadius={nodeRadius}
            />
          );
        });
      })}
    </>
  );
}
