# Commit Graph

![readme-header](https://github.com/liuliu-dev/CommitGraph/blob/main/graph.gif)

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Overview

The Commit Graph package is a React component designed to visualize commit graphs in an interactive and informative way, showcasing commit history within a repository. This package supports dynamic loading and visualization of commit history, including features like pagination to manage large datasets efficiently.
**`CommitGraph`** is utilized by [DoltHub](https://www.dolthub.com/repositories/dolthub/us-jails/commits/main/graph) to visualize database commit log histories.


## Features

- **Interactive Commit Graph Visualization:** Render the commit history as an interactive graph, providing a clear and informative view of repository activities.
- **Customizable Styles:** Offers extensive styling options for the commit graph, including node colors, spacing, and more, to match your project's design.
- **Manual Pagination Integration Support:** While **CommitGraph** itself does not provide built-in pagination, it is designed to work seamlessly with manual pagination implementations. This flexibility ensures that CommitGraph can handle large datasets effectively, maintaining performance and accuracy in data representation as more commits are dynamically loaded into the graph.


## Installation

Install the Commit Graph package via npm:

```shell
npm install commit-graph
```


## Quick Start

To use the CommitGraph component in your React application, import it and pass your commit and branch head data as props:

```jsx
import React from "react";
import CommitGraph from "commit-graph";

const MyComponent = () => {
   // Your commit and branch head data arrays
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

  const branchHeads = [
    {
      branchName: "branch-name-1",
      headCommitHash: "commit-hash-1",
    },
    {
      branchName: "branch-name-2",
      headCommitHash: "commit-hash-2",
      branchLink:"https://github.com/repository-owner/repository-name/main",
    },
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
- `branchLink` (string, optional): The link to the branch.

### `graphStyle` (object, optional)

An optional object specifying the styling options for the commit graph. The `graphStyle` object should have the following properties:

- `commitSpacing` (number): The vertical spacing between commits.
- `branchSpacing` (number): The horizontal spacing between branches.
- `branchColors` (array of strings): An array of colors to be used for different branches. Default: `['#FF0000', '#00FF00', '#0000FF']`.
- `nodeRadius` (number): The radius of the commit node circles.


## Pagination Integration

**`CommitGraph`** supports dynamic data loading and can seamlessly integrate with pagination libraries such as **`react-infinite-scroller`** for efficient handling of large commit histories. Here's an example of how to implement pagination with **`CommitGraph`**:

### Example: Integrating Infinite Scroll
First, install `react-infinite-scroller`:

```shel
npm install react-infinite-scroller
```

Then, you can integrate InfiniteScroll with CommitGraph in your component:

```jsx
import React from "react";
import { CommitGraph } from "commit-graph";
import InfiniteScroll from "react-infinite-scroller";

<InfiniteScroll
  loadMore={async () => loadMore()}
  hasMore={ hasMore}
  useWindow={false}
  initialLoad={false}
  loader={
    <div>
      Loading graph...
    </div>
  }
  getScrollParent={() => document.getElementById("main-content")}
>
  <CommitGraph
    commits={commits}
    branchHeads={branchHeads}
  />
</InfiniteScroll>;
```


## Storybook

Explore the Commit Graph component and its features by running storybook:

```shell
npm run storybook
```



