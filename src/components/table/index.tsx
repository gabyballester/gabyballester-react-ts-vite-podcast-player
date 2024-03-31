import { Link } from "react-router-dom";
import { useFetchEpisodeList } from "./hooks/useFetchEpisodeList";
import { useLocalStorage } from "../../hooks";
import type { Episode, Podcast } from "../../types";
import { Spinner } from "..";
import { formatDate, formatDuration } from "../../helper";
import { key } from "../../constants";

import "./styles.scss";

type Props = {
  podcastDetail: Podcast;
};

export const TableComponent = ({ podcastDetail }: Props) => {
  const { data, isLoading } = useFetchEpisodeList({ podcastDetail });
  const { setItem } = useLocalStorage<Episode>();

  const handleSaveEpisodeAndPodcastDetail = (episode: Episode) => {
    setItem({
      key: key.podcastDetail(podcastDetail.id.toString()),
      dataToStore: {
        data: episode,
        savedOn: new Date(),
      },
    });

    setItem({
      key: key.episodeDetail(episode.id.toString()),
      dataToStore: {
        data: episode,
        savedOn: new Date(),
      },
    });
  };

  return isLoading ? (
    <Spinner showText />
  ) : data ? (
    <>
      <div className="counter">
        Episodes: {data.length}
      </div>

      <div className="table">
        <div className="table__header">
          <div className="table__header__title">Title</div>
          <div className="table__header__date">Date</div>
          <div className="table__header__duration">Duration</div>
        </div>
        <div className="table__body">
          {data.map((episode, index) => (
            <div
              onClick={() => handleSaveEpisodeAndPodcastDetail(episode)}
              className={`table__body__row ${
                index % 2 === 0 ? "table__body__odd-row" : ""
              }`}
              key={episode.id}
            >
              <div className="table__body__row__title">
                <Link
                  to={`/podcast/${podcastDetail.id}/episode/${episode.id}`}
                  key={episode.id}
                  className="card__link"
                >
                  {episode.title}
                </Link>
              </div>
              <div className="table__body__row__date">
                {formatDate(episode.releaseDate)}
              </div>
              <div className="table__body__row__duration">
                {formatDuration(episode.duration || 0)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  ) : (
    <div>No episodes available.</div>
  );
};
