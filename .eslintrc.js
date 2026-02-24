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
  ignorePatterns: [
    "src/stories/**",
    "src/**/*.test.ts",
    "src/helpers/sampleCommits.ts",
  ],
  rules: {
    "@typescript-eslint/lines-between-class-members": "off",
    "@typescript-eslint/no-throw-literal": "off",
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
    "css-modules/no-unused-class": "off",
    "import/extensions": "off",
    "import/prefer-default-export": "off",
    "no-nested-ternary": "off",
    "no-param-reassign": ["error", { props: false }],
    "no-plusplus": "off",
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
