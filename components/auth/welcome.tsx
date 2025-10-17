"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type WelcomeModalProps = {
    open: boolean;
    onClose: () => void;
};

export default function WelcomeModal({ open, onClose }: WelcomeModalProps) {
    const [showVideo, setShowVideo] = useState(false);

    return (
        <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
            <DialogContent className="max-w-[680px] p-0 overflow-hidden">
                <button
                    onClick={onClose}
                    aria-label="Cerrar"
                    className="absolute right-4 top-4 rounded-full p-1 hover:bg-muted"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="px-8 pt-10 pb-8 text-center">
                    {/* Title */}
                    <DialogHeader className="items-center">
                        <DialogTitle className="text-5xl font-extrabold tracking-wide mb-2">
                            <span className="inline-block">W</span>
                            <span className="inline-block align-middle mx-0.5">
                                {/* Bloquecitos verdes para la “E” */}
                                <span className="grid grid-cols-1 gap-1">
                                    <span className="h-3 w-8 bg-emerald-500 rounded" />
                                    <span className="h-3 w-8 bg-emerald-500 rounded" />
                                    <span className="h-3 w-8 bg-emerald-500 rounded" />
                                </span>
                            </span>
                            <span className="inline-block">LCOM</span>
                            <span className="inline-block align-middle mx-0.5">
                                <span className="grid grid-cols-1 gap-1">
                                    <span className="h-3 w-8 bg-emerald-500 rounded" />
                                    <span className="h-3 w-8 bg-emerald-500 rounded" />
                                    <span className="h-3 w-8 bg-emerald-500 rounded" />
                                </span>
                            </span>
                            <span className="inline-block">E!</span>
                        </DialogTitle>
                    </DialogHeader>

                    {/* Subtítulo */}
                    <p className="mt-4 text-lg">
                        <strong>Tu prueba de 3 meses</strong> gratis está activa.<br />
                        Sube tu primer lote ahora y empieza a recibir <strong>clientes calificados</strong>.
                    </p>

                    {/* Botones */}
                    <div className="mt-8 space-y-4 flex flex-col items-center">
                        <Button
                            asChild
                            className="w-72 rounded-full py-6 text-2xl font-extrabold bg-emerald-500 hover:bg-emerald-600"
                        >
                            <a href="https://www.invierteinmo.co/add-property" target="_blank" rel="noreferrer">
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
                        <div className="mt-6 mx-auto w-full max-w-[560px]">
                            <div className="aspect-video w-full rounded-xl overflow-hidden shadow">
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/4wlnui5B5m8"
                                    title="Tutorial"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
