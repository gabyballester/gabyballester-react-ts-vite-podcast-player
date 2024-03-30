import { useEffect } from "react";
import { usePodcastContext } from "../../context/CurrentPodcastContext";
import { usePageTransitionContext } from "../../context/PageTransitionContext";
import { transitionTimeout } from "../../constants/keys.constants";

export const PodcastDetailPage = () => {
  const { resetPodcast } = usePodcastContext();
  const { setIsTransitioning } = usePageTransitionContext();

  useEffect(() => {
    setIsTransitioning(true);

    let timeoutId: number;
    timeoutId = setTimeout(() => {
      setIsTransitioning(false);
    }, transitionTimeout);

    return () => {
      clearTimeout(timeoutId);
      resetPodcast();
    };
  }, []);

  return <div>PodcastDetailPage</div>;
};
