# Changelog

All notable changes to this project will be documented in this file.

## [1.4.0] - 2023-07-28

- **UI Enhancement:** Now, when hovering over the commit dot or commit info block, transparent grey block is displayed. Additionally, long commit messages now have tooltips for improved readability. Moreover, the commit link's text color changes to blue when hovered.

- **Add dependency:** The project now includes the react-tooltip dependency.

## [1.4.1] - 2023-07-30

-- **Fixed:** Resolved the width issue of the transparent block that appeared when hovering over a commit dot.

## [1.4.4] - 2023-08-31

-- **Fixed:** Fixed console errors.

## [1.4.8] - 2023-08-31

-- **Fixed:** Enforce types.

## [1.6.0] - 2023-09-01

-- **Fixed:** Fixed crashes on dolt hosted pages caused by mouseOver and mouseLeave.

## [1.6.1] - 2023-11-13

-- **Fixed:** Fixed commit message tooltip gets cut off.

## [1.6.4] - 2023-11-16

-- **Fixed:** Fixed tooltip width.

## [1.6.12] - 2024-01-10

-- **UI Enhancement:** Show all the branches on the same commit.

## [1.6.13] - 2024-01-11

-- **UI Enhancement:** Add branch number next to the label.

## [1.6.15] - 2024-01-31

-- **UI Fix** Fix branch name exceeds border.

## [1.6.16] - 2024-02-19

-- Bump dependencies.

## [1.6.19] - 2024-02-23

-- **UI Enhancement:** Right align the branches list.

## [1.6.20] - 2024-02-29

-- **UI Enhancement:** Add support for RGB color.

## [1.7.0] -- 2024-03-04

-- **Bump Dependencies**

## [1.7.1] -- 2024-05-01

-- **Bump Dependencies**

## [2.0.0] - 2024-05-06

### Breaking Changes

- **Prop Types Modification**: The prop types have been modified to align with the GitHub commit and branch object schema. This change affects all components that utilize commit and branch prop types.

### Added

- Added support for infinite scroll, allowing for the dynamic loading of new commits as scrolling down.
- A GitHub log graph example in Storybook, demonstrating the new features and how to implement them in your projects.

### Migration Instructions

#### Prop Types Modification

If you are upgrading from a version prior to 2.0.0, please note the changes to prop types:

- Ensure that your commit and branch data structures conform to the new schema expected by the updated components.

##### Commit Type Changes

- \*\*Migration example:

  ```javascript
  // Old commit format
  {
    hash: 'commitHash',
    ownerName: 'owner',
    repoName: 'repo',
    committer: {
      username: 'committerUsername',
      displayName: 'Committer Name',
      emailAddress: 'committer@example.com'
    },
    message: 'Commit message',
    parents: ['parentHash1', 'parentHash2'],
    committedAt: '2024-03-10',
    commitLink: 'https://example.com/commit/commitHash'
  }

  // New commit format
  {
    sha: 'commitHash',
    commit: {
      author: {
        name: 'Committer Name',
        date: '2024-03-10', // or Date object or number
        email: 'committer@example.com'
      },
      message: 'Commit message',
    },
    parents: [{ sha: 'parentHash1' }, { sha: 'parentHash2' }],
    html_url: 'https://example.com/commit/commitHash'
  }

  // Old branch format
  {
    branchName: 'main',
    headCommitHash: 'latestCommitHash',
    branchLink: 'https://example.com/branch/main'
  }
  // New branch format
  {
    name: 'main',
    commit: {
      sha: 'latestCommitHash'
    },
    link: 'https://example.com/branch/main'
    }
  ```

## [2.0.1] - 2024-05-29

-- **Fixed:** Fixed console unique `key` warning.

## [2.0.2] - 2024-05-31

-- Add `dateFormatFn` prop.

## [2.1.0]

-- **Fixed:** Fixed the branches dropdown overlap issue. Fixed the branch label link not clickable issue.

-- **Added:** Added support for current branch, so it will always show up first.

## [2.1.1]

-- Avoid auto focus on the first link in the branches dropdown.

## [2.1.2]

-- Add option to display full sha of commits.

## [2.1.3]

-- Bump dependencies, clean up unused dependencies, set sourcemap to be false.

## [2.2.0]

-- Bump dependencies, name x and y positions correctly, refactor.

## [2.2.2]

-- Token fix, storybook deploy.

## [2.2.3]

-- Storybook, add custom repo graph.

## [2.2.4]

-- Graph style fix, edit readme.

## [2.2.7]

-- Add optional `onCommitClick` function, click color block.
