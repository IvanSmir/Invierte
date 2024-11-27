"use client";

import { Lot } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface PropertyLotsInfoProps {
  lots: Lot[];
}

export function PropertyLotsInfo({ lots }: PropertyLotsInfoProps) {
  const availableLots = lots.filter(lot => lot.status === "available");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información de Lotes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total de Lotes</p>
              <p className="text-2xl font-bold">{lots.length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Lotes Disponibles</p>
              <p className="text-2xl font-bold">{availableLots.length}</p>
            </div>

          </div>
        </div>
      </CardContent>
    </Card>
  );
}