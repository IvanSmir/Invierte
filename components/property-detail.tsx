"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Property, Lot } from "@/lib/types";
import { PropertyMap } from "@/components/property-map";
import { PurchaseDialog } from "@/components/purchase-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Ruler, DollarSign } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/components/ui/use-toast";

interface PropertyDetailProps {
  property: Property;
}

export function PropertyDetail({ property }: PropertyDetailProps) {
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

    if (lot.status === 'available') {
      setSelectedLot(lot);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/marketplace" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al Marketplace
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{property.name}</CardTitle>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{property.location}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Ruler className="h-4 w-4 mr-2" />
                    <span>{property.size} m²</span>
                  </div>
                  <Badge variant="secondary">{property.type}</Badge>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2">Descripción</h3>
                  <p className="text-muted-foreground">{property.description}</p>
                </div>
                
                {selectedLot ? (
                  <Card className="bg-muted">
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">Lote Seleccionado</h3>
                      <div className="space-y-2">
                        <p>Número: {selectedLot.number}</p>
                        <p>Área: {selectedLot.area}m²</p>
                        <p>Precio: {formatCurrency(selectedLot.price)}</p>
                        <Button 
                          className="w-full" 
                          onClick={() => setPurchaseDialogOpen(true)}
                        >
                          Comprar Lote
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <p className="text-muted-foreground">
                      {user ? "Seleccione un lote disponible en el mapa" : "Inicia sesión para seleccionar un lote"}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="h-[600px]">
          <PropertyMap 
            property={property} 
            onLotSelect={handleLotSelect}
          />
        </div>
      </div>

      {selectedLot && (
        <PurchaseDialog
          property={property}
          lot={selectedLot}
          open={purchaseDialogOpen}
          onOpenChange={setPurchaseDialogOpen}
        />
      )}
    </main>
  );
}