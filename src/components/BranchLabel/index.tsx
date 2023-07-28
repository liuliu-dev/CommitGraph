import React from "react";
import css from "./index.module.css";

type Props = {
  branchName: string;
  branchColor: string;
  branchLink?: string;
};

export default function BranchLabel({
  branchName,
  branchColor,
  branchLink,
}: Props) {
  return (
    <div
      style={{ color: branchColor, borderColor: branchColor }}
      className={css.outer}
    >
      {branchLink ? (
        <a
          style={{ color: branchColor }}
          href={branchLink}
          className={css.bold}
        >
          {branchName}
        </a>
      ) : (
        <span>{branchName}</span>
      )}
    </div>
  );
}
