"use client";
import { CategoryPopulated } from "@/src/types";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getPopulatedCategories, getPopulatedCategory } from "@/src/api/FeaturedAPI";
import FeaturedList from "./FeaturedListing";
import PropertiesSkeleton from "../skeletons/PropertiesSkeleton";
import { useRouter } from "next/navigation";
import Link from "next/link";

type FeaturedListingsProps = {
	categoryId?: string; // Optional category ID to fetch single category
	page?: number;
	perPage?: number;
	autoPlay?: boolean;
	autoPlayInterval?: number;
	max?: number; // Maximum number of categories to display
};

export default function FeaturedListings({
	categoryId,
	page = 1,
	perPage = 10,
	autoPlay = false,
	autoPlayInterval = 5000,
	max, // No default value - shows all categories when not specified
}: FeaturedListingsProps) {
    const router = useRouter();

	const { data, isLoading, isError, error, refetch, isRefetching } = useQuery(
		{
			queryKey: categoryId 
				? ["featured-category", categoryId]
				: ["featured-categories", page, perPage],
			queryFn: async () => {
				if (categoryId) {
					// Fetch single category - returns { category: CategoryPopulated }
					const response = await getPopulatedCategory(categoryId);
					// Extract category from response and return as array to maintain consistent data structure
					return response && response.category && response.category.isActive && response.category.properties.length > 0 
						? [response.category] 
						: [];
				} else {
					// Fetch all categories - returns { categories: CategoryPopulated[], ... }
					const response = await getPopulatedCategories({
						page,
						perPage,
					});
					return (
						response?.categories?.filter(
							(category: CategoryPopulated) =>
								category.isActive && category.properties.length > 0
						) ?? []
					);
				}
			},
		}
	);

	// Apply max limit if specified (only when not fetching single category)
	const categories = data ? (!categoryId && max ? data.slice(0, max) : data) : [];

	// Loading state
	if (isLoading) return <PropertiesSkeleton />

	// Error state
	if (isError) router.back()

	// Empty state
	if (categories.length === 0) {
		return (
			<div className="py-16 bg-white dark:bg-zinc-900 transition-colors duration-300">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center py-20">
						<div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
							<AlertCircle className="w-10 h-10 text-zinc-400 dark:text-zinc-500" />
						</div>
						<h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
							{categoryId 
								? "Categoría no encontrada o sin propiedades"
								: "No hay propiedades destacadas disponibles"
							}
						</h3>
						<p className="text-zinc-600 dark:text-zinc-400 text-center max-w-md mx-auto">
							{categoryId 
								? "La categoría solicitada no existe o no tiene propiedades activas disponibles."
								: "Aún no hay categorías con propiedades para mostrar. Vuelve pronto para ver nuestras mejores opciones."
							}
						</p>
					</div>
				</div>
			</div>
		);
	}

	// Check if there are more categories available than displayed (only for multi-category view)
	const hasMoreCategories = !categoryId && data && max && data.length > max;
	const totalCategories = !categoryId ? (data?.length || 0) : 1;

	// Main content with categories
	return (
		<div className="bg-white dark:bg-zinc-900 transition-colors duration-300">
			{/* Section Header */}
			<div className="py-12 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-800 dark:to-zinc-900">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
							{categoryId 
								? categories[0]?.name || "Propiedades de la Categoría"
								: "Propiedades Destacadas"
							}
						</h1>
						<p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto">
							{categoryId 
								? "Explora las propiedades de esta categoría especial"
								: "Descubre nuestras categorías especiales con las mejores propiedades seleccionadas cuidadosamente para ofrecerte las opciones más destacadas del mercado"
							}
						</p>

						{/* Stats */}
						<div className="flex flex-wrap justify-center gap-8 mt-8">
							{!categoryId && (
								<div className="text-center">
									<div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
										{categories.length}
										{hasMoreCategories && (
											<span className="text-sm text-zinc-500 dark:text-zinc-400 ml-1">
												/ {totalCategories}
											</span>
										)}
									</div>
									<div className="text-sm text-zinc-500 dark:text-zinc-400">
										Categorías{hasMoreCategories ? ' mostradas' : ''}
									</div>
								</div>
							)}
							<div className="text-center">
								<div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
									{categories.reduce(
										(total, category) =>
											total + category.properties.length,
										0
									)}
								</div>
								<div className="text-sm text-zinc-500 dark:text-zinc-400">
									Propiedades
								</div>
							</div>
						</div>

						{/* Show indicator when limiting results (only for multi-category view) */}
						{hasMoreCategories && (
							<div className="mt-4 inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm">
								<AlertCircle className="w-4 h-4" />
								Mostrando {max} de {totalCategories} categorías
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Categories Carousels */}
			<div className="max-w-7xl mx-auto space-y-12 pb-16">
				{categories.map((category, index) => (
					<FeaturedList
						key={category._id}
						category={category}
						autoPlay={autoPlay}
						autoPlayInterval={autoPlayInterval + index * 1000} // Stagger autoplay timings
						showViewAllButton={!categoryId} // Hide "View All" button when showing single category
					/>
				))}
			</div>

			{/* Bottom CTA */}
			<div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-zinc-800 dark:to-zinc-700 py-16">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-4">
						¿No encontraste lo que buscabas?
					</h3>
					<p className="text-zinc-600 dark:text-zinc-300 mb-8 max-w-2xl mx-auto">
						{categoryId 
							? 'Explora otras categorías o usa nuestros filtros avanzados para encontrar exactamente lo que necesitas'
							: hasMoreCategories 
								? `Explora las ${totalCategories - categories.length} categorías restantes o usa nuestros filtros avanzados para encontrar exactamente lo que necesitas`
								: 'Explora todas nuestras propiedades o usa nuestros filtros avanzados para encontrar exactamente lo que necesitas'
						}
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link
                            href="/home/categories"
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105"
                        >
							Ver todas las Categorías
						</Link>
						<Link 
                            href="/home/properties"
                            className="inline-flex items-center gap-2 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-600 px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg"
                        >
							Búsqueda avanzada
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}