import { properties } from "@/lib/data";
import { PropertyDetailClient } from "@/components/property-detail/property-detail-client";
import { notFound } from "next/navigation";

interface PropertyPageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return properties.map((property) => ({
    id: property.id.toString(),
  }));
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const property = properties.find((p) => p.id.toString() === params.id);

  if (!property) {
    notFound();
  }

  return <PropertyDetailClient property={property} />;
}