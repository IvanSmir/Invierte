"use client";

import { PropertyCard } from "@/components/property-card";
import { mockProperties } from "@/lib/mock-data";

export function PropertyGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {mockProperties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}