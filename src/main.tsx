import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./index.scss";
import { router } from "./router/router-config.tsx";
import { StrictMode } from "react";
import { RouterProvider } from "react-router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router(<App />)} />
  </StrictMode>
);
