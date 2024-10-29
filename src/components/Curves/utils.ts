import { CommitNode } from "../../types";

export type CurveReturnType = {
  path: string;
  stroke: string;
  id: string;
  width: number;
  height: number;
  x: number;
  y: number;
};

export function getMergedFromBranchHeadPositions(
  commit: CommitNode,
  commitsMap: Map<string, CommitNode>,
  branchSpacing: number,
  commitSpacing: number,
  nodeRadius: number,
): CurveReturnType[] {
  if (commit.parents.length < 2) {
    return [];
  }
  let mergedFromBranchHeadPositions: CurveReturnType[] = [];

  for (let i = 1; i < commit.parents.length; i++) {
    const parent = commitsMap.get(commit.parents[i]);
    if (parent) {
      const start = getPositionsBySpacing(
        branchSpacing,
        commitSpacing,
        nodeRadius,
        commit.x,
        commit.y,
      );
      const endPoint = commit.y + 1 > parent.y ? parent.y : commit.y + 1;
      const height =
        Math.abs(parent.y - commit.y) * (commitSpacing + nodeRadius * 4);
      const width =
        Math.abs(parent.x - commit.x) * (branchSpacing + nodeRadius * 4);

      const end = getPositionsBySpacing(
        branchSpacing,
        commitSpacing,
        nodeRadius,
        parent.x,
        endPoint,
      );
      mergedFromBranchHeadPositions.push({
        path: curvePath(start, end),
        stroke: parent.commitColor,
        id: `filter_${commit.hash.slice(0, 7)}_curved_path_${parent.hash.slice(
          0,
          7,
        )}`,
        x: start[0],
        y: start[1],
        width,
        height,
      });
    }
  }
  return mergedFromBranchHeadPositions;
}

export function getNewBranchToPath(
  commit: CommitNode,
  commitsMap: Map<string, CommitNode>,
  branchSpacing: number,
  commitSpacing: number,
  nodeRadius: number,
): Array<CurveReturnType> {
  if (commit.children.length < 2) {
    return [];
  }
  let newBranchToPositions: Array<CurveReturnType> = [];
  commit.children.forEach(c => {
    const child = commitsMap.get(c)!;
    if (child.parents[0] === commit.hash && child.x !== commit.x) {
      const start = getPositionsBySpacing(
        branchSpacing,
        commitSpacing,
        nodeRadius,
        commit.x,
        commit.y,
      );

      const endPoint = commit.y - 1 > child.y ? commit.y - 1 : child.y;

      const end = getPositionsBySpacing(
        branchSpacing,
        commitSpacing,
        nodeRadius,
        child.x,
        endPoint,
      );
      const height =
        Math.abs(child.y - commit.y) * (commitSpacing + nodeRadius * 4);
      const width =
        Math.abs(child.x - commit.x) * (branchSpacing + nodeRadius * 4) + 4;

      newBranchToPositions.push({
        path: curvePath(start, [end[0], end[1] + nodeRadius * 2]),
        stroke: child.commitColor,
        id: `filter_${commit.hash.slice(0, 7)}_curved_path_${child.hash.slice(
          0,
          7,
        )}`,
        x: start[0],
        y: end[1],
        width,
        height,
      });
    }
  });

  return newBranchToPositions;
}

function curvePath(start: number[], end: number[]) {
  const cx2 = start[0] * 0.03 + end[0] * 0.97;
  const cy2 = start[1] * 0.4 + end[1] * 0.6;
  const cx1 = start[0] * 0.1 + end[0] * 0.9;
  const cy1 = start[1] * 0.6 + end[1] * 0.4;

  return `M ${start[0]} ${start[1]} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${end[0]} ${end[1]}`;
}

function getPositionsBySpacing(
  branchSpacing: number,
  commitSpacing: number,
  nodeRadius: number,
  x: number,
  y: number,
) {
  const realX = branchSpacing * x + nodeRadius * 4;
  const realY = commitSpacing * y + nodeRadius * 2;
  return [realX, realY];
}
