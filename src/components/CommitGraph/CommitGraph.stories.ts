import type { Meta, StoryObj } from "@storybook/react";

import CommitGraph from "./index";
import {
  notPaintedWellInDoltHub,
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

const style = {
  commitSpacing: 90,
  branchSpacing: 20,
  nodeRadius: 2,
  branchColors: [
    "#010A40",
    "#FC42C9",
    "#3D91F0",
    "#29E3C1",
    "#C5A15A",
    "#FA7978",
    "#5D6280",
    "#5AC58D",
    "#5C5AC5",
    "#EB7340",
  ],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const ThreeBranches: Story = {
  args: {
    commits: getCommits(threeBranches),
    ...style,
  },
};

export const TwoBranches: Story = {
  args: {
    commits: getCommits(twoBranches),
    ...style,
  },
};

export const TwoCommits: Story = {
  args: {
    commits: getCommits(twoCommits),
    ...style,
  },
};

export const Multiple: Story = {
  args: {
    commits: getCommits(notPaintedWellInDoltHub),
    ...style,
  },
};
