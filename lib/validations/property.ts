import * as z from "zod";

export const basicInfoSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  description: z.string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(500, "La descripción no puede exceder los 500 caracteres"),
  images: z.array(z.string())
    .min(1, "Debe agregar al menos una imagen")
    .max(10, "No puede agregar más de 10 imágenes"),
  departmentId: z.string().min(1, "Debe seleccionar un departamento"),
  cityId: z.string().min(1, "Debe seleccionar una ciudad"),
  neighborhoodId: z.string().optional(),
  address: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
});

export const legalInfoSchema = z.object({
  propertyNumber: z.string()
    .min(1, "El número de propiedad es requerido")
    .regex(/^[A-Z0-9-]+$/, "El número de propiedad solo puede contener letras, números y guiones"),
  registryInfo: z.string()
    .min(10, "La información de registro debe tener al menos 10 caracteres")
    .max(1000, "La información de registro no puede exceder los 1000 caracteres"),
  documents: z.array(z.string())
    .min(1, "Debe adjuntar al menos un documento")
    .max(5, "No puede adjuntar más de 5 documentos"),
});

export const locationInfoSchema = z.object({
  coordinates: z.array(z.tuple([z.number(), z.number()]))
    .min(3, "Debe marcar al menos 3 puntos en el mapa para formar un polígono válido")
    .max(20, "No puede marcar más de 20 puntos en el mapa"),
  manualCoordinates: z.string(),
});

export const lotsInfoSchema = z.object({
  totalLots: z.number()
    .min(1, "Debe tener al menos 1 lote")
    .max(1000, "No puede exceder los 1000 lotes"),
  pricePerLot: z.number()
    .min(1, "El precio debe ser mayor a 0")
    .max(10000000, "El precio por lote no puede exceder los 10 millones"),
});

export type BasicInfoValues = z.infer<typeof basicInfoSchema>;
export type LegalInfoValues = z.infer<typeof legalInfoSchema>;
export type LocationInfoValues = z.infer<typeof locationInfoSchema>;
export type LotsInfoValues = z.infer<typeof lotsInfoSchema>;