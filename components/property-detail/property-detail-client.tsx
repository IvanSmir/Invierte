"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/components/ui/use-toast";
import { Property, Lot } from "@/lib/types";
import { PropertyHeader } from "./property-header";
import { PropertyInfo } from "./property-info";
import { PropertyLotInfo } from "./property-lot-info";
import { PropertyBasicInfo } from "./property-basic-info";
import { PropertyLegalInfo } from "./property-legal-info";
import { PropertyLotsInfo } from "./property-lots-info";
import { PurchaseDialog } from "@/components/purchase-dialog";
import dynamic from "next/dynamic";
import { getPropertyById } from "@/utils/property.http";
import PropertyLoading from "@/app/marketplace/[id]/loading";
import PropertyNotFound from "@/app/marketplace/[id]/not-found";

const PropertyMap = dynamic(() => import("@/components/property-map"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-muted">
      <p>Cargando mapa...</p>
    </div>
  ),
});

interface PropertyDetailClientProps {
  propertyId: string | string[] | undefined;
}

export function PropertyDetailClient({ propertyId }: PropertyDetailClientProps) {
  const [property, setProperty] = useState<Property | null>(null);
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null);
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const lotInfoRef = useRef<HTMLDivElement>(null);
  const fetchProperty = async () => {
    try {
      const token = user?.token || "";
      const data = await getPropertyById(propertyId as string, token);
      setProperty(data);
    } catch (error) {
      setError(true);
    }
  };

  const handleLotSelect = (lot: Lot) => {
    if (!user) {
      toast({
        title: "Acceso denegado",
        description: "Debes iniciar sesión para seleccionar un lote",
        variant: "destructive",
        duration: 3000,
      });
      router.push("/auth");
      return;
    }

    if (lot.status === "available") {
      setSelectedLot(lot);
      lotInfoRef.current?.scrollIntoView({ behavior: "smooth" });
    }

  };
  const handleReservationComplete = () => {
    fetchProperty(); // Recargar los datos de la propiedad
  };
  useEffect(() => {
    fetchProperty();
  }, [fetchProperty]);

  if (error) {
    return <PropertyNotFound />;
  }
  if (!property) {
    return PropertyLoading();
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <PropertyHeader property={property} />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        {/* Columna Principal */}
        <div className="space-y-6">
          {/* Mapa */}
          <div className="h-[500px] relative rounded-lg overflow-hidden border bg-background">
            <div className="absolute inset-0">
              <PropertyMap
                center={[property.coordinates[0][0], property.coordinates[0][1]]}
                zoom={18}
                property={property}
                onLotSelect={handleLotSelect}
              />
            </div>
          </div>

          {/* Información Básica */}
          <PropertyBasicInfo property={property} images={property.images} />

          {/* Información Legal */}
          <PropertyLegalInfo property={property} />

          {/* Información de Lotes */}
          <PropertyLotsInfo lots={property.lots} />
        </div>

        {/* Barra Lateral */}
        <div className="space-y-6" ref={lotInfoRef}>
          <div className="sticky top-4">
            <PropertyInfo property={property} />
            <div className="mt-4">
              <PropertyLotInfo
                selectedLot={selectedLot}
                onReserveClick={() => setPurchaseDialogOpen(true)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Compra */}
      {selectedLot && (
        <PurchaseDialog
          property={property}
          lot={selectedLot}
          open={purchaseDialogOpen}
          onOpenChange={setPurchaseDialogOpen}
          onReservationComplete={handleReservationComplete}
        />
      )}
    </div>
  );
}