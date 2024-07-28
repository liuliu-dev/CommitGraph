import { BranchPathType, CommitNode } from "../../helpers/types";

function topologicalOrderCommits(
  commits: CommitNode[],
  commitsMap: Map<string, CommitNode>,
): string[] {
  // sort commits by committer date from latest to oldest
  const commitsSortByCommitterDate = commits.sort(
    (a, b) => b.commitDate.getTime() - a.commitDate.getTime(),
  );

  let sortedCommits: string[] = [];
  const seen = new Map<string, boolean>();

  function dfs(commit: CommitNode) {
    const commitHash = commit.hash;
    if (seen.get(commitHash)) {
      return;
    }
    seen.set(commitHash, true);
    commit.children.forEach(children => {
      dfs(commitsMap.get(children)!);
    });
    sortedCommits.push(commitHash);
  }

  // compute topological order of commits
  commitsSortByCommitterDate.forEach(commit => {
    dfs(commit);
  });

  return sortedCommits;
}

// compute the X coordinate of each commit
function computeColumns(
  orderedCommitHashes: string[],
  commitsMap: Map<string, CommitNode>,
) {
  const commitsMapWithPos = new Map<string, CommitNode>();
  orderedCommitHashes.forEach((commitHash, index) => {
    commitsMapWithPos.set(commitHash, {
      ...commitsMap.get(commitHash),
      y: index,
    } as CommitNode);
  });

  // Branch positions organized as columns, each column can have multiple branches
  // the columns slice stores the branch paths of each column
  const columns: BranchPathType[][] = [];

  // X position of each commit
  const commitXs: Map<string, number> = new Map();

  function updateColumnEnd(col: number, end: number, endCommitHash: string) {
    columns[col][columns[col].length - 1] = {
      ...columns[col][columns[col].length - 1],
      end,
      endCommitHash,
    };
  }

  // branch order is used to determine the color of the branch
  let branchOrder: number = 0;

  // Compute column position of each commit by topological order
  // So the child commit will always be computed before its parent commit
  orderedCommitHashes.forEach((commitHash, index) => {
    const commit = commitsMap.get(commitHash)!;

    const branchChildren = commit.children.filter(
      child => commitsMap.get(child)!.parents[0] === commit.hash,
    );

    const isLastCommitOnBranch = commit.children.length === 0;
    const isBranchOutCommit = branchChildren.length > 0;

    let commitX: number = -1;

    // for paint branch path
    const isFirstCommit = commit.parents.length === 0;
    const end = isFirstCommit ? index : Infinity;

    // Update columns based on the commit type
    if (isLastCommitOnBranch) {
      // Put commit as a new column
      columns.push([
        {
          start: index,
          end,
          endCommitHash: commit.hash,
          branchOrder,
        },
      ]);
      branchOrder++;
      commitX = columns.length - 1;
    } else if (isBranchOutCommit) {
      // in the case of a branch out commit, the x coordinate of the commit is the minimum x coordinate of its children
      const branchChildrenXs = branchChildren
        .map(childHash => commitXs.get(childHash))
        .filter(x => x !== undefined) as number[];

      // Set the commit to the left most column of its children
      commitX = Math.min(...branchChildrenXs);

      // Update the left most column
      updateColumnEnd(commitX, end, commit.hash);

      // update the path that branches out from the current commit by setting their end to be one position before the current commit
      branchChildrenXs
        .filter(childX => childX !== commitX)
        .forEach(childX => {
          updateColumnEnd(childX!, index - 1, commit.hash);
        });
    } else {
      // Find an available column so the commit can connect to its children (merge commit) without overlapping with existing branches on columns
      // Otherwise, put the commit in a new column

      /// minChildY is the highest pos of child commit, maxChildX is the right most pos of child commit
      let minChildY: number = Infinity;
      let maxChildX: number = -1;

      commit.children.forEach(child => {
        const childY = commitsMapWithPos.get(child)!.y;
        const childX = commitXs.get(child)!;

        if (childY < minChildY) {
          minChildY = childY;
        }

        if (childX > maxChildX) {
          maxChildX = childX;
        }
      });

      // find the first column that has no branches that overlap with the current commit
      const colFitAtEnd = columns.slice(maxChildX + 1).findIndex(column => {
        return minChildY >= column[column.length - 1].end;
      });

      const col = colFitAtEnd === -1 ? -1 : maxChildX + 1 + colFitAtEnd;

      if (col === -1) {
        // if no column is found, put the commit in a new column
        columns.push([
          {
            start: minChildY + 1,
            end,
            endCommitHash: commit.hash,
            branchOrder,
          },
        ]);
        branchOrder++;
        commitX = columns.length - 1;
      } else {
        commitX = col;
        columns[col].push({
          start: minChildY + 1,
          end,
          endCommitHash: commit.hash,
          branchOrder,
        });
        branchOrder++;
      }
    }

    commitXs.set(commitHash, commitX);
    commitsMapWithPos.set(commitHash, {
      ...commit,
      y: index,
      x: commitX,
    });
  });

  return { columns, commitsMapWithPos };
}

export function computePosition(commits: CommitNode[]) {
  const commitsMap = new Map<string, CommitNode>(
    commits.map(commit => [commit.hash, commit]),
  );
  const orderedCommitHashes = topologicalOrderCommits(commits, commitsMap);
  const { columns, commitsMapWithPos } = computeColumns(
    orderedCommitHashes,
    commitsMap,
  );

  const columnsWithEndCommit = columns.map(column => {
    return column.map(branchPath => {
      return {
        ...branchPath,
        endCommit: commitsMapWithPos.get(branchPath.endCommitHash),
      };
    });
  });
  return { columns: columnsWithEndCommit, commitsMap: commitsMapWithPos };
}
