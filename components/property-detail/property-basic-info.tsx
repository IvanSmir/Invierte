"use client";

import { Property } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface PropertyBasicInfoProps {
  property: Property;
  images: string[];
}

export function PropertyBasicInfo({ property, images }: PropertyBasicInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Imágenes del Terreno</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {images.map((url, index) => (
            <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={url}
                alt={`${property.name} - Imagen ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}