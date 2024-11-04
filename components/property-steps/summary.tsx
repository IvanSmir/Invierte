"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface SummaryData {
  basicInfo: {
    name: string;
    description: string;
    images: string[];
    departmentId: string;
    cityId: string;
    neighborhoodId?: string;
    address: string;
  };
  legalInfo: {
    propertyNumber: string;
    registryInfo: string;
    documents: string[];
  };
  locationInfo: {
    coordinates: [number, number][];
    manualCoordinates: string;
  };
  lotsInfo: {
    totalLots: number;
    pricePerLot: number;
  };
}

interface SummaryProps {
  data: SummaryData;
}

export function Summary({ data }: SummaryProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Información Básica</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-2">
            <dt className="font-medium">Nombre</dt>
            <dd className="text-muted-foreground">{data.basicInfo.name}</dd>

            <dt className="font-medium mt-4">Descripción</dt>
            <dd className="text-muted-foreground">{data.basicInfo.description}</dd>

            <dt className="font-medium mt-4">Dirección</dt>
            <dd className="text-muted-foreground">{data.basicInfo.address}</dd>

            <dt className="font-medium mt-4">Imágenes</dt>
            <dd className="grid grid-cols-3 gap-4 mt-2">
              {data.basicInfo.images.map((url, index) => (
                <div key={index} className="relative aspect-square">
                  <Image
                    src={url}
                    alt={`Property image ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </dd>
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Información Legal</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-2">
            <dt className="font-medium">Número de Propiedad</dt>
            <dd className="text-muted-foreground">{data.legalInfo.propertyNumber}</dd>

            <dt className="font-medium mt-4">Información de Registro</dt>
            <dd className="text-muted-foreground">{data.legalInfo.registryInfo}</dd>

            <dt className="font-medium mt-4">Documentos</dt>
            <dd className="text-muted-foreground">
              {data.legalInfo.documents.length} documentos adjuntos
            </dd>
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ubicación</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-2">
            <dt className="font-medium">Coordenadas</dt>
            <dd className="text-muted-foreground">
              {data.locationInfo.coordinates.length} puntos marcados
            </dd>
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Información de Lotes</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-2">
            <dt className="font-medium">Cantidad de Lotes</dt>
            <dd className="text-muted-foreground">{data.lotsInfo.totalLots}</dd>

            <dt className="font-medium mt-4">Precio por Lote</dt>
            <dd className="text-muted-foreground">
              ${data.lotsInfo.pricePerLot.toLocaleString()}
            </dd>

            <dt className="font-medium mt-4">Valor Total</dt>
            <dd className="text-muted-foreground">
              ${(data.lotsInfo.totalLots * data.lotsInfo.pricePerLot).toLocaleString()}
            </dd>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}