import React, { use, useState } from "react";
import { CommitNode } from "../../helpers/types";
import { computePosition } from "./computePosition";
import BranchPath from "../BranchPath";
import { setCommitNodeColor } from "../../helpers/utils";
import CurvePath from "../CurvePath";
import CommitDetails from "../CommitDetails";
import css from "./index.module.css";
import {
  getMergedFromBranchHeadPositions,
  getNewBranchToPath,
} from "../CurvePath/utils";
import CommitDot from "../CommitDot";
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
  let branchCount = 0;

  return (
    <div className={css.container}>
      <svg width={width} height={height}>
        {columns.map((column, i) => {
          return column.map((c) => {
            const branchColor = branchColors[branchCount % branchColors.length];
            branchCount++;
            setCommitNodeColor(c, i, commitsMap, branchColor);
            const end =
              c.end === Infinity ? commitsMap.get(c.endCommit.hash).x : c.end;
            return (
              <BranchPath
                key={`branch-path-${i}-${c.start}-${c.end}`}
                start={c.start}
                end={end}
                commitSpacing={commitSpacing}
                branchSpacing={branchSpacing}
                branchColor={branchColor}
                branchOrder={i}
                nodeRadius={nodeRadius}
              />
            );
          });
        })}
        {Array.from(commitsMap.values()).map((commit) => {
          const mergedCurves = getMergedFromBranchHeadPositions(
            commit,
            commitsMap,
            branchSpacing,
            commitSpacing,
            nodeRadius
          );

          const newBranchCurves = getNewBranchToPath(
            commit,
            commitsMap,
            branchSpacing,
            commitSpacing,
            nodeRadius
          );

          return (
            <>
              {newBranchCurves &&
                newBranchCurves.map((c) => {
                  return (
                    <CurvePath
                      key={`${commit.hash}-curved-up-path-${c[0]}`}
                      commit={commit}
                      curve={c}
                    />
                  );
                })}
              {mergedCurves &&
                mergedCurves.map((curve) => {
                  return (
                    <CurvePath
                      key={`${commit.hash}-curved-down-path-${curve[0]}}`}
                      commit={commit}
                      curve={curve}
                    />
                  );
                })}

              <CommitDot
                key={`${commit.hash}-dot`}
                commit={commit}
                commitSpacing={commitSpacing}
                branchSpacing={branchSpacing}
                nodeRadius={nodeRadius}
              />
            </>
          );
        })}
      </svg>

      {Array.from(commitsMap.values()).map((commit) => (
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
