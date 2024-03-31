import { Link, Outlet } from "react-router-dom";
import { usePageTransitionContext } from "../../context";
import { TransitionBall } from "..";

import "./styles.scss";

export const BaseLayout = () => {
  const { isTransitioning } = usePageTransitionContext();

  return (
    <div className="base-layout">
      <header className="base-layout__header">
        <Link to="/" className="base-layout__header__title">
          Podcaster
        </Link>
        <TransitionBall isLoading={isTransitioning} />
      </header>
      <main className="base-layout__main">
        <Outlet />
      </main>
    </div>
  );
};
