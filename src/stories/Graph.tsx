import CommitGraph from "../components/CommitGraph";
import { GraphStyle } from "../helpers/types";
import { useGitHubBranchList } from "./useGitHubBranchList";
import { useGitHubCommitList } from "./useGitHubCommitList";
import React from "react";

export type Props = {
  repoName: string;
  ownerName: string;
  graphStyle?: GraphStyle;
};

export default function Graph({ repoName, ownerName, graphStyle }: Props) {
  const { commits, hasMore, loadMore } = useGitHubCommitList(
    ownerName,
    repoName,
  );

  const { branches } = useGitHubBranchList(ownerName, repoName);
  const repoUrl = `https://github.com/${ownerName}/${repoName}`;

  const [selected, setSelected] = React.useState<string[]>([]);
  return (
    <div>
      <a href={repoUrl}>{repoUrl}</a>
      <CommitGraph.WithInfiniteScroll
        commits={commits}
        loadMore={loadMore}
        hasMore={hasMore}
        branchHeads={branches}
        dateFormatFn={customDateTimeFormatFn}
        graphStyle={graphStyle}
        onClick={(commit, event) => {
          console.log("Clicked", commit, event);
          setSelected(current => {
            if (current.includes(commit.sha)) {
              if (!event?.ctrlKey) {
                return [];
              }
              return current.filter(sha => sha !== commit.sha);
            }
            if (event?.ctrlKey) {
              return [...current, commit.sha];
            }
            return [commit.sha];
          });
        }}
        selected={selected}
      />
    </div>
  );
}

const customDateTimeFormatFn = (d: string | number | Date): string => {
  return new Date(d).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
