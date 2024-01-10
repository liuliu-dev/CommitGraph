import React, { useState } from "react";
import { BranchType, CommitNode } from "../../helpers/types";
import BranchLabel from "../BranchLabel";
import { excerpt } from "../Curves/utils";
import css from "./index.module.css";
import { Tooltip } from "react-tooltip";

type Props = {
  commit: CommitNode;
  branch: BranchType[];
  mouseOver: () => void;
  mouseLeave: () => void;
};

export default function CommitDetails({
  commit,
  branch,
  mouseLeave,
  mouseOver,
}: Props) {
  const date = new Date(commit.committerDate).toLocaleDateString();
  const hashBr = commit.hash.slice(0, 7);
  const committer = commit.committer;
  const message = commit.message || "";
  const commitHashAuthorDate = `${hashBr} - ${committer} - ${date}`;
  const [color, setColor] = useState(commit.commitColor);

  return (
    <div
      className={css.container}
      onMouseOver={mouseOver}
      onMouseLeave={mouseLeave}
    >
      <div style={{ color: commit.commitColor }} className={css.labelAndLink}>
        {commit.commitLink ? (
          <a
            style={{ color: color }}
            href={commit.commitLink}
            className={css.bold}
            onMouseOver={() => setColor("#1f6dc6")}
            onMouseLeave={() => setColor(commit.commitColor)}
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
            branchLink={branch[0].branchLink}
          />
        )}
      </div>
      <div
        data-tooltip-content={message}
        data-tooltip-id={`commit-${commit.hash}-msg`}
        data-tooltip-place="bottom"
        className={css.msg}
      >
        {excerpt(message, 80)}
      </div>
      {message.length > 80 && (
        <Tooltip id={`commit-${commit.hash}-msg`} className={css.tooltip}/>
      )}
    </div>
  );
}
