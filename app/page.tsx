import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, ArrowRight, Shield, Search, Award } from "lucide-react";

export default function Home() {
  return (
    <>
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2532&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="container max-w-6xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Encuentra el terreno perfecto para tu próximo proyecto
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Explora nuestra selección exclusiva de terrenos en las mejores ubicaciones
            </p>
            <Button size="lg" asChild>
              <Link href="/marketplace">
                Explorar Terrenos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>


      <section className="py-20 bg-muted/50">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">¿Por qué elegir Invierte?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ofrecemos la mejor experiencia para encontrar y adquirir terrenos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <Search className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Búsqueda Inteligente</h3>
              <p className="text-muted-foreground">
                Encuentra el terreno ideal con nuestros filtros avanzados de búsqueda
              </p>
            </Card>

            <Card className="p-6">
              <Shield className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Transacciones Seguras</h3>
              <p className="text-muted-foreground">
                Garantizamos la seguridad en todas las transacciones realizadas
              </p>
            </Card>

            <Card className="p-6">
              <Award className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Terrenos Verificados</h3>
              <p className="text-muted-foreground">
                Todos nuestros terrenos son verificados por expertos
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Obtener Propiedad de la API */}
      <section className="py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Terrenos Destacados</h2>
            <Button variant="outline" asChild>
              <Link href="/marketplace">
                Ver todos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-[4/3] relative">
                  <img
                    src={`https://images.unsplash.com/photo-151${i}382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80`}
                    alt={`Terreno destacado ${i}`}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>Ubicación {i}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Terreno Premium {i}</h3>
                  <p className="text-2xl font-bold text-primary">$150,000</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">500m²</span>
                    <Button variant="outline" size="sm">Ver detalles</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para encontrar tu terreno ideal?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/80 max-w-2xl mx-auto">
            Únete a miles de personas que ya encontraron el terreno perfecto para sus proyectos
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/marketplace">
              Comenzar búsqueda
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}