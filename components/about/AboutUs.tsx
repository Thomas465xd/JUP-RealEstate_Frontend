"use client";
import React from "react";
import {
	ArrowRight,
	Award,
	Users,
	MapPin,
	TrendingUp,
	Heart,
	Target,
	Phone,
	Quote,
	HeartHandshake,
	Star,
	House,
} from "lucide-react";
import FounderCard from "./FounderCard";
import Link from "next/link";

// TODO: Use actual info
const founders = [
	{
		name: "Javiera Urbina",
		role: "Fundadora & CEO",
		image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
		description:
			"Socia Cofundadora de Javiera Urbina & Asociados, con más de 20 años en hospitalidad, aplico mi experiencia en atención personalizada y gestión para facilitar adquisiciones inmobiliarias con cercanía y confianza.",
		experience: "20+ años de experiencia",
		specialties: [
			"Desarrollo Comercial",
			"Fotografía Inmobiliaria",
			"Branding",
		],
	},
	{
		name: "Francisco Fernández",
		role: "Director de Ventas",
		image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
		description:
			"Socio Cofundador de Javiera Urbina & Asociados, con amplia experiencia en gestión comercial y liderazgo en isapres. Aporto habilidades en negociación y visión estratégica para ofrecer asesoría inmobiliaria cercana, profesional y de largo plazo.",
		experience: "12+ años de experiencia",
		specialties: [
			"Propiedades Premium",
			"Negociación",
			"Análisis de Mercado",
		],
	},
	{
		name: "Iñigo Del Campo",
		role: "Desarrollador",
		image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
		description:
			"Apasionado Desarrollador Web Full Stack, especializado en crear aplicaciones robustas y escalables bajo las mejores prácticas de desarrollo. Combino experiencia en front-end y back-end para ofrecer soluciones de calidad que satisfacen tanto las necesidades de los usuarios como los objetivos del negocio.",
		experience: "3+ años de experiencia",
		specialties: [
			"Desarrollo Full Stack",
			"Infraestructuras Resilientes",
			"Administración de sitios",
		],
	},
];

const stats = [
	{
		icon: Award,
		value: "12+",
		label: "Años de Experiencia",
		color: "text-blue-600 dark:text-blue-400",
	},
	{
		icon: Users,
		value: "100+",
		label: "Clientes Satisfechos",
		color: "text-pink-600 dark:text-pink-400",
	},
	{
		icon: MapPin,
		value: "30+",
		label: "Propiedades Vendidas",
		color: "text-purple-600 dark:text-purple-400",
	},
	{
		icon: TrendingUp,
		value: "90%",
		label: "Tasa de Éxito",
		color: "text-orange-600 dark:text-orange-400",
	},
];

