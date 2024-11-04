import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-16 text-center">
      <h2 className="text-3xl font-bold mb-4">Parece que estas perdido</h2>
      <p className="text-muted-foreground mb-8">
        Lo sentimos, la pagina que estás buscando no existe o ha sido removida.
      </p>
      <Button asChild>
        <Link href="/marketplace">
          Volver al Marketplace
        </Link>
      </Button>
    </div>
  );
}