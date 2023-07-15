import React from "react";
import { BranchType, CommitNode } from "../../helpers/types";
import css from "./index.module.css";
import { excerpt } from "../Curves/utils";
import BranchLabel from "../BranchLabel";

type Props = {
  commit: CommitNode;
  branch: BranchType[];
};
export default function CommitDetails({ commit, branch }: Props) {
  const date = new Date(commit.committerDate).toLocaleDateString();
  const hashBr = commit.hash.slice(0, 7);
  const committer = commit.committer;
  const message = commit.message;
  const commitHashAuthorDate = `${hashBr} - ${committer} - ${date}`;

  return (
    <div className={css.container}>
      <div style={{ color: commit.commitColor }} className={css.labelAndLink}>
        {!!branch.length && (
          <BranchLabel
            branchName={branch[0].branchName}
            branchColor={commit.commitColor}
          />
        )}
        {commit.commitLink ? (
          <a href={commit.commitLink} className={css.bold}>
            {commitHashAuthorDate}
          </a>
        ) : (
          <span className={css.bold}>{commitHashAuthorDate}</span>
        )}
      </div>
      <div className={css.msg}>{excerpt(message, 200)}</div>
    </div>
  );
}
