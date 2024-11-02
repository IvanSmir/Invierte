"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const filterSchema = z.object({
  priceRange: z.array(z.number()),
  areaRange: z.array(z.number()),
  location: z.string().optional(),
  type: z.string().optional(),
});

type FilterValues = z.infer<typeof filterSchema>;

export function PropertyFilters() {
  const form = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      priceRange: [0, 1000000],
      areaRange: [0, 10000],
    },
  });

  return (
    <Card className="p-6">
      <form className="space-y-6">
        <div className="space-y-2">
          <Label>Rango de Precio</Label>
          <Slider
            defaultValue={[0, 1000000]}
            max={1000000}
            step={10000}
            className="mt-2"
          />
        </div>

        <div className="space-y-2">
          <Label>Área (m²)</Label>
          <Slider
            defaultValue={[0, 10000]}
            max={10000}
            step={100}
            className="mt-2"
          />
        </div>

        <div className="space-y-2">
          <Label>Ubicación</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar ubicación" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="norte">Zona Norte</SelectItem>
              <SelectItem value="sur">Zona Sur</SelectItem>
              <SelectItem value="este">Zona Este</SelectItem>
              <SelectItem value="oeste">Zona Oeste</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Tipo de Terreno</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="urbano">Urbano</SelectItem>
              <SelectItem value="rural">Rural</SelectItem>
              <SelectItem value="industrial">Industrial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full">Aplicar Filtros</Button>
      </form>
    </Card>
  );
}