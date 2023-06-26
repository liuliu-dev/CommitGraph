import { hexToColorMatrixVariant } from "../../helpers/utils";
import React from "react";

type Props = {
  start: number;
  end: number;
  commitSpacing: number;
  branchSpacing: number;
  branchOrder: number;
  branchColor: string;
  nodeRadius: number;
};

export default function BranchPath({
  start,
  end,
  commitSpacing,
  branchSpacing,
  branchColor,
  branchOrder,
  nodeRadius,
}: Props) {
  const height = Math.abs(end - start) * (commitSpacing + nodeRadius * 4);
  const x = nodeRadius * 4 + branchOrder * branchSpacing - 1;
  const matrixColor = hexToColorMatrixVariant(branchColor);

  return (
    <>
      <g filter={`url(#filter${branchOrder}-${start}-${end})`}>
        <line
          x1={x}
          y1={start * commitSpacing + nodeRadius * 2}
          x2={x}
          y2={end * commitSpacing + nodeRadius * 5}
          stroke={branchColor}
          strokeWidth="4"
        />
      </g>
      <defs>
        <filter
          id={`filter${branchOrder}-${start}-${end}`}
          x={x}
          y={start * commitSpacing}
          width={12}
          height={height}
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
          <feGaussianBlur stdDeviation="2.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values={matrixColor} />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2_590"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2_590"
            result="shape"
          />
        </filter>
      </defs>
    </>
  );
}
