"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { loginHttp } from "@/utils/auth.http";
import { registerHttp } from "@/utils/auth.http";
interface User {
  id: string;
  fullName: string;
  email: string;
  token: string;
  
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string, confirmPassword: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginHttp({ user: { email, password } });
      const { user, token } = response;
      setUser({...user, token});
      localStorage.setItem("user", JSON.stringify({...user, token}));
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw new Error("Error al iniciar sesión");
    }
  };

  const register = async (fullName: string, email: string, password: string, confirmPassword: string) => {
    try {
      const response = await registerHttp({ user: { fullName, email, password, confirmPassword } });
      const { user, token } = response;
      setUser({...user, token});
      localStorage.setItem("user", JSON.stringify({...user, token}));
    } catch (error) {
      console.error("Error al registrarse:", error);
      throw new Error("Error al registrarse");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}