import { Suspense } from "react";
import { PropertyGrid } from "@/components/property-grid";
import { PropertyFilters } from "@/components/property-filters";
import { PropertySort } from "@/components/property-sort";

export default function MarketplacePage() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Explorar Terrenos</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <aside className="space-y-6">
          <PropertyFilters />
        </aside>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Mostrando 150 resultados</p>
            <PropertySort />
          </div>
          
          <Suspense fallback={<div>Cargando...</div>}>
            <PropertyGrid />
          </Suspense>
        </div>
      </div>
    </div>
  );
}