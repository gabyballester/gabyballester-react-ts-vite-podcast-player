import { useEffect } from "react";
import { usePodcastContext } from "../../context/CurrentPodcastContext";
import { usePageTransitionContext } from "../../context/PageTransitionContext";

export const PodcastDetailPage = () => {
  const { resetPodcast } = usePodcastContext();
  const { startTransition } = usePageTransitionContext();

  useEffect(() => {
    return () => {
      startTransition();
      resetPodcast();
    };
  }, []);

  return <div>PodcastDetailPage</div>;
};
