import type { Meta, StoryObj } from "@storybook/react";
import GitHubCommitStory from "./GitHubCommitStory";
import Graph from "./Graph";
import { Diff } from "../helpers/types";

const meta: Meta<typeof GitHubCommitStory> = {
  title: "Example/GitHub-CommitGraph-Examples",
  component: GitHubCommitStory,
};

export default meta;
type ExampleGraph = StoryObj<typeof Graph>;

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

export const GitRepository: ExampleGraph = {
  args: {
    ownerName: "git",
    repoName: "git",
    graphStyle,
  },
};

export const DoltRepository: ExampleGraph = {
  args: {
    ownerName: "dolthub",
    repoName: "dolt",
    graphStyle,
    getDiff: async (base: string, head: string): Promise<Diff | undefined> => {
      const apiUrl = `https://api.github.com/repos/dolthub/dolt/compare/${base}...${head}`;

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data as Diff;
      } catch (error) {
        console.error("Fetching changes failed:", error);
      }
      return undefined;
    },
  },
};

export const Custom_Repository_Graph: ExampleGraph = {};
