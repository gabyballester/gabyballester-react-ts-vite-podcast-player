import { useFetchEpisodeList } from "./hooks/useFetchEpisodeList";
import { Podcast } from "../../types";
import { Spinner } from "..";
import { formatDate, formatDuration } from "../../helper";

import "./styles.scss";

type Props = {
  podcastDetail: Podcast;
};

export const TableComponent = ({ podcastDetail }: Props) => {
  const { data, isLoading } = useFetchEpisodeList({podcastDetail});

  return isLoading ? (
    <Spinner showText />
  ) : data ? (
    <>
      <div className="podcast-detail__right__counter">
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
              className={`table__body__row ${
                index % 2 === 0 ? "table__body__odd-row" : ""
              }`}
              key={episode.id}
            >
              <div className="table__body__row__title">{episode.title}</div>
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
