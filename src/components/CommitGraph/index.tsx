import React, { useState } from "react";
import { Branch, Commit, GraphStyle } from "../../helpers/types";
import {
  defaultStyle,
  formatCommits,
  setBranchAndCommitColor,
} from "../../helpers/utils";
import Branches from "../Branches";
import CommitDetails from "../CommitDetails";
import CommitDot from "../CommitDot";
import { getCommitDotPosition } from "../CommitDot/utils";
import Curves from "../Curves";
import { computePosition } from "./computePosition";
import css from "./index.module.css";
import WithInfiniteScroll from "./WithInfiniteScroll";

export type Props = {
  commits: Commit[];
  branchHeads: Branch[];
  graphStyle?: GraphStyle;
  dateFormatFn?: (d: string | number | Date) => string;
  currentBranch?: string;
  fullSha?: boolean;
  onClick?: (
    commit: Commit,
    event?: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => void;
  selected?: string[];
};

export default function CommitGraph({
  commits,
  graphStyle,
  branchHeads,
  dateFormatFn,
  currentBranch,
  fullSha,
  onClick,
  selected,
}: Props) {
  const [showBlock, setShowBlock] = useState(false);
  const [topPos, setTopPos] = useState(0);

  const commitNodes = formatCommits(commits);
  const { commitSpacing, branchSpacing, branchColors, nodeRadius } = {
    ...defaultStyle,
    ...graphStyle,
  };
  const { columns, commitsMap } = computePosition(commitNodes);
  const width = columns.length * (branchSpacing + nodeRadius * 2) + 3;
  // the position of the last commit is Math.max(...Array.from(commitsMap.values()).map((c) => c.x)), and 64 is the height of the commit details.
  const height = commitsMap.size
    ? Math.max(...Array.from(commitsMap.values()).map(c => c.y)) *
        commitSpacing +
      nodeRadius * 8 +
      64
    : 0;
  setBranchAndCommitColor(columns, branchColors, commitsMap);
  const commitsNodes = Array.from(commitsMap.values());
  const commitInfoLeftPosition = getCommitInfoLeftPosition(width);

  const selectionOffsets: number[] = [];

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
        {commitsNodes.map((commit, index) => {
          const { y } = getCommitDotPosition(
            branchSpacing,
            commitSpacing,
            nodeRadius,
            commit,
          );

          if (selected?.includes(commit.hash)) {
            selectionOffsets.push(y);
          }

          const branch = branchHeads.filter(b => b.commit.sha === commit.hash);
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
                dateFormatFn={dateFormatFn}
                currentBranch={currentBranch}
                fullSha={fullSha}
                onClick={
                  onClick
                    ? (
                        event:
                          | React.MouseEvent<HTMLDivElement>
                          | React.TouchEvent<HTMLDivElement>,
                      ) => onClick(commits[index], event)
                    : undefined
                }
              />
            </div>
          );
        })}
      </div>
      {selectionOffsets.map((offset, index) => (
        <div
          key={`selections-${index}`}
          style={{
            left: -5,
            top: `calc(${offset}px - 1.75rem)`,
            height: "3.5rem",
            width: "100%",
            backgroundColor: "lightgreen",
            opacity: 0.3,
          }}
          className={css.block}
        />
      ))}
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

CommitGraph.WithInfiniteScroll = WithInfiniteScroll;
