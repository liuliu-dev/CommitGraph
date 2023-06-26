import React from "react";
import css from "./index.module.css";

type Props = {
  branchName: string;
  branchColor: string;
};

export default function BranchLabel({ branchName, branchColor }: Props) {
  return (
    <div
      style={{ color: branchColor, borderColor: branchColor }}
      className={css.outer}
    >
      {branchName}
    </div>
  );
}
