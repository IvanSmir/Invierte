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
}

export function PurchaseDialog({ property, lot, open, onOpenChange }: PurchaseDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PurchaseValues>({
    resolver: zodResolver(purchaseSchema),
  });

  const onSubmit = async (data: PurchaseValues) => {
    setIsSubmitting(true);
    // Aquí iría la lógica de compra real
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Comprar Lote {lot.number}</DialogTitle>
          <DialogDescription>
            Complete sus datos para iniciar el proceso de compra del lote por{" "}
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
              {isSubmitting ? "Procesando..." : "Confirmar Compra"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}