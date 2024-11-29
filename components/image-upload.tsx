"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  value: File[];
  onChange: (value: File[]) => void;
  onRemove: (file: File) => void;
}

export function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const updatePreviews = useCallback((files: File[]) => {
    const newPreviews = files.map(file => URL.createObjectURL(file));
    // Limpiar URLs anteriores para evitar memory leaks
    previews.forEach(url => URL.revokeObjectURL(url));
    setPreviews(newPreviews);
  }, [previews]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsUploading(true);
    try {
      const newFiles = acceptedFiles.slice(0, 5 - value.length);
      const updatedFiles = [...value, ...newFiles];
      onChange(updatedFiles);
      updatePreviews(updatedFiles);
    } catch (error) {
      console.error("Error procesando imágenes:", error);
    } finally {
      setIsUploading(false);
    }
  }, [value, onChange, updatePreviews]);

  const handleRemove = (fileToRemove: File, index: number) => {
    URL.revokeObjectURL(previews[index]);
    const newPreviews = previews.filter((_, i) => i !== index);
    setPreviews(newPreviews);
    onRemove(fileToRemove);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxFiles: 5,
    maxSize: 5 * 1024 * 1024, // 5MB
    disabled: value.length >= 5,
  });

  // Inicializar previews cuando el componente se monta
  useState(() => {
    updatePreviews(value);
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-4 text-center cursor-pointer
          transition-colors
          ${isDragActive ? "border-primary" : "border-gray-300"}
          ${value.length >= 5 ? "opacity-50 cursor-not-allowed" : "hover:border-primary"}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2">
          <ImagePlus className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {value.length >= 5
              ? "Límite de imágenes alcanzado"
              : isDragActive
                ? "Suelta las imágenes aquí"
                : "Arrastra y suelta imágenes aquí, o haz clic para seleccionar"}
          </p>
        </div>
      </div>

      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {value.map((file, index) => (
            <div key={file.name + index} className="relative group aspect-square">
              <Image
                src={previews[index] || ''}
                alt={`Imagen ${index + 1}`}
                className="object-cover rounded-lg"
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleRemove(file, index)}
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="absolute bottom-2 left-2 text-xs bg-black/50 text-white px-2 py-1 rounded">
                {(file.size / (1024 * 1024)).toFixed(1)}MB
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}