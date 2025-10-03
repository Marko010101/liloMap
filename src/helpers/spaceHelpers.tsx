import stocksData from '../data/stocks';
import { Colors } from '../data/Colors';
export const matchStock = (id: string) =>
  stocksData.find((s) => s.id === id) ?? null;

export const getDebtColor = (amt: number) => {
  if (amt <= 0) return Colors.debt.none;
  if (amt < 100) return Colors.debt.lt100;
  if (amt < 300) return Colors.debt.lt300;
  if (amt < 500) return Colors.debt.lt500;
  if (amt < 700) return Colors.debt.lt700;
  return Colors.debt.severe;
};
