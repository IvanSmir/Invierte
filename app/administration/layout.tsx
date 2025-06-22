'use client'
import { useAuth } from "@/contexts/auth-context";
import { RolesEnum } from "@/lib/types/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdministrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
    if (!user?.roles.includes(RolesEnum.ADMIN)) {
      console.log(user);
      router.push("/");
    }
  }, [user, router]);
  
  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {children}
    </div>
  );
}
