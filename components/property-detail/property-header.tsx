"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Property } from "@/lib/types";

interface PropertyHeaderProps {
  property: Property;
}

export function PropertyHeader({ property }: PropertyHeaderProps) {
  return (
    <div className="mb-6">
      <Link href="/marketplace" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver al Marketplace
      </Link>
    </div>
  );
}