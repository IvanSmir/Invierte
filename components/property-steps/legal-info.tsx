"use client";

import { FileUpload } from "@/components/file-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface LegalInfoData {
  propertyNumber: string;
  registryInfo: string;
  documents: string[];
}

interface LegalInfoProps {
  data: LegalInfoData;
  onUpdate: (data: Partial<LegalInfoData>) => void;
  errors?: Record<string, string[]>;
}

export function LegalInfo({ data, onUpdate, errors = {} }: LegalInfoProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="propertyNumber">Número de Propiedad</Label>
        <Input
          id="propertyNumber"
          value={data.propertyNumber}
          onChange={(e) => onUpdate({ propertyNumber: e.target.value })}
          placeholder="Ej: P-123456"
          className={errors.propertyNumber ? "border-destructive" : ""}
        />
        {errors.propertyNumber?.map((error, index) => (
          <p key={index} className="text-sm text-destructive mt-1">
            {error}
          </p>
        ))}
        <p className="text-xs text-muted-foreground">
          Use letras mayúsculas, números y guiones
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="registryInfo">Información de Registro</Label>
        <Textarea
          id="registryInfo"
          value={data.registryInfo}
          onChange={(e) => onUpdate({ registryInfo: e.target.value })}
          placeholder="Información del registro de la propiedad"
          className={errors.registryInfo ? "border-destructive" : ""}
        />
        {errors.registryInfo?.map((error, index) => (
          <p key={index} className="text-sm text-destructive mt-1">
            {error}
          </p>
        ))}
        <p className="text-xs text-muted-foreground">
          {data.registryInfo.length}/1000 caracteres
        </p>
      </div>

      <div className="space-y-2">
        <Label>Documentos Legales</Label>
        <FileUpload
          value={data.documents}
          onChange={(documents) => onUpdate({ documents })}
          onRemove={(docUrl) => {
            onUpdate({
              documents: data.documents.filter(url => url !== docUrl)
            });
          }}
          acceptedFileTypes=".pdf,.doc,.docx"
        />
        {errors.documents?.map((error, index) => (
          <p key={index} className="text-sm text-destructive mt-1">
            {error}
          </p>
        ))}
        <p className="text-xs text-muted-foreground">
          Máximo 5 documentos. {data.documents.length}/5 subidos
        </p>
      </div>
    </div>
  );
}