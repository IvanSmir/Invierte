// app/welcome/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SVGLogo from "@/components/svg-logo";

export default function WelcomePage() {
    const router = useRouter();
    const [showVideo, setShowVideo] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUser = window.localStorage.getItem("user");
            if (!storedUser) router.replace("/auth"); // ajusta si tu ruta de login es otra
        }
    }, [router]);

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
            <div className="w-full max-w-2xl text-center">

                {/* “WELCOME!” con bloques verdes simples */}
                <h1 className="text-6xl flex justify-center items-center sm:text-6xl font-extrabold tracking-wide leading-none">
                    <span>W</span>
                    <SVGLogo className="mx-1" />
                    <span>LCOM</span>
                    <SVGLogo className="mx-1" />

                    <span>!</span>
                </h1>
                {/* Subtítulo */}
                <p className="mt-6 text-lg sm:text-xl leading-relaxed">
                    <strong>Tu prueba de 3 meses</strong> gratis está activa.<br />
                    Sube tu primer lote ahora y empieza a recibir{" "}
                    <strong>clientes calificados</strong>.
                </p>

                {/* Botones */}
                <div className="mt-10 flex flex-col items-center gap-4">
                    <Button
                        asChild
                        className="w-72 rounded-full py-6 text-2xl font-extrabold bg-emerald-500 hover:bg-emerald-600"
                    >
                        <a
                            href="https://www.invierteinmo.co/add-property"
                            target="_blank"
                            rel="noreferrer"
                        >
                            VENDER
                        </a>
                    </Button>

                    <Button
                        onClick={() => setShowVideo((v) => !v)}
                        variant="secondary"
                        className="w-72 rounded-full py-6 text-xl font-semibold"
                    >
                        {showVideo ? "ocultar tutorial" : "ver tutorial"}
                    </Button>
                </div>

                {/* Video */}
                {showVideo && (
                    <div className="mt-6 mx-auto w-full max-w-[720px]">
                        <div className="aspect-video w-full rounded-xl overflow-hidden shadow">
                            <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/4wlnui5B5m8?si=7ukpKhXRC19M0dBr&amp;controls=0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
                            </iframe>
                        </div>
                    </div>
                )}

                {/* Enlace alternativo para seguir */}
                <div className="mt-10">
                    <Link
                        href="/marketplace"
                        className="text-sm text-muted-foreground hover:underline"
                    >
                        Ir al marketplace →
                    </Link>
                </div>
            </div>
        </div>
    );
}
