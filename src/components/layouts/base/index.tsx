import { Link, Outlet } from "react-router-dom";
import { TransitionBall } from "../../transition-ball";
import "./styles.scss";

export const BaseLayout = () => {
  return (
    <div className="base-layout">
      <header className="base-layout__header">
        <Link to="/" className="base-layout__title">
          Podcaster
        </Link>
        <TransitionBall isLoading={true} />
      </header>
      <main className="base-layout__main">
        <Outlet />
      </main>
    </div>
  );
};
