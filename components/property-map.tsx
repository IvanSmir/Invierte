"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Polygon, Popup, useMapEvents, Marker, LayersControl } from "react-leaflet";

import { Icon } from "leaflet";
import { Property, Lot } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import "leaflet/dist/leaflet.css";

interface PropertyMapProps {
  center: [number, number];
  zoom: number;
  property?: Property;
  onLotSelect?: (lot: Lot) => void;
  onMapClick?: (coord: [number, number]) => void;
  coordinates?: [number, number][];
}

const getStatusColor = (status: Lot['status']) => {
  switch (status) {
    case 'available':
      return '#22c55e';
    case 'reserved':
      return '#eab308';
    case 'sold':
      return '#ef4444';
    default:
      return '#22c55e';
  }
};

const { BaseLayer } = LayersControl;


const markerIcon = new Icon({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function MapEventHandler({ onMapClick }: { onMapClick?: (coord: [number, number]) => void }) {
  useMapEvents({
    click: (e) => {
      if (onMapClick) {
        const coord: [number, number] = [e.latlng.lat, e.latlng.lng];
        onMapClick(coord);
      }
    },
  });

  return null;
}

export default function PropertyMap({
  center,
  zoom,
  property,
  onLotSelect,
  onMapClick,
  coordinates
}: PropertyMapProps) {
  useEffect(() => {
    delete (Icon.Default.prototype as any)._getIconUrl;
    Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
  }, []);
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
    >
      <MapEventHandler onMapClick={onMapClick} />
      <TileLayer
        attribution='&copy; Google'
        url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
        maxZoom={25}
        subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
      />
      {/* Draw property lots if they exist */}
      {property?.lots?.map((lot) => (
        <Polygon
          key={lot.id}
          positions={lot.coordinates.map((coord) => [coord[1], coord[0]])}
          pathOptions={{
            color: getStatusColor(lot.status),
            fillColor: getStatusColor(lot.status),
            fillOpacity: 0.4,
          }}
          eventHandlers={{
            click: () => onLotSelect?.(lot),
          }}
        >
          <Popup>
            <div className="p-2 space-y-2">
              <h3 className="font-semibold">Lote {lot.number}</h3>
              <div className="text-sm space-y-1">
                <p>Área: {lot.area}m²</p>

                <p>Precio: {formatCurrency(lot.price)}</p>
                <p className="capitalize">Estado: {lot.status}</p>
              </div>
              {lot.status === 'available' && onLotSelect && (
                <Button
                  size="sm"
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    onLotSelect(lot);
                  }}
                >
                  Seleccionar Lote
                </Button>
              )}
            </div>
          </Popup>
        </Polygon>
      ))}

      {/* Draw coordinates markers and polygon */}
      {coordinates?.map((coord, index) => (
        <Marker
          key={`marker-${index}`}
          position={coord}
          icon={markerIcon}
        >
          <Popup>
            <div className="p-2 text-sm">
              <p className="font-semibold">Punto {index + 1}</p>
              <p>Lat: {coord[0].toFixed(6)}</p>
              <p>Lng: {coord[1].toFixed(6)}</p>
            </div>
          </Popup>
        </Marker>
      ))}

      {coordinates && coordinates.length > 2 && (
        <Polygon
          positions={coordinates}
          pathOptions={{
            color: '#3388ff',
            fillColor: '#3388ff',
            fillOpacity: 0.2,
          }}
        />
      )}
    </MapContainer>
  );
}