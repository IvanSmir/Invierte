import { LatLngExpression, LatLngTuple } from "leaflet";
import { Lot, Property } from "../types";

export interface MapProps {
  center: LatLngExpression | LatLngTuple;
  zoom: number;
  property: Property;
  onLotSelect?: (lot: Lot) => void;
}
