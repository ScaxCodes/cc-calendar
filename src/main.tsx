import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Calendar } from "./components/Calendar.tsx";
import { UIProvider } from "./contexts/UIContext"; // Import the UI context provider

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UIProvider>
      <Calendar />
    </UIProvider>
  </StrictMode>,
);
