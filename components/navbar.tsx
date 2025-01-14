"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPinned, User, LogOut, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useAuth } from "@/contexts/auth-context";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from "next-themes";

export function Navbar() {

  const { theme } = useTheme(); 
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleSellClick = () => {
    if (user) {
      router.push("/add-property");
    } else {
      router.push("/auth");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
          {theme === "dark" ? (
              <img src="/images/logoDark.svg" alt="Invierte" width={150} height={50} />
            ) : (
              <img src="/images/logoLight.svg" alt="Invierte" width={150} height={50} />
            )}          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/marketplace" className="text-foreground/60 hover:text-foreground transition-colors">
              Explorar
            </Link>
            <Link href="/about" className="text-foreground/60 hover:text-foreground transition-colors">
              Nosotros
            </Link>
            <Link href="/contact" className="text-foreground/60 hover:text-foreground transition-colors">
              Contacto
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button onClick={handleSellClick} variant="outline" className="flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Vender Terreno
            </Button>
            <ModeToggle />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {user.fullName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>{user.fullName}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar Sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild>
                <Link href="/auth">
                  Iniciar Sesión
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}