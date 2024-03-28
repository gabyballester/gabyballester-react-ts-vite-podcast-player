import { createBrowserRouter } from "react-router-dom";

import { ROUTES } from "../constants/routes.constants";

const PodcastListPage = () => <div>PODCAST_LIST</div>;
const PodcastDetailPage = () => <div>PODCAST_DETAIL</div>;
const EpisodeDetailPage = () => <div>EPISODE_DETAIL</div>;

export const router = (parentElement: React.ReactNode) =>
  createBrowserRouter([
    {
      path: ROUTES.PODCAST_LIST,
      element: parentElement,
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
      ],
    },
  ]);
