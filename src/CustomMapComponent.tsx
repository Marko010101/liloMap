// CustomMapComponent.tsx
import type { TClickPayload } from "@mappedin/mappedin-js";
import { useMap, useMapViewEvent } from "@mappedin/react-sdk";
import { useEffect, useMemo, useRef } from "react";
import { useSelectedSpace } from "./context/SelectedSpaceContext";
import { stocksData } from "./data/stocks";
import { useMapFilters } from "./context/MapFilterContext";
import { matchStock } from "./helpers/spaceHelpers";

const BASE = "white";
const HOVER = "lightgreen";
const SELECTED = "green";
const FILTERED = "#1e88e5";

export default function CustomMapComponent() {
  const { mapData, mapView } = useMap();
  const { selectedSpace, setSelectedSpace } = useSelectedSpace();
  const { areaRange } = useMapFilters();

  // Build id -> mappedin space cache once mapData is ready
  const spaces = useMemo(
    () => (mapData ? mapData.getByType("space") : []),
    [mapData]
  );
  const spaceByIdRef = useRef<Map<string, any>>(new Map());
  useEffect(() => {
    spaceByIdRef.current = new Map(spaces.map((s: any) => [s.id, s]));
  }, [spaces]);

  const getArea = (s: any) => (s.area ?? s["ფართობი"] ?? 0) as number;

  // One-time: make spaces interactive + base color
  useEffect(() => {
    if (!mapView || spaces.length === 0) return;
    spaces.forEach((sp: any) =>
      mapView.updateState(sp, {
        interactive: true,
        color: BASE,
        hoverColor: HOVER,
      })
    );
  }, [mapView, spaces]);

  // Paint everything based on active filter + current selection.
  useEffect(() => {
    if (!mapView || spaces.length === 0) return;

    const paint = (sp: any, color: string, hover = color) =>
      mapView.updateState(sp, { color, hoverColor: hover });
    const labelText = (sp: any, meta: any, a: number) =>
      `${sp.name || sp.id} - ${a} მ²`;

    const getMeta = (id: string) => stocksData.find((x) => x.id === id);
    const inRange = (a: number, [min, max]: [number, number]) =>
      a >= min && a <= max;

    // 1) reset colors + labels
    spaces.forEach((sp: any) => paint(sp, BASE, HOVER));
    mapView.Labels.removeAll();

    // 2) filter (blue) + label only filtered
    if (areaRange) {
      for (const meta of stocksData) {
        const sp = spaceByIdRef.current.get(meta.id);
        if (!sp) continue;
        const a = getArea(meta);
        if (!inRange(a, areaRange)) continue;

        paint(sp, FILTERED);
        mapView.Labels.add(sp, labelText(sp, meta, a));
      }
    }

    // 3) selection wins (green) + keep its label
    if (selectedSpace?.id) {
      const sp = spaceByIdRef.current.get(selectedSpace.id);
      if (sp) {
        paint(sp, SELECTED);
        const meta = getMeta(selectedSpace.id);
        mapView.Labels.add(sp, labelText(sp, meta, getArea(meta ?? {})));
      }
    }
  }, [areaRange, selectedSpace?.id, mapView, spaces]);

  // Click: instant paint + label, then set selection (effect maintains it)
  useMapViewEvent("click", (event: TClickPayload) => {
    const clicked = event?.spaces?.[0];
    if (!clicked) return;

    const matched = matchStock(clicked.id);
    if (!matched) return;
    console.log("event", event);
    mapView.updateState(clicked, { color: SELECTED, hoverColor: SELECTED });
    setSelectedSpace(matched);

    // Camera move
    mapView.Camera.animateTo(
      { bearing: 3, center: event.coordinate, pitch: 50, zoomLevel: 20 },
      { duration: 1000, easing: "ease-out" }
    );
  });

  return null;
}
