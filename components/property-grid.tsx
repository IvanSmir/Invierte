"use client";

import MarketplaceLoading from "@/app/marketplace/loading";
import { PropertyCard } from "@/components/property-card";
import { useAuth } from "@/contexts/auth-context";
import { Property } from "@/lib/types";
import { getProperty, getPropertyById } from "@/utils/property.http";
import { useEffect, useState } from "react";


export function PropertyGrid() {
  const [properties, setProperties] = useState<Property[]>([]);
  const auth = useAuth();
  const token = auth.user?.token || "";
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const queryParams = new URLSearchParams({
          page: "1",
          limit: "10",
        });

        // Obtener la respuesta del API
        const data = await getProperty(token, queryParams);

        // Asignar solo el array de propiedades al estado
        if (data?.properties) {
          setProperties(data.properties); // Corregido
        } else {
          console.error("La respuesta no contiene propiedades válidas:", data);
          setProperties([]);
        }
        setLoading(false);

      } catch (error) {
        setError(true);
        console.error("Error al obtener las propiedades:", error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    throw new Error("Error al obtener las propiedades");
  }

  if (loading) {
    return MarketplaceLoading();
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}