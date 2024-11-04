"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function PropertyError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <AlertTriangle className="h-20 w-20 text-destructive mb-6" />
        <h1 className="text-4xl font-bold mb-4">Error al cargar la propiedad</h1>
        <p className="text-muted-foreground mb-8">
          Ha ocurrido un error al cargar los detalles de la propiedad. Por favor, intenta nuevamente.
        </p>
        <div className="flex gap-4">
          <Button onClick={reset}>
            Intentar nuevamente
          </Button>
          <Button variant="outline" asChild>
            <Link href="/marketplace">
              Volver al marketplace
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}