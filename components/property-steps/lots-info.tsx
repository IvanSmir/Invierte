"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LotsInfoData {
  totalLots: number;
  pricePerLot: number;
}

interface LotsInfoProps {
  data: LotsInfoData;
  onUpdate: (data: Partial<LotsInfoData>) => void;
  errors?: Record<string, string[]>;
}

export function LotsInfo({ data, onUpdate, errors = {} }: LotsInfoProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="totalLots">Cantidad Total de Lotes</Label>
        <Input
          id="totalLots"
          type="number"
          value={data.totalLots || ""}
          onChange={(e) => onUpdate({ totalLots: parseInt(e.target.value) || 0 })}
          placeholder="Ej: 10"
          className={errors.totalLots ? "border-destructive" : ""}
        />
        {errors.totalLots?.map((error, index) => (
          <p key={index} className="text-sm text-destructive mt-1">
            {error}
          </p>
        ))}
        <p className="text-xs text-muted-foreground">
          Máximo 1000 lotes permitidos
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="pricePerLot">Precio por Lote (USD)</Label>
        <Input
          id="pricePerLot"
          type="number"
          value={data.pricePerLot || ""}
          onChange={(e) => onUpdate({ pricePerLot: parseInt(e.target.value) || 0 })}
          placeholder="Ej: 50000"
          className={errors.pricePerLot ? "border-destructive" : ""}
        />
        {errors.pricePerLot?.map((error, index) => (
          <p key={index} className="text-sm text-destructive mt-1">
            {error}
          </p>
        ))}
        <p className="text-xs text-muted-foreground">
          Máximo 10 millones por lote
        </p>
      </div>

      {data.totalLots > 0 && data.pricePerLot > 0 && (
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium">Resumen de Lotes</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li>Cantidad de lotes: {data.totalLots}</li>
            <li>Precio por lote: ${data.pricePerLot.toLocaleString()}</li>
            <li className="font-medium">
              Valor total: ${(data.totalLots * data.pricePerLot).toLocaleString()}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}