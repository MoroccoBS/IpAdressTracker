import { MapContainer, TileLayer } from "react-leaflet";
import Marker from "./MarkerComponent";

interface MapComponentProps {
  Lat: number;
  Lng: number;
}

function MapComponent({ Lat, Lng }: MapComponentProps) {
  const API_URL = import.meta.env.VITE_REACT_APP_MAP_KEY;
  return (
    <>
      <div className="w-full h-auto m-0 overflow-hidden">
        <MapContainer
          fadeAnimation={true}
          zoomAnimation={true}
          center={[Lat, Lng]}
          zoom={16}
          scrollWheelZoom={true}
          className="w-full h-[60vh] z-10 m-0"
        >
          <TileLayer
            attribution=""
            url={`https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=${API_URL}`}
          />
          <Marker Lat={Lat} Lng={Lng}></Marker>
        </MapContainer>
      </div>
    </>
  );
}

export default MapComponent;
