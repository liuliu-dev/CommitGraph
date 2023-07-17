# Commit Graph

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Overview

The Commit Graph package is a React component that allows you to visualize a commit graph based on provided commit and branch head data. It provides an interactive and informative representation of commit history within a repository.

## Installation

You can install the Commit Graph package via npm:

```shell
npm install commit-graph
```

## Quick Start

Import the CommitGraph component and use it in your React application as follows:

```jsx
import React from "react";
import CommitGraph from "commit-graph";

const MyComponent = () => {
  // Array of commit objects
  // Example commit object:
  const commits = [
    {
      hash: 'commit-hash',
      ownerName: 'repository-owner',
      repoName: 'repository-name',
      committer:
      {
        displayName: 'committer-displayName',
       }
      message: 'commit-message',
      parents: ['parent-commit-hash-1', 'parent-commit-hash-2'],
      committedAt: timestamp,
      commitLink: 'https://github.com/repository-owner/repository-name/main/commit-hash',
    }
  ];

  // Array of branch head objects
  // Example branch head object:
  const branchHeads = [
    {
      branchName: "branch-name-1",
      headCommitHash: "commit-hash-1",
    },
    {
      branchName: "branch-name-2",
      headCommitHash: "commit-hash-2",
    },
  ];

  return (
    <CommitGraph
      commits={commits}
      branchHeads={branchHeads}
      style={{
        commitSpacing: 50,
        branchSpacing: 20,
        branchColors: ["#FF0000", "#00FF00", "#0000FF"],
        nodeRadius: 2,
      }}
    />
  );
};

export default MyComponent;
```

## Props

The `CommitGraph` component accepts the following props:

### `commits` (array)

An array of commit objects representing the commit history. Each commit object should have the following properties:

- `hash` (string): The unique hash identifier of the commit.
- `ownerName` (string): The name of the repository owner.
- `repoName` (string): The name of the repository.
- `committer` (object): The person who made the commit, it has following properties:
  - `username` (string)
  - `displayName` (string)
  - `emailAddress` (string)
- `message` (string): The commit message.
- `parents` (array of strings): An array of commit hashes representing the parent commits.
- `committedAt` (timestamp): The timestamp when the commit was made.
- `commitLink` (string, optional): the external link to the commit.

### `branchHeads` (array)

An array of branch head objects representing the branch heads in the commit graph. Each branch head object should have the following properties:

- `branchName` (string): The name of the branch.
- `headCommitHash` (string): The commit hash at the head of the branch.

### `style` (object, optional)

An optional object specifying the styling options for the commit graph. The `style` object should have the following properties:

- `commitSpacing` (number): The vertical spacing between commits.
- `branchSpacing` (number): The horizontal spacing between branches.
- `branchColors` (array of strings): An array of colors to be used for different branches. Default: `['#FF0000', '#00FF00', '#0000FF']`.
- `nodeRadius` (number): The radius of the commit node circles.

## Storybook

You can view the demo by running storybook:

```shell
npm run storybook
```
