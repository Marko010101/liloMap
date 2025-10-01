import stocksData from "../data/stocks";

export const matchStock = (id: string) =>
  stocksData.find((s) => s.id === id) ?? null;
