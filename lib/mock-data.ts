export const mockProperties: Property[] = [
  {
    id: "1",
    title: "Terreno Vista al Mar",
    description: "Hermoso terreno con vista panorámica al océano, perfecto para construir tu casa de ensueño. Ubicado en una zona exclusiva con acceso a todos los servicios.",
    price: 250000,
    area: 500,
    type: "Residencial",
    location: "Costa del Sol, Malecón",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=800&q=80",
    features: [
      "Acceso pavimentado",
      "Servicios básicos",
      "Vista al mar",
      "Zona residencial",
      "Seguridad 24/7",
      "Título de propiedad"
    ],
    coordinates: {
      lat: -12.1164,
      lng: -77.0297
    }
  }
];

export type { Property } from "./types";