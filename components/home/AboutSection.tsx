"use client";
import React from "react";
import { ArrowRight, Award, Users, MapPin, TrendingUp } from "lucide-react";
import Link from "next/link";

const AboutSection: React.FC = () => {
	const stats = [
		{
			icon: Award,
			value: "15+",
			label: "Años de Experiencia",
			color: "text-blue-600 dark:text-blue-400",
		},
		{
			icon: Users,
			value: "1200+",
			label: "Clientes Satisfechos",
			color: "text-emerald-600 dark:text-emerald-400",
		},
		{
			icon: MapPin,
			value: "500+",
			label: "Propiedades Vendidas",
			color: "text-purple-600 dark:text-purple-400",
		},
		{
			icon: TrendingUp,
			value: "98%",
			label: "Tasa de Éxito",
			color: "text-orange-600 dark:text-orange-400",
		},
	];

	return (
		<section className="pb-20 pt-10 bg-white dark:bg-zinc-900 transition-colors duration-300">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
					{/* Content Side */}
					<div>
						{/* Section Label */}
						<div className="inline-flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 rounded-full px-4 py-2 mb-6">
							<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
							<span className="text-sm font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">
								Sobre Nosotros
							</span>
						</div>

						{/* Heading */}
						<h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 leading-tight">
							Expertos en hacer realidad{" "}
							<span className="text-blue-600 dark:text-blue-400">
								tus sueños
							</span>{" "}
							inmobiliarios
						</h2>

						{/* Description */}
						<div className="space-y-4 text-zinc-600 dark:text-zinc-300 text-lg leading-relaxed mb-8">
							<p>
								En Javiera Urbina & Asociados, transformamos la
								búsqueda de propiedades en una experiencia
								excepcional. Nuestro equipo de profesionales
								altamente calificados combina conocimiento del
								mercado local con un servicio personalizado.
							</p>

							<p>
								Desde apartamentos modernos en el corazón de
								Santiago hasta casas familiares en los mejores
								barrios, te acompañamos en cada paso del proceso
								para encontrar la propiedad perfecta que se
								adapte a tu estilo de vida y presupuesto.
							</p>
						</div>

						{/* Key Points */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
							<div className="flex items-start gap-3">
								<div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
									<div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
								</div>
								<div>
									<h4 className="font-semibold text-zinc-900 dark:text-white mb-1">
										Asesoría Personalizada
									</h4>
									<p className="text-sm text-zinc-600 dark:text-zinc-400">
										Cada cliente recibe atención única y
										dedicada
									</p>
								</div>
							</div>

							<div className="flex items-start gap-3">
								<div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
									<div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
								</div>
								<div>
									<h4 className="font-semibold text-zinc-900 dark:text-white mb-1">
										Tecnología Avanzada
									</h4>
									<p className="text-sm text-zinc-600 dark:text-zinc-400">
										Herramientas innovadoras para mejor
										experiencia
									</p>
								</div>
							</div>

							<div className="flex items-start gap-3">
								<div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
									<div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
								</div>
								<div>
									<h4 className="font-semibold text-zinc-900 dark:text-white mb-1">
										Red de Contactos
									</h4>
									<p className="text-sm text-zinc-600 dark:text-zinc-400">
										Conexiones exclusivas en el mercado
										inmobiliario
									</p>
								</div>
							</div>

							<div className="flex items-start gap-3">
								<div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
									<div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
								</div>
								<div>
									<h4 className="font-semibold text-zinc-900 dark:text-white mb-1">
										Soporte Completo
									</h4>
									<p className="text-sm text-zinc-600 dark:text-zinc-400">
										Te acompañamos desde la búsqueda hasta
										la escritura
									</p>
								</div>
							</div>
						</div>

						{/* CTA Button */}
						<Link
                            href={"/home/about"}
							className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						>
							Conoce más sobre nosotros
							<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
						</Link>
					</div>

					{/* Image Side */}
					<div className="relative">
						{/* Background Decorations */}
						<div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-3xl transform rotate-2"></div>
						<div className="absolute inset-2 bg-gradient-to-tr from-emerald-50 to-blue-50 dark:from-emerald-900/10 dark:to-blue-900/10 rounded-3xl transform -rotate-1"></div>

						{/* Main Image */}
						<div className="relative overflow-hidden rounded-3xl shadow-2xl">
							<img
								src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=700&fit=crop&crop=center"
								alt="Equipo profesional de Javiera Urbina & Asociados"
								className="w-full h-96 lg:h-[500px] object-cover transition-transform duration-700 hover:scale-105"
							/>

							{/* Overlay Gradient */}
							<div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

							{/* Floating Stats Card */}
							<div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-zinc-800/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
								<div className="grid grid-cols-3 gap-4 text-center">
									<div>
										<div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
											12+
										</div>
										<div className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
											Años
										</div>
									</div>
									<div>
										<div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
											100+
										</div>
										<div className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
											Clientes
										</div>
									</div>
									<div>
										<div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
											90%
										</div>
										<div className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
											Éxito
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Floating Badge */}
						<div className="absolute -top-4 -left-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
							<div className="flex items-center gap-2">
								<Award className="w-4 h-4" />
								<span className="text-sm font-semibold">
									Líderes del Mercado
								</span>
							</div>
						</div>

						{/* Floating Elements */}
						<div className="absolute -top-2 -right-2 w-16 h-16 bg-blue-500/10 dark:bg-blue-400/10 rounded-full animate-pulse"></div>
						<div className="absolute -bottom-4 -right-8 w-12 h-12 bg-purple-500/10 dark:bg-purple-400/10 rounded-full animate-pulse delay-1000"></div>
						<div className="absolute top-1/3 -left-3 w-6 h-6 bg-emerald-500/20 dark:bg-emerald-400/20 rounded-full animate-bounce delay-500"></div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutSection;