export default function AboutUs() {
	return (
		<div className="min-h-screen bg-white dark:bg-zinc-900 transition-colors duration-300">
			{/* Hero Section */}
			<section className="relative pt-20 pb-16 overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/20 dark:via-zinc-900 dark:to-purple-950/20"></div>
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/5 dark:bg-blue-400/5 rounded-full blur-3xl"></div>

				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<div className="inline-flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 rounded-full px-4 py-2 mb-6">
							<Heart className="w-4 h-4 text-blue-500" />
							<span className="text-sm font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">
								Nuestra Historia
							</span>
						</div>

						<h1 className="text-5xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-6 leading-tight">
							Conoce el equipo detrás de{" "}
							<span className="text-blue-600 dark:text-blue-400">
								tu nuevo hogar
							</span>
						</h1>

						<p className="text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed">
							Somos más que una inmobiliaria. Somos arquitectos de
							sueños, constructores de futuros y compañeros de
							viaje en una de las decisiones más importantes de tu
							vida.
						</p>
					</div>

					{/* Stats Grid */}
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
						{stats.map((stat, index) => (
							<div
								key={index}
								className="group bg-white dark:bg-zinc-800 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-200 dark:border-zinc-700"
							>
								<div className="inline-flex items-center justify-center w-12 h-12 bg-zinc-100 dark:bg-zinc-700 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
									<stat.icon
										className={`w-6 h-6 ${stat.color}`}
									/>
								</div>
								<div
									className={`text-3xl font-bold mb-2 ${stat.color}`}
								>
									{stat.value}
								</div>
								<div className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
									{stat.label}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Founders Section */}
			<section className="py-20 bg-zinc-50 dark:bg-zinc-800/50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 rounded-full px-4 py-2 mb-6">
							<Users className="w-4 h-4 text-blue-500 dark:text-blue-400" />
							<span className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
								Nuestro Equipo
							</span>
						</div>

						<h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
							Los fundadores que hacen{" "}
							<span className="text-blue-600 dark:text-blue-400">
								la diferencia
							</span>
						</h2>

						<p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
							Conoce a los profesionales apasionados que han
							dedicado sus carreras a revolucionar la experiencia
							inmobiliaria en Chile.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
						{founders.map((founder, index) => (
							<FounderCard key={index} {...founder} />
						))}
					</div>
				</div>
			</section>

			{/* Mission Section */}
			<section className="py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
						<div className="relative">
							<div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-3xl transform rotate-3"></div>
							<div className="relative bg-white dark:bg-zinc-800 rounded-3xl p-10 shadow-2xl border border-zinc-200 dark:border-zinc-700">
								<div className="absolute -top-4 -left-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-xl shadow-lg">
									<Target className="w-6 h-6" />
								</div>

								<div className="mb-6">
									<Quote className="w-12 h-12 text-blue-500 dark:text-blue-400 mb-4" />
									<h3 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
										Nuestra Misión
									</h3>
									<p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
										Acompañamos cada paso de compra, venta o arriendo, 
                                        brindando confianza y alternativas informadas. 
                                        Con servicio boutique y cuidado dedicado, transformamos 
                                        cada propiedad en un espacio que inspira recuerdos y futuros significativos.
									</p>
								</div>

								<div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">
                                                Análisis de mercado especializado
                                            </h4>
                                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                                Utilizamos la tecnología más
											    avanzada para descubrir tendencias del momento.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">
                                                Servicio personalizado
                                            </h4>
                                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                                Cada cliente recibe atención única
                                                adaptada a sus necesidades
                                                específicas.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">
                                                Transparencia total
                                            </h4>
                                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                                Comunicación clara y honesta en cada
											    etapa del proceso.
                                            </p>
                                        </div>
                                    </div>
								</div>
							</div>
						</div>

						<div>
							<div className="inline-flex items-center gap-2 bg-pink-100 dark:bg-pink-900/30 rounded-full px-4 py-2 mb-6">
								<Heart className="w-4 h-4 text-pink-500 dark:text-pink-400" />
								<span className="text-sm font-bold text-pink-600 dark:text-pink-400 uppercase tracking-wide">
									Nuestros Valores
								</span>
							</div>

							<h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
								Lo que nos{" "}
								<span className="text-pink-600 dark:text-pink-400">
									define
								</span>
							</h2>

							<p className="text-lg text-zinc-600 dark:text-zinc-300 mb-8 leading-relaxed">
								Nuestros valores son los principios que guían cada decisión 
                                y cada interacción que tenemos contigo.
							</p>

							<div className="space-y-6">
								<div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-lg border border-zinc-200 dark:border-zinc-700">
									<h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 flex-align">
										<House /> Pasión por los Hogares
									</h4>
									<p className="text-zinc-600 dark:text-zinc-300">
										Entendemos que no vendemos propiedades,
										creamos hogares donde florecerán
										historias familiares y se construirán
										futuros.
									</p>
								</div>

								<div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-lg border border-zinc-200 dark:border-zinc-700">
									<h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 flex-align">
										<HeartHandshake /> Confianza Mutua
									</h4>
									<p className="text-zinc-600 dark:text-zinc-300">
										La confianza es el fundamento de toda
										relación exitosa. La ganamos día a día
										con acciones, no con promesas.
									</p>
								</div>

								<div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-lg border border-zinc-200 dark:border-zinc-700">
									<h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 flex-align">
										<Star /> Excelencia Sin Compromiso
									</h4>
									<p className="text-zinc-600 dark:text-zinc-300">
										No nos conformamos con lo suficiente.
										Buscamos la excelencia en cada detalle,
										por pequeño que parezca.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Invitation Section */}
			<section className="py-20 bg-gradient-to-br from-indigo-500 via-blue-600 to-violet-600 relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20"></div>
				<div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
				<div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-300/10 rounded-full blur-2xl"></div>

				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
							¿Listo para encontrar tu{" "}
							<span className="text-blue-100">
								hogar perfecto
							</span>
							?
						</h2>
						<p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
							No esperes más para dar el paso más importante.
							Nuestro equipo está aquí para acompañarte en cada
							momento de este emocionante viaje.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
						<div className="text-center">
							<div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 mb-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
								<Phone className="w-8 h-8 text-white mx-auto mb-3" />
								<h3 className="text-xl font-bold text-white mb-2">
									Llamada Gratuita
								</h3>
								<p className="text-white/80 text-sm">
									Programa una consulta sin compromiso
								</p>
							</div>
						</div>

						<div className="text-center">
							<div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 mb-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
								<MapPin className="w-8 h-8 text-white mx-auto mb-3" />
								<h3 className="text-xl font-bold text-white mb-2">
									Visita Personalizada
								</h3>
								<p className="text-white/80 text-sm">
									Recorridos adaptados a tus necesidades
								</p>
							</div>
						</div>

						<div className="text-center">
							<div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 mb-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
								<Award className="w-8 h-8 text-white mx-auto mb-3" />
								<h3 className="text-xl font-bold text-white mb-2">
									Asesoría Experta
								</h3>
								<p className="text-white/80 text-sm">
									Guía profesional en cada decisión
								</p>
							</div>
						</div>
					</div>

					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
						<Link
                            href="/home/contact" 
                            className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
                        >
							Contactar Ahora
							<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
						</Link>

						<Link
                            href="/home/properties"
                            className="group bg-transparent border-2 border-white/50 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 hover:border-white transition-all duration-300 transform hover:scale-105"
                        >
							Ver Propiedades
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}
