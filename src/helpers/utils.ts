import { CommitNode, BranchPathType, Commit } from "./types";
import React from "react";

export const defaultStyle = {
  commitSpacing: 90,
  branchSpacing: 20,
  nodeRadius: 2,
  branchColors: [
    "#010A40",
    "#FC42C9",
    "#3D91F0",
    "#29E3C1",
    "#C5A15A",
    "#FA7978",
    "#5D6280",
    "#5AC58D",
    "#5C5AC5",
    "#EB7340",
  ],
};

export function getCommits(commits: Commit[]): CommitNode[] {
  const childrenMap: Map<string, Array<string>> = new Map();
  commits.forEach(commit => {
    commit.parents.forEach(parent => {
      if (childrenMap.get(parent)) {
        childrenMap.get(parent)?.push(commit.hash);
      } else {
        childrenMap.set(parent, [commit.hash]);
      }
    });
  });
  return commits.map(commit => {
    return {
      hash: commit.hash,
      parents: commit.parents,
      children: childrenMap.get(commit.hash) ?? [],
      committer: commit.committer.displayName,
      message: commit.message,
      committerDate: new Date(commit.committedAt),
      commitLink: commit.commitLink,
      commitColor: "",
      x: -1,
      y: -1,
    };
  });
}

function hexToColorMatrixVariant(hex?: string): string {
  if (!hex) {
    return "";
  }
  const r = parseInt(hex.substring(1, 3), 16) / 255;
  const g = parseInt(hex.substring(3, 5), 16) / 255;
  const b = parseInt(hex.substring(5, 7), 16) / 255;
  return `0 0 0 0 ${r} 0 0 0 0 ${g} 0 0 0 0 ${b} 0 0 0 0.5 0`;
}

function rgbColorToMatrixVariant(rgb: string): string {
  const [r, g, b] = rgb.toLowerCase()
    .replace("rgb(", "")
    .replace(")", "")
    .split(",")
    .map(x => parseInt(x) / 255);
  return `0 0 0 0 ${r} 0 0 0 0 ${g} 0 0 0 0 ${b} 0 0 0 0.5 0`;
}

export function convertColorToMatrixVariant(color: string): string {
  if (color.startsWith("#")) {
    return hexToColorMatrixVariant(color);
  }
  return rgbColorToMatrixVariant(color);
}

export function setCommitNodeColor(
  branch: BranchPathType,
  columnNumber: number,
  commitsMap: Map<string, CommitNode>,
  branchColor: string,
) {
  commitsMap.forEach(commit => {
    if (
      commit.y === columnNumber &&
      branch.start <= commit.x &&
      branch.end >= commit.x
    ) {
      commit.commitColor = branchColor;
    }
  });
}

export function setBranchAndCommitColor(
  columns: BranchPathType[][],
  branchColors: string[],
  commitsMap: Map<string, CommitNode>,
) {
  columns.map((column, i) => {
    column.map(c => {
      const branchColor = branchColors[c.branchOrder % branchColors.length];
      c.color = branchColor;
      setCommitNodeColor(c, i, commitsMap, branchColor);
    });
  });
}
