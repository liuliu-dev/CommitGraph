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
};
