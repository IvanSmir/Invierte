"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PropertySort() {
  return (
    <Select defaultValue="recent">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Ordenar por" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="recent">Más recientes</SelectItem>
        <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
        <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
        <SelectItem value="area-asc">Área: Menor a Mayor</SelectItem>
        <SelectItem value="area-desc">Área: Mayor a Menor</SelectItem>
      </SelectContent>
    </Select>
  );
}