"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Lot } from "@/lib/types";

interface PropertyLotInfoProps {
  selectedLot: Lot | null;
  onReserveClick: () => void;
}

export function PropertyLotInfo({ selectedLot, onReserveClick }: PropertyLotInfoProps) {
  if (!selectedLot) {
    return (
      <Card>
        <CardContent className="p-4">
          <p className="text-center text-muted-foreground">
            Seleccione un lote disponible en el mapa
          </p>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2">Lote Seleccionado</h3>
        <div className="space-y-2">
          <p>Número: {selectedLot.number}</p>
          <p>Área: {selectedLot.area}m²</p>
          <p>Precio: {formatCurrency(selectedLot.price)}</p>
          {selectedLot.status === "available" ? (
            <Button className="w-full" onClick={onReserveClick}>
              Reservar Lote
            </Button>
          ) : (
            <Button className="w-full" disabled>
              Lote reservado
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}