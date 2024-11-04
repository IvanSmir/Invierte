import { Loader2 } from "lucide-react";

export default function MarketplaceLoading() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Cargando propiedades...</p>
      </div>
    </div>
  );
}