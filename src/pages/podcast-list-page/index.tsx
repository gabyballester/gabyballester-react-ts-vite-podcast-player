import { useEffect } from "react";
import { useFetchPodcastList } from "./hooks/useFetchPodcastList";
import { useFilterPodcastList } from "./hooks/useFilterPodcastList";
import { usePageTransitionContext } from "../../context/PageTransitionContext";
import type { Podcast } from "../../types";
import { Filter } from "./components/filter";
import { PodcastCard } from "./components/podcast-card";
import { Spinner } from "../../components/spinner";
import { api } from "../../constants/api.constants";

import "./styles.scss";
import { transitionTimeout } from "../../constants/keys.constants";

export const PodcastListPage = () => {
  const { setIsTransitioning } = usePageTransitionContext();
  const podcastListUrl = api.baseUrl + api.endpoint.podcastList({ limit: 100 });
  const { data, isLoading } = useFetchPodcastList(podcastListUrl);
  const { filterText, setFilterText, filteredPodcasts } =
    useFilterPodcastList(data);

  useEffect(() => {
    setIsTransitioning(true);
    
    let timeoutId: number;
    timeoutId = setTimeout(() => {
      setIsTransitioning(false);
    }, transitionTimeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="podcast-list">
      {isLoading ? (
        <Spinner showText />
      ) : (
        <>
          <div className="podcast-list__header">
            <Filter
              filterText={filterText}
              setFilterText={setFilterText}
              filteredPodcastsCount={filteredPodcasts?.length ?? 0}
            />
          </div>
          <div className="podcast-list__content">
            {filteredPodcasts && filteredPodcasts.length > 0 ? (
              <div className="podcast-list__content__cards-container">
                {filteredPodcasts.map((podcast: Podcast, index) => (
                  <PodcastCard key={index} podcast={podcast} />
                ))}
              </div>
            ) : (
              <p className="podcast-list__content__no-data">No data to show!</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};
