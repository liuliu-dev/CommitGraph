import React, { useEffect, useState } from "react";
import { ChangedItem, Commit, Diff } from "../../types";
import css from "./index.module.css";
import ChangedFileDetails from "./ChangedFileDetails";
import { pluralize } from "@dolthub/web-utils";
import { SmallLoader } from "@dolthub/react-components";

type Props = {
  commit: Commit;
  diff?: Diff;
  forDolt?: boolean;
  loading?: boolean;
};

export default function DiffSection({ commit, diff, forDolt, loading }: Props) {
  const { added, modified, deleted } = getChanged(diff?.files || []);
  const file = forDolt ? "table" : "file";
  const files = diff?.files || diff?.tables;

  return (
    <div className={css.diffSection}>
      <div className={css.top}>
        <div className={css.commitAndParents}>
          <div className={css.hashes}>
            <div className={css.bold}>commit:</div>
            <div>{commit.sha}</div>
          </div>
          <div className={css.hashes}>
            <div className={css.bold}>
              {pluralize(commit.parents.length, "parent")}:
            </div>
            <div>
              {commit.parents.map((p, i) => (
                <div key={p.sha}>
                  {p.sha}
                  {i === commit.parents.length - 1 ? "" : ","}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={css.message}>{commit.commit.message}</div>
        {loading && <SmallLoader loaded={!loading} className={css.loading} />}
        {/* {err && <div className={css.error}>{err}</div>} */}
      </div>
      {!!files?.length && (
        <>
          <div className={css.summary}>
            {!!modified && (
              <div>
                <span className={css.modified}>{modified}</span>
                <span>{pluralize(modified, file)} modified</span>
              </div>
            )}
            {!!added && (
              <div>
                <span className={css.added}> {added}</span>{" "}
                <span>{pluralize(added, file)} added</span>
              </div>
            )}
            {!!deleted && (
              <div>
                <span className={css.deleted}>{deleted}</span>{" "}
                <span>{pluralize(deleted, file)} deleted</span>
              </div>
            )}
          </div>
          <ul className={css.list}>
            {files.map(file => (
              <ChangedFileDetails key={file.filename} file={file} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

type GetChangedReturnType = {
  added: number;
  modified: number;
  deleted: number;
};

function getChanged(files: ChangedItem[]): GetChangedReturnType {
  let added = 0;
  let modified = 0;
  let deleted = 0;
  files.forEach(file => {
    switch (file.status) {
      case "added":
        added++;
        break;
      case "modified":
        modified++;
        break;
      case "deleted":
        deleted++;
        break;
    }
  });
  return { added, modified, deleted };
}
