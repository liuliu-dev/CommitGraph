# Commit Graph

![readme-header](https://github.com/liuliu-dev/CommitGraph/blob/main/graph.gif)

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Overview

The Commit Graph package is a React component suite designed to visualize commit graphs in an interactive and informative way. It showcases commit history within a repository with support for infinite scroll loading.

`CommitGraph` is utilized by platforms like [DoltHub](https://www.dolthub.com/repositories/dolthub/transparency-in-pricing/commits/main/graph) to visualize database commit log histories.

## Features

- **Interactive Commit Graph Visualization:** Render commit history as an interactive graph, offering a clear and detailed view of repository activities.
- **Infinite Scroll Support:** `CommitGraph.WithInfiniteScroll` enhances user experience for large commit histories by dynamically loading new content as users scroll.
- **Customizable Styles:** Extensive styling options for the commit log graph, including node colors, spacing, and more, to seamlessly match your project's design.

## Installation

```shell
npm install commit-graph
```

## Quick Start

### Using CommitGraph

For a basic implementation without infinite scroll:

```jsx
import React from "react";
import { CommitGraph } from "commit-graph";

const MyComponent = () => {
  const commits = [
    // Commits data according to the new Commit type
  ];
  const branchHeads = [
    // Branch heads data according to the new Branch type
  ];

  return (
    <CommitGraph
      commits={commits}
      branchHeads={branchHeads}
      graphStyle={{
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

### Using CommitGraph.WithInfiniteScroll

For implementations requiring infinite scroll to handle large commit histories:

```jsx
import React from "react";
import { CommitGraph } from "commit-graph";

const MyComponent = () => {
  // Your commit and branch head data, loadMore function, and hasMore flag
  return (
    <CommitGraph.WithInfiniteScroll
      commits={/* Your commits data */}
      branchHeads={/* Your branch heads data */}
      loadMore={/* Your loadMore function */}
      hasMore={/* hasMore flag */}
    />
  );
};

export default MyComponent;
```

## Props

### Common Props for CommitGraph and CommitGraph.WithInfiniteScroll

- commits (array): An array of `Commit` objects representing the commit history.
- branchHeads (array): An array of `Branch` objects representing the branch heads in the commit-graph.

### Additional Props for CommitGraph.WithInfiniteScroll

- loadMore (function): Function to load more commits upon reaching the scroll end.
- hasMore (boolean): Indicates whether more commits are available to load.

## Type Definitions

These type definitions should be used to structure the data passed to the commits and branchHeads props of both CommitGraph and CommitGraph.WithInfiniteScroll components, ensuring proper visualization of commit history and branch information.

### `Commit` Type

The `Commit` type represents individual commits in the commit history. Each `Commit` object should conform to the following structure:

```typescript
type ParentCommit = {
  sha: string;
};

export type Commit = {
  sha: string;
  commit: {
    author: {
      name: string; // The name of the commit author
      date: string | number | Date; // The date of the commit
      email?: string; // The email of the commit author (optional)
    };
    message: string; // The commit message
  };
  parents: ParentCommit[]; // An array of parent commits
  html_url?: string; // The URL to view the commit (optional)
};
```

This type definition includes the commit's SHA, author information, commit message, an array of parent commits, and an optional URL to the commit.

### `Branch` Type

The `Branch` type defines the structure for branches in the repository, each associated with a particular commit:

```typescript
export type Branch = {
  name: string; // The name of the branch
  commit: {
    sha: string; // The SHA of the latest commit on the branch
  };
  link?: string; // A URL to the branch on GitHub (optional)
};
```

Each Branch object should include the branch's name, the SHA of the latest commit on the branch, and an optional link to the branch.

### `graphStyle` (object, optional)

An optional object specifying the styling options for the commit-graph. The `graphStyle` object should have the following properties:

- `commitSpacing` (number): The vertical spacing between commits.
- `branchSpacing` (number): The horizontal spacing between branches.
- `branchColors` (array of strings): An array of colors to be used for different branches. Default: `['#FF0000', '#00FF00', '#0000FF']`.
- `nodeRadius` (number): The radius of the commit node circles.

### `dateFormatFn` (function, optional)

An optional function to format commit dates. Takes a Date, number, or string as input and returns a string.

```typescript
dateFormatFn?: (d: string | number | Date) => string;
```

## Storybook

Explore the Commit Graph component and its features by running storybook:

```shell
npm run storybook
```
