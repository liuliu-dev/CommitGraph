import { CommitNode } from "../../helpers/types";

function computePositionX(
  commits: CommitNode[],
  commitsMap: Map<string, CommitNode>,
  seen: Map<string, boolean>
) {
  // sort commits by committer date from latest to oldest
  const commitsSortByCommitterDate = commits.sort(
    (a, b) => b.committerDate.getTime() - a.committerDate.getTime()
  );

  let sortedCommits: CommitNode[] = [];
  let i = 0;

  function dfs(commit: CommitNode) {
    const commitHash = commit.hash;
    if (seen.get(commitHash)) {
      return;
    }
    seen.set(commitHash, true);
    commit.children.forEach((children) => {
      dfs(commitsMap.get(children)!);
    });
    commit.x = i;
    i++;
    sortedCommits.push(commit);
    return { i, sortedCommits, seen };
  }

  // compute topological order of commits
  commitsSortByCommitterDate.forEach((commit) => {
    dfs(commit);
  });
  return { sortedCommits, commitsMap };
}

function checkOverlap(startCol: number, gap: number[], columns: number[][]) {
  for (let i = startCol; i < columns.length; i++) {
    const column = columns[i];
    const last = column[column.length - 1];
    if (gap[0] >= last[1]) {
      return i;
    }
  }
  return -1;
}

function computePositionY(
  computedXCommits: CommitNode[],
  columns: number[][],
  commitsMap: Map<string, CommitNode>
) {
  computedXCommits.forEach((commit, n) => {
    // if the commit does not have any children, then it's the head of a branch, and it should be at a new column
    if (commit.children.length === 0) {
      columns.push([commit.x, Infinity]);
      commit.y = columns.length - 1;
      return;
    }

    const branchChildrenY = commit.children
      .filter((child) => commitsMap.get(child)!.parents[0] === commit.hash)
      .map((child) => commitsMap.get(child)!.y);

    // if the commit is the first parent of its children (extension of a branch), then it should be at the same y as the left most child, and delete other children's y from the forbiddenY map
    if (branchChildrenY.length > 0) {
      commit.y = Math.min(...branchChildrenY);

      // update the column to put the new commit node in
      const last = columns[commit.y].pop();
      columns[commit.y].push(commit.x);
      return;
    }

    const mergeChildrenY: number[] = [];
    const mergeChildrenX: number[] = [];
    commit.children
      .filter((child) => commitsMap.get(child)!.parents[0] !== commit.hash)
      .forEach((child) => {
        mergeChildrenY.push(commitsMap.get(child)!.y);
        mergeChildrenX.push(commitsMap.get(child)!.x);
      });

    // if the commit is the second parent of its children (merge), find the child with the smallest x
    const minChildX = Math.min(...mergeChildrenX);
    const maxChildY = Math.max(...mergeChildrenY);
    const gap = [minChildX, commit.x];
    const col = checkOverlap(maxChildY, gap, columns);
    if (col === -1) {
      columns.push([commit.x, minChildX]);
      commit.y = columns.length - 1;
      return;
    }
    const last = columns[col].pop();
    columns[col].push(commit.x);
    return;
  });
  return { computedXCommits, columns };
}

export function computePosition(commits: CommitNode[]): CommitNode[] {
  const seen = new Map<string, boolean>();

  const commitsMap = new Map<string, CommitNode>();
  // create a map of commits
  commits.forEach((commit) => {
    commitsMap.set(commit.hash, commit);
  });

  const columns: number[][] = [];

  const { sortedCommits: computedX } = computePositionX(
    commits,
    commitsMap,
    seen
  );
  return computePositionY(computedX, columns, commitsMap).computedXCommits;
}
