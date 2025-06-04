import React, { useRef, useState } from "react";
import { Branch, CommitNode, Diff } from "../../types";
import BranchLabel from "../BranchLabel";
import { excerpt } from "@dolthub/web-utils";
import css from "./index.module.css";
import { Tooltip } from "react-tooltip";
import DiffSection from "../DiffSection";
import { useOnClickOutside } from "@dolthub/react-hooks";
import { fromCommitNodeToCommit } from "src/helpers/utils";

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
  forDolt?: boolean;
};

const diffCache: { [key: string]: Diff | undefined } = {};

export default function CommitDetails({
  commit,
  branch,
  mouseLeave,
  mouseOver,
  onClick,
  dateFormatFn,
  currentBranch,
  fullSha,
  getDiff,
  forDolt,
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
  const [showDiffButton, setShowDiffButton] = useState(false);
  const diffRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(diffRef, () => {
    setShowDiff(false);
  });
  const [diff, setDiff] = useState<Diff | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div
        className={css.container}
        onMouseOver={() => {
          mouseOver(), setShowDiffButton(true);
        }}
        onMouseLeave={() => {
          mouseLeave(), setShowDiffButton(false);
        }}
        onClick={onClick}
      >
        <div style={{ color: commit.commitColor }} className={css.labelAndLink}>
          <div>
            {commit.onCommitNavigate ? (
              <span
                style={{ color: color }}
                className={`${css.bold} ${css.clickable}`}
                onClick={() => {
                  commit.onCommitNavigate!();
                }}
                onMouseOver={() => setColor("#1f6dc6")}
                onMouseLeave={() => setColor(commit.commitColor)}
              >
                {commitHashAuthorDate}
              </span>
            ) : commit.commitLink ? (
              <a
                style={{ color: color }}
                href={commit.commitLink as string}
                className={css.bold}
                onMouseOver={() => setColor("#1f6dc6")}
                onMouseLeave={() => setColor(commit.commitColor)}
              >
                {commitHashAuthorDate}
              </a>
            ) : (
              <span className={css.bold}>{commitHashAuthorDate}</span>
            )}

            {showDiffButton && !!getDiff && !!commit.parents.length && (
              <button
                type="button"
                className={css.button}
                onClick={async () => {
                  setLoading(true);
                  setShowDiff(true);
                  const cacheKey = `${commit.parents[0]}-${commit.hash}`;
                  if (diffCache[cacheKey]) {
                    setDiff(diffCache[cacheKey]);
                  } else {
                    const result = await getDiff(
                      commit.parents[0],
                      commit.hash,
                    );
                    diffCache[cacheKey] = result;
                    setDiff(result);
                  }
                  setLoading(false);
                }}
              >
                See commit overview
              </button>
            )}
          </div>
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
        {message.length > 80 && !getDiff && (
          <Tooltip
            id={`commit-${commit.hash}-msg`}
            className={css.tooltip}
            noArrow
          />
        )}
      </div>
      {showDiff && (
        <div ref={diffRef}>
          <DiffSection
            commit={fromCommitNodeToCommit(commit)}
            diff={diff}
            forDolt={forDolt}
            loading={loading}
          />
        </div>
      )}
    </>
  );
}
