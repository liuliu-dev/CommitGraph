import React, { useState } from "react";
import css from "./index.module.css";
import Graph from "./Graph";

type Props = {
  ownerName?: string;
  repoName?: string;
};

export default function GitHubCommitStory({ownerName,repoName}:Props) {
  if(ownerName && repoName){
    return <Graph ownerName={ownerName} repoName={repoName} />;
  }
  return <CustomizedGitHubCommitStory />;
}

 function CustomizedGitHubCommitStory() {
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
            setOwnerName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="RepoName"
          onChange={e => {
            setError("");
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
      {loadGraph && <Graph ownerName={ownerName} repoName={repoName} />}
    </div>
  );
}
 