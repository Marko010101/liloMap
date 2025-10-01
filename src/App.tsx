import { MapView, useMapData } from "@mappedin/react-sdk";
import CustomMapComponent from "./CustomMapComponent";
import { HeaderFilters } from "./components/Header";
import { SpaceInfoDrawer } from "./components/SpaceInfoDrawer";
import MapSkeleton from "./components/MapSkeleton";
import HeaderLogo from "./components/HeaderLogo";

export default function App() {
  const { isLoading, error, mapData } = useMapData({
    key: "mik_yeBk0Vf0nNJtpesfu560e07e5",
    secret: "mis_2g9ST8ZcSFb5R9fPnsvYhrX3RyRwPtDGbMGweCYKEq385431022",
    mapId: "65c0ff7430b94e3fabd5bb8c",
  });

  if (isLoading) return <MapSkeleton />;
  if (error) return <div className="p-4 text-red-600">{error.message}</div>;
  const MapViewAny = MapView as unknown as React.FC<any>;
  return (
    <>
      <SpaceInfoDrawer />
      <div className="flex h-full flex-col gap-4 bg-gray-100">
        <header className="px-4 pt-4 flex flex-col gap-4 justify-center items-center">
          <HeaderLogo />
          <HeaderFilters />
        </header>

        <MapViewAny
          mapData={mapData}
          style={{
            height: "70vh",
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            overflow: "hidden",
          }}
        >
          <CustomMapComponent />
        </MapViewAny>
      </div>
    </>
  );
}
