import React, { useState } from "react";
import {
	Bed,
	Bath,
	Car,
	Maximize,
	MapPin,
	Heart,
	Share2,
	ChevronLeft,
	ChevronRight,
	Building,
	Home,
	TreePine,
	Square,
	Briefcase,
	Store,
} from "lucide-react";
import { Property } from "@/src/types";
import { formatUF } from "@/src/utils/price";
import { redirect } from "next/navigation";
import { copyToClipboard } from "@/src/utils/copy";
import Image from "next/image";
import { capitalizeFirstLetter } from "@/src/utils/text";

// Props
type PropertyCardProps = {
    property: Property;
    isFeatured?: Boolean;
}

export default function PropertyCard({ property, isFeatured = false  } : PropertyCardProps) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isLiked, setIsLiked] = useState(false);

	const getPropertyIcon = (type: string): React.ReactElement => {
        const iconMap: { [key: string]: React.ElementType } = {
            casa: Home,
            house: Home,
            departamento: Building,
            apartment: Building,
            parcela: TreePine,
            land: TreePine,
            sitio: Square,
            oficina: Briefcase,
            office: Briefcase,
            comercial: Store,
            commercial: Store,
        };

        const IconComponent = iconMap[type] || Home;
        return <IconComponent className="w-4 h-4" />;
    };

	// Property type labels in Spanish
    interface PropertyTypeLabelMap {
        [key: string]: string;
    }

    const getPropertyTypeLabel = (type: string): string => {
        const labelMap: PropertyTypeLabelMap = {
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

	// Status badge colors
    interface StatusMap {
        [key: string]: string;
    }

    const getStatusStyles = (status: string): string => {
        const statusMap: StatusMap = {
            disponible:
                "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
            available:
                "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
            vendida:
                "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
            sold: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
            pendiente:
                "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
            pending:
                "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
        };
        return statusMap[status] || statusMap.disponible;
    };

	// Navigation functions
    const nextImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setCurrentImageIndex((prev: number) =>
            prev === property.imageUrls.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setCurrentImageIndex((prev: number) =>
            prev === 0 ? property.imageUrls.length - 1 : prev - 1
        );
    };

	const toggleLike = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation();
		setIsLiked(!isLiked);
	};

	const shareProperty = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation();

        //! Change in production 
		// Implement share functionality
        copyToClipboard(`${window.location.hostname}:${window.location.port}/home/properties/${property._id}`, "URL copiada al Portapapeles")
	};

	return (
		<div
			className="group relative bg-white dark:bg-zinc-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border
				    dark:border-gray-700 dark:hover:border-gray-600
				    border-gray-100 hover:border-gray-200
                    cursor-pointer transform hover:-translate-y-1"
            onClick={() => redirect(`/home/properties/${property._id}`)}
		>
			{/* Image Carousel */}
			<div className="relative h-48 overflow-hidden">
				<Image
					src={property.imageUrls[currentImageIndex]}
					alt={property.title}
                    fill
					className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>

				{/* Image Navigation */}
				{property.imageUrls.length > 1 && (
					<>
						<button
							onClick={prevImage}
							className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
						>
							<ChevronLeft className="w-4 h-4" />
						</button>
						<button
							onClick={nextImage}
							className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
						>
							<ChevronRight className="w-4 h-4" />
						</button>
					</>
				)}

				{/* Image Indicators */}
				<div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
					{property.imageUrls.map((_, index) => (
						<div
							key={index}
							className={`w-2 h-2 rounded-full transition-all duration-200 ${
								index === currentImageIndex
									? "bg-white"
									: "bg-white/50"
							}`}
						/>
					))}
				</div>

				{/* Status Badge */}
				<div className="absolute top-3 left-3">
					<span
						className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusStyles(
							property.status
						)}`}
					>
						{property.status === "disponible" ||
						property.status === "available"
							? "Disponible"
							: property.status === "vendida" ||
							  property.status === "sold"
							? "Vendida"
							: "Pendiente"}
					</span>
				</div>

				{/* Action Buttons */}
				<div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
					<button
						onClick={toggleLike}
						className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
							isLiked
								? "bg-red-500 text-white"
								: "bg-white/80 hover:bg-white text-gray-700"
						}`}
					>
						<Heart
							className={`w-4 h-4 ${
								isLiked ? "fill-current" : ""
							}`}
						/>
					</button>
					<button
						onClick={shareProperty}
						className="p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 backdrop-blur-sm transition-colors"
					>
						<Share2 className="w-4 h-4" />
					</button>
				</div>
			</div>

			{/* Content */}
			<div className="p-4">
				{/* Property Type & Price */}
				<div className="flex items-center justify-between mb-2">
					<div className="flex items-center space-x-1 text-blue-600 dark:text-blue-400">
						{getPropertyIcon(property.type)}
						<span className="text-sm font-medium">
							{getPropertyTypeLabel(property.type)}
						</span>
					</div>
				</div>

                <div className="underline mb-2">
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                        {`${formatUF(property.price)} UF`}
                    </div>
                </div>

				{/* Title */}
				<h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 text-sm leading-tight">
					{capitalizeFirstLetter(property.title)}
				</h3>

				{/* Location */}
				<div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
					<MapPin className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
					<span className="text-xs truncate">{property.address}</span>
				</div>

				{/* Property Details */}
				<div className="flex items-center justify-between text-gray-600 dark:text-gray-400 text-xs">
					<div className="flex items-center space-x-3">
						{property.dorms > 0 && (
							<div className="flex items-center space-x-1">
								<Bed className="w-3.5 h-3.5" />
								<span>{property.dorms}</span>
							</div>
						)}
						{property.bathrooms > 0 && (
							<div className="flex items-center space-x-1">
								<Bath className="w-3.5 h-3.5" />
								<span>{property.bathrooms}</span>
							</div>
						)}
						{property.parkingSpaces > 0 && (
							<div className="flex items-center space-x-1">
								<Car className="w-3.5 h-3.5" />
								<span>{property.parkingSpaces}</span>
							</div>
						)}
					</div>
					<div className="flex items-center space-x-1">
						<Maximize className="w-3.5 h-3.5" />
						<span>{property.area} m²</span>
					</div>
				</div>

				{/* Condo & OP indicator */}
                <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700 flex-between">
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                        {property.operation && property.operation}
                    </span>
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                        {property.condo && "Condominio ✅"}
                    </span>
                </div>
			</div>
		</div>
	);
};
