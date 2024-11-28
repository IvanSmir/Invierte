"use client";

import { Property } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PropertyLegalInfoProps {
  property: Property;
}

export function PropertyLegalInfo({ property }: PropertyLegalInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Información Legal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Documentación</h3>
            <ul className="list-disc list-inside text-muted-foreground">
              {property.documents.map((document, index) => (
                <li key={index}>
                  <a href={document.url} target="_blank" rel="noreferrer">
                    {document.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}