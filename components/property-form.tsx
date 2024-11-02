"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { PropertyDrawMap } from "@/components/property-draw-map";
import { useToast } from "@/components/ui/use-toast";

const propertySchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  price: z.string().transform((val) => parseFloat(val)),
  size: z.string().transform((val) => parseFloat(val)),
  type: z.string(),
  location: z.string().min(5, "La ubicación es requerida"),
});

type PropertyValues = z.infer<typeof propertySchema>;

export function PropertyForm() {
  const [coordinates, setCoordinates] = useState<[number, number][]>([]);
  const [center, setCenter] = useState<[number, number] | null>(null);
  const { toast } = useToast();

  const form = useForm<PropertyValues>({
    resolver: zodResolver(propertySchema),
  });

  const onSubmit = async (data: PropertyValues) => {
    if (coordinates.length < 3) {
      toast({
        title: "Error",
        description: "Debe dibujar el perímetro del terreno en el mapa",
        variant: "destructive",
      });
      return;
    }

    const propertyData = {
      ...data,
      coordinates,
      latitude: center ? center[0] : 0,
      longitude: center ? center[1] : 0,
    };

    console.log("Datos del terreno:", propertyData);


    toast({
      title: "¡Éxito!",
      description: "El terreno se ha agregado correctamente",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <Card className="p-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Terreno</Label>
              <Input
                id="name"
                {...form.register("name")}
                placeholder="Ej: Terreno Vista al Mar"
              />
              {form.formState.errors.name && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                {...form.register("description")}
                placeholder="Describa las características principales del terreno"
              />
              {form.formState.errors.description && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Precio (USD)</Label>
                <Input
                  id="price"
                  type="number"
                  {...form.register("price")}
                  placeholder="50000"
                />
                {form.formState.errors.price && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.price.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="size">Área (m²)</Label>
                <Input
                  id="size"
                  type="number"
                  {...form.register("size")}
                  placeholder="500"
                />
                {form.formState.errors.size && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.size.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Terreno</Label>
              <Select onValueChange={(value) => form.setValue("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residencial</SelectItem>
                  <SelectItem value="commercial">Comercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="agricultural">Agrícola</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.type && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.type.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Ubicación</Label>
              <Input
                id="location"
                {...form.register("location")}
                placeholder="Ej: Av. Principal 123, Ciudad"
              />
              {form.formState.errors.location && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.location.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Publicar Terreno
            </Button>
          </form>
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Dibuje el perímetro del terreno</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Use las herramientas de dibujo para marcar los límites de su terreno en el mapa
          </p>
          <div className="h-[600px]">
            <PropertyDrawMap
              onBoundariesChange={setCoordinates}
              onCenterChange={setCenter}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}