import { useState, useMemo } from "react";
import type { Podcast } from "../../../types";

export const useFilterPodcastList = (data: Podcast[] | null) => {
  const [filterText, setFilterText] = useState<string>("");

  const filteredPodcasts = useMemo(() => {
    if (!data || !Array.isArray(data)) return null;
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
