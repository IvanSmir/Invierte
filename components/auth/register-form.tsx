"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/auth-context";

const registerSchema = z.object({
  fullName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type RegisterValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { register: registerUser } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterValues) => {
    try {
      setIsLoading(true);
      await registerUser(data.fullName, data.email, data.password, data.confirmPassword);
      toast({
        title: "¡Registro exitoso!",
        description: "Tu cuenta ha sido creada correctamente",
        duration: 3000,
      });

      router.push("/auth/welcome");
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al crear tu cuenta",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre</Label>
        <Input
          id="fullName"
          disabled={isLoading}
          {...form.register("fullName")}
        />
        {form.formState.errors.fullName && (
          <p className="text-sm text-destructive">
            {form.formState.errors.fullName.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          disabled={isLoading}
          {...form.register("email")}
        />
        {form.formState.errors.email && (
          <p className="text-sm text-destructive">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          type="password"
          disabled={isLoading}
          {...form.register("password")}
        />
        {form.formState.errors.password && (
          <p className="text-sm text-destructive">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
        <Input
          id="confirmPassword"
          type="password"
          disabled={isLoading}
          {...form.register("confirmPassword")}
        />
        {form.formState.errors.confirmPassword && (
          <p className="text-sm text-destructive">
            {form.formState.errors.confirmPassword.message}
          </p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Registrando..." : "Registrarse"}
      </Button>
    </form>
  );
}