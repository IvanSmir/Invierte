"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

interface DrawMapProps {
  onBoundariesChange: (coordinates: [number, number][]) => void;
  onCenterChange: (center: [number, number]) => void;
}

export default function DrawMap({ onBoundariesChange, onCenterChange }: DrawMapProps) {
  const featureGroupRef = useRef(null);

  useEffect(() => {
    delete (Icon.Default.prototype as any)._getIconUrl;
    Icon.Default.mergeOptions({
      iconUrl: "/marker-icon.png",
      iconRetinaUrl: "/marker-icon-2x.png",
      shadowUrl: "/marker-shadow.png",
    });
  }, []);

  const handleCreated = (e: any) => {
    const layer = e.layer;
    if (layer) {
      const coordinates = layer.getLatLngs()[0].map((latLng: any) => [
        latLng.lat,
        latLng.lng,
      ]);
      onBoundariesChange(coordinates);

      // Calculate and set center
      const bounds = layer.getBounds();
      const center: [number, number] = [
        bounds.getCenter().lat,
        bounds.getCenter().lng,
      ];
      onCenterChange(center);
    }
  };

  const handleEdited = (e: any) => {
    const layers = e.layers;
    layers.eachLayer((layer: any) => {
      const coordinates = layer.getLatLngs()[0].map((latLng: any) => [
        latLng.lat,
        latLng.lng,
      ]);
      onBoundariesChange(coordinates);

      const bounds = layer.getBounds();
      const center: [number, number] = [
        bounds.getCenter().lat,
        bounds.getCenter().lng,
      ];
      onCenterChange(center);
    });
  };

  const handleDeleted = () => {
    onBoundariesChange([]);
    onCenterChange([0, 0]);
  };

  return (
    <MapContainer
      center={[-27.30328221949038, -55.895420428857925]}
      zoom={15}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FeatureGroup ref={featureGroupRef}>
        <EditControl
          position="topright"
          onCreated={handleCreated}
          onEdited={handleEdited}
          onDeleted={handleDeleted}
          draw={{
            rectangle: false,
            circle: false,
            circlemarker: false,
            marker: false,
            polyline: false,
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
}