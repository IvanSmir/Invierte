import { useAuth } from "@/contexts/auth-context";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/auth";
export const loginHttp = async ({
  user,
}: {
  user: {
    email: string;
    password: string;
  };
}) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.status === 400) {
      throw new Error("Invalid credentials");
    }
    if (!response.ok) {
      throw new Error("Error al iniciar sesión");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    if (error.message == "Invalid credentials") {
      throw new Error("Credenciales inválidas");
    } else {
      throw new Error(error.message || "Error al iniciar sesión");
    }
  }
};

export const registerHttp = async ({
  user,
}: {
  user: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
}) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Error al registrar");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Error al registrar");
  }
};
