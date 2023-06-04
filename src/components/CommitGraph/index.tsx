import React, { use, useState } from "react";
import { Commit } from "../../helpers/types";
import { computePosition } from "./computePosition";

export type Props = {
  commits: Commit[];
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
