import React from "react";

type Props = {
  loaded: boolean;
  className?: string;
};

export function SmallLoader({ loaded, className }: Props) {
  if (loaded) return null;
  return (
    <div className={className}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="10"
          cy="10"
          r="8"
          stroke="#ccc"
          strokeWidth="2"
          fill="none"
        />
        <circle
          cx="10"
          cy="10"
          r="8"
          stroke="#333"
          strokeWidth="2"
          fill="none"
          strokeDasharray="50"
          strokeDashoffset="25"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 10 10"
            to="360 10 10"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}
