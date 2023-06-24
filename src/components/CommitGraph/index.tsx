import React, { use, useState } from "react";
import { CommitNode } from "../../helpers/types";
import { computePosition } from "./computePosition";
import BranchPath from "../BranchPath";
import {
  setBranchAndCommitColor,
  setCommitNodeColor,
} from "../../helpers/utils";
import CurvePath from "../Curves/CurvePath";
import CommitDetails from "../CommitDetails";
import css from "./index.module.css";
import {
  getMergedFromBranchHeadPositions,
  getNewBranchToPath,
} from "../Curves/utils";
import CommitDot from "../CommitDot";
import Branches from "../Branches";
import Curves from "../Curves";
export type Props = {
  commits: CommitNode[];

  commitSpacing: number;
  branchSpacing: number;
  branchColors: string[];
  nodeRadius: number;
};

export default function CommitGraph({
  commits,
  commitSpacing,
  branchSpacing,
  branchColors,
  nodeRadius,
}: Props) {
  const { columns, commitsMap } = computePosition(commits);
  const width = columns.length * (branchSpacing + nodeRadius * 2) + 3;

  const height =
    Math.max(
      ...columns.map((col) =>
        col[col.length - 1].end === Infinity
          ? col[col.length - 1].endCommit.x
          : col[col.length - 1].end
      )
    ) *
      (commitSpacing + nodeRadius * 2) +
    nodeRadius * 4 +
    3;
  setBranchAndCommitColor(columns, branchColors, commitsMap);
  const commitsArray = Array.from(commitsMap.values());

  return (
    <div className={css.container}>
      <svg width={width} height={height}>
        <Branches
          columns={columns}
          commitsMap={commitsMap}
          commitSpacing={commitSpacing}
          branchSpacing={branchSpacing}
          nodeRadius={nodeRadius}
        />
        <Curves
          commitsMap={commitsMap}
          commitsArray={commitsArray}
          commitSpacing={commitSpacing}
          branchSpacing={branchSpacing}
          nodeRadius={nodeRadius}
        />
        {commitsArray.map((commit) => {
          return (
            <CommitDot
              key={`${commit.hash}-dot`}
              commit={commit}
              commitSpacing={commitSpacing}
              branchSpacing={branchSpacing}
              nodeRadius={nodeRadius}
            />
          );
        })}
      </svg>

      {commitsArray.map((commit) => (
        <CommitDetails
          commit={commit}
          branchSpacing={branchSpacing}
          commitSpacing={commitSpacing}
          nodeRadius={nodeRadius}
          left={width + 20}
        />
      ))}
    </div>
  );
}
