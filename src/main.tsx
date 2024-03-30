import ReactDOM from "react-dom/client";

import { App } from "./App.tsx";

import "./index.scss";
import { CurrentPodcastProvider, PageTransitionProvider } from "./context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <CurrentPodcastProvider>
    <PageTransitionProvider>
      <App />
    </PageTransitionProvider>
  </CurrentPodcastProvider>
);
