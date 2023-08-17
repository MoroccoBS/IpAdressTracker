import { useEffect, useMemo } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import IconLocation from "../assets/images/icon-location.svg";
import L from "leaflet";
interface MarkerProps {
  Lat: number;
  Lng: number;
}

function MarkerComponent({ Lat, Lng }: MarkerProps) {
  const iconSize = [46, 56];
  const iconAnchor = [iconSize[0] / 2, iconSize[1]];
  const customIcon = L.icon({
    iconUrl: IconLocation,
    iconSize: [iconSize[0], iconSize[1]],
    iconAnchor: [iconAnchor[0], iconSize[1]],
    popupAnchor: [0, -45],
  });
  const position: L.LatLngExpression = useMemo(() => {
    return [Lat, Lng];
  }, [Lat, Lng]);
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, 16, {
      animate: true,
    });
  }, [map, position]);

  return (
    <>
      <Marker icon={customIcon} position={position}>
        <Popup>
          This is you're location. <br /> YIPEEE!!.
        </Popup>
      </Marker>
    </>
  );
}

export default MarkerComponent;
