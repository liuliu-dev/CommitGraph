import { FiPlus, FiMinus } from "react-icons/fi";
import React from "react";
import { RiPencilFill } from "react-icons/ri";
import { ChangedItem } from "../../types";
import css from "./index.module.css";

type Props = {
  file: ChangedItem;
};

export default function ChangedFileDetails({ file }: Props) {
  const filename = file.filename.split("/").pop();
  switch (file.status) {
    case "added":
    case "new":
    case "created":
      return (
        <li>
          <FiPlus className={css.added} />
          <span>{filename}</span>
        </li>
      );
    case "modified":
    case "changed":
    case "updated":
    case "edited":
      return (
        <li>
          <RiPencilFill className={css.modified} />
          {file.blob_url ? (
            <a href={file.blob_url} className={css.link}>
              {filename}
            </a>
          ) : (
            <span>{filename}</span>
          )}
        </li>
      );
    case "deleted":
    case "removed":
    case "dropped":
      return (
        <li>
          <FiMinus className={css.deleted} />
          {file.blob_url ? (
            <a href={file.blob_url} className={css.link}>
              {filename}
            </a>
          ) : (
            <span>{filename}</span>
          )}
        </li>
      );
    default:
      return (
        <li>
          {file.blob_url ? (
            <a href={file.blob_url} className={css.link}>
              {filename}
            </a>
          ) : (
            <span>{filename}</span>
          )}
        </li>
      );
  }
}
