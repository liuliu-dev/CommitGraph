import React from "react";
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
  // the position of the last commit is Math.max(...Array.from(commitsMap.values()).map((c) => c.x)), and 64 is the height of the commit details.
  const height =
    Math.max(...Array.from(commitsMap.values()).map((c) => c.x)) *
      commitSpacing +
    nodeRadius * 8 +
    64;
  setBranchAndCommitColor(columns, branchColors, commitsMap);
  const commitsNodes = Array.from(commitsMap.values());

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
      <div
        style={{
          left: width < 250 ? 250 : width,
          width: width < 250 ? `calc(100% - 250px)` : `calc(100% - ${width}px)`,
        }}
        className={css.commitInfoContainer}
      >
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
            <div className={css.wrapper}>
              <div
                style={{ top: `calc(${y}px - 2rem)` }}
                className={css.details}
                key={`commit-details-${commit.hash}`}
              >
                <CommitDetails commit={commit} branch={branch} />
              </div>
              <div
                style={{
                  left: width < 250 ? -255 : -width - 5,
                  top: `calc(${y}px - 2rem)`,
                  height: "4rem",
                  width:
                    width < 250
                      ? `calc(100% + ${250 - nodeRadius * 2 - 1.5}px)`
                      : `calc(100% + ${width - nodeRadius * 2 - 1.5}px)`,
                }}
                className={css.block}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
