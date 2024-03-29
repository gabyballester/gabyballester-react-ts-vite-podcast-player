import type { Podcast } from "../../types";
import { Filter } from "./components/filter";
import { useFetchPodcastList } from "./hooks/useFetchPodcastList";
import { PodcastCard } from "./components/podcast-card/index";
import { useFilterPodcastList } from "./hooks/useFilterPodcastList";

import "./styles.scss";

export const PodtastListPage = () => {
  const { data, isLoading } = useFetchPodcastList(
    "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
  );

  const { filterText, setFilterText, filteredPodcasts } =
    useFilterPodcastList(data);

  return (
    <div className="podtast-list">
      {isLoading ? (
        <p>loading</p>
      ) : (
        <>
          <div className="podtast-list__header">
            <Filter
              filterText={filterText}
              setFilterText={setFilterText}
              filteredPodcastsCount={filteredPodcasts.length}
            />
          </div>
          <div className="podtast-list__cards-container">
            {filteredPodcasts.map((podcast: Podcast, index) => (
              <PodcastCard key={index} podcast={podcast} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
