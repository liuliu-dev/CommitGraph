import React, { use, useState } from "react";
import { CommitNode } from "../../helpers/types";
import { computePosition } from "./computePosition";

export type Props = {
  commits: CommitNode[];
};

export default function CommitGraph({ commits }: Props) {
  const computedCommits = computePosition(commits);

  return (
    <>
      {computedCommits.map((commit) => (
        <div key={commit.hash}>
          <div>
            {"     "} {commit.x} {"     "}
            {commit.y}
          </div>
        </div>
      ))}
    </>
  );
}
