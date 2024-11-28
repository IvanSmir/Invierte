"use client";

import { PropertyCard } from "@/components/property-card";
import { useAuth } from "@/contexts/auth-context";
import { mockProperties, Property } from "@/lib/mock-data";
import { getProperty } from "@/utils/property.http";
import { useEffect, useState } from "react";

export function PropertyGrid() {
  const [properties, setProperties] = useState<Property[]>([]);

 const fetchProperties = async () => {
  try {

    const auth = useAuth();
    const token = auth.user?.token || "";
    const queryParams = new URLSearchParams({
      page: '1', 
      limit: '10', 
      departmentId: '1',
      cityId: '1',
      neighborhoodId: '1',
    });
    await getProperty(token, queryParams).then((data) => {
      setProperties(data);
    });
  } catch (error) {
    console.error("Error al obtener las propiedades:", error);

  }
}
useEffect(() => {
  fetchProperties();
}, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}