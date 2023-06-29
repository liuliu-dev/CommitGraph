import React, { use, useState } from "react";
import { BranchType, Commit, GraphStyle } from "../../helpers/types";
import { computePosition } from "./computePosition";
import {
  defaultStyle,
  getCommits,
  setBranchAndCommitColor,
} from "../../helpers/utils";
import CommitDetails from "../CommitDetails";
import css from "./index.module.css";
import CommitDot from "../CommitDot";
import Branches from "../Branches";
import Curves from "../Curves";
import BranchLabel from "../BranchLabel";
import { getCommitDotPosition } from "../CommitDot/utils";

export type Props = {
  commits: Commit[];
  branchHeads: BranchType[];
  style?: GraphStyle;
};

export default function CommitGraph({ commits, style, branchHeads }: Props) {
  const commitNodes = getCommits(commits);
  const { commitSpacing, branchSpacing, branchColors, nodeRadius } = {
    ...defaultStyle,
    ...style,
  };
  const { columns, commitsMap } = computePosition(commitNodes);
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
  const commitsNodes = Array.from(commitsMap.values());

  return (
    <div className={css.container}>
      <div>
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
            commits={commitsNodes}
            commitSpacing={commitSpacing}
            branchSpacing={branchSpacing}
            nodeRadius={nodeRadius}
          />
          {commitsNodes.map((commit) => {
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
      </div>
      <div style={{ left: width + 20 }} className={css.commitInfoContainer}>
        {commitsNodes.map((commit) => {
          const { y } = getCommitDotPosition(
            branchSpacing,
            commitSpacing,
            nodeRadius,
            commit
          );
          const branch = branchHeads.filter(
            (b) => b.headCommitHash === commit.hash
          );

          return (
            <div style={{ top: y - nodeRadius * 2 }} className={css.details}>
              <CommitDetails commit={commit} />
              {!!branch.length && (
                <BranchLabel
                  branchName={branch[0].branchName}
                  branchColor={commit.commitColor}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
