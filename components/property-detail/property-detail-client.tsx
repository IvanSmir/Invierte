"use client";

import { useState } from "react";
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

const PropertyMap = dynamic(() => import("@/components/property-map"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-muted">
      <p>Cargando mapa...</p>
    </div>
  ),
});

interface PropertyDetailClientProps {
  property: Property;
}

export function PropertyDetailClient({ property }: PropertyDetailClientProps) {
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null);
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleLotSelect = (lot: Lot) => {
    if (!user) {
      toast({
        title: "Acceso denegado",
        description: "Debes iniciar sesión para seleccionar un lote",
        variant: "destructive",
      });
      router.push("/auth");
      return;
    }

    if (lot.status === "available") {
      setSelectedLot(lot);
    }
  };

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
                center={[property.latitude, property.longitude]}
                zoom={15}
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
        <div className="space-y-6">
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
        />
      )}
    </div>
  );
}