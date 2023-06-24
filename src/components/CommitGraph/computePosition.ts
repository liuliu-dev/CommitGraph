import { BranchPathType, CommitNode } from "../../helpers/types";

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

function checkOverlap(
  startCol: number,
  gap: number[],
  columns: BranchPathType[][]
) {
  for (let i = startCol + 1; i < columns.length; i++) {
    const column = columns[i];
    const last = column[column.length - 1];

    if (gap[0] >= last.end) {
      return i;
    }
  }
  return -1;
}

function computePositionY(
  computedXCommits: CommitNode[],
  columns: BranchPathType[][],
  commitsMap: Map<string, CommitNode>
) {
  computedXCommits.forEach((commit, n) => {
    // if the commit does not have any children, then it's the head of a branch, and it should be at a new column
    if (commit.children.length === 0) {
      columns.push([{ start: commit.x, end: Infinity, endCommit: commit }]);
      commit.y = columns.length - 1;
      return;
    }
    const branchChildren = commit.children
      .filter((child) => commitsMap.get(child)!.parents[0] === commit.hash)
      .map((child) => commitsMap.get(child)!);

    // if the commit is the first parent of its children (extension of a branch), then it should be at the same y as the left most child, and delete other children's y from the forbiddenY map
    if (branchChildren.length > 0) {
      commit.y = Math.min(...branchChildren.map((child) => child.y));

      // update the column to put the new commit node in
      branchChildren.forEach((child) => {
        const last = columns[child.y].pop();
        if (child.y === commit.y) {
          columns[child.y].push({
            start: last.start,
            end: Infinity,
            endCommit: commit,
          });
        } else {
          columns[child.y].push({
            start: last.start,
            end: commit.x - 1,
            endCommit: commit,
          });
        }
      });

      return;
    }

    const mergeChildrenY: number[] = [];
    const mergeChildrenX: number[] = [];
    commit.children.forEach((child) => {
      mergeChildrenY.push(commitsMap.get(child)!.y);
      mergeChildrenX.push(commitsMap.get(child)!.x);
    });

    // if the commit is the second parent of its children (merge), find the child with the smallest x
    const minChildX = Math.min(...mergeChildrenX);
    const maxChildY = Math.max(...mergeChildrenY);

    const gap = [minChildX, commit.x];
    const col = checkOverlap(maxChildY, gap, columns);
    if (col === -1) {
      // minChildX + 1 so it will be extended by the merge curve
      columns.push([
        { start: minChildX + 1, end: Infinity, endCommit: commit },
      ]);
      commit.y = columns.length - 1;
      return;
    }
    commit.y = col;
    columns[col].push({
      start: minChildX + 1,
      end: Infinity,
      endCommit: commit,
    });
    return;
  });
  return { computedXCommits, columns };
}

export function computePosition(commits: CommitNode[]) {
  const seen = new Map<string, boolean>();

  const commitsMap = new Map<string, CommitNode>();
  // create a map of commits
  commits.forEach((commit) => {
    commitsMap.set(commit.hash, commit);
  });

  const columns: BranchPathType[][] = [];

  const { sortedCommits: computedX } = computePositionX(
    commits,
    commitsMap,
    seen
  );
  computePositionY(computedX, columns, commitsMap);
  return { columns, commitsMap };
}
