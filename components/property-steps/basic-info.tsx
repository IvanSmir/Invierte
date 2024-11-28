"use client";

import { useEffect, useState } from "react";
import { ImageUpload } from "@/components/image-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GPS {
  lat: number;
  long: number;
}

interface Department {
  id: number;
  nombre: string;
  gps: GPS;
}

interface City {
  id: number;
  nombre: string;
}

interface Neighborhood {
  id: number;
  nombre: string;
}

interface BasicInfoData {
  name: string;
  description: string;
  images: File[];
  departmentId: string;
  departmentLocation: {
    lat: number;
    long: number;
  };
  cityId: string;
  neighborhoodId?: string;
  address: string;
}


interface BasicInfoProps {
  data: BasicInfoData;
  onUpdate: (data: Partial<BasicInfoData>) => void;
  errors?: Record<string, string[]>;
}

export function BasicInfo({ data, onUpdate, errors = {} }: BasicInfoProps) {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [loading, setLoading] = useState({
    departments: false,
    cities: false,
    neighborhoods: false,
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(prev => ({ ...prev, departments: true }));
      try {
        const response = await fetch('https://api.delpi.dev/api/departamentos');
        const data = await response.json();
        setDepartments(data.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
      setLoading(prev => ({ ...prev, departments: false }));
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (!data.departmentId) {
        setCities([]);
        return;
      }

      setLoading(prev => ({ ...prev, cities: true }));
      try {
        const response = await fetch(`https://api.delpi.dev/api/ciudades/${data.departmentId}`);
        const cityData = await response.json();
        setCities(cityData);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
      setLoading(prev => ({ ...prev, cities: false }));
    };

    fetchCities();
  }, [data.departmentId]);

  useEffect(() => {
    const fetchNeighborhoods = async () => {
      if (!data.cityId) {
        setNeighborhoods([]);
        return;
      }

      setLoading(prev => ({ ...prev, neighborhoods: true }));
      try {
        const response = await fetch(`https://api.delpi.dev/api/barrios/${data.cityId}`);
        const neighborhoodData = await response.json();
        setNeighborhoods(neighborhoodData);
      } catch (error) {
        console.error('Error fetching neighborhoods:', error);
      }
      setLoading(prev => ({ ...prev, neighborhoods: false }));
    };

    fetchNeighborhoods();
  }, [data.cityId]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre del Terreno</Label>
        <Input
          id="name"
          value={data.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          placeholder="Ej: Terreno Vista al Mar"
          className={errors.name ? "border-destructive" : ""}
        />
        {errors.name?.map((error, index) => (
          <p key={index} className="text-sm text-destructive mt-1">
            {error}
          </p>
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          value={data.description}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Describe las características principales del terreno"
          className={errors.description ? "border-destructive" : ""}
        />
        {errors.description?.map((error, index) => (
          <p key={index} className="text-sm text-destructive mt-1">
            {error}
          </p>
        ))}
        <p className="text-xs text-muted-foreground">
          {data.description.length}/1000 caracteres
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Departamento</Label>
          <Select
            value={data.departmentId}
            onValueChange={(value) => {
              const selectedDept = departments.find(
                (dept) => dept.id.toString() === value
              );
              onUpdate({
                departmentId: value,
                cityId: "",
                neighborhoodId: "",
                departmentLocation: selectedDept
                  ? { lat: selectedDept.gps.lat as number, long: selectedDept.gps.long as number }
                  : { lat: 0, long: 0 },
              });
            }}
          >
            <SelectTrigger className={errors.departmentId ? "border-destructive" : ""}>
              <SelectValue placeholder="Selecciona un departamento" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept.id} value={dept.id.toString()}>
                  {dept.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.departmentId?.map((error, index) => (
            <p key={index} className="text-sm text-destructive mt-1">
              {error}
            </p>
          ))}
        </div>

        <div className="space-y-2">
          <Label>Ciudad</Label>
          <Select
            value={data.cityId}
            onValueChange={(value) => {
              onUpdate({
                cityId: value,
                neighborhoodId: ''
              });
            }}
            disabled={!data.departmentId || loading.cities}
          >
            <SelectTrigger className={errors.cityId ? "border-destructive" : ""}>
              <SelectValue placeholder="Selecciona una ciudad" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city.id} value={city.id.toString()}>
                  {city.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.cityId?.map((error, index) => (
            <p key={index} className="text-sm text-destructive mt-1">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Barrio (Opcional)</Label>
          <Select
            value={data.neighborhoodId}
            onValueChange={(value) => onUpdate({ neighborhoodId: value })}
            disabled={!data.cityId || loading.neighborhoods}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un barrio" />
            </SelectTrigger>
            <SelectContent>
              {neighborhoods.map((neighborhood) => (
                <SelectItem key={neighborhood.id} value={neighborhood.id.toString()}>
                  {neighborhood.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Dirección</Label>
          <Input
            id="address"
            value={data.address}
            onChange={(e) => onUpdate({ address: e.target.value })}
            placeholder="Ej: Calle Principal 123"
            className={errors.address ? "border-destructive" : ""}
          />
          {errors.address?.map((error, index) => (
            <p key={index} className="text-sm text-destructive mt-1">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Imágenes</Label>
        <ImageUpload
          value={data.images}
          onChange={(images) => onUpdate({ images })}
          onRemove={(imageUrl) => {
            onUpdate({
              images: data.images.filter(url => url !== imageUrl)
            });
          }}
        />
        {errors.images?.map((error, index) => (
          <p key={index} className="text-sm text-destructive mt-1">
            {error}
          </p>
        ))}
        <p className="text-xs text-muted-foreground">
          Máximo 5 imágenes. {data.images.length}/5 subidas
        </p>
      </div>
    </div>
  );
}