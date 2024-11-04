"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CoordinatesList } from "@/components/coordinates-list";
import dynamic from "next/dynamic";

const PropertyMap = dynamic(() => import("@/components/property-map"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full flex items-center justify-center bg-muted">
      <p>Cargando mapa...</p>
    </div>
  ),
});

interface LocationInfoProps {
  data: {
    coordinates: [number, number][];
    manualCoordinates: string;
  };
  onUpdate: (data: any) => void;
  errors?: Record<string, string[]>;
}

export function LocationInfo({ data, onUpdate, errors = {} }: LocationInfoProps) {
  const [coordinates, setCoordinates] = useState<[number, number][]>(data.coordinates);
  const [manualInput, setManualInput] = useState(data.manualCoordinates);

  const handleMapClick = (coord: [number, number]) => {
    if (coordinates.length >= 20) {
      return; // Máximo de puntos alcanzado
    }
    const newCoordinates = [...coordinates, coord];
    setCoordinates(newCoordinates);
    onUpdate({ coordinates: newCoordinates });
  };

  const handleManualAdd = () => {
    try {
      const coordPairs = manualInput
        .split('\n')
        .map(pair => pair.trim())
        .filter(pair => pair)
        .map(pair => {
          const [lat, lng] = pair.split(',').map(num => parseFloat(num.trim()));
          if (isNaN(lat) || isNaN(lng)) throw new Error();
          return [lat, lng] as [number, number];
        });

      if (coordinates.length + coordPairs.length > 20) {
        return; // Excedería el máximo de puntos
      }

      const newCoordinates = [...coordinates, ...coordPairs];
      setCoordinates(newCoordinates);
      onUpdate({ coordinates: newCoordinates });
      setManualInput('');
    } catch (error) {
      console.error('Invalid coordinate format');
    }
  };

  const removeCoordinate = (index: number) => {
    const newCoordinates = coordinates.filter((_, i) => i !== index);
    setCoordinates(newCoordinates);
    onUpdate({ coordinates: newCoordinates });
  };

  useEffect(() => {
    onUpdate({ coordinates, manualCoordinates: manualInput });
  }, [coordinates, manualInput]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4 space-y-4">
          <div>
            <Label>Coordenadas Manuales</Label>
            <Textarea
              placeholder="Ingrese las coordenadas (una por línea) en formato: latitud, longitud"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              className={`h-[100px] mb-2 ${errors.coordinates ? "border-destructive" : ""}`}
            />
            {errors.coordinates?.map((error, index) => (
              <p key={index} className="text-sm text-destructive mt-1">
                {error}
              </p>
            ))}
            <p className="text-xs text-muted-foreground">
              {coordinates.length}/20 puntos marcados. Mínimo 3 puntos para formar un polígono.
            </p>
          </div>
          
          <div>
            <Label>Lista de Coordenadas</Label>
            <CoordinatesList 
              coordinates={coordinates}
              onRemove={removeCoordinate}
            />
          </div>
        </Card>

        <Card className="p-4">
          <Label>Seleccionar en el Mapa</Label>
          <div className="h-[400px] mt-2">
            <PropertyMap
              center={[-25.2867, -57.3333]}
              zoom={13}
              onMapClick={handleMapClick}
              coordinates={coordinates}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}