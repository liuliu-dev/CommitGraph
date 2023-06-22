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
};

export type BranchPathType = {
  start: number;
  end: number;
  endCommit: CommitNode;
  branchOrder: number;
};

export type BranchHeadType = {
  branchName: string;
  commitHash: string;
};
