import type { TClickPayload } from '@mappedin/mappedin-js';
import { useMap, useMapViewEvent } from '@mappedin/react-sdk';
import { useEffect, useMemo, useRef } from 'react';
import { useMapFilters } from '../context/MapFilterContext';
import { useSection } from '../context/SectionContext';
import { useSelectedSpace } from '../context/SelectedSpaceContext';
import { Colors } from '../data/Colors';
import stocksData from '../data/stocks';
import { getCircular } from '../service/images';
import { useMapLayers } from '../context/MapLayerContext';
import { getMetricColor, matchStock } from '../helpers/spaceHelpers';

export default function CustomMapComponent() {
  const { mapData, mapView } = useMap();
  const { selectedSpace, setSelectedSpace, clearSelectedSpace } =
    useSelectedSpace();
  const { areaRange } = useMapFilters();
  const { selected: selectedSections } = useSection();
  const { debtFilter } = useMapLayers();
  console.log('selectedSpace', selectedSpace);

  const spaces = useMemo(
    () => (mapData ? mapData.getByType('space') : []),
    [mapData],
  );
  const spaceByIdRef = useRef<Map<string, any>>(new Map());

  useEffect(() => {
    spaceByIdRef.current = new Map(spaces.map((s: any) => [s.id, s]));
  }, [spaces]);

  const getArea = (s: any) => (s?.area ?? s?.['area'] ?? 0) as number;

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
      for (const meta of stocksData) {
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
        console.log('section', section);
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
        const meta = stocksData.find((x) => x.id === selectedSpace.id);
        mapView.Labels.add(sp, labelText(sp, getArea(meta ?? {})));
        console.log('sp', sp);
        console.log('meta', meta);
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

  // Click: select valid spaces, otherwise close the drawer
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

    mapView.updateState(clicked, {
      color: Colors.selected,
      hoverColor: Colors.selected,
    });
    setSelectedSpace(matched);

    mapView.Camera.animateTo(
      { center: event.coordinate },
      { duration: 200, easing: 'ease-out' },
    );
  });

  return null;
}
