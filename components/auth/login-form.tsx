// components/auth/login-form.tsx
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

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginValues) => {
    try {
      setIsLoading(true);
      const showWelcome = await login(data.email, data.password);
      if (showWelcome) {
        router.push("/auth/welcome");
      }
      else {
        toast({
          title: "¡Bienvenido!",
          description: "Has iniciado sesión correctamente",
          duration: 3000,
        });
        router.push("/marketplace");
      }
    } catch (error: any) {
      if (error?.message == "Credenciales inválidas") {
        setError("Credenciales inválidas");
        toast({
          title: "Error",
          description: "Credenciales inválidas",
          variant: "destructive",
          duration: 3000,
        });
      } else {
        toast({
          title: "Error",
          description: "Hubo un problema al iniciar sesión",
          variant: "destructive",
          duration: 3000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
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
      {error && (
        <p className="text-sm text-destructive mt-2">
          {error}
        </p>
      )}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
      </Button>
    </form>
  );
}