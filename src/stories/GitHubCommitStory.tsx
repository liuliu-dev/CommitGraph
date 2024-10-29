import React, { useState } from "react";
import css from "./index.module.css";
import Graph from "./Graph";
import { Diff, GraphStyle } from "../types";

type Props = {
  ownerName?: string;
  repoName?: string;
  graphStyle?: GraphStyle;
  token?: string;
  getDiff?: (base: string, head: string) => Promise<Diff | undefined>;
};

export default function GitHubCommitStory(props: Props) {
  if (props.ownerName && props.repoName) {
    return (
      <Graph {...props} repoName={props.repoName} ownerName={props.ownerName} />
    );
  }
  return <CustomizedGitHubCommitStory {...props} />;
}

type CustomizedGitHubCommitStoryProps = {
  graphStyle?: GraphStyle;
  token?: string;
  getDiff?: (base: string, head: string) => Promise<Diff | undefined>;
};

function CustomizedGitHubCommitStory(props: CustomizedGitHubCommitStoryProps) {
  const [ownerName, setOwnerName] = useState("");
  const [repoName, setRepoName] = useState("");
  const [loadGraph, setLoadGraph] = useState(false);
  const [error, setError] = useState("");

  return (
    <div>
      <div className={css.inputs}>
        <input
          type="text"
          placeholder="OwnerName"
          onChange={e => {
            setError("");
            setLoadGraph(false);
            setOwnerName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="RepoName"
          onChange={e => {
            setError("");
            setLoadGraph(false);
            setRepoName(e.target.value);
          }}
        />
        <button
          onClick={() => {
            if (!ownerName || !repoName) {
              console.log("Enter OwnerName and RepoName");
              setError("Enter OwnerName and RepoName");
              return;
            }
            setLoadGraph(true);
          }}
        >
          Load Graph
        </button>
        <span>* enter a public repository</span>
      </div>
      {error && <div className={css.error}>{error}</div>}
      {loadGraph && (
        <Graph {...props} ownerName={ownerName} repoName={repoName} />
      )}
    </div>
  );
}
