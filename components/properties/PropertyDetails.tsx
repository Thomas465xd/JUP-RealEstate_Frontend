"use client";
import { getPropertyById } from "@/src/api/PropertyAPI";
import { useQuery } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";
import Loader from "../utility/Loader";
import { Property } from "@/src/types";
import { Bath, Bed, Building2, Car, ChevronLeft, ChevronRight, Heart, Home, Mail, MapPin, MessageSquare, Phone, Ruler } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import LogoImage from "@/public/logo-blanco.png"; // now it's a static import

type PropertyDetailsProps = {
	propertyId: string;
};

// Property type icons mapping
const getPropertyIcon = (type: Property["type"]) => {
	const propertyType = type.toLowerCase();
	if (propertyType === "casa" || propertyType === "house")
		return <Home className="w-5 h-5" />;
	if (propertyType === "departamento" || propertyType === "apartment")
		return <Building2 className="w-5 h-5" />;
	return <Home className="w-5 h-5" />;
};

// Property type labels
const getPropertyTypeLabel = (type: Property["type"]): string => {
	const labelMap: Record<Property["type"], string> = {
		casa: "Casa",
		house: "Casa",
		departamento: "Departamento",
		apartment: "Departamento",
		parcela: "Parcela",
		land: "Parcela",
		sitio: "Sitio",
		oficina: "Oficina",
		office: "Oficina",
		comercial: "Comercial",
		commercial: "Comercial",
	};
	return labelMap[type] || "Propiedad";
};

// Status color mapping
const getStatusColor = (status: Property["status"]): string => {
	const statusLower = status.toLowerCase();
	if (statusLower === "disponible" || statusLower === "available")
		return "bg-green-500 dark:bg-green-600";
	if (statusLower === "vendida" || statusLower === "sold") 
		return "bg-red-500 dark:bg-red-600";
	if (statusLower === "pendiente" || statusLower === "pending")
		return "bg-yellow-500 dark:bg-yellow-600";
	return "bg-zinc-500 dark:bg-zinc-600";
};

// Status label mapping
const getStatusLabel = (status: Property["status"]): string => {
	const statusLower = status.toLowerCase();
	if (statusLower === "disponible" || statusLower === "available")
		return "Disponible";
	if (statusLower === "vendida" || statusLower === "sold") 
		return "Vendida";
	if (statusLower === "pendiente" || statusLower === "pending") 
		return "Pendiente";
	return status;
};

// Format price helper
const formatPrice = (price: number): string => {
	return new Intl.NumberFormat("es-CL").format(price);
};

