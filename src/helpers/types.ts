 type ParentCommit = {
  sha: string;
};

export type Commit = {
  sha: string;
  commit: {
    author: {
      name: string;
      date: string | number | Date;
      email?: string;
    };
    message: string;
  };
  parents: ParentCommit[];
  html_url?: string;
};

export type CommitNode = {
  hash: string;
  children: string[];
  parents: string[];
  committer: string;
  commitDate: Date;
  author?: string;
  authorDate?: Date;
  message?: string;
  x: number;
  y: number;
  commitColor: string;
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

export type Branch = {
  name: string;
   commit : {
      sha : string,
   },
   link?:  string ,
};

export type GraphStyle = {
  commitSpacing: number;
  branchSpacing: number;
  branchColors: string[];
  nodeRadius: number;
};
