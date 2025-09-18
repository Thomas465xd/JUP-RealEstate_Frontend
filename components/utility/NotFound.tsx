"use client";
import React from "react";
import { Home, Search, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import BgImage from "@/public/hero-image-1.jpg"; // now it's a static import
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

	return (
		<div
			className={`bg-white dark:bg-zinc-900 transition-colors duration-300`}
		>
			{/* Background Pattern */}
			<div className="relative overflow-hidden">
				<div className="absolute inset-0 opacity-5 dark:opacity-10">
					<div className="absolute inset-0 bg-gradient-to-br from-zinc-600 via-zinc-700 to-zinc-800"></div>
					<Image
                        src={BgImage}
                        alt="Hero background"
                        fill
                        priority
                        className="object-cover"
                    />
				</div>

				{/* Content */}
				<div className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
					<div className="max-w-2xl mx-auto text-center">
						{/* 404 Number */}
						<div className="mb-8">
							<h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold bg-gradient-to-br from-zinc-600 via-zinc-700 to-zinc-800 dark:from-zinc-400 dark:via-zinc-300 dark:to-zinc-200 bg-clip-text text-transparent leading-none">
								404
							</h1>
							<div className="h-1 w-24 bg-gradient-to-r from-zinc-600 to-zinc-800 dark:from-zinc-400 dark:to-zinc-200 mx-auto rounded-full mt-4"></div>
						</div>

						{/* Building Icon */}
						<div className="mb-8 flex justify-center">
							<div className="relative">
								<div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 rounded-2xl flex items-center justify-center shadow-lg dark:shadow-zinc-900/20">
									<Search className="w-8 h-8 sm:w-10 sm:h-10 text-zinc-600 dark:text-zinc-400" />
								</div>
								<div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
									<span className="text-white text-xs font-bold">
										!
									</span>
								</div>
							</div>
						</div>

						{/* Title & Description */}
						<div className="mb-8 space-y-4">
							<h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
								Propiedad No Encontrada
							</h2>
							<p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto">
								Lo sentimos, la página que buscas no existe o ha
								sido movida. Te ayudamos a encontrar tu hogar
								ideal.
							</p>
						</div>

						{/* Action Buttons */}
						<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
							<button
								onClick={() => router.push("/")}
								className="group relative inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-zinc-700 to-zinc-800 dark:from-zinc-600 dark:to-zinc-700 rounded-lg hover:from-zinc-800 hover:to-zinc-900 dark:hover:from-zinc-700 dark:hover:to-zinc-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
							>
								<Home className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
								Ir al Inicio
							</button>

							<button
								onClick={() => router.back()}
								className="group inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
							>
								<ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
								Volver Atrás
							</button>
						</div>

						{/* Popular Sections */}
						<div className="mt-10 p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl backdrop-blur-sm">
							<h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
								Secciones Populares
							</h3>
							<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
								<Link
									href="/home/properties"
									className="group p-3 bg-white dark:bg-zinc-700/50 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-600/50 transition-colors duration-200 shadow-sm hover:shadow-md"
								>
									<div className="text-zinc-700 dark:text-zinc-300 font-medium group-hover:text-zinc-800 dark:group-hover:text-zinc-200 text-sm">
										Ver Propiedades
									</div>
									<div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
										Explora nuestro catálogo
									</div>
								</Link>

								<Link
									href="/home/buy"
									className="group p-3 bg-white dark:bg-zinc-700/50 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-600/50 transition-colors duration-200 shadow-sm hover:shadow-md"
								>
									<div className="text-zinc-700 dark:text-zinc-300 font-medium group-hover:text-zinc-800 dark:group-hover:text-zinc-200 text-sm">
										Comprar
									</div>
									<div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
										Encuentra tu hogar
									</div>
								</Link>

								<Link
									href="/home/contact"
									className="group p-3 bg-white dark:bg-zinc-700/50 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-600/50 transition-colors duration-200 shadow-sm hover:shadow-md"
								>
									<div className="text-zinc-700 dark:text-zinc-300 font-medium group-hover:text-zinc-800 dark:group-hover:text-zinc-200 text-sm">
										Contacto
									</div>
									<div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
										Hablemos
									</div>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
