export const Colors = {
  base: 'white',
  hover: 'lightgreen',
  selected: 'green',
  filtered: '#1e88e5',
  sector: {
    A: '#f44336',
    B: '#ff9800',
    C: '#ffeb3b',
    D: '#4caf50',
  },

  debt: {
    none: '#e8f5e9', // 0  (very light green)
    lt100: '#fee7d6', // 1–99  (peach)
    lt300: '#fdc8a2', // 100–299 (light orange)
    lt500: '#f89c74', // 300–499 (orange)
    lt700: '#e4572e', // 500–699 (deep orange)
    severe: '#b62020', // ≥700 (red)
  },
} as const;
