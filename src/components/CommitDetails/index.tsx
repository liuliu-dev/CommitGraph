import React, { useRef, useState } from "react";
import { Branch, CommitNode, Diff } from "../../helpers/types";
import BranchLabel from "../BranchLabel";
import { excerpt } from "@dolthub/web-utils";
import css from "./index.module.css";
import { Tooltip } from "react-tooltip";
import DiffSection from "../DiffSection";
import { useOnClickOutside } from "@dolthub/react-hooks";

type Props = {
  commit: CommitNode;
  branch: Branch[];
  mouseOver: () => void;
  mouseLeave: () => void;
  onClick: () => void;
  dateFormatFn?: (d: string | number | Date) => string;
  currentBranch?: string;
  fullSha?: boolean;
  clicked?: boolean;
  getDiff?: (base: string, head: string) => Promise<Diff | undefined>;
};

export default function CommitDetails({
  commit,
  branch,
  mouseLeave,
  mouseOver,
  onClick,
  dateFormatFn,
  currentBranch,
  fullSha,
  clicked,
  getDiff,
}: Props) {
  const date = dateFormatFn
    ? dateFormatFn(commit.commitDate)
    : commit.commitDate.toLocaleDateString();
  const hashBr = commit.hash.slice(0, 7);
  const committer = commit.committer;
  const message = commit.message || "";
  const commitHashAuthorDate = `${fullSha ? commit.hash : hashBr} - ${committer} - ${date}`;
  const [color, setColor] = useState(commit.commitColor);

  const [showDiff, setShowDiff] = useState(false);
  const diffRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(diffRef, () => {
    setShowDiff(false);
  });

  return (
    <>
      <div
        className={css.container}
        onMouseOver={mouseOver}
        onMouseLeave={mouseLeave}
        onClick={() => {
          onClick();
          if (!showDiff) {
            setShowDiff(true);
          }
        }}
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
      {showDiff && clicked && !!getDiff && (
        <div className={css.diffSection} ref={diffRef}>
          <DiffSection commit={commit} getDiff={getDiff} />
        </div>
      )}
    </>
  );
}
