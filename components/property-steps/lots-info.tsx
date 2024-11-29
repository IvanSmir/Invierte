import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';
import * as turf from '@turf/turf';
import { Lot, Property } from '@/lib/types';
import { Position } from "geojson";
import { Feature, FeatureCollection, Polygon, MultiPolygon, GeoJsonProperties } from 'geojson';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { toast } from '../ui/use-toast';

interface PropertyMapProps {
  center: [number, number];
  zoom: number;
  property?: Property;
  onLotSelect?: (lot: Lot) => void;
  onMapClick?: (coord: [number, number]) => void;
  coordinates?: [number, number][];
  orientationLine?: [number, number][];
  divisions?: Position[][];
  onDrawCreated?: (type: string, coordinates: [number, number][]) => void;
  drawPolygon: boolean;
}

interface LotsInfoProperties {
  data: {
    lots: Array<{
      number: string;
      price: number;
      area: number;
      status: "available" | "sold" | "reserved";
      coordinates: [[number, number], ...[number, number][]];
    }>;
  };
  location: [number, number][];
  onUpdate: (data: any) => void;
  errors?: Record<string, string[]>;
}

export function LotsInfo({ location, data, onUpdate, errors = {} }: LotsInfoProperties) {
  const [lots, setLots] = useState(data.lots);
  const [verticalDivisions, setVerticalDivisions] = useState(2);
  const [horizontalDivisions, setHorizontalDivisions] = useState(2);
  const [areaInfo, setAreaInfo] = useState<string>('');
  const [angleInfo, setAngleInfo] = useState<string>('');
  const [pricePerLot, setPricePerLot] = useState(0);
  const mapRef = useRef(null);
  const [map, setMap] = useState<L.Map | null>(null);
  const [drawnItems, setDrawnItems] = useState(new L.FeatureGroup());
  const [originalPolygon, setOriginalPolygon] = useState<L.Polygon | null>();
  const [orientationLine, setOrientationLine] = useState<L.Polyline | null>(null);
  const [divisions, setDivisions] = useState<L.Layer[]>([]);
  const [rotationAngle, setRotationAngle] = useState(0);

  useEffect(() => {
    if (!mapRef.current) return;

    const initialMap = L.map(mapRef.current, {
      center: [41.4036, 2.1744],
      zoom: 18,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(initialMap);

    setMap(initialMap);

    const drawnLayer = new L.FeatureGroup();
    initialMap.addLayer(drawnLayer);
    setDrawnItems(drawnLayer);

    if (location && location.length > 2) {
      const polygon = L.polygon(location, {
        color: '#3388ff',
        weight: 2,
      }).addTo(initialMap);

      setAreaInfo(turf.area(polygon.toGeoJSON()).toFixed(2));
      setOriginalPolygon(polygon);
      initialMap.fitBounds(polygon.getBounds());
    }

    const drawControl = new L.Control.Draw({
      draw: {
        polygon: false,
        polyline: {
          shapeOptions: {
            color: '#f00',
            weight: 3,
          },
        },
        rectangle: false,
        circle: false,
        circlemarker: false,
        marker: false,
      },
      edit: {
        featureGroup: drawnLayer,
        remove: true,
      },
    });
    initialMap.addControl(drawControl);

    initialMap.on('draw:created', (e: L.LeafletEvent) => {
      const layer = (e as any).layer;
      const layerType = (e as any).layerType;

      if (layerType === 'polyline') {
        if (orientationLine) {
          initialMap.removeLayer(orientationLine);
        }
        setOrientationLine(layer);
        calculateOrientation(layer);
      } else if (layerType === 'polygon') {
        if (originalPolygon) {
          initialMap.removeLayer(originalPolygon);
        }
        setOriginalPolygon(layer);
        showArea((turf.area(layer.toGeoJSON())));
      }

      drawnLayer.addLayer(layer);
    });

    return () => {
      initialMap.remove();
    };
  }, [location]);

  const calculateOrientation = (line: L.Polyline) => {
    const coords = line.getLatLngs() as L.LatLng[];
    const start = coords[0];
    const end = coords[coords.length - 1];

    const dx = end.lng - start.lng;
    const dy = end.lat - start.lat;
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    setRotationAngle(angle);
    setAngleInfo(`${Math.round(angle)}°`);
  };

  const divideTerrain = (horizontalDivisions: number, verticalDivisions: number) => {
    if (!originalPolygon || !orientationLine) {
      toast({
        title: "Error",
        description: "Dibuje primero el polígono y la línea de orientación",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    clearDivisions();
    data.lots = [];

    const polygon = originalPolygon.toGeoJSON();
    const bbox = turf.bbox(polygon);
    const bboxPolygon = turf.bboxPolygon(bbox);
    const center = turf.center(bboxPolygon);

    const width = (bbox[2] - bbox[0]) / verticalDivisions;
    const height = (bbox[3] - bbox[1]) / horizontalDivisions;

    for (let i = 0; i < horizontalDivisions; i++) {
      for (let j = 0; j < verticalDivisions; j++) {
        const minX = bbox[0] + width * j;
        const maxX = bbox[0] + width * (j + 1);
        const minY = bbox[1] + height * i;
        const maxY = bbox[1] + height * (i + 1);

        const divisionBbox = turf.bboxPolygon([minX, minY, maxX, maxY]);
        const rotatedDivision = turf.transformRotate(divisionBbox, -rotationAngle, {
          pivot: center.geometry.coordinates
        });

        try {
          const features = turf.featureCollection([polygon, rotatedDivision]);
          const intersection = turf.intersect(features);
          if (intersection) {
            createDivisionLayer(intersection, `${i + 1}-${j + 1}`);
          }
        } catch (error) {
          console.error('Error al calcular intersección:', error);
        }
      }
    }
  };

  const createDivisionLayer = (geometry: Feature<any, GeoJsonProperties>, label: string) => {
    if (!map) return;

    const area = turf.area(geometry);
    const layer = L.geoJSON(geometry, {
      style: {
        color: getRandomColor(),
        weight: 2,
        opacity: 0.7,
        fillOpacity: 0.3
      }
    }).addTo(map);

    const center = turf.center(geometry);
    data.lots.push({
      number: label,
      area: area,
      status: "available",
      price: pricePerLot,
      coordinates: geometry.geometry.coordinates[0]
    });
    onUpdate(data);

    L.marker([center.geometry.coordinates[1], center.geometry.coordinates[0]], {
      icon: L.divIcon({
        className: 'area-label',
        html: `<div style="transform: rotate(${rotationAngle}deg)">
          Parcela ${label}<br>${Math.round(area)} m²
        </div>`
      })
    }).addTo(map);

    setDivisions(prev => [...prev, layer]);
  };

  const clearDivisions = () => {
    divisions.forEach(layer => layer.remove());
    setDivisions([]);
  };

  const clearMap = () => {
    orientationLine?.remove();
    clearDivisions();
    setOrientationLine(null);
    setAngleInfo('');
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const showArea = (area: number) => {
    if (typeof area !== 'number' || isNaN(area)) {
      console.error("Invalid area value.");
      return;
    }
    setAreaInfo(`${Math.round(area)} m² (${(area / 10000).toFixed(2)} hectáreas)`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>División de Terrenos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {areaInfo && (
              <Alert>
                <InfoIcon className="h-4 w-4" />
                <AlertDescription>
                  Realiza la division de lotes marcando la línea de orientacion en el mapa y ingresando el número de divisiones horizontales y verticales
                </AlertDescription>
              </Alert>
            )}
            {areaInfo && (
              <Alert>
                <InfoIcon className="h-4 w-4" />
                <AlertDescription>
                  Área total: {areaInfo} m²
                </AlertDescription>
              </Alert>
            )}
            {errors.lots && (
              <Alert>
                <InfoIcon className="h-4 w-4" />
                <AlertDescription>
                  <p className="text-sm text-destructive mt-1">
                    Debe realizar la divisón de los terrenos antes de continuar
                  </p>
                  <p className="text-sm text-destructive mt-1">
                    Debe ingresar un precio por lote válido
                  </p>
                </AlertDescription>
              </Alert>
            )}
            {angleInfo && (
              <Alert>
                <InfoIcon className="h-4 w-4" />
                <AlertDescription>
                  Ángulo de orientación: {angleInfo}
                </AlertDescription>
              </Alert>
            )}


            <div className="space-y-2">
              <Label htmlFor="pricePerLot">Precio por lote en USD</Label>
              <Input
                type="number"
                id="pricePerLot"
                value={pricePerLot}
                min={1}
                max={10000000}
                onChange={(e) => setPricePerLot(parseInt(e.target.value))}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Precio por lote
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="verticalDivisions">
                  Divisiones en dirección de la línea
                </Label>
                <Input
                  type="number"
                  id="verticalDivisions"
                  value={verticalDivisions}
                  min={1}
                  max={20}
                  onChange={(e) => setVerticalDivisions(parseInt(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="horizontalDivisions">
                  Divisiones perpendiculares
                </Label>
                <Input
                  type="number"
                  id="horizontalDivisions"
                  value={horizontalDivisions}
                  min={1}
                  max={20}
                  onChange={(e) => setHorizontalDivisions(parseInt(e.target.value))}
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={() => divideTerrain(horizontalDivisions, verticalDivisions)}
                className="flex-1"
              >
                Aplicar Divisiones
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div
        ref={mapRef}
        style={{ height: '700px', width: '100%' }}
      />
    </div>
  );
}

export default LotsInfo;