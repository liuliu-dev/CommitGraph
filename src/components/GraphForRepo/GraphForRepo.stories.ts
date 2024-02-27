import type { Meta, StoryObj } from "@storybook/react";
import GraphForRepo from "./index";

const meta: Meta<typeof GraphForRepo> = {
  title: "Example/GraphForRepo",
  component: GraphForRepo,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GraphForRepo>;

export const Dolt: Story = {
  args: {
    repoName: "dolt",
    ownerName: "dolthub",
  },
};

export const React: Story = {
  args: {
    repoName: "react",
    ownerName: "facebook",
  },
};
