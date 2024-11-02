"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";

export function FooterSellButton() {
  const { user } = useAuth();

  return (
    <Button 
      variant="outline" 
      className="w-full"
      asChild
    >
      <Link href={user ? "/add-property" : "/auth"}>
        Vender Terreno
      </Link>
    </Button>
  );
}