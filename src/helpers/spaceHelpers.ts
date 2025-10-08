import { Colors } from '../data/Colors';
import storeData from '../data/store';

export const matchStock = (id: string) =>
  storeData.find((s) => s.id === id) ?? null;

export function valueToBand(
  v?: number | null,
  mode: 'leasingDebt' | 'leasingCost' = 'leasingDebt',
) {
  if (!v || v <= 0) return 'none';

  if (mode === 'leasingDebt') {
    if (v < 100) return 'lt100';
    if (v < 300) return 'lt300';
    if (v < 500) return 'lt500';
    if (v < 700) return 'lt700';
    return 'severe';
  }

  if (mode === 'leasingCost') {
    if (v < 800) return 'lt100'; // 1–999
    if (v < 1200) return 'lt300'; // 1000–2999
    if (v < 1500) return 'lt500'; // 3000–4999
    if (v < 1700) return 'lt700'; // 5000–6999
    return 'severe'; // ≥7000
  }

  return 'severe';
}

export function getMetricColor(
  mode: 'leasingDebt' | 'leasingCost',
  value: number,
): string {
  const band = valueToBand(value, mode);
  const palette =
    mode === 'leasingDebt' ? Colors.leasingDebt : Colors.leasingCost;
  return palette[band];
}

export const BANDS: Record<
  'leasingDebt' | 'leasingCost',
  Array<{ key: keyof typeof Colors.leasingDebt; label: string }>
> = {
  leasingDebt: [
    { key: 'none', label: '0' },
    { key: 'lt100', label: '1–99' },
    { key: 'lt300', label: '100–299' },
    { key: 'lt500', label: '300–499' },
    { key: 'lt700', label: '500–699' },
    { key: 'severe', label: '≥700' },
  ],
  leasingCost: [
    { key: 'none', label: '0' },
    { key: 'lt100', label: '< 800' },
    { key: 'lt300', label: '800–1199' },
    { key: 'lt500', label: '1200–1499' },
    { key: 'lt700', label: '1500–1699' },
    { key: 'severe', label: '≥1700' },
  ],
};
