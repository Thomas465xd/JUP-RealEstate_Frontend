"use client";
import React from "react";
import { ArrowRight, Home, Users, TrendingUp } from "lucide-react";

const CallToAction: React.FC = () => {
	const handleContactClick = () => {
		// This would navigate to your contact form
		console.log("Navigate to contact form");
	};

	return (
		<section className="py-20 bg-zinc-900 dark:bg-zinc-900 transition-colors duration-300">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
					{/* Content Side */}
					<div className="order-2 lg:order-1">
						<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
							Tu casa en Sueños
						</h2>

						<div className="space-y-6 text-zinc-300 text-lg leading-relaxed mb-8">
							<p>
								Encuentra la propiedad perfecta con nuestro
								equipo de expertos. Ofrecemos un servicio
								personalizado y profesional para hacer realidad
								tus sueños inmobiliarios.
							</p>

							<p>
								Desde apartamentos modernos hasta casas
								familiares, tenemos la experiencia y las
								conexiones para encontrar exactamente lo que
								buscas en las mejores ubicaciones.
							</p>
						</div>

						{/* Stats */}
						<div className="grid grid-cols-3 gap-6 mb-10">
							<div className="text-center">
								<div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-2 mx-auto">
									<Home className="w-6 h-6 text-white" />
								</div>
								<div className="text-2xl font-bold text-white">
									500+
								</div>
								<div className="text-sm text-zinc-400">
									Propiedades
								</div>
							</div>

							<div className="text-center">
								<div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-2 mx-auto">
									<Users className="w-6 h-6 text-white" />
								</div>
								<div className="text-2xl font-bold text-white">
									1200+
								</div>
								<div className="text-sm text-zinc-400">
									Clientes Felices
								</div>
							</div>

							<div className="text-center">
								<div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-2 mx-auto">
									<TrendingUp className="w-6 h-6 text-white" />
								</div>
								<div className="text-2xl font-bold text-white">
									98%
								</div>
								<div className="text-sm text-zinc-400">
									Satisfacción
								</div>
							</div>
						</div>

						{/* CTA Button */}
						<button
							onClick={handleContactClick}
							className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900 flex items-center gap-3"
						>
							Contáctanos ahora
							<ArrowRight className="w-5 h-5 group-hover:tranzinc-x-1 transition-transform duration-300" />
						</button>
					</div>

					{/* Images Collage Side */}
					<div className="order-1 lg:order-2 relative">
						{/* Main large image */}
						<div className="relative">
							<div className="rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
								<img
									src="https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
									alt="Modern living room"
									className="w-full h-80 md:h-96 object-cover"
								/>
							</div>

							{/* Floating card on main image */}
							<div className="absolute -bottom-6 -left-6 bg-white dark:bg-zinc-800 rounded-xl p-4 shadow-xl">
								<div className="flex items-center gap-3">
									<div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
										<Home className="w-6 h-6 text-white" />
									</div>
									<div>
										<div className="font-semibold text-zinc-900 dark:text-white">
											Premium Properties
										</div>
										<div className="text-sm text-zinc-600 dark:text-zinc-400">
											Available Now
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Secondary images */}
						<div className="grid grid-cols-2 gap-4 mt-8">
							{/* Kitchen image */}
							<div className="rounded-xl overflow-hidden shadow-lg transform -rotate-1 hover:rotate-0 transition-transform duration-500">
								<img
									src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop&crop=center"
									alt="Modern kitchen"
									className="w-full h-40 object-cover"
								/>
							</div>

							{/* Bedroom image */}
							<div className="rounded-xl overflow-hidden shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-500">
								<img
									src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
									alt="Elegant bedroom"
									className="w-full h-40 object-cover"
								/>
							</div>
						</div>

						{/* Small floating elements */}
						<div className="absolute top-4 right-4 w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
						<div className="absolute bottom-20 right-8 w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-1000"></div>

						{/* Bathroom image - positioned absolutely for overlap effect */}
						<div className="absolute -bottom-8 right-0 w-32 h-24 rounded-lg overflow-hidden shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
							<img
								src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=200&h=150&fit=crop&crop=center"
								alt="Luxury bathroom"
								className="w-full h-full object-cover"
							/>
						</div>
					</div>
				</div>

				{/* Bottom decorative elements */}
				<div className="mt-16 text-center">
					<div className="inline-flex items-center gap-2 text-zinc-500 text-sm">
						<div className="w-8 h-px bg-zinc-600"></div>
						<span>Trusted by hundreds of families</span>
						<div className="w-8 h-px bg-zinc-600"></div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CallToAction;
