import { MapView, useMapData } from '@mappedin/react-sdk';
import CustomMapComponent from './components/CustomMapComponent';
import MapSkeleton from './components/MapSkeleton';
import Sidebar from './components/Sidebar';
import { SpaceInfoDrawer } from './components/SpaceInfoDrawer';

export default function App() {
  const { isLoading, error, mapData } = useMapData({
    key: 'mik_yeBk0Vf0nNJtpesfu560e07e5',
    secret: 'mis_2g9ST8ZcSFb5R9fPnsvYhrX3RyRwPtDGbMGweCYKEq385431022',
    mapId: '65c0ff7430b94e3fabd5bb8c',
  });
  if (isLoading) return <MapSkeleton />;
  if (error) return <div className="p-4 text-red-600">{error.message}</div>;

  return (
    <>
      <SpaceInfoDrawer />
      <Sidebar />
      <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
        <main className="relative flex-1">
          <div
            id="map-root"
            className="h-full w-full"
            style={{
              borderTopLeftRadius: 24,
              borderBottomLeftRadius: 24,
              overflow: 'hidden',
            }}
          >
            {/* @ts-expect-error children are supported at runtime */}
            <MapView
              mapData={mapData}
              style={{ height: '100%', width: '100%' }}
            >
              <CustomMapComponent />
            </MapView>
          </div>
        </main>
      </div>
    </>
  );
}
