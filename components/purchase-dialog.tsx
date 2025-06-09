"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Property, Lot } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import { addReservation } from "@/utils/reservation.http";
import { toast } from "./ui/use-toast";

const purchaseSchema = z.object({
  name: z.string().min(2, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(6, "Teléfono inválido"),
});

type PurchaseValues = z.infer<typeof purchaseSchema>;

interface PurchaseDialogProps {
  property: Property;
  lot: Lot;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReservationComplete: () => void; // Nuevo prop

}

interface Reservation {
  lotId: string | undefined;
  phone: string;
}

export function PurchaseDialog({ property, lot, open, onOpenChange, onReservationComplete }: PurchaseDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const auth = useAuth();
  const token = auth.user?.token || "";

  const form = useForm<PurchaseValues>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: {
      name: user?.fullName || "",
      email: user?.email || "",
      phone: "",
    },
  });
  const onSubmit = async () => {

    setIsSubmitting(true);
    const reservation = {
      lotId: lot.id,
      phone: form.getValues("phone"),
    };

    try {

      await addReservation(reservation, token);
      onOpenChange(false);
      onReservationComplete();
      toast({
        title: "Reserva realizada",
        description: "La reserva se ha realizado correctamente.",
        duration: 3000,
      });
    const formValues = form.getValues();
    const message = encodeURIComponent(
      `Hola, soy ${formValues.name} (${formValues.email}).\nQuiero confirmar la reserva del lote ${lot.number} de la propiedad "${property.name}" por un valor de ${formatCurrency(lot.price)}.`
    );

    const phoneNumber = "595985408695"; // Reemplaza con el número de WhatsApp del vendedor (sin "+" y sin espacios)

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
    } catch (error) {
      console.error("Error al procesar la reserva:", error);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reservar Lote {lot.number}</DialogTitle>
          <DialogDescription>
            Complete sus datos para iniciar el proceso de reserva del lote por{" "}
            {formatCurrency(lot.price)}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input
              id="name"
              {...form.register("name")}
              placeholder="Juan Pérez"
              disabled
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...form.register("email")}
              placeholder="juan@ejemplo.com"
              disabled
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              type="tel"
              {...form.register("phone")}
              placeholder="+1234567890"
            />
            {form.formState.errors.phone && (
              <p className="text-sm text-destructive">
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Procesando..." : "Confirmar Reserva"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}