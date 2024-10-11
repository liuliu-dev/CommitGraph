# Commit Graph

[![readme-header](https://github.com/liuliu-dev/CommitGraph/blob/main/graph.gif)](https://liuliu-dev.github.io/CommitGraph/)

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Overview

The Commit Graph package is a React component suite designed to visualize commit graphs in an interactive and informative way. It showcases commit history within a repository with support for infinite scroll loading. See [this post](https://www.dolthub.com/blog/2024-08-07-drawing-a-commit-graph/) for the implementation details.

It is used by platforms like [DoltHub](https://www.dolthub.com) to visualize database commit log histories.

## Demo

Explore the [demo](https://liuliu-dev.github.io/CommitGraph/) for sample commit data and real GitHub repository graphs.

## Features

- **Interactive Commit Graph Visualization:** Provides a dynamic visual of commit history with detailed repository activity.
- **Infinite Scroll Support:** `CommitGraph.WithInfiniteScroll` dynamically loads new content as users scroll through large commit histories.
- **Customizable Styles:** Easily style the commit log graph, including node colors, spacing, and more.
- **Diff Stats on Commit Click:** If a `getDiff` function is provided, clicking a commit will display additional file change stats, including additions, deletions, and file modifications.

## Installation

```shell
npm install commit-graph
```

## Quick Start

### UBasic Usage (without infinite scroll):

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
      getDiff={async (base, head) => {
        // Your implementation to fetch diff stats
        return {
          files: [
            {
              filename: "example.txt",
              status: "modified",
              additions: 10,
              deletions: 2,
            },
          ],
        };
      }}
    />
  );
};

export default MyComponent;
```

### Using `CommitGraph.WithInfiniteScroll`

For large commit histories requiring infinite scroll:

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

- branchHeads (array): An array of `Branch` objects representing the branch heads.

- getDiff (function, optional): A function that returns a `Promise` resolving to a [`Diff`](#diff-type) object. Fetches file changes for clicked commits.

- currentBranch (string, optional): The name of the current branch.

- fullSha (boolean, optional): Displays the full SHA of a commit instead of the shortened SHA.

- onCommitClick (function, optional): Function to be called when a commit is clicked, receiving the clicked commit as an argument.

- dateFormatFn (function, optional): Formats the commit dates. Accepts a string, number, or Date and returns a formatted string.

```typescript
dateFormatFn?: (d: string | number | Date) => string;
```

Example:

```typescript
const customDateTimeFormatFn = (d: string | number | Date): string => {
  return new Date(d).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
  });
};

const MyComponent = () => {
  // Your commit and branch head data, loadMore function, and hasMore flag
  return (
    <CommitGraph.WithInfiniteScroll
      commits={/* Your commits data */}
      branchHeads={/* Your branch heads data */}
      loadMore={/* Your loadMore function */}
      hasMore={/* hasMore flag */}
      dateFormatFn={customDateTimeFormatFn}
    />
  );
};

```

- graphStyle (object, optional): Customize the graph styling. Example:

```typescript
const graphStyle = {
  commitSpacing: 60,
  branchSpacing: 20,
  nodeRadius: 2,
  branchColors: ["#FF0000", "#00FF00", "#0000FF"],
};
```

### Additional Props for CommitGraph.WithInfiniteScroll

- loadMore (function): Function to load more commits as the user scrolls.

- hasMore (boolean): Boolean flag indicating whether more commits are available to load.

## Type Definitions

### `Commit` Type

Represents individual commits:

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

### `Branch` Type

Defines repository branches, each associated with a commit:

```typescript
export type Branch = {
  name: string; // The name of the branch
  commit: {
    sha: string; // The SHA of the latest commit on the branch
  };
  link?: string; // A URL to the branch on GitHub (optional)
};
```

### `Diff` Type

Represents changes between two commits:

```typescript
export type Diff = {
  files: ChangedFile[];
};
```

### `ChangedFile` Type

Details of files changed between commits:

```typescript
export type ChangedFile = {
  filename: string;
  status: string; // "added", "modified", or "deleted"
  additions: number;
  deletions: number;
  patch?: string; // Optional patch data for the changes
  blob_url?: string; // Optional URL to the file blob
};
```

## Storybook

Explore the Commit Graph component and its features by running storybook:

```shell
npm run storybook
```
