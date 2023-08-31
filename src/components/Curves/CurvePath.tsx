import React from "react";
import { CommitNode } from "../../helpers/types";
import { hexToColorMatrixVariant } from "../../helpers/utils";
import { CurveReturnType } from "./utils";

type Props = {
  commit: CommitNode;
  curve: CurveReturnType;
};

export default function CurvePath({ curve }: Props) {
  return (
    <>
      <g filter={`url(#${curve.id})`}>
        <path
          d={curve.path}
          stroke={curve.stroke}
          strokeWidth="2"
          fill="none"
        />
      </g>
      <defs>
        <filter
          {...curve}
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
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values={hexToColorMatrixVariant(curve.stroke)}
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_103_601"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_103_601"
            result="shape"
          />
        </filter>
      </defs>
    </>
  );
}
