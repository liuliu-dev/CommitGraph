import { CommitNode } from "../../types";

export function getCommitDotPosition(
  branchSpacing: number,
  commitSpacing: number,
  nodeRadius: number,
  commit: CommitNode,
) {
  const x = branchSpacing * commit.x + nodeRadius * 4;
  const y = commitSpacing * commit.y + nodeRadius * 4;
  return { x, y };
}
