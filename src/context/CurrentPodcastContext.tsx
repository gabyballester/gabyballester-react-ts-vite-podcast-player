// CurrentPodcastContext.tsx

import { createContext, useContext, useState, ReactNode } from "react";
import type { Podcast } from "../types";

export const initialPodcast: Podcast = {
  id: "",
  title: "",
  author: "",
  description: "",
  image: "",
  episodes: [],
  releaseDate: null,
};

const CurrentPodcastContext = createContext<{
  currentPodcast: Podcast;
  setCurrentPodcast: (podcast: Podcast) => void;
  resetPodcast: () => void;
}>({
  currentPodcast: initialPodcast,
  setCurrentPodcast: () => {},
  resetPodcast: () => {},
});

export const usePodcastContext = () => {
  const context = useContext(CurrentPodcastContext);
  if (!context) {
    throw new Error("PodcastContext must be used inside PodcastProvider");
  }
  return context;
};

export const CurrentPodcastProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [currentPodcast, setCurrentPodcast] = useState<Podcast>(initialPodcast);
  
  

  const resetPodcast = () => setCurrentPodcast(initialPodcast);

  return (
    <CurrentPodcastContext.Provider
      value={{ currentPodcast, setCurrentPodcast, resetPodcast }}
    >
      {children}
    </CurrentPodcastContext.Provider>
  );
};
