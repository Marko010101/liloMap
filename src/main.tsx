import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { MapFiltersProvider } from './context/MapFilterContext.tsx';
import { SelectedSpaceProvider } from './context/SelectedSpaceContext.tsx';
import './index.css';
import { SectionProvider } from './context/SectionContext.tsx';
import { MapLayerProvider } from './context/MapLayerContext.tsx';
import { DirectionProvider } from './context/DirectionContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SelectedSpaceProvider>
      <MapFiltersProvider>
        <SectionProvider>
          <MapLayerProvider>
            <DirectionProvider>
              <App />
            </DirectionProvider>
          </MapLayerProvider>
        </SectionProvider>
      </MapFiltersProvider>
    </SelectedSpaceProvider>
  </StrictMode>,
);
