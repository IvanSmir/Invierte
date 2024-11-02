"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polygon, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { Property, Lot } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import "leaflet/dist/leaflet.css";
import { MapProps } from "@/lib/types/map";


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

export default function Map({ center, zoom, property, onLotSelect }: MapProps) {
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null);

  useEffect(() => {
    delete (Icon.Default.prototype as any)._getIconUrl;
    Icon.Default.mergeOptions({
      iconUrl: "/marker-icon.png",
      iconRetinaUrl: "/marker-icon-2x.png",
      shadowUrl: "/marker-shadow.png",
    });

  }, []);

  const handleLotSelect = (lot: Lot) => {
    setSelectedLot(lot);
    if (lot.status === 'available' && onLotSelect) {
      onLotSelect(lot);
    }
  };

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {property.lots.map((lot) => (
        <Polygon
          key={lot.id}
          positions={lot.coordinates}
          pathOptions={{
            color: getStatusColor(lot.status),
            fillColor: getStatusColor(lot.status),
            fillOpacity: selectedLot?.id === lot.id ? 0.7 : 0.4,
            weight: selectedLot?.id === lot.id ? 3 : 2,
          }}
          eventHandlers={{
            click: () => handleLotSelect(lot),
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
              {lot.status === 'available' && (
                <Button
                  size="sm"
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLotSelect(lot);
                  }}
                >
                  Seleccionar Lote
                </Button>
              )}
            </div>
          </Popup>
        </Polygon>
      ))}
    </MapContainer>
  );
}