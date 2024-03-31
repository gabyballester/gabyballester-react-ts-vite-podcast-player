import { Navigate, createBrowserRouter } from "react-router-dom";
import { ROUTES } from "../constants";
import { BaseLayout } from "../components";
import { PodcastDetailPage, PodcastListPage } from "../pages";

const EpisodeDetailPage = () => <div>EPISODE_DETAIL</div>;

export const router = () =>
  createBrowserRouter([
    {
      path: ROUTES.PODCAST_LIST,
      element: <BaseLayout />,
      children: [
        {
          path: ROUTES.PODCAST_LIST,
          element: <PodcastListPage />,
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
