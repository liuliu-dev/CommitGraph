import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import postcss from "rollup-plugin-postcss";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import packageJson from "./package.json" with { type: "json" };

export default [
  {
    input: "src/index.ts",
    output: [
      { file: packageJson.main, format: "cjs", sourcemap: false },
      { file: packageJson.module, format: "esm", sourcemap: false },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        noEmit: false,
        declaration: false,
        exclude: [
          "**/__tests__",
          "**/*.test.ts",
          "**/*.stories.ts",
          "src/stories/**",
        ],
        sourceMap: false,
        inlineSources: false,
      }),
      terser({
        compress: {
          drop_console: true,
        },
        mangle: true,
        format: {
          comments: false,
        },
      }),
      postcss({
        minimize: true,
        extract: false,
      }),
    ],
    external: ["react", "react-dom", "styled-components"],
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts.default()],
  },
];
