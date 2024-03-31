import ReactDOM from "react-dom/client";

import { App } from "./App.tsx";

import "./index.scss";
import { PageTransitionProvider } from "./context";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <PageTransitionProvider>
      <App />
    </PageTransitionProvider>
);
