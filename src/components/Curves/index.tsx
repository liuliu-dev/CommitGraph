import React from "react";
import { CommitNode } from "../../helpers/types";
import CurvePath from "./CurvePath";
import { getMergedFromBranchHeadPositions, getNewBranchToPath } from "./utils";

type Props = {
  commits: CommitNode[];
  commitsMap: Map<string, CommitNode>;
  commitSpacing: number;
  branchSpacing: number;
  nodeRadius: number;
};

export default function Curves({
  commits,
  commitsMap,
  commitSpacing,
  branchSpacing,
  nodeRadius,
}: Props) {
  return (
    <>
      {commits.map((commit) => {
        const mergedCurves = getMergedFromBranchHeadPositions(
          commit,
          commitsMap,
          branchSpacing,
          commitSpacing,
          nodeRadius
        );

        const newBranchCurves = getNewBranchToPath(
          commit,
          commitsMap,
          branchSpacing,
          commitSpacing,
          nodeRadius
        );
          console.log(newBranchCurves)
        return (
          <>
            {newBranchCurves &&
              newBranchCurves.map((c) => {
                console.log(`${commit.hash}-curved-up-path-${c.id}`)
                return (
                  <CurvePath
                    key={`${commit.hash}-curved-up-path-${c.id}`}
                    commit={commit}
                    curve={c}
                  />
                );
              })}
            {mergedCurves &&
              mergedCurves.map((curve) => {
                console.log(`${commit.hash}-curved-down-path-${curve.id}`)
                return (
                  <CurvePath
                    key={`${commit.hash}-curved-down-path-${curve.id}`}
                    commit={commit}
                    curve={curve}
                  />
                );
              })}
          </>
        );
      })}
    </>
  );
}
