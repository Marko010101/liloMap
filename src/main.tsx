import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { MapFiltersProvider } from "./context/MapFilterContext.tsx";
import { SelectedSpaceProvider } from "./context/SelectedSpaceContext.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SelectedSpaceProvider>
      <MapFiltersProvider>
        <App />
      </MapFiltersProvider>
    </SelectedSpaceProvider>
  </StrictMode>
);
