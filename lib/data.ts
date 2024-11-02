import { Property } from "./types";

export const properties: Property[] = [
  {
    id: 1,
    name: "Sunset Valley Plot",
    description:
      "Beautiful plot with mountain views, perfect for a dream home.",
    price: 250000,
    size: 500,
    type: "Residential",
    location: "123 Valley Road, Mountain View, CA",
    latitude: 37.3861,
    longitude: -122.0839,
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=800&h=600&fit=crop",
    ],
    lots: [
      {
        id: 1,
        number: "A-1",
        area: 150,
        price: 75000,
        status: "available",
        coordinates: [
          [37.3861, -122.0839],
          [37.3864, -122.0839],
          [37.3864, -122.0836],
          [37.3861, -122.0836],
        ],
      },
      {
        id: 2,
        number: "A-2",
        area: 180,
        price: 85000,
        status: "available",
        coordinates: [
          [37.3861, -122.0836],
          [37.3864, -122.0836],
          [37.3864, -122.0833],
          [37.3861, -122.0833],
        ],
      },
      {
        id: 3,
        number: "A-3",
        area: 170,
        price: 90000,
        status: "reserved",
        coordinates: [
          [37.3858, -122.0839],
          [37.3861, -122.0839],
          [37.3861, -122.0836],
          [37.3858, -122.0836],
        ],
      },
    ],
  },
];
