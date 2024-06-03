import React from "react";
import ReactPopup from "reactjs-popup";
import css from "./index.module.css";
import { Branch } from "../../helpers/types";
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

export default function BranchLabel({ branches, branchColor }: Props) {
  if (branches.length === 0) {
    return <></>;
  }
  const len = branches.length;

  return (
    <div className={css.branches}>
      {!!branches.length && (
        <div className={css.firstBranch}>
          <Item
            branchName={branches[len - 1].name}
            branchColor={branchColor}
            branchLink={branches[len - 1].link}
          />
        </div>
      )}
      {len > 1 && (
        <ReactPopup
          trigger={<div className={css.number}>+{len - 1}</div>}
          on="hover"
          position="bottom right"
        >
          <div className={css.dropdown}>
            {branches.slice(0, len - 1).map(b => (
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
