import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPinned } from "lucide-react";

export default function PropertyNotFound() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <MapPinned className="h-20 w-20 text-muted-foreground mb-6" />
        <h1 className="text-4xl font-bold mb-4">Propiedad no encontrada</h1>
        <p className="text-muted-foreground mb-8">
          Lo sentimos, la propiedad que estás buscando no existe o ha sido removida.
        </p>
        <Button asChild>
          <Link href="/marketplace">
            Volver al marketplace
          </Link>
        </Button>
      </div>
    </div>
  );
}