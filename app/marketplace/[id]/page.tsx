import { Property } from "@/lib/types";
import { properties } from "@/lib/data";
import { PropertyDetail } from "@/components/property-detail";

export function generateStaticParams() {
  return properties.map((property) => ({
    id: property.id.toString(),
  }));
}

export default function PropertyPage({ params }: { params: { id: string } }) {
  const property = properties.find((p) => p.id.toString() === params.id);

  if (!property) {
    return <div className="container max-w-6xl mx-auto px-4 py-8 text-center">Propiedad no encontrada</div>;
  }

  return (
    <div className="container max-w-6xl mx-auto px-4">
      <PropertyDetail property={property} />
    </div>
  );
}