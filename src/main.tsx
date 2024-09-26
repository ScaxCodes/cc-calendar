import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UIProvider } from "./contexts/UIContext"; // Import the UI context provider
import { Calendar } from "./components/Calendar.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UIProvider>
      <Calendar />
    </UIProvider>
  </StrictMode>,
);
