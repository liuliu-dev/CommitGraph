# Commit Graph

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Overview

The Commit Graph package is a React component that allows you to visualize a commit graph based on provided commit and branch head data. It provides an interactive and informative representation of commit history within a repository.

## Installation

You can install the Commit Graph package via npm:

```shell
npm install commit-graph
```

## Usage

Import the CommitGraph component and use it in your React application as follows:

```jsx
import React from "react";
import CommitGraph from "commit-graph";

const MyComponent = () => {
  const commits = [
    // Array of commit objects
    // Example commit object:
    // {
    //   hash: 'commit-hash',
    //   ownerName: 'repository-owner',
    //   repoName: 'repository-name',
    //   committer: 'committer-name',
    //   message: 'commit-message',
    //   parents: ['parent-commit-hash-1', 'parent-commit-hash-2'],
    //   committedAt: timestamp,
    // }
  ];

  const branchHeads = [
    // Array of branch head objects
    // Example branch head object:
    // {
    //   branchName: 'branch-name',
    //   headCommitHash: 'commit-hash',
    // }
  ];

  return <CommitGraph commits={commits} branchHeads={branchHeads} />;
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
- `committer` (string): The name of the person who made the commit.
- `message` (string): The commit message.
- `parents` (array of strings): An array of commit hashes representing the parent commits.
- `committedAt` (timestamp): The timestamp when the commit was made.

### `branchHeads` (array)

An array of branch head objects representing the branch heads in the commit graph. Each branch head object should have the following properties:

- `branchName` (string): The name of the branch.
- `headCommitHash` (string): The commit hash at the head of the branch.
