"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useAuth } from "@/contexts/auth-context";
import { useTheme } from "next-themes";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Navbar() {
  const { theme } = useTheme();
  const { user, logout } = useAuth();
  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      <div className="container flex max-w-6xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            {theme === "dark" ? (
              <img
                src="/images/logoDark.svg"
                alt="Invierte"
                width={150}
                height={50}
              />
            ) : (
              <img
                src="/images/logoLight.svg"
                alt="Invierte"
                width={150}
                height={50}
              />
            )}
          </Link>

       

    

          {/*  pantallas grandes */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/marketplace"
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              Explorar
            </Link>
            <Link
              href="/about"
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              Nosotros
            </Link>
            <Link
              href="/contact"
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              Contacto
            </Link>
          </nav>

          {/* pantallas grandes */}
          <div className="flex items-center space-x-4">
            <Button
              onClick={handleSellClick}
              variant="outline"
              className="flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Vender
            </Button>
            <ModeToggle />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
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
                <Link href="/auth">Iniciar Sesión</Link>
              </Button>
            )}
              {/* pantallas pequeñas */}
      <button
            className=" md:hidden p-2 rounded bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          </div>
        </div>
      </div>
    
      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="bg-white dark:bg-gray-900 w-full p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/marketplace"
                className="hover:underline"
                onClick={() => setIsSidebarOpen(false)}
              >
                Explorar
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:underline"
                onClick={() => setIsSidebarOpen(false)}
              >
                Nosotros
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:underline"
                onClick={() => setIsSidebarOpen(false)}
              >
                Contacto
              </Link>
            </li>
          </ul>
          <button
            className="mt-4 p-2 text-red-500 hover:underline"
            onClick={() => setIsSidebarOpen(false)}
          >
            Cerrar
          </button>
        </div>
      )}
    </header>
  );
}
