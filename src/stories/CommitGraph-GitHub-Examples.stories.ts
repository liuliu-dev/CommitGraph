import type { Meta, StoryObj } from "@storybook/react";
import GitHubCommitStory from "./GitHubCommitStory";
import Graph  from "./Graph";

const meta: Meta<typeof GitHubCommitStory> = {
  title: "Example/GitHub-CommitGraph-Examples",
  component: GitHubCommitStory,
};

export default meta;
type ExampleGraph = StoryObj<typeof Graph>;

export const GitRepository: ExampleGraph = {
  args:{
    ownerName: "git",
    repoName: "git"
  }
};

export const DoltRepository: ExampleGraph = {
  args:{
    ownerName: "dolthub",
    repoName: "dolt"
  }
};

export const Custom_Repository_Graph: ExampleGraph = {};
