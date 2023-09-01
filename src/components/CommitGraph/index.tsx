import React, { useState } from "react";
import { BranchType, Commit, GraphStyle } from "../../helpers/types";
import {
  defaultStyle,
  getCommits,
  setBranchAndCommitColor,
} from "../../helpers/utils";
import Branches from "../Branches";
import CommitDetails from "../CommitDetails";
import CommitDot from "../CommitDot";
import { getCommitDotPosition } from "../CommitDot/utils";
import Curves from "../Curves";
import { computePosition } from "./computePosition";
import css from "./index.module.css";

export type Props = {
  commits: Commit[];
  branchHeads: BranchType[];
  graphStyle?: GraphStyle;
};

export default function CommitGraph({
  commits,
  graphStyle,
  branchHeads,
}: Props) {
  const [showBlock, setShowBlock] = useState(false);
  const [topPos, setTopPos] = useState(0);

  const commitNodes = getCommits(commits);
  const { commitSpacing, branchSpacing, branchColors, nodeRadius } = {
    ...defaultStyle,
    ...graphStyle,
  };
  const { columns, commitsMap } = computePosition(commitNodes);
  const width = columns.length * (branchSpacing + nodeRadius * 2) + 3;
  // the position of the last commit is Math.max(...Array.from(commitsMap.values()).map((c) => c.x)), and 64 is the height of the commit details.
  const height =
    Math.max(...Array.from(commitsMap.values()).map(c => c.x)) * commitSpacing +
    nodeRadius * 8 +
    64;
  setBranchAndCommitColor(columns, branchColors, commitsMap);
  const commitsNodes = Array.from(commitsMap.values());
  const commitInfoLeftPosition = getCommitInfoLeftPosition(width);

  return (
    <div className={css.container}>
      <div className={css.svg}>
        <svg width={width} height={height}>
          <Branches
            columns={columns}
            commitsMap={commitsMap}
            commitSpacing={commitSpacing}
            branchSpacing={branchSpacing}
            nodeRadius={nodeRadius}
            branchColors={branchColors}
          />
          <Curves
            commitsMap={commitsMap}
            commits={commitsNodes}
            commitSpacing={commitSpacing}
            branchSpacing={branchSpacing}
            nodeRadius={nodeRadius}
          />
          {commitsNodes.map(commit => {
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
      <div
        style={{
          left: commitInfoLeftPosition,
          width: `calc(100% - ${commitInfoLeftPosition}px)`,
        }}
        className={css.commitInfoContainer}
      >
        {commitsNodes.map(commit => {
          const { y } = getCommitDotPosition(
            branchSpacing,
            commitSpacing,
            nodeRadius,
            commit,
          );
          const branch = branchHeads.filter(
            b => b.headCommitHash === commit.hash,
          );
          const mouseOver = () => {
            setShowBlock(true);
            setTopPos(y);
          };
          const mouseLeave = () => {
            setShowBlock(false);
          };
          return (
            <div
              style={{ top: `calc(${y}px - 2rem)` }}
              className={css.details}
              key={`commit-details-${commit.hash}`}
            >
              <CommitDetails
                commit={commit}
                branch={branch}
                mouseOver={mouseOver}
                mouseLeave={mouseLeave}
              />
            </div>
          );
        })}
      </div>
      {showBlock && (
        <div
          style={{
            left: -5,
            top: `calc(${topPos}px - 2rem)`,
            height: "4rem",
            width: "100%",
          }}
          className={css.block}
        />
      )}
    </div>
  );
}

function getCommitInfoLeftPosition(width: number) {
  if (width < 250) {
    return 250;
  }
  if (width < 500) {
    return width + 10;
  }
  return 510;
}
