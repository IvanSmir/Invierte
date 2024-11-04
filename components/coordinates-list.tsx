"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CoordinatesListProps {
  coordinates: [number, number][];
  onRemove: (index: number) => void;
}

export function CoordinatesList({ coordinates, onRemove }: CoordinatesListProps) {
  if (coordinates.length === 0) {
    return (
      <div className="text-center p-4 text-muted-foreground">
        No hay coordenadas agregadas
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-[300px] overflow-y-auto">
      {coordinates.map(([lat, lng], index) => (
        <div
          key={index}
          className="flex items-center justify-between p-2 bg-muted rounded-md"
        >
          <span className="text-sm">
            {lat.toFixed(6)}, {lng.toFixed(6)}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(index)}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}