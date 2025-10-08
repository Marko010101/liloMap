import type { Space, TClickPayload } from '@mappedin/mappedin-js';
import { useMap, useMapViewEvent } from '@mappedin/react-sdk';
import { useEffect, useMemo, useRef } from 'react';
import { useDirection } from '../context/DirectionContext';
import { useMapFilters } from '../context/MapFilterContext';
import { useMapLayers } from '../context/MapLayerContext';
import { useSection } from '../context/SectionContext';
import { useSelectedSpace } from '../context/SelectedSpaceContext';
import { Colors } from '../data/Colors';
import storeData from '../data/store';
import { getMetricColor, matchStock } from '../helpers/spaceHelpers';
import { getCircular } from '../service/images';

export default function CustomMapComponent() {
  const { mapData, mapView } = useMap();
  const { selectedSpace, setSelectedSpace, clearSelectedSpace } =
    useSelectedSpace();
  const { isDirectionMode, setDirections } = useDirection();
  const { areaRange } = useMapFilters();
  const { selected: selectedSections } = useSection();
  const { debtFilter } = useMapLayers();

  const spaces = useMemo(
    () => (mapData ? mapData.getByType('space') : []),
    [mapData],
  );
  const spaceByIdRef = useRef<Map<string, any>>(new Map());
  const startSpaceRef = useRef<Space | null>(null);

  const getArea = (s: any) => (s?.area ?? s?.['area'] ?? 0) as number;

  useEffect(() => {
    spaceByIdRef.current = new Map(spaces.map((s: any) => [s.id, s]));
  }, [spaces]);

  // One-time: make spaces interactive + base color
  useEffect(() => {
    if (!mapView || spaces.length === 0) return;
    spaces.forEach((sp: any) =>
      mapView.updateState(sp, {
        interactive: true,
        color: Colors.base,
        hoverColor: Colors.hover,
      }),
    );
  }, [mapView, spaces]);

  // Paint everything based on active filter + current selection.
  useEffect(() => {
    if (!mapView || spaces.length === 0) return;

    const paint = (sp: any, color: string, hover = color) =>
      mapView.updateState(sp, { color, hoverColor: hover });

    const labelText = (sp: any, a: number) => `${sp.name || sp.id} - ${a} მ²`;
    const inRange = (a: number, [min, max]: [number, number]) =>
      a >= min && a <= max;

    spaces.forEach((sp: any) => paint(sp, Colors.base, Colors.hover));

    mapView.Labels.removeAll();
    if (mapView.Image3D?.removeAll) mapView.Image3D.removeAll();

    if (areaRange) {
      for (const meta of storeData) {
        const sp = spaceByIdRef.current.get(meta.id);
        if (!sp) continue;
        const a = getArea(meta);
        if (!inRange(a, areaRange)) continue;
        paint(sp, Colors.filtered);
        mapView.Labels.add(sp, labelText(sp, a));
      }
    }

    if (selectedSections.length > 0) {
      selectedSections.forEach((section) => {
        spaceByIdRef.current.forEach((sp) => {
          const selectedSectionStocks = matchStock(sp.id);
          const matchedStock =
            selectedSectionStocks?.section == section ? sp : null;

          if (!matchedStock || !selectedSectionStocks) return;
          (mapView.updateState(matchedStock, {
            color: Colors.sector[section as keyof typeof Colors.sector],
            hoverColor: Colors.hover,
          }),
            mapView.Labels.add(
              matchedStock,
              `${matchedStock.name || matchedStock.id} - ${selectedSectionStocks.sectionArea} `,
            ));
          (async () => {
            const circular = await getCircular(selectedSectionStocks.image);
            mapView.Image3D.add(matchedStock, circular, {
              width: 2,
              height: 2,
              rotation: 45,
              verticalOffset: 1,
              flipImageToFaceCamera: true,
            });
          })();
        });
      });
    }

    if (debtFilter) {
      spaceByIdRef.current.forEach((sp) => {
        const stocks = matchStock(sp.id);
        if (!stocks) return;

        const isDebt = debtFilter === 'leasingDebt';
        const value = isDebt
          ? (stocks.leasingDebt ?? 0)
          : (stocks.leasingCost ?? 0);
        const color = getMetricColor(
          isDebt ? 'leasingDebt' : 'leasingCost',
          value,
        );

        mapView.updateState(sp, { color, hoverColor: color });

        mapView.Labels.add(
          sp,
          `${sp.name || sp.id} • ${isDebt ? 'ვალი' : 'ქირა'}: ${value} ₾`,
        );
      });
    }
    if (selectedSpace?.id) {
      const sp = spaceByIdRef.current.get(selectedSpace.id);
      if (sp) {
        paint(sp, Colors.selected);
        const meta = storeData.find((x) => x.id === selectedSpace.id);
        mapView.Labels.add(sp, labelText(sp, getArea(meta ?? {})));
        (async () => {
          const circular = await getCircular(meta?.image ?? '');
          mapView.Image3D.add(sp, circular, {
            width: 2,
            height: 2,
            rotation: 45,
            verticalOffset: 1,
            flipImageToFaceCamera: true,
          });
        })();
      }
    }
  }, [
    areaRange,
    selectedSpace?.id,
    mapView,
    spaces,
    selectedSections,
    debtFilter,
  ]);

  useEffect(() => {
    if (!isDirectionMode) {
      mapView.Navigation.clear();
      setDirections(null);
    }
  }, [isDirectionMode]);

  useMapViewEvent('click', (event: TClickPayload) => {
    const clicked = event?.spaces?.[0];

    if (!clicked) {
      clearSelectedSpace();
      return;
    }

    const matched = matchStock(clicked.id);
    if (!matched) {
      clearSelectedSpace();
      return;
    }

    // select + camera (unchanged)
    mapView.updateState(clicked, {
      color: Colors.selected,
      hoverColor: Colors.selected,
    });
    setSelectedSpace(matched);
    mapView.Camera.animateTo(
      { center: event.coordinate },
      { duration: 200, easing: 'ease-out' },
    );

    // --- directions mode ---
    if (!isDirectionMode || !mapData) return;

    // 1st click => set start
    if (!startSpaceRef.current && event.spaces?.[0]) {
      startSpaceRef.current = event.spaces[0];
      return;
    }

    // 2nd click => compute & draw
    if (startSpaceRef.current && event.spaces?.[0]) {
      const from = startSpaceRef.current;
      const to = event.spaces[0];

      (async () => {
        const directions = await mapData.getDirections(from, to);
        if (!directions) return;

        mapView.Paths.removeAll();
        mapView.Navigation.draw(directions);

        console.log('directions', directions);
        setDirections(directions);

        startSpaceRef.current = null;
      })();
    }
  });

  return null;
}
