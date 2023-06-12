import React from "react";
import { CommitNode } from "../../helpers/types";
import { getCommitDotPosition } from "../CommitDot/utils";
import css from "./index.module.css";
import { excerpt } from "../CurvePath/utils";

type Props = {
  commit: CommitNode;
  branchSpacing: number;
  commitSpacing: number;
  nodeRadius: number;
  left: number;
};
export default function CommitDetails({
  branchSpacing,
  commitSpacing,
  commit,
  nodeRadius,
  left,
}: Props) {
  const { y } = getCommitDotPosition(
    branchSpacing,
    commitSpacing,
    nodeRadius,
    commit
  );

  const date = new Date(commit.committerDate).toLocaleDateString();
  const hashBr = commit.hash.slice(0, 7);
  const committer = commit.committer;
  const message = commit.message;

  return (
    <div
      style={{
        left: left,
        top: y - nodeRadius * 2,
      }}
      className={css.container}
    >
      <div
        style={{ color: commit.commitColor }}
      >{`${hashBr} - ${committer} - ${date}`}</div>
      <div className={css.msg}>{excerpt(message, 100)}</div>
    </div>
  );
}
