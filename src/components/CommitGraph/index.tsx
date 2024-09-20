import React, { useState } from "react";
import { Branch, Commit, CommitNode, GraphStyle } from "../../helpers/types";
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
import cx from "classnames";

export type Props = {
  commits: Commit[];
  branchHeads: Branch[];
  graphStyle?: GraphStyle;
  dateFormatFn?: (d: string | number | Date) => string;
  currentBranch?: string;
  fullSha?: boolean;
  onCommitClick?: (commit: CommitNode) => void;
};

export default function CommitGraph({
  commits,
  graphStyle,
  branchHeads,
  dateFormatFn,
  currentBranch,
  fullSha,
  onCommitClick,
}: Props) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hoverPos, setHoverPos] = useState(0);
  const [clickedPos, setClickedPos] = useState(0);

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
          const branch = branchHeads.filter(b => b.commit.sha === commit.hash);
          const mouseOver = () => {
            setHovered(true);
            setHoverPos(y);
          };
          const mouseLeave = () => {
            setHovered(false);
          };
          const onClick = () => {
            if (onCommitClick) {
              onCommitClick(commit);
            }
            if (y === clickedPos) {
              setClicked(!clicked);
              return;
            }
            setClicked(true);
            setClickedPos(y);
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
                onClick={onClick}
                dateFormatFn={dateFormatFn}
                currentBranch={currentBranch}
                fullSha={fullSha}
              />
            </div>
          );
        })}
      </div>
      {hovered && <ColorBlock pos={hoverPos} className={css.hovered} />}
      {clicked && <ColorBlock pos={clickedPos} className={css.clicked} />}
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

type ColorBlockProps = {
  pos: number;
  className: string;
};

function ColorBlock({ pos, className }: ColorBlockProps) {
  return (
    <div
      style={{
        left: -5,
        top: `calc(${pos}px - 2rem)`,
        height: "4rem",
        width: "100%",
      }}
      className={cx(css.block, className)}
    />
  );
}
