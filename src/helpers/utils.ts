import { Commit } from "./types";
import React from "react";

type CommitNodes = {
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

export function getCommits(commitNodes: CommitNodes[]): Commit[] {
  let commits: Commit[] = [];
  const childrenMap: Map<string, Array<string>> = new Map();
  commitNodes.forEach((commit) => {
    commit.parents.forEach((parent) => {
      if (!!childrenMap[parent]) {
        childrenMap[parent].push(commit.hash);
      } else {
        childrenMap[parent] = [commit.hash];
      }
    });
  });
  commitNodes.forEach((commit) => {
    let c: Commit = {
      hash: commit.hash,
      parents: commit.parents,
      children: childrenMap[commit.hash] ?? [],
      committer: commit.committer.displayName,
      message: commit.message,
      committerDate: new Date(commit.committedAt),
      x: -1,
      y: -1,
    };
    commits.push(c);
  });
  return commits;
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