export default function PropertyDetails({ propertyId }: PropertyDetailsProps) {
    const router = useRouter();

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);

	const { data, isLoading, isError } = useQuery({
		queryKey: ["properties", propertyId],
		queryFn: () => getPropertyById(propertyId),
		retry: false,
	});

	const property: Property | undefined = data?.property;

	if (isError) return redirect("/404");
	if (isLoading) return <Loader />;
	if (!property) return redirect("/404");

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % property.imageUrls.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => 
            prev === 0 ? property.imageUrls.length - 1 : prev - 1
        );
    };

	const contactMessage = `Hola, me interesa la propiedad "${property.title}" ubicada en ${property.address}, ${property.cityArea}. ¿Podrían darme más información?`;

	return (
		<div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 py-8">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Back button */}
				<button
					onClick={() => {
                        if (document.referrer.includes("/properties")) {
                            router.back();
                        } else {
                            router.push("/properties");
                        }
                    }}
					className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
				>
					<ChevronLeft className="w-5 h-5 mr-1" />
					Volver
				</button>

				<div className="flex flex-col lg:flex-row gap-6">
					{/* Image carousel and description - Left side */}
					<div className="lg:w-2/3 bg-white dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
						{/* Image Carousel */}
						<div className="relative h-96 lg:h-[600px] bg-zinc-200 dark:bg-zinc-700">
							<Image
								src={property.imageUrls[currentImageIndex]}
								alt={`${property.title} - Imagen ${currentImageIndex + 1}`}
								fill
								className="object-cover"
								priority={currentImageIndex === 0}
							/>

							{/* Status badge */}
							<div
								className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-medium ${getStatusColor(property.status)}`}
							>
								{getStatusLabel(property.status)}
							</div>

							{/* Operation badge */}
							<div className="absolute top-4 right-16 px-3 py-1 rounded-full bg-blue-600 dark:bg-blue-700 text-white text-sm font-medium">
								{property.operation}
							</div>

							{/* Favorite button */}
							<button
								onClick={() => setIsFavorite(!isFavorite)}
								className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
									isFavorite
										? "bg-red-500 text-white"
										: "bg-white/80 dark:bg-zinc-800/80 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-zinc-800"
								}`}
							>
								<Heart
									className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
								/>
							</button>

							{/* Navigation arrows */}
							{property.imageUrls.length > 1 && (
								<>
									<button
										onClick={prevImage}
										className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-zinc-800/80 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-zinc-800 transition-colors"
									>
										<ChevronLeft className="w-6 h-6" />
									</button>
									<button
										onClick={nextImage}
										className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-zinc-800/80 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-zinc-800 transition-colors"
									>
										<ChevronRight className="w-6 h-6" />
									</button>
								</>
							)}

							{/* Image indicators */}
							<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
								{property.imageUrls.map((_, index) => (
									<button
										key={index}
										onClick={() => setCurrentImageIndex(index)}
										className={`w-3 h-3 rounded-full transition-colors ${
											index === currentImageIndex
												? "bg-white"
												: "bg-white/50"
										}`}
										aria-label={`Ver imagen ${index + 1}`}
									/>
								))}
							</div>
						</div>

						{/* Image thumbnails */}
						<div className="p-4 grid grid-cols-6 gap-2 max-h-32 overflow-hidden">
							{property.imageUrls
								.slice(0, 6)
								.map((url, index) => (
									<button
										key={index}
										onClick={() => setCurrentImageIndex(index)}
										className={`relative h-16 rounded-lg overflow-hidden border-2 transition-all ${
											index === currentImageIndex
												? "border-blue-500 dark:border-blue-400 scale-105"
												: "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
										}`}
										aria-label={`Seleccionar imagen ${index + 1}`}
									>
										<Image
											src={url}
											alt={`Thumbnail ${index + 1}`}
											fill
											className="object-cover"
										/>
									</button>
								))}
						</div>

						{/* Description */}
						<div className="p-6">
							<h3 className="text-xl font-bold text-gray-900 dark:text-white">
								Descripción
							</h3>
                            <div className="border border-zinc-600 dark:border-zinc-600 mb-4 rounded max-w-42"></div>
							<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
								{property.description}
							</p>
						</div>
					</div>

					{/* Property info - Right side */}
					<div className="lg:w-1/3 bg-zinc-800 dark:bg-zinc-900 text-white p-6 rounded-lg shadow-lg">
						{/* Property type and title */}
						<div className="flex items-center text-blue-400 dark:text-blue-300 mb-2">
							{getPropertyIcon(property.type)}
							<span className="ml-2 text-sm">
								{getPropertyTypeLabel(property.type)}
							</span>
						</div>

						<h1 className="text-2xl font-bold mb-2">
							{property.title}
						</h1>

						{/* Location */}
						<div className="flex items-center text-gray-300 dark:text-gray-400 mb-6">
							<MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
							<span className="text-sm">
								{property.cityArea}, {property.region}
							</span>
						</div>

						{/* Price */}
						<div className="mb-6">
							<p className="text-gray-400 dark:text-gray-500 text-sm">
								Precio
							</p>
							<p className="text-3xl font-bold text-blue-400 dark:text-blue-300">
								{formatPrice(property.price)} UF
							</p>
						</div>

						{/* Property details */}
						<div className="grid grid-cols-2 gap-4 mb-6">
							<div className="flex items-center">
								<Bed className="w-5 h-5 mr-2 text-gray-400 dark:text-gray-500 flex-shrink-0" />
								<span>
									{property.dorms} dorm{property.dorms !== 1 ? "s" : ""}
								</span>
							</div>
							<div className="flex items-center">
								<Bath className="w-5 h-5 mr-2 text-gray-400 dark:text-gray-500 flex-shrink-0" />
								<span>
									{property.bathrooms} baño{property.bathrooms !== 1 ? "s" : ""}
								</span>
							</div>
							<div className="flex items-center">
								<Car className="w-5 h-5 mr-2 text-gray-400 dark:text-gray-500 flex-shrink-0" />
								<span>
									{property.parkingSpaces} est.
								</span>
							</div>
							<div className="flex items-center">
								<Ruler className="w-5 h-5 mr-2 text-gray-400 dark:text-gray-500 flex-shrink-0" />
								<span>
									{formatPrice(property.area)} m²
								</span>
							</div>
						</div>

						{/* Address */}
						<div className="mb-6 p-4 bg-zinc-700 dark:bg-zinc-800 rounded-lg">
							<h4 className="font-semibold mb-2">
								Dirección
							</h4>
							<p className="text-gray-300 dark:text-gray-400 text-sm">
								{property.address}
							</p>
							<p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
								{property.cityArea}, {property.region}
							</p>
							{property.condo && (
								<span className="inline-block mt-2 px-2 py-1 bg-blue-600 dark:bg-blue-700 text-xs rounded">
									Condominio
								</span>
							)}
						</div>

						{/* Contact section */}
						<div className="space-y-3">
							<h4 className="font-semibold mb-3">
								Consultar por esta propiedad
							</h4>

							<Link
								href={`/home/contact?property=${encodeURIComponent(
									property.title
								)}&message=${encodeURIComponent(contactMessage)}`}
								className="w-full button-blue-gradient flex-center py-4"
							>
								<MessageSquare className="w-5 h-5 mr-2" />
								Enviar Consulta
							</Link>

							<a
								href="tel:+56982192688"
								className="w-full button-green-gradient flex-center"
							>
								<Phone className="w-5 h-5 mr-2" />
								Llamar Ahora
							</a>

							<a
								href="mailto:contact@jup.cl"
								className="w-full button-zinc-gradient flex-center"
							>
								<Mail className="w-5 h-5 mr-2" />
								Enviar Email
							</a>
						</div>

						{/* Agent info */}
						<div className="mt-6 p-4 bg-zinc-700 dark:bg-zinc-800 rounded-lg text-center">
							<div className="p-1 w-16 h-16 bg-zinc-800 dark:bg-zinc-900 rounded-full mx-auto mb-3 flex items-center justify-center">
                                <Image
                                    src={LogoImage}
                                    alt="Company Logo"
                                    width={160}       // base size for large screens
                                    height={160}      // keep aspect ratio
                                    priority
                                    className="object-contain h-auto w-auto"
                                    placeholder="empty"
                                    sizes="(max-width: 640px) 100px, (max-width: 1024px) 120px, 160px"
                                />
							</div>
							<h5 className="font-semibold">
								Javiera Urbina Propiedades
							</h5>
							<p className="text-gray-400 dark:text-gray-500 text-sm">
								Agente Inmobiliario
							</p>
							<p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
								+56 9 8219 2688
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}