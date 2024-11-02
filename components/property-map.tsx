"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import { Property, Lot } from "@/lib/types";

const Map = dynamic(() => import("@/components/map"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-muted">
      <p>Loading map...</p>
    </div>
  ),
});

interface PropertyMapProps {
  property: Property;
  onLotSelect?: (lot: Lot) => void;
}

export function PropertyMap({ property, onLotSelect }: PropertyMapProps) {
  return (
    <Card className="h-full overflow-hidden">
      <Map
        center={[property.latitude, property.longitude]}
        zoom={50}
        property={property}
        onLotSelect={onLotSelect}
      />
    </Card>
  );
}