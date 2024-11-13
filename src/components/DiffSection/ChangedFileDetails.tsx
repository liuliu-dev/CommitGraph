import { FiPlus } from "react-icons/fi";
import { ChangedItem } from "../../types";
import css from "./index.module.css";
import React from "react";
import { RiPencilFill } from "react-icons/ri";
import { FiMinus } from "react-icons/fi";

type Props = {
  file: ChangedItem;
};

export default function ChangedFileDetails({ file }: Props) {
  const filename = file.filename.split("/").pop();
  // const path = file.filename.split("/").slice(0, -1).join("/") + "/";
  switch (file.status) {
    case "added":
      return (
        <li>
          <FiPlus className={css.added} />
          {/* <span>{path}</span> */}
          <span>{filename}</span>
        </li>
      );
    case "modified":
      return (
        <li>
          <RiPencilFill className={css.modified} />
          {/* <span>{path}</span> */}
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
      return (
        <li>
          <FiMinus className={css.deleted} />
          {/* <span>{path}</span> */}
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
          {/* <span>{path}</span> */}
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
