import type { Meta, StoryObj } from "@storybook/react";

import {
  multipleBranches,
  oneCommit,
  threeBranches,
  twoBranches,
  twoCommits,
  multipleCommitsOnMain,
} from "../helpers/sampleCommits";
import CommitGraph from "../components/CommitGraph/index";
import { Commit } from "../helpers/types";

const meta: Meta<typeof CommitGraph> = {
  title: "Example/CommitGraph-Sample-Commits",
  component: CommitGraph,
};

export default meta;
type Story = StoryObj<typeof CommitGraph>;

const graphStyle = {
  commitSpacing: 60,
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

const rgbColorStyle = {
  commitSpacing: 72,
  branchSpacing: 20,
  nodeRadius: 2,
  branchColors: [
    "rgb(1, 10, 64)",
    "rgb(252, 66, 201)",
    "rgb(61, 145, 240)",
    "rgb(41, 227, 193)",
    "rgb(197, 161, 90)",
    "rgb(250, 121, 120)",
    "rgb(93, 98, 128)",
    "rgb(90, 197, 141)",
    "rgb(92, 90, 197)",
    "rgb(235, 115, 64)",
  ],
};

const branchColors = ["#5D6280", "#5AC58D", "#5C5AC5", "#EB7340"];
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const OneCommit: Story = {
  args: {
    commits: oneCommit,
    branchHeads: [],
    onClick: (commit: Commit) => console.log("Clicked", commit),
  },
};

export const TwoCommits: Story = {
  args: {
    commits: twoCommits,
    branchHeads: [],
    graphStyle,
  },
};

export const ThreeBranches: Story = {
  args: {
    commits: threeBranches,
    branchHeads: [
      {
        name: "main",
        commit: {
          sha: "bgpqkjvf2mqoi9lq4upamdj0ke7e8iuo",
        },
      },
      {
        name: "feature-branch",
        commit: {
          sha: "bgpv9t0smfear03um03737mrkggb84o2",
        },
      },
      {
        name: "another-branch",
        commit: {
          sha: "r26g8v5vo7c82c5o1tt9hcleef924tp2",
        },
      },
    ],
    graphStyle,
    selected: [
      "bgpqkjvf2mqoi9lq4upamdj0ke7e8iuo",
      "r26g8v5vo7c82c5o1tt9hcleef924tp2",
    ],
  },
};

export const OneBranchMergedTwice: Story = {
  args: {
    commits: twoBranches,
    branchHeads: [],
    graphStyle,
  },
};

export const MultipleBranchesOnSameCommit: Story = {
  args: {
    commits: multipleCommitsOnMain,
    branchHeads: [
      {
        name: "a",
        link: "https://www.google.com",
        commit: {
          sha: "p40jvld9vigbpmphe75vkf5ensk408bg",
        },
      },
      {
        name: "bb",
        link: "https://www.google.com",
        commit: {
          sha: "p40jvld9vigbpmphe75vkf5ensk408bg",
        },
      },
      {
        name: "longnamelongnamelongnamelongname1",
        link: "https://www.google.com",
        commit: {
          sha: "p40jvld9vigbpmphe75vkf5ensk408bg",
        },
      },
      {
        name: "longnamelongnamelongnamelongnamelongnamelongnamelongnamelongname2",
        link: "https://www.google.com",
        commit: {
          sha: "p40jvld9vigbpmphe75vkf5ensk408bg",
        },
      },
      {
        name: "main",
        link: "https://www.google.com",
        commit: {
          sha: "p40jvld9vigbpmphe75vkf5ensk408bg",
        },
      },
      {
        name: "feature-branch",
        commit: {
          sha: "7d9i7jtnff94juae9pe35p41tiuqreag",
        },
      },
    ],
    graphStyle,
    fullSha: true,
  },
};

export const ComplicateGraph_OnePage: Story = {
  args: {
    commits: multipleBranches,
    branchHeads: [
      {
        name: "main",
        link: "https://www.google.com",
        commit: {
          sha: "16f398rmboomr4tgeb8emenogtbqpmiv",
        },
      },
      {
        name: "feature-branch",
        commit: {
          sha: "ubu61jhc3qp1d28035ee3kd105ao10q1",
        },
      },
      {
        name: "another-branch",
        commit: {
          sha: "jpm4mg8btdnkcaolo5iqj7u36s4sk08s",
        },
      },
    ],
    graphStyle,
  },
};
