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

  // Protege ruta si no hay user en LS
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = window.localStorage.getItem("user");
      if (!storedUser) router.replace("/auth");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-[720px] text-center">
        {/* Título responsive */}
        <h1
          className="
            font-extrabold tracking-tight leading-none flex items-center justify-center
            text-[clamp(2.25rem,6vw,3.75rem)]  /* ~text-4xl a ~text-6xl */
          "
        >
          <span>W</span>
          <SVGLogo className="inline-block mx-1 align-[.05em] h-[1em] w-auto" />
          <span>LCOM</span>
          {/* Tres bloques decorativos: se encogen en cel */}
                   <SVGLogo className="inline-block mx-1 align-[.05em] h-[1em] w-auto" />

          <span>!</span>
        </h1>

        {/* Subtítulo responsive y legible en móvil */}
        <p className="mt-4 sm:mt-6 text-base sm:text-xl leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Tu prueba de 3 meses</strong> gratis está activa.
          <br className="hidden sm:block" />
          Sube tu primer lote ahora y empieza a recibir{" "}
          <strong className="text-foreground">clientes calificados</strong>.
        </p>

        {/* Botones: full width en cel, fijos en sm+ */}
        <div className="mt-8 sm:mt-10 grid gap-3 place-items-center">
          <Button
            asChild
            className="
              w-full max-w-sm sm:w-72
              rounded-full py-5 sm:py-6
              text-lg sm:text-2xl font-extrabold
              bg-emerald-500 hover:bg-emerald-600
            "
          >
            <a
              href="https://www.invierteinmo.co/add-property"
              target="_blank"
              rel="noreferrer"
              aria-label="Vender propiedad"
            >
              VENDER
            </a>
          </Button>

          <Button
            onClick={() => setShowVideo((v) => !v)}
            variant="secondary"
            className="
              w-full max-w-sm sm:w-72
              rounded-full py-4 sm:py-6
              text-base sm:text-xl font-semibold
            "
            aria-expanded={showVideo}
            aria-controls="tutorial-video"
          >
            {showVideo ? "ocultar tutorial" : "ver tutorial"}
          </Button>
        </div>

        {/* Video responsive */}
        {showVideo && (
          <div id="tutorial-video" className="mt-6 mx-auto w-full">
            <div className="aspect-video w-full rounded-xl overflow-hidden shadow">
              <iframe
                className="h-full w-full"
                src="https://www.youtube-nocookie.com/embed/4wlnui5B5m8?si=7ukpKhXRC19M0dBr&amp;controls=0"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Enlace alternativo */}
        <div className="mt-8 sm:mt-10">
          <Link
            href="/marketplace"
            className="text-sm sm:text-base text-muted-foreground hover:underline"
          >
            Ir al marketplace →
          </Link>
        </div>
      </div>
    </div>
  );
}
