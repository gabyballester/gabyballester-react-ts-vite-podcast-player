import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePageTransitionContext } from "../../context";
import { useLocalStorage } from "../../hooks";
import type { Episode, Podcast } from "../../types";
import { key, transitionTimeout } from "../../constants";
import { containsHTML } from "../../helper";
import { Player } from "./components/player";

import "./styles.scss";

export const EpisodeDetailPage = () => {
  const navigate = useNavigate();
  const { episodeId } = useParams<{ episodeId?: string }>();
  const { podcastId } = useParams<{ podcastId?: string }>();
  const { setIsTransitioning } = usePageTransitionContext();

  const episodeDetail = useMemo(() => {
    if (!episodeId && episodeId !== "undefined") {
      navigate(-1);
      return null;
    }

    const { getItem: getEpisodeDetail } = useLocalStorage<Episode>();
    return getEpisodeDetail(key.episodeDetail(episodeId));
  }, [episodeId]);

  const podcastDetail = useMemo(() => {
    if (!podcastId && podcastId !== "undefined") {
      navigate(-1);
      return null;
    }

    const { getItem: getPodcastDetail } = useLocalStorage<Podcast>();
    return getPodcastDetail(key.podcastDetail(podcastId));
  }, [podcastId]);

  useEffect(() => {
    setIsTransitioning(true);

    const timeoutId = setTimeout(() => {
      setIsTransitioning(false);
    }, transitionTimeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const goBack = () => navigate(-1);

  return (
    <div className="episode-detail">
      {podcastDetail?.data && episodeDetail?.data ? (
        <>
          <div className="episode-detail__left" onClick={goBack}>
            <div className="episode-detail__left__detail-card">
              <div className="episode-detail__left__detail-card__image-container">
                <img src={podcastDetail?.data.image} alt="Podcast Image" />
              </div>
              <div className="episode-detail__left__detail-card__divider" />
              <div className="episode-detail__left__detail-card__info">
                <p className="episode-detail__left__detail-card__info__title">
                  {podcastDetail?.data.title}
                </p>
                <p className="episode-detail__left__detail-card__info__author">
                  author
                </p>
              </div>
              <div className="episode-detail__left__detail-card__divider" />
              <div className="episode-detail__left__detail-card__description">
                <p className="episode-detail__left__detail-card__description__text">
                  Description
                </p>
                <p
                  className={`episode-detail__left__detail-card__description__full-description ${
                    podcastDetail?.data?.description.length > 500 && "scroll"
                  }`}
                  {...(containsHTML(podcastDetail?.data.description)
                    ? {
                        dangerouslySetInnerHTML: {
                          __html: podcastDetail?.data.description,
                        },
                      }
                    : null)}
                >
                  {episodeDetail?.data.description}
                </p>
              </div>
            </div>
          </div>
          <div className="episode-detail__right">
            <Player episodeDetail={episodeDetail.data} />
          </div>
        </>
      ) : (
        <p className="podcast-list__content__no-data">No data to show!</p>
      )}
    </div>
  );
};
