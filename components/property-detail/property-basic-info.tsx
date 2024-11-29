"use client";

import { Image as ImageType, Property } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface PropertyBasicInfoProps {
  property: Property;
  images: ImageType[];
}

export function PropertyBasicInfo({ property, images }: PropertyBasicInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Imágenes del Terreno</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={image.url}
                alt={`${property.name} - Imagen ${image.id}`}
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