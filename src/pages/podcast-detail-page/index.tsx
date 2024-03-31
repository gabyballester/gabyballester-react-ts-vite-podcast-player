import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePageTransitionContext } from "../../context";
import { useFetchPodcastList } from "../../hooks";
import { Podcast } from "../../types";
import { TableComponent, Spinner } from "../../components";
import { transitionTimeout } from "../../constants";
import { containsHTML } from "../../helper";

import "./styles.scss";

export const PodcastDetailPage = () => {
  const { podcastId } = useParams<{ podcastId: string }>();
  const { data: podcastList, isLoading } = useFetchPodcastList();
  const { setIsTransitioning } = usePageTransitionContext();
  const [podcastDetail, setPodcastDetail] = useState<Podcast | null>();

  useEffect(() => {
    setIsTransitioning(true);

    if (podcastList && podcastList.length > 0) {
      const foundPodcast = podcastList.find((item) => item.id === podcastId);
      setPodcastDetail(foundPodcast ?? null);
    }

    let timeoutId: number;
    timeoutId = setTimeout(() => {
      setIsTransitioning(false);
    }, transitionTimeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [podcastList]);

  return (
    <div className="podcast-detail">
      {isLoading ? (
        <Spinner showText />
      ) : podcastDetail ? (
        <>
          <div className="podcast-detail__left">
            <div className="podcast-detail__left__detail-card">
              <div className="podcast-detail__left__detail-card__image-container">
                <img src={podcastDetail?.image} alt="Podcast Image" />
              </div>
              <div className="podcast-detail__left__detail-card__divider" />
              <div className="podcast-detail__left__detail-card__info">
                <p className="podcast-detail__left__detail-card__info__title">
                  {podcastDetail?.title}
                </p>
                <p className="podcast-detail__left__detail-card__info__author">
                  {podcastDetail?.author}
                </p>
              </div>
              <div className="podcast-detail__left__detail-card__divider" />
              <div className="podcast-detail__left__detail-card__description">
                <p className="podcast-detail__left__detail-card__description__text">
                  Description
                </p>
                <p
                  className={`podcast-detail__left__detail-card__description__full-description ${
                    podcastDetail?.description.length > 500 && "scroll"
                  }`}
                  {...(containsHTML(podcastDetail?.description)
                    ? {
                        dangerouslySetInnerHTML: {
                          __html: podcastDetail?.description,
                        },
                      }
                    : null)}
                >
                  {podcastDetail?.description}
                </p>
              </div>
            </div>
          </div>
          <div className="podcast-detail__right">
            <TableComponent podcastDetail={podcastDetail} />
          </div>
        </>
      ) : (
        <p className="podcast-list__content__no-data">No data to show!</p>
      )}
    </div>
  );
};
