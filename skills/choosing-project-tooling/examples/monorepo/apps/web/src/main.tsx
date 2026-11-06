import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/geist/400.css";
import "@fontsource/geist/500.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "./components/arc/foundation.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
