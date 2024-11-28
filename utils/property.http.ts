const API_URL = process.env.NEXT_PUBLIC_API_URL + "/property";

export const getProperty = async ( token: string, queryParams: any) => {
  try {
    
    const response = await fetch(`${API_URL}?${queryParams.toString()}`, {
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

export const getPropertyById = async (id: string, token: string) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

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
  console.log("property: ", property);
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
      const errorDetails = await response.json();
      throw new Error(errorDetails.message || "Error al agregar Propiedad");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Error al agregar Propiedad");
  }
};
export const updateProperty = async (id: string, updatedProperty: any, token: string) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedProperty),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar la Propiedad");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Error al actualizar la Propiedad");
  }
};