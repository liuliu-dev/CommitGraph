import { useEffect, useState } from "react";
import { Diff } from "../helpers/types";

type ReturnType = {
  Changes: Diff | undefined;
};

export function useGitHubCommitCompare(
  ownerName: string,
  repoName: string,
  base: string,
  head: string,
  token?: string,
): ReturnType {
  const [changes, setChanges] = useState<Diff>();
  const apiUrl = `https://api.github.com/repos/${ownerName}/${repoName}/compare/${base}...${head}`;
  const headers = new Headers({
    Authorization: token ? `Bearer ${token}` : "",
  });

  useEffect(() => {
    const fetchChanges = async () => {
      try {
        const response = await fetch(apiUrl, { headers });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setChanges(data as Diff);
      } catch (error) {
        console.error("Fetching changes failed:", error);
      }
    };

    fetchChanges();
  }, []);

  return { Changes: changes };
}
