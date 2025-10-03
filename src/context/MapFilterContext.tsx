// context/MapFilterContext.tsx
import React, { createContext, useContext, useMemo, useState } from 'react';

export type AreaRange = [number, number];

type Ctx = {
  areaRange: AreaRange | null; // null = inactive
  setAreaRange: (v: AreaRange | null) => void;
  limits: { min: number; max: number; step: number };
};

const MapFilterContext = createContext<Ctx | null>(null);

export const MapFiltersProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const limits = { min: 0, max: 300, step: 10 } as const;
  const [areaRange, setAreaRange] = useState<AreaRange | null>(null); // inactive by default

  const value = useMemo(
    () => ({ areaRange, setAreaRange, limits }),
    [areaRange],
  );
  return (
    <MapFilterContext.Provider value={value}>
      {children}
    </MapFilterContext.Provider>
  );
};

export const useMapFilters = () => {
  const ctx = useContext(MapFilterContext);
  if (!ctx)
    throw new Error('useMapFilters must be used within MapFiltersProvider');
  return ctx;
};
