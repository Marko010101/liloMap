// context/DirectionContext.tsx
import { createContext, useContext, useState } from 'react';

type DirectionContextType = {
  isDirectionMode: boolean;
  setIsDirectionMode: React.Dispatch<React.SetStateAction<boolean>>;
  directions: any | null; // ← added
  setDirections: React.Dispatch<React.SetStateAction<any | null>>; // ← added
};

const DirectionContext = createContext<DirectionContextType | undefined>(
  undefined,
);

export function DirectionProvider({ children }: { children: React.ReactNode }) {
  const [isDirectionMode, setIsDirectionMode] = useState(false);
  const [directions, setDirections] = useState<any | null>(null);

  return (
    <DirectionContext.Provider
      value={{ isDirectionMode, setIsDirectionMode, directions, setDirections }} // ← added
    >
      {children}
    </DirectionContext.Provider>
  );
}

export function useDirection() {
  const ctx = useContext(DirectionContext);
  if (!ctx) {
    throw new Error('useDirection must be used within a DirectionProvider');
  }
  return ctx;
}
