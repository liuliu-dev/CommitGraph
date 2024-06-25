module.exports = {
  env: {
    node: true,
    "jest/globals": true,
  },
  extends: [
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:jest-dom/recommended",
    "plugin:testing-library/react",
    "plugin:css-modules/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: "./tsconfig.json",
  },
  plugins: [
    "@typescript-eslint",
    "jest",
    "jest-dom",
    "testing-library",
    "css-modules",
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-use-before-define": [
      "error",
      {
        functions: false,
        classes: false,
      },
    ],
    "import/prefer-default-export": "off",
    "no-use-before-define": [
      "error",
      {
        functions: false,
        classes: false,
      },
    ],
  },
  overrides: [
    {
      files: ["*test.ts?(x)"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
};
