import React from "react";
import { CommitNode } from "../../helpers/types";
import CurvePath from "./CurvePath";
import {
  CurveReturnType,
  getMergedFromBranchHeadPositions,
  getNewBranchToPath,
} from "./utils";

type Props = {
  commits: CommitNode[];
  commitsMap: Map<string, CommitNode>;
  commitSpacing: number;
  branchSpacing: number;
  nodeRadius: number;
};

type InnerProps = {
  newBranchCurves: CurveReturnType[];
  mergedCurves: CurveReturnType[];
  commit: CommitNode;
};

function Inner({ newBranchCurves, mergedCurves, commit }: InnerProps) {
  return (
    <>
      {newBranchCurves &&
        newBranchCurves.map(c => {
          return (
            <CurvePath
              key={`${commit.hash}-curved-up-path-${c.id}`}
              commit={commit}
              curve={c}
            />
          );
        })}
      {mergedCurves &&
        mergedCurves.map(curve => {
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
}

export default function Curves({
  commits,
  commitsMap,
  commitSpacing,
  branchSpacing,
  nodeRadius,
}: Props) {
  return (
    <>
      {commits.map(commit => {
        const mergedCurves = getMergedFromBranchHeadPositions(
          commit,
          commitsMap,
          branchSpacing,
          commitSpacing,
          nodeRadius,
        );

        const newBranchCurves = getNewBranchToPath(
          commit,
          commitsMap,
          branchSpacing,
          commitSpacing,
          nodeRadius,
        );
        return (
          <Inner
            newBranchCurves={newBranchCurves}
            mergedCurves={mergedCurves}
            commit={commit}
            key={commit.hash}
          />
        );
      })}
    </>
  );
}
