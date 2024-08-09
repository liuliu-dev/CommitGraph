import { useEffect, useState } from "react";
import { Branch } from "../helpers/types";

type ReturnType = {
  branches: Branch[];
};

export function useGitHubBranchList(
  ownerName: string,
  repoName: string,
  token?: string,
): ReturnType {
  const [branchHeads, setBranchHeads] = useState<Branch[]>([]);
  const apiUrl = `https://api.github.com/repos/${ownerName}/${repoName}/branches`;
  const headers = new Headers({
    Authorization: token ? `Bearer ${token}` : "",
  });

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch(apiUrl, { headers });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBranchHeads(data as Branch[]);
      } catch (error) {
        console.error("Fetching branches failed:", error);
      }
    };

    fetchBranches();
  }, []);

  return { branches: branchHeads };
}
