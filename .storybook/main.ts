import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-webpack5-compiler-swc"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  webpackFinal: async config => {
    // Remove ALL existing CSS rules (including Storybook's implicit one)
    config.module!.rules = (config.module?.rules ?? []).filter(rule => {
      if (!rule || typeof rule !== "object") return true;
      if (rule.test instanceof RegExp && rule.test.test("test.css")) {
        return false;
      }
      return true;
    });

    // Add our own CSS rules with proper CSS modules support
    config.module!.rules.push(
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        sideEffects: true,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.module\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: "[folder]_[local]__[hash:base64:5]",
                namedExport: false,
              },
            },
          },
        ],
      },
    );
    return config;
  },
};
export default config;
