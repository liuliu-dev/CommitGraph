import React from "react";
import { CommitNode } from "../../helpers/types";
import CurvePath from "./CurvePath";
import { getMergedFromBranchHeadPositions, getNewBranchToPath } from "./utils";

type Props = {
  commitsArray: CommitNode[];
  commitsMap: Map<string, CommitNode>;
  commitSpacing: number;
  branchSpacing: number;
  nodeRadius: number;
};

export default function Curves({
  commitsArray,
  commitsMap,
  commitSpacing,
  branchSpacing,
  nodeRadius,
}: Props) {
  return (
    <>
      {commitsArray.map((commit) => {
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
        console.log(newBranchCurves);
        console.log(mergedCurves);

        return (
          <>
            {newBranchCurves &&
              newBranchCurves.map((c) => {
                return (
                  <CurvePath
                    key={`${commit.hash}-curved-up-path-${c[0]}`}
                    commit={commit}
                    curve={c}
                  />
                );
              })}
            {mergedCurves &&
              mergedCurves.map((curve) => {
                return (
                  <CurvePath
                    key={`${commit.hash}-curved-down-path-${curve[0]}}`}
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
