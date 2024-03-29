import { useState, useMemo } from "react";
import { Podcast } from "../../../types";

export const useFilterPodcastList = (data: Podcast[]) => {
  const [filterText, setFilterText] = useState<string>("");

  const filteredPodcasts = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    return data.filter(
      (podcast) =>
        podcast.title.toLowerCase().includes(filterText.toLowerCase()) ||
        podcast.author.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [data, filterText]);

  return {
    filterText,
    setFilterText,
    filteredPodcasts,
  };
};
