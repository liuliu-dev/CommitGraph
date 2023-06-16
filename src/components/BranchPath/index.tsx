import { hexToColorMatrixVariant } from "../../helpers/utils";
import React from "react";

type Props = {
  start: number;
  end: number;
  commitSpacing: number;
  branchSpacing: number;
  branchOrder: number;
  branchColor: string;
};

export default function BranchPath({
  start,
  end,
  commitSpacing,
  branchSpacing,
  branchColor,
  branchOrder,
}: Props) {
  const width = 1;
  const height = (end - start) * commitSpacing;
  const viewBox = `0 0 ${width} ${height}`;
  const x = branchOrder * branchSpacing;
  const matrixColor = hexToColorMatrixVariant(branchColor);

  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_2_590)">
        <line
          x1={x}
          y1={start * commitSpacing}
          x2={x}
          y2={end * commitSpacing}
          stroke={branchColor}
          stroke-width="2"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_2_590"
          x={x}
          y={start * commitSpacing}
          width={width}
          height={height}
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
    </svg>
  );
}
