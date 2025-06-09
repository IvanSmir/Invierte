"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lot } from "@/lib/types";
import Image from "next/image";
import { FileIcon, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

interface SummaryData {
  basicInfo: {
    name: string;
    description: string;
    images: File[];
    departmentId: string;
    cityId: string;
    neighborhoodId?: string;
    address: string;
  };
  legalInfo: {
    propertyNumber: string;
    registryInfo: string;
    documents: File[];
  };
  locationInfo: {
    coordinates: [number, number][];
    manualCoordinates: string;
  };
  lotsInfo: {
    lots: Lot[];
  };
}

interface SummaryProps {
  data: SummaryData;
}

export function Summary({ data }: SummaryProps) {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (file: File) => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'PDF';
      case 'doc':
      case 'docx':
        return 'DOC';
      default:
        return 'FILE';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Información Básica</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-4">
            <div>
              <dt className="font-medium">Nombre</dt>
              <dd className="text-muted-foreground mt-1">{data.basicInfo.name}</dd>
            </div>

            <div>
              <dt className="font-medium">Descripción</dt>
              <dd className="text-muted-foreground mt-1">{data.basicInfo.description}</dd>
            </div>

            <div>
              <dt className="font-medium">Dirección</dt>
              <dd className="text-muted-foreground mt-1">{data.basicInfo.address}</dd>
            </div>

            <div>
              <dt className="font-medium">Imágenes ({data.basicInfo.images.length})</dt>
              <dd className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                {data.basicInfo.images.map((file, index) => (
                  <div key={index} className="relative group aspect-square">
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={`Imagen ${index + 1}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                      <div className="absolute bottom-2 left-2 right-2 text-white text-xs">
                        <p className="truncate">{file.name}</p>
                        <p>{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Información Legal</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-4">
            <div>
              <dt className="font-medium">Número de Propiedad</dt>
              <dd className="text-muted-foreground mt-1">{data.legalInfo.propertyNumber}</dd>
            </div>

            <div>
              <dt className="font-medium">Información de Registro</dt>
              <dd className="text-muted-foreground mt-1">{data.legalInfo.registryInfo}</dd>
            </div>

            <div>
              <dt className="font-medium">Documentos ({data.legalInfo.documents.length})</dt>
              <dd className="mt-2 space-y-2">
                {data.legalInfo.documents.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-muted rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                        {getFileIcon(file)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm truncate max-w-[200px]">
                          {file.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(URL.createObjectURL(file))}
                    >
                      Ver
                    </Button>
                  </div>
                ))}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ubicación</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-2">
            <dt className="font-medium">Coordenadas ({data.locationInfo.coordinates.length} puntos)</dt>
            <dd className="text-muted-foreground mt-1">
              {data.locationInfo.coordinates.map(([lat, lng], index) => (
                <div key={index} className="text-sm">
                  Punto {index + 1}: {lat.toFixed(6)}, {lng.toFixed(6)}
                </div>
              ))}
            </dd>
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Información de Lotes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <dt className="font-medium">Cantidad de Lotes</dt>
                <dd className="text-muted-foreground mt-1">
                  {data.lotsInfo.lots.length}
                </dd>
              </div>
              <div>
                <dt className="font-medium">Valor Total</dt>
                <dd className="text-muted-foreground mt-1">
                    {formatCurrency(data.lotsInfo.lots.reduce((sum, lot) => sum + lot.price, 0))}
                </dd>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-medium mb-2">Detalle de Lotes</h3>
              <div className="space-y-2">
                {data.lotsInfo.lots.map((lot, index) => (
                  <div key={index} className="bg-muted p-3 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm font-medium">Lote {lot.number}</span>
                        <p className="text-sm text-muted-foreground">
                          Área: {lot.area}m²
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium">
                         {formatCurrency(lot.price)}
                        </span>
                        <p className="text-sm text-muted-foreground">
                          Estado: {lot.status}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}