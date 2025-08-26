import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n"; // 👈 import your i18n config

createRoot(document.getElementById("root")!).render(
  <App />
);
