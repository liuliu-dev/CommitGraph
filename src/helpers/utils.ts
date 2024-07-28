import { CommitNode, BranchPathType, Commit } from "./types";

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

export function formatCommits(commits: Commit[]): CommitNode[] {
  const childrenMap: Map<string, Array<string>> = new Map();
  commits.forEach(commit => {
    commit.parents.forEach(parent => {
      if (childrenMap.get(parent.sha)) {
        childrenMap.get(parent.sha)?.push(commit.sha);
      } else {
        childrenMap.set(parent.sha, [commit.sha]);
      }
    });
  });
  return commits.map(commit => {
    return {
      hash: commit.sha,
      parents: commit.parents.map(p => p.sha),
      children: childrenMap.get(commit.sha) ?? [],
      committer: commit.commit.author.name,
      message: commit.commit.message,
      commitDate: new Date(commit.commit.author.date),
      commitLink: commit.html_url,
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
  const [r, g, b] = rgb
    .toLowerCase()
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
      commit.x === columnNumber &&
      branch.start <= commit.y &&
      branch.end >= commit.y
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
