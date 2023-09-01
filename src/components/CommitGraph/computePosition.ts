import { BranchPathType, CommitNode } from "../../helpers/types";

function topologicalOrderCommits(
  commits: CommitNode[],
  commitsMap: Map<string, CommitNode>,
): string[] {
  // sort commits by committer date from latest to oldest
  const commitsSortByCommitterDate = commits.sort(
    (a, b) => b.committerDate.getTime() - a.committerDate.getTime(),
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

function computeColumns(
  orderedCommitHashes: string[],
  commitsMap: Map<string, CommitNode>,
) {
  // Branch positions organized as columns, each column can have multiple branches
  const columns: BranchPathType[][] = [];
  // Column position of each commit
  const commitYs: Map<string, number> = new Map();

  const commitXs = new Map<string, number>(
    orderedCommitHashes.map((commitHash, index) => [commitHash, index]),
  );

  function updateColumns(col: number, end: number, endCommitHash: string) {
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
    const isChildOfNonMergeCommit = branchChildren.length > 0;

    let commitY: number = -1;

    // for paint branch path
    const isFirstCommit = commit.parents.length === 0;

    // Update columns based on the commit type
    if (isLastCommitOnBranch) {
      // Put commit as a new column
      columns.push([
        {
          start: index,
          end: isFirstCommit ? index : Infinity,
          endCommitHash: commit.hash,
          branchOrder,
        },
      ]);
      branchOrder++;
      commitY = columns.length - 1;
    } else if (isChildOfNonMergeCommit) {
      // Put commit to its left most column of its children (non-merge commit)

      const branchChildrenYs = branchChildren
        .map(childHash => commitYs.get(childHash))
        .filter(y => y !== undefined) as number[];

      // Set the commit to the left most column of its children
      commitY = Math.min(...branchChildrenYs);

      // Update the left most column
      updateColumns(commitY, isFirstCommit ? index : Infinity, commit.hash);

      // Update other columns with the commit as the end commit
      branchChildrenYs
        .filter(childY => childY !== commitY)
        .forEach(childY => {
          updateColumns(childY!, index - 1, commit.hash);
        });
    } else {
      // Find a column so the commit can connect to its children (merge commit) without overlapping with existing branches on columns
      // Otherwise, put the commit as a new column

      // Highest pos of child commit
      let minChildX: number = Infinity;
      // Right most pos of child commit
      let maxChildY: number = -1;

      commit.children.forEach(child => {
        const childX = commitXs.get(child)!;
        const childY = commitYs.get(child)!;

        if (childX < minChildX) {
          minChildX = childX;
        }

        if (childY > maxChildY) {
          maxChildY = childY;
        }
      });

      const colFitAtEnd = columns.slice(maxChildY + 1).findIndex(column => {
        return minChildX >= column[column.length - 1].end;
      });

      const col = colFitAtEnd === -1 ? -1 : maxChildY + 1 + colFitAtEnd;

      if (col === -1) {
        // minChildX + 1 so it will be extended by the merge curve
        columns.push([
          {
            start: minChildX + 1,
            end: isFirstCommit ? index : Infinity,
            endCommitHash: commit.hash,
            branchOrder,
          },
        ]);
        branchOrder++;
        commitY = columns.length - 1;
      } else {
        commitY = col;
        columns[col].push({
          start: minChildX + 1,
          end: isFirstCommit ? index : Infinity,
          endCommitHash: commit.hash,
          branchOrder,
        });
        branchOrder++;
      }
    }

    commitYs.set(commitHash, commitY);
  });

  return { columns, commitYs };
}

export function computePosition(commits: CommitNode[]) {
  const commitsMap = new Map<string, CommitNode>(
    commits.map(commit => [commit.hash, commit]),
  );

  const orderedCommitHashes = topologicalOrderCommits(commits, commitsMap);
  const { columns, commitYs } = computeColumns(orderedCommitHashes, commitsMap);

  // To be compatible with exisiting data structure used in render
  // Add position info to commits and end commit to columns
  const commitsMapWithPos = new Map<string, CommitNode>(
    orderedCommitHashes.map((commitHash, ix) => [
      commitHash,
      {
        ...commitsMap.get(commitHash),
        x: ix,
        y: commitYs.get(commitHash)!,
      } as CommitNode,
    ]),
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
