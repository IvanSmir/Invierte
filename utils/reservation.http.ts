
const API_URL = process.env.NEXT_PUBLIC_API_URL + "/reservation";
export const getReservation = async ( token: string) => {
    try {
      
      const response = await fetch(`${API_URL}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status == 404) {
        throw new Error("Reserva no encontrada");
      }
      if (!response.ok) {
        throw new Error("Error al obtener Reserva");
      }
  
      const data = await response.json();
      return data;
    } catch (error: any) {
      throw new Error((error as Error).message || "Error al obtener Reserva");
    }
  };
export const addReservation = async (reservation: any, token: string) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reservation),
      });
  
      if (!response.ok) {
        throw new Error("Error al agregar Reserva");
      }
  
      const data = await response.json();
      return data;
    } catch (error: any) {
      throw new Error(error.message || "Error al agregar Reserva");
    }
  };

  