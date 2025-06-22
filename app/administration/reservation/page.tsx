'use client'
import { useEffect, useState } from "react";
import { Reservation } from "@/lib/types/reservation";
import { useAuth } from "@/contexts/auth-context";
import { getReservation } from "@/utils/reservation.http";
import MarketplaceLoading from "@/app/marketplace/loading";
import Link from "next/link";
export default function AdministrationPage() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
     const auth = useAuth();
      const token = auth.user?.token || "";
      const [error, setError] = useState(false);
      const [loading, setLoading] = useState(false);
    
      useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          setError(false);
          try {
            const data = await getReservation(token);
            // Asignar solo el array de reservas al estado
            console.log("Datos de reservas obtenidos:", data.data);
            if (data?.data) {
              setReservations(data.data);
            } else {
              console.error("La respuesta no contiene reservas válidas:", data);
              setReservations([]);
            }
            setLoading(false);
    
          } catch (error) {
            setError(true);
            console.error("Error al obtener las reservas:", error);
          }
        };
    
        fetchData();
      }, []);
    
      if (error) {
        throw new Error("Error al obtener las reservas");
      }
    
      if (loading) {
        return MarketplaceLoading();
      }
    
  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
      <p className="text-gray-600 mb-4">
        Aquí puedes ver todas las reservas.
      </p>
       <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Usuario</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Teléfono</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Propiedad</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res) => (
              <tr key={res.id} className="border-t border-gray-200">
                <td className="px-4 py-2 ">{res.User?.fullName || "Sin nombre"}</td>
                <td className="px-4 py-2 ">{res.phone || "Sin telefono"}</td>
                <td className="px-4 py-2 underline"><Link href={`/marketplace/${res.lot?.propertyId}`}>Ver propiedad</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}