import type { Meta, StoryObj } from "@storybook/react";
import GitHubCommitStory from "./GitHubCommitStory";

const meta: Meta<typeof GitHubCommitStory> = {
  title: "Example/GitHub-CommitGraph-WithPagination",
  component: GitHubCommitStory,
};

export default meta;
type Story = StoryObj<typeof GitHubCommitStory>;

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
