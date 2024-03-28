import { Link, Outlet } from "react-router-dom";
import { ROUTES } from "./constants/routes.constants";

export const App = () => {
  return (
    <div>
      <Link to={ROUTES.PODCAST_LIST}>Podcast List</Link>
      <Link to={ROUTES.PODCAST_DETAIL}>Podcast Detail</Link>
      <Link to={ROUTES.EPISODE_DETAIL}>Episode Detail</Link>
      <Outlet />
    </div>
  );
};
