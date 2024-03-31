import { Link } from "react-router-dom";
import type { Podcast } from "../../../../types";

import "./styles.scss";


type Props = { podcast: Podcast };

export const PodcastCard = ({ podcast }: Props) => {

  return (
    <div className="card">
      <Link
        to={`/podcast/${podcast.id}`}
        key={podcast.id}
        className="card__link"
      >
        <div className="card__content">
          <img
            src={podcast.image}
            alt={podcast.title}
            className="card__image"
          />
          <div className="card__details">
            <h5 className="card__title">{podcast.title}</h5>
            <p className="card__author">{podcast.author}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
