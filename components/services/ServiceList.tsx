import React from "react";
import { Lightbulb, Bell, Search, Building2 } from "lucide-react";
import ServiceCard from "./ServiceCard";

type ServicesProps = {
    title?: string; 
}

export default function Services({ title = "Nuestros Servicios" } : ServicesProps) {
	const services = [
		{
			icon: <Lightbulb size={28} />,
			title: "COMPRA VENTAS Y ARRIENDOS",
			description:
				"Nuestro valor agregado es asesorar, gestionar y acompañar a nuestros clientes en las distintas etapas de la compraventa, de manera personalizada y transparente. Nos motiva tener clientes satisfechos y felices en la experiencia final de este proceso.",
			buttonText: "SOLICITAR SERVICIO",
		},
		{
			icon: <Bell size={28} />,
			title: "SERVICIO LEGAL E INVERSIONES",
			description:
				"Nuestro Servicio Legal está conformado por abogados con más de 20 años de experiencia en el rubro inmobiliario, brindando un servicio integral a nuestros clientes en sus distintas necesidades.",
			buttonText: "SOLICITAR SERVICIO",
		},
		{
			icon: <Search size={28} />,
			title: "TASACIONES Y VALORIZACIONES",
			description:
				"Contamos con un partner, XS Arquitectura y Tasaciones, dedicado a la arquitectura y valoración en el mundo inmobiliario, quien con más de 15 años de experiencia laboral ha abarcado diversos trabajos de forma independiente y junto a equipo multidisciplinario de profesionales.",
			buttonText: "SOLICITAR SERVICIO",
		},
		{
			icon: <Building2 size={28} />,
			title: "SERVICIO DE ADMINISTRACIÓN DE CONDOMINIOS",
			description:
				"Alianza estratégica con LIHN ADMIN, quienes cuentan con una larga trayectoria en el mercado. Les ofrecemos el servicio de administración de Condominios de Casas y Departamentos.",
			buttonText: "SOLICITAR SERVICIO",
		},
	];

	return (
		<section className="py-16 px-4 bg-zinc-50 dark:bg-zinc-950">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
						{ title }
					</h2>
					<div className="w-24 h-1 bg-zinc-400 dark:bg-zinc-600 mx-auto rounded-full"></div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{services.map((service, index) => (
						<ServiceCard
							key={index}
							icon={service.icon}
							title={service.title}
							description={service.description}
							buttonText={service.buttonText}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
