import React, { useEffect, useState } from "react";
import { ChangedFile, CommitNode, Diff } from "../../types";
import css from "./index.module.css";
import ChangedFileDetails from "./ChangedFileDetails";
import { pluralize } from "@dolthub/web-utils";

type Props = {
  commit: CommitNode;
  getDiff: (base: string, head: string) => Promise<Diff | undefined>;
  forDolt?: boolean;
};

const diffCache: { [key: string]: Diff | undefined } = {};

export default function DiffSection({ commit, getDiff, forDolt }: Props) {
  const [diff, setDiff] = useState<Diff | undefined>(undefined);

  useEffect(() => {
    const fetchDiff = async () => {
      const cacheKey = `${commit.parents[0]}-${commit.hash}`;
      if (diffCache[cacheKey]) {
        setDiff(diffCache[cacheKey]);
      } else {
        const result = await getDiff(commit.parents[0], commit.hash);
        diffCache[cacheKey] = result;
        setDiff(result);
      }
    };

    fetchDiff();
  }, [commit, getDiff]);

  const { added, modified, deleted } = getChanged(diff?.files || []);
  const parents = commit.parents.map(parent => parent.slice(0, 7)).join(", ");
  const file=forDolt ? "table" : "file";
  return (
    <div>
      <div className={css.top}>
        <div className={css.hashes}>
          <div>
            commit:
            <span className={css.bold}>{commit.hash.slice(0, 7)}</span>
          </div>
          <div>
            parent:
            <span className={css.bold}>{parents}</span>
          </div>
        </div>
        <div className={css.message}>{commit.message}</div>
      </div>
      {diff && (
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
            {diff?.files.map(file => (
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

function getChanged(files: ChangedFile[]): GetChangedReturnType {
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
