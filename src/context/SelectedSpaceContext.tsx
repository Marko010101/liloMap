import React, { createContext, useContext, useMemo, useState } from "react";
import type stocksData from "../data/stocks";

// Type of one item from stocksData
export type StockItem = (typeof stocksData)[number];

type SelectedSpaceContextValue = {
  selectedSpace: StockItem | null;
  setSelectedSpace: (space: StockItem | null) => void;
  clearSelectedSpace: () => void;
};

const SelectedSpaceContext = createContext<SelectedSpaceContextValue | null>(
  null
);

export const SelectedSpaceProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [selectedSpace, setSelectedSpaceState] = useState<StockItem | null>(
    null
  );

  const setSelectedSpace = (space: StockItem | null) =>
    setSelectedSpaceState(space);
  const clearSelectedSpace = () => setSelectedSpaceState(null);

  const value = useMemo(
    () => ({ selectedSpace, setSelectedSpace, clearSelectedSpace }),
    [selectedSpace]
  );

  return (
    <SelectedSpaceContext.Provider value={value}>
      {children}
    </SelectedSpaceContext.Provider>
  );
};

export const useSelectedSpace = (): SelectedSpaceContextValue => {
  const ctx = useContext(SelectedSpaceContext);
  if (!ctx) {
    throw new Error(
      "useSelectedSpace must be used within a SelectedSpaceProvider"
    );
  }
  return ctx;
};
