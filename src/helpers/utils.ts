import { CommitNode, BranchPathType } from "./types";
import React from "react";

type Commit = {
  hash: string;
  ownerName: string;
  repoName: string;
  committer: {
    username: string;
    displayName: string;
    emailAddress: string;
  };
  message: string;
  parents: string[];
  committedAt: number;
};

export function getCommits(commits: Commit[]): CommitNode[] {
  const childrenMap: Map<string, Array<string>> = new Map();
  commits.forEach((commit) => {
    commit.parents.forEach((parent) => {
      if (!!childrenMap[parent]) {
        childrenMap[parent].push(commit.hash);
      } else {
        childrenMap[parent] = [commit.hash];
      }
    });
  });
  return commits.map((commit) => {
    return {
      hash: commit.hash,
      parents: commit.parents,
      children: childrenMap[commit.hash] ?? [],
      committer: commit.committer.displayName,
      message: commit.message,
      committerDate: new Date(commit.committedAt),
      x: -1,
      y: -1,
    };
  });
}

export function hexToColorMatrixVariant(hex?: string): string {
  if (!hex) {
    return "";
  }
  const r = parseInt(hex.substring(1, 3), 16) / 255;
  const g = parseInt(hex.substring(3, 5), 16) / 255;
  const b = parseInt(hex.substring(5, 7), 16) / 255;
  return `0 0 0 0 ${r} 0 0 0 0 ${g} 0 0 0 0 ${b} 0 0 0 0.5 0`;
}

export function setCommitNodeColor(
  branch: BranchPathType,
  columnNumber: number,
  commitsMap: Map<string, CommitNode>,
  branchColor: string
) {
  commitsMap.forEach((commit) => {
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
  commitsMap: Map<string, CommitNode>
) {
  columns.map((column, i) => {
    column.map((c) => {
      const branchColor = branchColors[c.branchOrder % branchColors.length];
      c.color = branchColor;
      setCommitNodeColor(c, i, commitsMap, branchColor);
    });
  });
}
