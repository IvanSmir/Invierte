"use client";

import { PropertyStepper } from "@/components/property-stepper";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";

export default function AddPropertyPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold mb-8">Agregar Terreno</h1>
        <p className="text-muted-foreground mb-8">
          Registrate para poder agregar tu propiedad y comenzar a vender tus lotes rapidamente con Invierte
        </p>
        <Button asChild>
          <Link href="/auth">
            Registrarse
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Agregar Terreno</h1>
      <PropertyStepper />
    </div>
  );
}