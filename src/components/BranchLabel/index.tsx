import React from "react";
import ReactPopup from "reactjs-popup";
import css from "./index.module.css";
import { Branch } from "../../types";
import cx from "classnames";

type ItemProps = {
  branchName: string;
  branchColor: string;
  branchLink?: string;
  className?: string;
};

type Props = {
  branches: Branch[];
  branchColor: string;
  currentBranch?: string;
};

function Item({ branchName, branchColor, branchLink, className }: ItemProps) {
  return (
    <div
      style={{ color: branchColor, borderColor: branchColor }}
      className={cx(css.outer, className)}
    >
      {branchLink ? (
        <a href={branchLink} className={css.link}>
          {branchName}
        </a>
      ) : (
        <span>{branchName}</span>
      )}
    </div>
  );
}

export default function BranchLabel({
  branches,
  branchColor,
  currentBranch,
}: Props) {
  if (branches.length === 0) {
    return <></>;
  }
  const current =
    branches.find(b => b.name === currentBranch) ||
    branches[branches.length - 1];
  branches = branches.filter(b => b.name !== current.name);
  const len = branches.length;

  return (
    <div className={css.branches}>
      <div className={css.firstBranch}>
        <Item
          branchName={current.name}
          branchColor={branchColor}
          branchLink={current.link}
        />
      </div>

      {!!len && (
        <ReactPopup
          trigger={<div className={css.number}>+{len}</div>}
          on="hover"
          position="bottom right"
          contentStyle={{
            width: "fit-content",
            borderRadius: "0.5rem",
            border: "none",
            boxShadow: "0 0 4px 0 rgba(145, 164, 168, 0.5)",
          }}
          offsetY={5}
          offsetX={5}
          arrow={false}
        >
          <div className={css.dropdown}>
            {branches.map(b => (
              <Item
                branchName={b.name}
                branchColor={branchColor}
                branchLink={b.link}
                className={css.dropdownItem}
                key={b.name}
              />
            ))}
          </div>
        </ReactPopup>
      )}
    </div>
  );
}
