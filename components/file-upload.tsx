"use client";

import { FileIcon, X } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  onRemove: (value: string) => void;
  acceptedFileTypes?: string;
}

export function FileUpload({
  value,
  onChange,
  onRemove,
  acceptedFileTypes = ""
}: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    //aqui se manejaria la logica del servidor
    const urls = acceptedFiles.map(file => URL.createObjectURL(file));
    onChange([...value, ...urls]);
  }, [onChange, value]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptedFileTypes ? {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    } : undefined,
    multiple: true
  });

  return (
    <div>
      <div className="mb-4 space-y-2">
        {value.map((url) => (
          <div key={url} className="flex items-center justify-between p-2 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <FileIcon className="h-4 w-4" />
              <span className="text-sm truncate max-w-[200px]">
                {url.split('/').pop()}
              </span>
            </div>
            <Button
              type="button"
              onClick={() => onRemove(url)}
              variant="ghost"
              size="sm"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer hover:border-gray-400 transition"
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2">
          <FileIcon className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Arrastra documentos aquí o haz clic para seleccionar
          </p>
          {acceptedFileTypes && (
            <p className="text-xs text-muted-foreground">
              Formatos aceptados: {acceptedFileTypes}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}