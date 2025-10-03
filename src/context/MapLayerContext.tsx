// context/MapLayerContext.tsx
import React, { createContext, useContext, useMemo, useState } from 'react';

type LayerCtx = {
  debtFilter: string;
  setDebtFilter: (v: string) => void;
  clearDebtFilter: () => void;
};

const MapLayerContext = createContext<LayerCtx | null>(null);

export const MapLayerProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [debtFilter, setDebtFilter] = useState<string>('');

  const value = useMemo(
    () => ({
      debtFilter,
      setDebtFilter,
      clearDebtFilter: () => setDebtFilter(''),
    }),
    [debtFilter],
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
