import Image from "next/image";
import Link from "next/link";
import { MapPin, Ruler, Trees } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Property } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[4/3] relative">
        <Image
          src={property.imageUrl}
          alt={property.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardContent className="p-6">
        <div className="flex items-center text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{property.location}</span>
        </div>
        <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
        <p className="text-2xl font-bold text-primary">{formatCurrency(property.price)}</p>
        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Ruler className="h-4 w-4 mr-1" />
            <span>{property.area}m²</span>
          </div>
          <div className="flex items-center">
            <Trees className="h-4 w-4 mr-1" />
            <span>{property.type}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button className="w-full" asChild>
          <Link href={`/marketplace/${property.id}`}>
            Ver detalles
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}