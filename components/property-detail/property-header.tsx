"use client";

import { ArrowLeft } from "lucide-react";
import { Property } from "@/lib/types";
import { useRouter } from "next/navigation";

interface PropertyHeaderProps {
  property: Property;
}

export function PropertyHeader({ property }: PropertyHeaderProps) {
  const router = useRouter();
  return (
    <div className="mb-6">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver
      </button>
    </div>
  );
}