import React from "react";
import { BranchType, CommitNode } from "../../helpers/types";
import BranchLabel from "../BranchLabel";
import { excerpt } from "../Curves/utils";
import css from "./index.module.css";

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
        {commit.commitLink ? (
          <a
            style={{ color: commit.commitColor }}
            href={commit.commitLink}
            className={css.bold}
          >
            {commitHashAuthorDate}
          </a>
        ) : (
          <span className={css.bold}>{commitHashAuthorDate}</span>
        )}
        {!!branch.length && (
          <BranchLabel
            branchName={branch[0].branchName}
            branchColor={commit.commitColor}
          />
        )}
      </div>
      <div className={css.msg}>{excerpt(message, 120)}</div>
    </div>
  );
}
