import React from "react";
import { CommitNode } from "../../helpers/types";
import { convertColorToMatrixVariant } from "../../helpers/utils";
import { getCommitDotPosition } from "./utils";

type Props = {
  commit: CommitNode;
  commitSpacing: number;
  branchSpacing: number;
  nodeRadius: number;
};

export default function CommitDot({
  commit,
  commitSpacing,
  branchSpacing,
  nodeRadius,
}: Props) {
  const { x, y } = getCommitDotPosition(
    branchSpacing,
    commitSpacing,
    nodeRadius,
    commit,
  );
  const filterId = `filter_${commit.hash}_node`;

  return (
    <>
      <g filter={`url(#${filterId})`} fill={commit.commitColor}>
        <circle
          cx={x}
          cy={y}
          r={nodeRadius * 2 + 1.5}
          fill={commit.commitColor}
        />
        <circle
          cx={x}
          cy={y}
          r={nodeRadius * 2 + 0.25}
          stroke="white"
          strokeWidth="2"
        />
      </g>
      <defs>
        <filter
          id={filterId}
          x={x - nodeRadius * 4}
          y={y - nodeRadius * 4}
          width={nodeRadius * 8}
          height={nodeRadius * 8}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values={convertColorToMatrixVariant(commit.commitColor)}
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_46_47"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_46_47"
            result="shape"
          />
        </filter>
      </defs>
    </>
  );
}
