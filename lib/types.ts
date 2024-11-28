export interface Lot {
  id?: string;
  number: string;
  area: number;
  status: "available" | "reserved" | "sold";
  price: number;
  coordinates: [number, number][];
}

export interface Property {
  id: string;
  name: string;
  description: string;
  price: number;
  size: number;
  type: string;
  location: string;
  coordinates: [[number, number]];
  propertyNumber: string;
  registryInfo: string;
  departmentId: string;
  cityId: string;
  neighborhoodId?: string;
  address: string;
  images: string[];
  documents: string[];
  lots: Lot[];
}
