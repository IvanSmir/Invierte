"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error({
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
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <AlertTriangle className="h-20 w-20 text-destructive" />
        </div>
        <h1 className="text-4xl font-bold">Algo salió mal</h1>
        <p className="text-muted-foreground">
          Ha ocurrido un error inesperado. Por favor, intenta nuevamente.
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={reset} variant="default">
            Intentar nuevamente
          </Button>
          <Button variant="outline" onClick={() => window.location.href = "/"}>
            Volver al inicio
          </Button>
        </div>
      </div>
    </div>
  );
}