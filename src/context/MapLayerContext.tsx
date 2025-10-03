// context/MapLayerContext.tsx
import React, { createContext, useContext, useMemo, useState } from 'react';

type LayerCtx = {
  showDebt: boolean;
  setShowDebt: (v: boolean) => void;
  toggleDebt: () => void;
};

const MapLayerContext = createContext<LayerCtx | null>(null);

export const MapLayerProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [showDebt, setShowDebt] = useState(false);
  const value = useMemo(
    () => ({
      showDebt,
      setShowDebt,
      toggleDebt: () => setShowDebt((v) => !v),
    }),
    [showDebt],
  );

  return (
    <MapLayerContext.Provider value={value}>
      {children}
    </MapLayerContext.Provider>
  );
};

export const useMapLayers = () => {
  const ctx = useContext(MapLayerContext);
  if (!ctx)
    throw new Error('useMapLayers must be used within MapLayerProvider');
  return ctx;
};
