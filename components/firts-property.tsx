'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import { getProperty } from "@/utils/property.http";
import { Property } from "@/lib/types";
import { Button } from "./ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import { Card } from "./ui/card";
import Image from "next/image";


export default function FirstProperty() {
    const [data, setData] = useState<Property[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const queryParams = new URLSearchParams({
                    page: "1",
                    limit: "3",
                });

                const data = await getProperty('', queryParams);


                if (data?.properties) {
                    setData(data.properties);
                } else {
                    console.error("La respuesta no contiene propiedades válidas:", data);
                    setData([]);
                }


            } catch (error) {
                console.error("Error al obtener las propiedades:", error);
            }
        };

        fetchData();
    }, []);
    return (
        <section className="py-20">
            <div className="container max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-3xl font-bold">Terrenos Destacados</h2>
                    <Button variant="outline" asChild>
                        <Link href="/marketplace">
                            Ver todos
                            <ArrowRight className="ml-2 h-4 w-4" />

                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {data.map((i) => (
                        <Card key={i.id} className="overflow-hidden">
                            <div className="aspect-[4/3] relative">
                                <Image
                                    src={i.images[0] ? i.images[0]?.url : 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=800&fit=crop'}
                                    alt={`Terreno destacado ${i}`}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center text-muted-foreground mb-2">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    <span>Ubicación {i.location}</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{i.name}</h3>
                                <p className="text-2xl font-bold text-primary">{i.price} US$</p>
                                <div className="mt-4 flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">{i.size.toFixed(2)} m²</span>
                                    <Link href={`/marketplace/${i.id}`}>
                                        <Button variant="outline" size="sm">Ver detalles</Button>
                                    </Link>
                                </div>

                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}