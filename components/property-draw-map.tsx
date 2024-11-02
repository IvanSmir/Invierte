"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";

const DrawMap = dynamic(() => import("@/components/draw-map"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-muted">
      <p>Cargando mapa...</p>
    </div>
  ),
});

interface PropertyDrawMapProps {
  onBoundariesChange: (coordinates: [number, number][]) => void;
  onCenterChange: (center: [number, number]) => void;
}

export function PropertyDrawMap({ onBoundariesChange, onCenterChange }: PropertyDrawMapProps) {
  return (
    <Card className="h-full overflow-hidden">
      <DrawMap
        onBoundariesChange={onBoundariesChange}
        onCenterChange={onCenterChange}
      />
    </Card>
  );
}