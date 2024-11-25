const API_URL = process.env.NEXT_PUBLIC_API_URL + "/property";

export const getProperty = async (ciRuc: string, token: string) => {
  try {
    const queryParams = new URLSearchParams({
      page: '1', 
      limit: '10', 
      departmentId: '1',
      cityId: '1',
      neighborhoodId: '1',
    });
    
    const response = await fetch(`${API_URL}/property?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status == 404) {
      throw new Error("Propiedad no encontrada");
    }
    if (!response.ok) {
      throw new Error("Error al obtener Propiedad");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error((error as Error).message || "Error al obtener Propiedad");
  }
};

export const addProperty = async (property: any, token: string) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(property),
    });

    if (!response.ok) {
      throw new Error("Error al agregar Propiedad");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Error al agregar Propiedad");
  }
};
 