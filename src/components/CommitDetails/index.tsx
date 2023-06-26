import React from "react";
import { CommitNode } from "../../helpers/types";
import css from "./index.module.css";
import { excerpt } from "../Curves/utils";

type Props = {
  commit: CommitNode;
};
export default function CommitDetails({ commit }: Props) {
  const date = new Date(commit.committerDate).toLocaleDateString();
  const hashBr = commit.hash.slice(0, 7);
  const committer = commit.committer;
  const message = commit.message;

  return (
    <div className={css.container}>
      <div style={{ color: commit.commitColor }}>
        <span className={css.bold}>{`${hashBr} - ${committer} - ${date}`}</span>
      </div>
      <div className={css.msg}>{excerpt(message, 200)}</div>
    </div>
  );
}
