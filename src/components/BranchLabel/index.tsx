import React, { useState } from "react";
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

export default function BranchLabel({ branches, branchColor }: Props) {
  if (branches.length === 0) {
    return <></>;
  }
  const [showDropdown, setShowDropdown] = useState(false);
  const len = branches.length;
  return (
    <div className={css.branches}>
      {!!branches.length && (
        <div
          onMouseOver={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
          className={css.firstBranch}
        >
          <Item
            branchName={branches[len - 1].name}
            branchColor={branchColor}
            branchLink={branches[len - 1].link}
          />
          {len > 1 && <div className={css.number}>+{len - 1}</div>}
        </div>
      )}
      {showDropdown && (
        <div className={css.dropdown}>
          {branches.slice(0, len - 1).map(b => (
            <Item
              branchName={b.name}
              branchColor={branchColor}
              branchLink={b.link}
              className={css.dropdownItem}
            />
          ))}
        </div>
      )}
    </div>
  );
}
