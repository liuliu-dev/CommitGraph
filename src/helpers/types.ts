export type Commit = {
  hash: string;
  ownerName: string;
  repoName: string;
  committer: {
    username?: string | null;
    displayName: string;
    emailAddress?: string;
  };
  message: string;
  parents: string[];
  committedAt: number;
  commitLink?: string;
};

export type CommitNode = {
  hash: string;
  children: string[];
  parents: string[];
  committer: string;
  committerDate: Date;
  author?: string;
  authorDate?: Date;
  message?: string;
  x: number;
  y: number;
  commitColor?: string;
  commitLink?: string;
};

export type BranchPathType = {
  start: number;
  end: number;
  endCommitHash: string;
  endCommit?: CommitNode;
  color?: string;
  branchOrder: number;
};

export type BranchType = {
  branchName: string;
  headCommitHash: string;
  branchLink?: string;
};

export type GraphStyle = {
  commitSpacing: number;
  branchSpacing: number;
  branchColors: string[];
  nodeRadius: number;
};
