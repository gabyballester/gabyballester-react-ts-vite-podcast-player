import { Navigate, createBrowserRouter } from "react-router-dom";

import { ROUTES } from "../constants/routes.constants";
import { BaseLayout } from "../components/layouts/base";
import { PodtastListPage } from "../pages/podcast-list-page";

const PodcastDetailPage = () => <div>PODCAST_DETAIL</div>;
const EpisodeDetailPage = () => <div>EPISODE_DETAIL</div>;

export const router = () =>
  createBrowserRouter([
    {
      path: ROUTES.PODCAST_LIST,
      element: <BaseLayout />,
      children: [
        {
          path: ROUTES.PODCAST_LIST,
          element: <PodtastListPage />,
        },
        {
          path: ROUTES.PODCAST_DETAIL,
          element: <PodcastDetailPage />,
        },
        {
          path: ROUTES.EPISODE_DETAIL,
          element: <EpisodeDetailPage />,
        },
        {
          path: "*",
          element: <Navigate to={ROUTES.NOT_FOUND} />,
        },
      ],
    },
  ]);
