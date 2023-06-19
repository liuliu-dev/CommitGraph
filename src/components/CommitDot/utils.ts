import { CommitNode } from "../../helpers/types";

export function getCommitDotPosition(
  branchSpacing: number,
  commitSpacing: number,
  nodeRadius: number,
  commit: CommitNode
) {
  const x = branchSpacing * commit.y + nodeRadius * 4;
  const y = commitSpacing * commit.x + nodeRadius * 4;
  return { x, y };
}
