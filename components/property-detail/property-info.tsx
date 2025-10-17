"use client";

import { Property } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Ruler } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

interface PropertyInfoProps {
  property: Property;
}

export function PropertyInfo({ property }: PropertyInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{property.name}</CardTitle>
        <div className="flex items-center text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{property.location}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Ruler className="h-4 w-4 mr-2" />
              <span>{property.size.toFixed(2)} m²</span>
            </div>
            <Badge variant="secondary">{property.type}</Badge>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Cuotas desde </h3>
            <p className="text-2xl font-bold text-primary">{formatCurrency(property?.lots[0]?.price)}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Descripción</h3>
            <p className="text-muted-foreground">{property.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}