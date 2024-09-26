import { FiPlus } from "react-icons/fi";
import { ChangedFile } from "../../helpers/types";
import css from "./index.module.css";
import React from "react";
import { RiPencilFill } from "react-icons/ri";
import { FiMinus } from "react-icons/fi";

type Props = {
  file: ChangedFile;
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
          <span> {filename}</span>
        </li>
      );
    case "deleted":
      return (
        <li>
          <FiMinus className={css.deleted} />
          {/* <span>{path}</span> */}
          <span>{filename}</span>
        </li>
      );
    default:
      return (
        <li>
          {/* <span>{path}</span> */}
          <span>{filename}</span>
        </li>
      );
  }
}
