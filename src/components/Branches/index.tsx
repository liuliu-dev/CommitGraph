import React from "react";
import { BranchPathType, CommitNode } from "../../helpers/types";
import BranchPath from "./BranchPath";

type Props = {
  columns: BranchPathType[][];
  commitSpacing: number;
  branchSpacing: number;
  nodeRadius: number;
  commitsMap: Map<string, CommitNode>;
  branchColors: string[];
};

export default function Branches({
  columns,
  commitsMap,
  commitSpacing,
  branchSpacing,
  nodeRadius,
  branchColors,
}: Props) {
  // use the current end most commit's position to paint the other unfinished branches' path, so all the straight lines go to the end
  const currentLastCommits =
    Math.max(...Array.from(commitsMap.values()).map(c => c.x)) * commitSpacing +
    nodeRadius * 4;

  return (
    <>
      {columns.map((column, i) => {
        return column.map(c => {
          const end = c.end === Infinity ? currentLastCommits : c.end;
          return (
            <BranchPath
              key={`branch-path-${i}-${c.start}-${c.end}`}
              start={c.start}
              end={end}
              commitSpacing={commitSpacing}
              branchSpacing={branchSpacing}
              branchColor={
                c.color || branchColors[c.branchOrder % branchColors.length]
              }
              branchOrder={i}
              nodeRadius={nodeRadius}
            />
          );
        });
      })}
    </>
  );
}
