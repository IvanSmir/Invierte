export interface Lot {
  id: number;
  number: string;
  area: number;
  price: number;
  status: "available" | "reserved" | "sold";
  coordinates: [number, number][];
}

export interface Property {
  id: number;
  name: string;
  description: string;
  price: number;
  size: number;
  type: string;
  location: string;
  latitude: number;
  longitude: number;
  images: string[];
  lots: Lot[];
}
