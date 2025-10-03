import { toCircularDataUrl } from '../helpers/circleImage';

// simple cache so we don't recompute
const circleCache = new Map<string, string>();

export async function getCircular(src: string) {
  if (circleCache.has(src)) return circleCache.get(src)!;
  const data = await toCircularDataUrl(src, 256, '#ffffff', 2);
  circleCache.set(src, data);
  return data;
}
