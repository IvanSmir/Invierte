"use client";

import { FileIcon, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  value: File[];
  onChange: (value: File[]) => void;
  onRemove: (file: File) => void;
  acceptedFileTypes?: string;
  maxFiles?: number;
  maxSize?: number; // en bytes
}

export function FileUpload({
  value,
  onChange,
  onRemove,
  acceptedFileTypes = "",
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024 // 10MB por defecto
}: FileUploadProps) {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setError(null);

    if (rejectedFiles.length > 0) {
      const errors = rejectedFiles.map(file => {
        if (file.size > maxSize) {
          return `${file.file.name} excede el tamaño máximo permitido`;
        }
        return `${file.file.name} no es un tipo de archivo válido`;
      });
      setError(errors.join(', '));
      return;
    }

    if (value.length + acceptedFiles.length > maxFiles) {
      setError(`No puedes subir más de ${maxFiles} archivos`);
      return;
    }

    const newFiles = [...value, ...acceptedFiles];
    onChange(newFiles);
  }, [onChange, value, maxFiles, maxSize]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: true,
    maxSize,
    maxFiles: maxFiles - value.length,
    disabled: value.length >= maxFiles
  });

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      <div className="mb-4 space-y-2">
        {value.map((file, index) => (
          <div
            key={`${file.name}-${index}`}
            className="flex items-center justify-between p-2 bg-muted rounded-lg"
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <FileIcon className="h-4 w-4 flex-shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="text-sm truncate">
                  {file.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatFileSize(file.size)}
                </span>
              </div>
            </div>
            <Button
              type="button"
              onClick={() => onRemove(file)}
              variant="ghost"
              size="sm"
              className="flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed p-6 rounded-lg transition
          ${isDragActive ? 'border-primary' : 'border-gray-300'}
          ${value.length >= maxFiles ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-gray-400'}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2">
          <FileIcon className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground text-center">
            {value.length >= maxFiles
              ? `Límite de ${maxFiles} archivos alcanzado`
              : isDragActive
                ? "Suelta los archivos aquí"
                : "Arrastra documentos aquí o haz clic para seleccionar"}
          </p>
          <p className="text-xs text-muted-foreground">
            Máximo {formatFileSize(maxSize)} por archivo
          </p>
          {acceptedFileTypes && (
            <p className="text-xs text-muted-foreground">
              Formatos aceptados: PDF, DOC, DOCX
            </p>
          )}
        </div>
      </div>

      {error && (
        <p className="text-sm text-destructive mt-2">
          {error}
        </p>
      )}

      <p className="text-xs text-muted-foreground">
        {value.length} de {maxFiles} archivos subidos
      </p>
    </div>
  );
}