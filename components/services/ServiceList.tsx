import React from "react";
import { Lightbulb, Bell, Search, Building2 } from "lucide-react";
import ServiceCard from "./ServiceCard";

type ServicesProps = {
    title?: string; 
    darker?: boolean;
}

export default function Services({ title = "Nuestros Servicios", darker = true } : ServicesProps) {
    const services = [
        {
            icon: <Lightbulb size={28} />,
            title: "COMPRA, VENTA Y ARRIENDO",
            description:
            "Te acompañamos en cada paso del proceso de compra, venta o arriendo, entregando asesoría profesional, atención cercana y soluciones a medida. Ya sea que busques tu hogar ideal o quieras maximizar tu inversión, estamos aquí para hacerlo realidad de forma sencilla, confiable y segura.",
            buttonText: "SOLICITAR SERVICIO",
        },
        {
            icon: <Bell size={28} />,
            title: "ASESORÍA LEGAL",
            description:
            "Te brindamos asesoría legal completa y confiable en cada etapa de tu proyecto. Revisamos y formalizamos todos los documentos necesarios, garantizando transparencia, seguridad y cumplimiento normativo. Nuestro objetivo es que tomes decisiones informadas y tranquilas, sin preocupaciones ni riesgos innecesarios.",
            buttonText: "SOLICITAR SERVICIO",
        },
        {
            icon: <Search size={28} />,
            title: "TASACIONES Y VALORIZACIONES",
            description:
            "Trabajamos junto a arquitectos y profesionales especializados para entregar tasaciones precisas y confiables. Evaluamos cada propiedad con criterios técnicos y realistas, respaldando tus decisiones de inversión. Así obtienes claridad en el valor de tu inmueble y tranquilidad en cada paso del proceso.",
            buttonText: "SOLICITAR SERVICIO",
        },
        {
            icon: <Building2 size={28} />,
            title: "REFACCIONES, PINTURA Y ASEO",
            description:
            "Disponemos de un equipo externo especializado en refacciones, pintura y aseo profundo. Nos preocupamos por mantener tu propiedad en óptimas condiciones, aumentando su valor y atractivo. Ya sea para uso personal o para preparar una venta o arriendo, garantizamos calidad, confianza y un resultado impecable.",
            buttonText: "SOLICITAR SERVICIO",
        },
    ];

	return (
		<section className={`py-16 px-4 bg-zinc-50 ${darker ? "dark:bg-zinc-950" : "dark:bg-zinc-900/50"}`}>
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
