export interface Lot {
  id?: string;
  number: string;
  area: number;
  status: "available" | "reserved" | "sold";
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
  latitude: number;
  longitude: number;
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
