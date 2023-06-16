import type { Meta, StoryObj } from "@storybook/react";

import CommitGraph from "./index";
import {
  threeBranches,
  twoBranches,
  twoCommits,
} from "../../helpers/sampleCommits";
import { getCommits } from "../../helpers/utils";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CommitGraph> = {
  title: "Example/CommitGraph",
  component: CommitGraph,
  tags: ["autodocs"],
  argTypes: {
    commits: {},
  },
};

export default meta;
type Story = StoryObj<typeof CommitGraph>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const ThreeBranches: Story = {
  args: {
    commits: getCommits(threeBranches),
  },
};

export const TwoBranches: Story = {
  args: {
    commits: getCommits(twoBranches),
  },
};

export const TwoCommits: Story = {
  args: {
    commits: getCommits(twoCommits),
  },
};
