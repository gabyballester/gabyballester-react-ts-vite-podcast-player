import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";

import "./index.scss";
import { CurrentPodcastProvider } from "./context/CurrentPodcastContext.tsx";
import { PageTransitionProvider } from "./context/PageTransitionContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <CurrentPodcastProvider>
    <PageTransitionProvider>
      <App />
    </PageTransitionProvider>
  </CurrentPodcastProvider>
);
