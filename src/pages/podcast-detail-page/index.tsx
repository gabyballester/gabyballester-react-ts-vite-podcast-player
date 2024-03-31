import { useEffect } from "react";
import { usePageTransitionContext } from "../../context/PageTransitionContext";
import { transitionTimeout } from "../../constants/keys.constants";

import "./styles.scss";
import { TableComponent } from "../../components/table";

export const PodcastDetailPage = () => {
  const { setIsTransitioning } = usePageTransitionContext();

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
    <div className="podcast-detail">
      <div className="podcast-detail__left">
        <div className="podcast-detail__left__detail-card">
          <div className="podcast-detail__left__detail-card__image-container">
            <img
              src="https://source.unsplash.com/300x200/?cats"
              alt="Podcast Image"
            />
          </div>
          <div className="podcast-detail__left__detail-card__divider" />
          <div className="podcast-detail__left__detail-card__info">
            <p className="podcast-detail__left__detail-card__info__title">
              Title
            </p>
            <p className="podcast-detail__left__detail-card__info__author">
              Author
            </p>
          </div>
          <div className="podcast-detail__left__detail-card__divider" />
          <div className="podcast-detail__left__detail-card__description">
            <p className="podcast-detail__left__detail-card__description__text">
              Description
            </p>
            <p className="podcast-detail__left__detail-card__description__full-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              condimentum quam eu arcu posuere, non consequat magna tempor. Sed
              vitae hendrerit mi.
            </p>
          </div>
        </div>
      </div>
      <div className="podcast-detail__right">
        <div className="podcast-detail__right__counter">Episodes: 62</div>
          <TableComponent />
      </div>
    </div>
  );
};
