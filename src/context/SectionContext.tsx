// src/context/SectionContext.tsx
import { createContext, useContext, useMemo, useState } from 'react';

export type Section = 'A' | 'B' | 'C' | 'D';

type SectionContextValue = {
  selected: Section[]; // ← array instead of Set
  toggle: (s: Section) => void; // add/remove one
  clear: () => void; // remove all
  setAll: (vals: Section[]) => void; // set many
};

const SectionContext = createContext<SectionContextValue | undefined>(
  undefined,
);

export function SectionProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<Section[]>([]);

  const value = useMemo<SectionContextValue>(
    () => ({
      selected,
      toggle: (s) =>
        setSelected((prev) =>
          prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
        ),
      clear: () => setSelected([]),
      setAll: (vals) => setSelected([...vals]),
    }),
    [selected],
  );

  return (
    <SectionContext.Provider value={value}>{children}</SectionContext.Provider>
  );
}

export function useSection() {
  const ctx = useContext(SectionContext);
  if (!ctx) throw new Error('useSection must be used within a SectionProvider');
  return ctx;
}
