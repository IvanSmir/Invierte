import { Property } from "./types";

export const properties: Property[] = [
  {
    id: 1,
    name: "Sunset Valley Plot",
    description: "Hermoso terreno con vistas panorámicas a las montañas, perfecto para construir la casa de tus sueños. Ubicado en una zona exclusiva con todos los servicios básicos y excelente accesibilidad.",
    price: 250000,
    size: 500,
    type: "Residencial",
    location: "123 Valley Road, Mountain View, CA",
    latitude: -25.2867,
    longitude: -57.3333,
    propertyNumber: "P-12345",
    registryInfo: "Registro de la Propiedad N° 12345, Folio Real Matricula N° 98765",
    departmentId: "1",
    cityId: "1",
    neighborhoodId: "1",
    address: "Av. Principal 123",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=800&h=600&fit=crop",
    ],
    documents: [
      "escritura.pdf",
      "plano_catastral.pdf",
      "certificado_libre_deuda.pdf"
    ],
    lots: [
      {
        id: 1,
        number: "A-1",
        area: 150,
        price: 75000,
        status: "available",
        coordinates: [
          [-25.2867, -57.3333],
          [-25.2864, -57.3333],
          [-25.2864, -57.3330],
          [-25.2867, -57.3330],
        ],
      },
      {
        id: 2,
        number: "A-2",
        area: 180,
        price: 85000,
        status: "reserved",
        coordinates: [
          [-25.2867, -57.3330],
          [-25.2864, -57.3330],
          [-25.2864, -57.3327],
          [-25.2867, -57.3327],
        ],
      },
      {
        id: 3,
        number: "A-3",
        area: 170,
        price: 90000,
        status: "sold",
        coordinates: [
          [-25.2870, -57.3333],
          [-25.2867, -57.3333],
          [-25.2867, -57.3330],
          [-25.2870, -57.3330],
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Lotes Residenciales El Prado",
    description: "Exclusivo desarrollo residencial con amplios lotes, áreas verdes y seguridad las 24 horas. Ideal para construir tu hogar en un entorno tranquilo y familiar.",
    price: 180000,
    size: 450,
    type: "Residencial",
    location: "Av. Los Prados 456, San Lorenzo",
    latitude: -25.3367,
    longitude: -57.3533,
    propertyNumber: "P-67890",
    registryInfo: "Registro de la Propiedad N° 67890, Folio Real Matricula N° 54321",
    departmentId: "2",
    cityId: "2",
    neighborhoodId: "2",
    address: "Av. Los Prados 456",
    images: [
      "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
    ],
    documents: [
      "escritura_el_prado.pdf",
      "plano_loteo.pdf"
    ],
    lots: [
      {
        id: 4,
        number: "B-1",
        area: 200,
        price: 95000,
        status: "available",
        coordinates: [
          [-25.3367, -57.3533],
          [-25.3364, -57.3533],
          [-25.3364, -57.3530],
          [-25.3367, -57.3530],
        ],
      },
      {
        id: 5,
        number: "B-2",
        area: 220,
        price: 105000,
        status: "available",
        coordinates: [
          [-25.3367, -57.3530],
          [-25.3364, -57.3530],
          [-25.3364, -57.3527],
          [-25.3367, -57.3527],
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Terrenos Comerciales Centro",
    description: "Excelente oportunidad de inversión en zona comercial de alto tráfico. Terrenos ideales para desarrollo comercial o mixto con todos los servicios disponibles.",
    price: 350000,
    size: 600,
    type: "Comercial",
    location: "Calle Comercial 789, Centro",
    latitude: -25.2867,
    longitude: -57.3433,
    propertyNumber: "P-13579",
    registryInfo: "Registro de la Propiedad N° 13579, Folio Real Matricula N° 24680",
    departmentId: "1",
    cityId: "1",
    neighborhoodId: "3",
    address: "Calle Comercial 789",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=800&h=600&fit=crop",
    ],
    documents: [
      "escritura_comercial.pdf",
      "permiso_comercial.pdf",
      "estudio_suelo.pdf"
    ],
    lots: [
      {
        id: 6,
        number: "C-1",
        area: 300,
        price: 175000,
        status: "available",
        coordinates: [
          [-25.2867, -57.3433],
          [-25.2864, -57.3433],
          [-25.2864, -57.3430],
          [-25.2867, -57.3430],
        ],
      },
      {
        id: 7,
        number: "C-2",
        area: 300,
        price: 175000,
        status: "reserved",
        coordinates: [
          [-25.2867, -57.3430],
          [-25.2864, -57.3430],
          [-25.2864, -57.3427],
          [-25.2867, -57.3427],
        ],
      },
    ],
  },
];

export const departments = [
  {
    id: 1,
    nombre: "Central",
    gps: {
      lat: -25.2867,
      long: -57.3333
    }
  },
  {
    id: 2,
    nombre: "Alto Paraná",
    gps: {
      lat: -25.5167,
      long: -54.6833
    }
  },
  {
    id: 3,
    nombre: "Itapúa",
    gps: {
      lat: -27.3333,
      long: -55.8667
    }
  }
];