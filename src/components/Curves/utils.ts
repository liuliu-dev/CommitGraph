import { CommitNode } from "../../helpers/types";

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
      const endPoint = commit.x + 1 > parent.x ? parent.x : commit.x + 1;
      const height =
        Math.abs(parent.x - commit.x) * (commitSpacing + nodeRadius * 4);
      const width =
        Math.abs(parent.y - commit.y) * (branchSpacing + nodeRadius * 4);

      const end = getPositionsBySpacing(
        branchSpacing,
        commitSpacing,
        nodeRadius,
        endPoint,
        parent.y,
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
    if (child.parents[0] === commit.hash && child.y !== commit.y) {
      const start = getPositionsBySpacing(
        branchSpacing,
        commitSpacing,
        nodeRadius,
        commit.x,
        commit.y,
      );

      const endPoint = commit.x - 1 > child.x ? commit.x - 1 : child.x;

      const end = getPositionsBySpacing(
        branchSpacing,
        commitSpacing,
        nodeRadius,
        endPoint,
        child.y,
      );
      const height =
        Math.abs(child.x - commit.x) * (commitSpacing + nodeRadius * 4);
      const width =
        Math.abs(child.y - commit.y) * (branchSpacing + nodeRadius * 4) + 4;

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
  const dx = (end[0] - start[0]) * 0.3;
  const dy = (start[1] - end[1]) * 0.4;

  const cx2 = end[0] - dx * 0.1;
  const cy2 = end[1] + dy;
  const cx1 = start[0] + dx * 3;
  const cy1 = start[1] - dy;

  return `M ${start[0]} ${start[1]} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${end[0]} ${end[1]}`;
}

function getPositionsBySpacing(
  branchSpacing: number,
  commitSpacing: number,
  nodeRadius: number,
  x: number,
  y: number,
) {
  const realX = branchSpacing * y + nodeRadius * 4;
  const realY = commitSpacing * x + nodeRadius * 2;
  return [realX, realY];
}
