import { useEffect } from "react";
import { usePageTransitionContext } from "../../context";
import { useFetchPodcastList } from "../../hooks/";
import { useFilterPodcastList } from "./hooks/useFilterPodcastList";
import type { Podcast } from "../../types";
import { Spinner } from "../../components";
import { Filter, PodcastCard } from "./components";
import { transitionTimeout } from "../../constants";

import "./styles.scss";

export const PodcastListPage = () => {
  const { setIsTransitioning } = usePageTransitionContext();
  const { data, isLoading } = useFetchPodcastList();
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
