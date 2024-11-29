'use client';

import { notFound } from "next/navigation";
import { getPropertyById } from "@/utils/property.http";
import { useAuth } from "@/contexts/auth-context";
import { Property } from "@/lib/types";
import { useState, useEffect } from "react";
import { PropertyDetailClient } from "@/components/property-detail/property-detail-client";
import { useParams } from 'next/navigation';



export default function PropertyPage() {
  const { id } = useParams();

  return <PropertyDetailClient propertyId={id} />;
}
