import React, { useState } from "react";
import { Branch, CommitNode } from "../../helpers/types";
import BranchLabel from "../BranchLabel";
import { excerpt } from "@dolthub/web-utils";
import css from "./index.module.css";
import { Tooltip } from "react-tooltip";

type Props = {
  commit: CommitNode;
  branch: Branch[];
  mouseOver: () => void;
  mouseLeave: () => void;
  dateFormatFn?: (d: string | number | Date) => string;
  currentBranch?: string;
  fullSha?: boolean;
  onClick?: (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => void;
};

export default function CommitDetails({
  commit,
  branch,
  mouseLeave,
  mouseOver,
  dateFormatFn,
  currentBranch,
  fullSha,
  onClick,
}: Props) {
  const date = dateFormatFn
    ? dateFormatFn(commit.commitDate)
    : commit.commitDate.toLocaleDateString();
  const hashBr = commit.hash.slice(0, 7);
  const committer = commit.committer;
  const message = commit.message || "";
  const commitHashAuthorDate = `${fullSha ? commit.hash : hashBr} - ${committer} - ${date}`;
  const [color, setColor] = useState(commit.commitColor);

  return (
    <div
      className={css.container}
      onMouseOver={mouseOver}
      onMouseLeave={mouseLeave}
      onClick={onClick}
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
        <BranchLabel
          branchColor={commit.commitColor}
          branches={branch}
          currentBranch={currentBranch}
        />
      </div>
      <div
        data-tooltip-content={message}
        data-tooltip-id={`commit-${commit.hash}-msg`}
        data-tooltip-place="bottom-start"
        className={css.msg}
      >
        {excerpt(message, 80)}
      </div>
      {message.length > 80 && (
        <Tooltip
          id={`commit-${commit.hash}-msg`}
          className={css.tooltip}
          noArrow
        />
      )}
    </div>
  );
}
