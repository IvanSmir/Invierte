import Image from 'next/image';
import Link from 'next/link';
import { Award, Instagram, MessageCircle } from 'lucide-react';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
            <section className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold text-center mb-8">Sobre Nosotros</h1>
                <div className="max-w-3xl mx-auto text-lg">
                    <p className="mb-6">
                        Invierte nace en 2022 como una empresa dedicada al marketing inmobiliario ayudando a miles de personas a poder vender sus propiedades, en 2024 decidimos hacer un salto al mundo tecnológico y crear nuestra propia plataforma para poder cumplir el sueño de miles de personas de tener su propio terreno. Hoy somos una de las desarrolladoras inmobiliaria con base virtual más grande y avanzada del mercado la confianza de nuestros clientes es nuestro motor, en INVIERTE cumplimos tus sueños.
                    </p>
                </div>
            </section>

            <section className="bg-[hsl(var(--secondary))] py-16">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="bg-[hsl(var(--card))] p-6 rounded-lg shadow-md border border-[hsl(var(--border))]">
                            <h2 className="text-xl font-bold mb-4">¿Por qué lo hacemos?</h2>
                            <p className="text-[hsl(var(--foreground))]">Empoderamos a las personas motivándolos a adquirir un hogar digno.</p>
                        </div>
                        <div className="bg-[hsl(var(--card))] p-6 rounded-lg shadow-md border border-[hsl(var(--border))]">
                            <h2 className="text-xl font-bold mb-4">¿Cómo lo hacemos?</h2>
                            <p className="text-[hsl(var(--foreground))]">Ayudamos a conectar terratenientes y compradores, usando tecnología de loteamiento y optimización de costos, para la compra-venta de inmuebles a precios justos para ambas partes.</p>
                        </div>
                        <div className="bg-[hsl(var(--card))] p-6 rounded-lg shadow-md border border-[hsl(var(--border))]">
                            <h2 className="text-xl font-bold mb-4">¿Qué somos?</h2>
                            <p className="text-[hsl(var(--foreground))]">Una plataforma con tecnología de Marketplace donde podrás comprar terrenos baratos con seguridad.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-8">Premios y destaques de INVIERTE</h2>
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-4">
                    <div className="bg-[hsl(var(--card))] p-6 rounded-lg shadow-md border border-[hsl(var(--border))] flex items-start">
                        <Award className="w-10 h-10 mr-4 flex-shrink-0" />
                        <div>
                            <p className="font-semibold">Foro de Emprendedores de Paraguay - FEP 2024</p>
                            <p className="text-[hsl(var(--muted-foreground))]">Innovación de oro - proyecto empresarial destacado</p>
                        </div>
                    </div>

                    <div className="bg-[hsl(var(--card))] p-6 rounded-lg shadow-md border border-[hsl(var(--border))] flex items-start">
                        <Award className="w-10 h-10 mr-4 flex-shrink-0" />
                        <div>
                            <p className="font-semibold">Startup Lab - 2024</p>
                            <p className="text-[hsl(var(--muted-foreground))]">Incubación para desarrollo de startups</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-[hsl(var(--secondary))] py-16">
                <div className="container mx-auto px-4 max-w-screen-lg">
                    <h2 className="text-3xl font-bold text-center mb-12">Nuestro Equipo</h2>
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                        <div className="bg-[hsl(var(--card))] p-6 rounded-lg shadow-md text-center border border-[hsl(var(--border))] transform ">
                            <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                                <Image
                                    src="/team/tobias.jpg"
                                    alt="Tobias Ojeda"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Tobias Ojeda</h3>
                            <p className="text-[hsl(var(--muted-foreground))] font-semibold mb-4">CEO-Fundador</p>
                            <p className="text-sm text-[hsl(var(--foreground))]">Emprendedor dueño de Hogapy E.A.S, Técnico en administración de Negocios especializado en empresas de base tecnológica. Especialista en User Experience and Customer Support. Publicista con especialidad en MKT Inmobiliario.</p>
                        </div>

                        <div className="bg-[hsl(var(--card))] p-6 rounded-lg shadow-md text-center border border-[hsl(var(--border))]">
                            <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                                <Image
                                    src="/team/maria.jpeg"
                                    alt="Maria Esquivel"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Maria Esquivel</h3>
                            <p className="text-[hsl(var(--muted-foreground))] font-semibold mb-4">Programadora</p>
                            <p className="text-sm text-[hsl(var(--foreground))]">Desarrolladora Web FullStack, estudiante del 4to año de Ing. Informática en la UNI, con experiencia en el diseño e implementacion de aplicaciones web. Integrante del equipo ganador de la hackathon de PPY.</p>
                        </div>
                        <div className="bg-[hsl(var(--card))] p-6 rounded-lg shadow-md text-center border border-[hsl(var(--border))] transform ">
                            <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                                <Image
                                    src="/team/andrea.jpg"
                                    alt="Tobias Ojeda"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Andrea Ríos</h3>
                            <p className="text-[hsl(var(--muted-foreground))] font-semibold mb-4">Proyectista</p>
                            <p className="text-sm text-[hsl(var(--foreground))]">Consultora de proyectos inmobiliarios, Proyectista para loteadoras privadas, experiencia en el sector público, parte de equipo de Plan de Ordenamiento Territorial C.O</p>
                        </div>

                        <div className="bg-[hsl(var(--card))] p-6 rounded-lg shadow-md text-center border border-[hsl(var(--border))] transform">
                            <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                                <Image
                                    src="/team/jose.jpg"
                                    alt="Tobias Ojeda"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Jose Ferreira</h3>
                            <p className="text-[hsl(var(--muted-foreground))] font-semibold mb-4">Programador</p>
                            <p className="text-sm text-[hsl(var(--foreground))]">Desarrollador Web FullStack, estudiante del 4to año de Ing. Informática en la UNI, con experiencia en el desarrollo e implementacion de aplicaciones web. Integrante del equipo ganador de la hackathon de PPY.</p>
                        </div>

                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-8">Contactos</h2>
                <div className="max-w-2xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-4">
                        <Link
                            href="https://wa.me/595987358233"
                            target="_blank"
                            className="flex items-center p-4 bg-[hsl(var(--background))] border border-[hsl(var(--border))] rounded-lg hover:bg-[hsl(var(--muted))] transition-all"
                        >
                            <MessageCircle className="w-6 h-6 mr-2 text-[hsl(var(--foreground))]" />
                            <div>
                                <p className="font-semibold text-[hsl(var(--foreground))]">WhatsApp</p>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">0987 358233</p>
                            </div>
                        </Link>

                        <Link
                            href="https://www.instagram.com/invierte_py?igsh=MTAzaTU0OWpsaXh3aw%3D%3D&utm_source=qr"
                            target="_blank"
                            className="flex items-center p-4 bg-[hsl(var(--background))] border border-[hsl(var(--border))] rounded-lg hover:bg-[hsl(var(--muted))] transition-all"
                        >
                            <Instagram className="w-6 h-6 mr-2 text-[hsl(var(--foreground))]" />
                            <div>
                                <p className="font-semibold text-[hsl(var(--foreground))]">Instagram</p>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">@invierte_py</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}