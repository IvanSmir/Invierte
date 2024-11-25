// components/Map.js
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';  // Asegúrate de importar también la funcionalidad de la librería

import * as turf from '@turf/turf';
import { Lot, Property } from '@/lib/types';
import { Position } from "geojson";
import { Feature, FeatureCollection, Polygon, MultiPolygon , GeoJsonProperties } from 'geojson';

interface PropertyMapProps {
  center: [number, number];
  zoom: number;
  property?: Property;
  onLotSelect?: (lot: Lot) => void;
  onMapClick?: (coord: [number, number]) => void;
  coordinates?: [number, number][]; // Coordinates to draw polygon
  orientationLine?: [number, number][]; // Optional orientation line
  divisions?: Position[][]; // Optional divisions
  onDrawCreated?: (type: string, coordinates: [number, number][]) => void;
  drawPolygon: boolean; // Flag to enable drawing polygons
}

export function LotsInfo() {
  const mapRef = useRef(null);
  const [map, setMap] = useState<L.Map | null>(null);
  const [drawnItems, setDrawnItems] = useState(new L.FeatureGroup());
  const [originalPolygon, setOriginalPolygon] = useState<L.Polygon | null>(null);
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

    setMap(initialMap); // Set the map state

    const drawnLayer = new L.FeatureGroup();
    initialMap.addLayer(drawnLayer);
    setDrawnItems(drawnLayer);

    const drawControl = new L.Control.Draw({
      draw: {
        polygon: {
          allowIntersection: false,
          showArea: true,
          shapeOptions: {
            color: '#3388ff',
          },
        },
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

    initialMap.on('draw:created', (e: L.LeafletEvent) => {  // Use L.LeafletEvent
      const layer = (e as any).layer;  // Access the layer from the event
      const layerType = (e as any).layerType;  // Access layerType manually

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
        showArea(turf.area(layer.toGeoJSON()));
      }

      drawnLayer.addLayer(layer);
    });

    return () => {
      initialMap.remove();
    };
  }, [orientationLine, originalPolygon]);


  const calculateOrientation = (line: L.Polyline) => {
    const coords = line.getLatLngs();
    const flattenedCoords = coords.flat(); 

 const start = flattenedCoords[0];
  const end = flattenedCoords[flattenedCoords.length - 1];

  if (!(start instanceof L.LatLng) || !(end instanceof L.LatLng)) {
    console.error("Coordinates are not of type LatLng");
    return;
  }      const dx = end.lng - start.lng;
    const dy = end.lat - start.lat;
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    setRotationAngle(angle);
  };

  function divideTerrain(horizontalDivisions: number, verticalDivisions: number) {
    if (!originalPolygon || !orientationLine) {
      alert('Dibuje primero el polígono y la línea de orientación');
      return;
    }

    clearDivisions();

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
        type MyFeatureCollection = FeatureCollection<Polygon, GeoJsonProperties>;
        const divisionBbox = turf.bboxPolygon([minX, minY, maxX, maxY]);
        const rotatedDivision = turf.transformRotate(divisionBbox, -rotationAngle, {
          pivot: center.geometry.coordinates,
        });
        const polygonFeature = polygon as Feature<Polygon, GeoJsonProperties>;
        const rotatedDivisionFeature: Feature<Polygon, GeoJsonProperties> = rotatedDivision as Feature<Polygon, GeoJsonProperties>;
      // Create feature collections with the correct type
      const polygonFC: MyFeatureCollection = turf.featureCollection([polygonFeature]);

      const intersection = turf.intersect(polygonFC, rotatedDivisionFeature);
      if (intersection) {
          createDivisionLayer(intersection, `${i + 1}-${j + 1}`);
        }
      }
    }
  };

  const createDivisionLayer = (geometry: Feature<any, GeoJsonProperties> | FeatureCollection<any, GeoJsonProperties>,label: string) => {
    const area = turf.area(geometry);
    const layer = L.geoJSON(geometry, {
      style: {
        color: getRandomColor(),
        weight: 2,
        opacity: 0.7,
        fillOpacity: 0.3,
      },
    })
    if (map) {
      L.geoJSON(geometry).addTo(map);
      // Other operations using map
    }

    const center = turf.center(geometry);
    L.marker([center.geometry.coordinates[1], center.geometry.coordinates[0]], {
      icon: L.divIcon({
        className: 'area-label',
        html: `<div style="transform: rotate(${rotationAngle}deg)">
          Parcela ${label}<br>${Math.round(area)} m²
        </div>`,
      }),
    })
    if (map) {
      L.geoJSON(geometry).addTo(map);
      // Other operations using map
    }

    setDivisions((prevDivisions) => [...prevDivisions, layer]);
  };

  const clearDivisions = () => {
    if (map) {
      divisions.forEach((layer) => map.removeLayer(layer));
      setDivisions([]);
    }
  };

  const clearMap = () => {
    if (map) {
      if (originalPolygon) {
        map.removeLayer(originalPolygon);
      }
      if (orientationLine) {
        map.removeLayer(orientationLine);
      }
    }
    clearDivisions();
    setOriginalPolygon(null);
    setOrientationLine(null);
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
    const areaInfoElement = document.getElementById('areaInfo');
    if (areaInfoElement) {
      areaInfoElement.textContent = `Área total: ${Math.round(area)} m² (${(area / 10000).toFixed(2)} hectáreas)`;
    } else {
      console.error("Element with ID 'areaInfo' not found.");
    }
  };
  return (
    <div>
      <div>
        <h2>División de Terrenos</h2>
        <div id="areaInfo"></div>
        <div>
          <label>Divisiones en dirección de la línea:</label>
          <input type="number" id="verticalDivisions" defaultValue={2} min={1} max={20} />
          <label>Divisiones perpendiculares:</label>
          <input type="number" id="horizontalDivisions" defaultValue={2} min={1} max={20} />
          <button onClick={() => divideTerrain(2, 2)}>Aplicar Divisiones</button>
        </div>
        <button onClick={clearMap} style={{ backgroundColor: '#dc3545' }}>
          Limpiar Mapa
        </button>
      </div>
      <div ref={mapRef} style={{ height: '700px', width: '100%' }}></div>
    </div>
  );
};

export default Map;
