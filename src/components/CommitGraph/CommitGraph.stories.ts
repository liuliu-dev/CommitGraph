import type { Meta, StoryObj } from "@storybook/react";

import {
  half,
  multipleBranches,
  notPaintedWellInDoltHub,
  oneCommit,
  threeBranches,
  twoBranches,
  twoCommits,
  multipleCommitsOnMain
} from "../../helpers/sampleCommits";
import CommitGraph from "./index";

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

const graphStyle = {
  commitSpacing: 72,
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

const branchColors = ["#5D6280", "#5AC58D", "#5C5AC5", "#EB7340"];
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const ThreeBranches: Story = {
  args: {
    commits: threeBranches,
    branchHeads: [
      {
        branchName: "main",
        headCommitHash: "bgpqkjvf2mqoi9lq4upamdj0ke7e8iuo",
      },
      {
        branchName: "feature-branch",
        headCommitHash: "bgpv9t0smfear03um03737mrkggb84o2",
      },
      {
        branchName: "another-branch",
        headCommitHash: "r26g8v5vo7c82c5o1tt9hcleef924tp2",
      },
    ],
    graphStyle,
  },
};

export const TwoBranches: Story = {
  args: {
    commits: twoBranches,
    branchHeads: [],
    graphStyle,
  },
};

export const OneCommit: Story = {
  args: {
    commits: oneCommit,
    branchHeads: [],
  },
};

export const TwoCommits: Story = {
  args: {
    commits: twoCommits,
    branchHeads: [],
    graphStyle,
  },
};

export const halfPage: Story = {
  args: {
    commits: half,
    branchHeads: [
      {
        branchName: "main",
        headCommitHash: "eogh9klv062daesg5s9hpa925budqe7l",
      },
    ],
    graphStyle: {
      commitSpacing: 90,
      branchSpacing: 20,
      nodeRadius: 2,
      branchColors,
    },
  },
};

// export const Multiple: Story = {
//   args: {
//     commits: notPaintedWellInDoltHub,
//     branchHeads: [
//       {
//         branchName: "main",
//         headCommitHash: "eogh9klv062daesg5s9hpa925budqe7l",
//       },
//       {
//         branchName: "feature branch 1",
//         headCommitHash: "9qvpdadg0ktrhg674trki4lt48rp3djp",
//       },
//       {
//         branchName: "feature branch 2",
//         headCommitHash: "mau2aqr6977bc6ogr0dm8f9u3518j66q",
//       },
//     ],
//     graphStyle,
//   },
// };

export const Multiple: Story = {
  args: {
    commits: multipleBranches,
    branchHeads: [
      {
        branchName: "main",
        headCommitHash: "16f398rmboomr4tgeb8emenogtbqpmiv",
      },
      {
        branchName: "feature-branch",
        headCommitHash: "ubu61jhc3qp1d28035ee3kd105ao10q1",
      },
      {
        branchName: "another-branch",
        headCommitHash: "jpm4mg8btdnkcaolo5iqj7u36s4sk08s",
      },
    ],
    graphStyle,
  },
};


export const MultipleOnMain: Story = {
  args: {
    commits: multipleCommitsOnMain,
    branchHeads: [
      {
          branchName: "longnamelongnamelongnamelongnamelongnamelongnamelongnamelongnamea",
          headCommitHash: "p40jvld9vigbpmphe75vkf5ensk408bg",
       },
      {
          branchName: "longnamelongnamelongnamelongnamelongnamelongnamelongnamelongnameb",
          headCommitHash: "p40jvld9vigbpmphe75vkf5ensk408bg",
       },
       {
        branchName: "longnamelongnamelongnamelongnamelongnamelongnamelongnamelongnamec",
        headCommitHash: "p40jvld9vigbpmphe75vkf5ensk408bg",
     },
    {
        branchName: "longnamelongnamelongnamelongnamelongnamelongnamelongnamelongnamed",
        headCommitHash: "p40jvld9vigbpmphe75vkf5ensk408bg",
     },
      {
          branchName: "main",
          headCommitHash: "p40jvld9vigbpmphe75vkf5ensk408bg",
       }
  ],
    graphStyle,
  },
};
