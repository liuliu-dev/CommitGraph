import { useEffect, useState } from "react";
import { Branch } from "../types";

type ReturnType = {
  branches: Branch[];
  error?: string;
};

export function useGitHubBranchList(
  ownerName: string,
  repoName: string,
  token?: string,
): ReturnType {
  const [branchHeads, setBranchHeads] = useState<Branch[]>([]);
  const [error, setError] = useState("");
  const apiUrl = `https://api.github.com/repos/${ownerName}/${repoName}/branches`;
  const headers = new Headers({
    Authorization: token ? `Bearer ${token}` : "",
  });

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch(apiUrl, { headers });
        if (!response.ok) {
          const errorData = await response.json();
          const errorMessage =
            errorData.message || `HTTP error! status: ${response.status}`;
          setError(errorMessage);
          throw new Error(errorMessage);
        }
        const data = await response.json();
        setBranchHeads(data as Branch[]);
        setError("");
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        setError(`Fetching branches failed: ${errorMessage}`);
        console.error("Fetching branches failed:", errorMessage);
      }
    };

    fetchBranches();
  }, []);

  return { branches: branchHeads, error };
}
