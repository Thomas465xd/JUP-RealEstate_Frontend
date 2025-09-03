"use client";
import { Property } from "@/src/types";
import PropertyCard from "./PropertyCard";
import { Search, SortAsc, Grid, List, MapPin } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

type PropertyListingProps = {
    properties: Property[];
    title?: string;
    subtitle?: string;
    showHeader?: boolean;
    showFilters?: boolean;
    maxItems?: number;
};

export default function PropertyListing({ 
    properties, 
    title = "Propiedades Destacadas",
    subtitle = "Descubre las mejores opciones disponibles en el mercado",
    showHeader = true,
    showFilters = false,
    maxItems
}: PropertyListingProps) {
    const router = useRouter();
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'newest' | 'popular'>('newest');

    // Limit properties if maxItems is specified
    const displayProperties = maxItems ? properties.slice(0, maxItems) : properties;
    const hasProperties = displayProperties && displayProperties.length > 0;

    const gridCols = viewMode === 'grid' 
        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
        : "grid-cols-1";

    const getSortLabel = (sortValue: string) => {
        switch(sortValue) {
            case 'price-low': return 'Precio: Menor a Mayor';
            case 'price-high': return 'Precio: Mayor a Menor';
            case 'newest': return 'Más Recientes';
            case 'popular': return 'Más Populares';
            default: return 'Ordenar por';
        }
    };

    if (!hasProperties) {
        return (
            <div className="py-16 bg-white dark:bg-zinc-900 transition-colors duration-300">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {showHeader && (
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
                                {title}
                            </h2>
                            <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
                                {subtitle}
                            </p>
                        </div>
                    )}
                    
                    {/* Empty State */}
                    <div className="max-w-md mx-auto text-center py-16">
                        <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <MapPin className="w-10 h-10 text-zinc-400 dark:text-zinc-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                            No se encontraron propiedades
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                            No hay propiedades disponibles en este momento. Prueba ajustando tus filtros o vuelve más tarde.
                        </p>
                        <button 
                            onClick={() => router.back()}
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                        >
                            <Search className="w-4 h-4" />
                            Explorar todas las propiedades
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-16 bg-white dark:bg-zinc-900 transition-colors duration-300 rounded-xl">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {showHeader && (
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
                            {title}
                        </h2>
                        <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
                            {subtitle}
                        </p>
                    </div>
                )}

                {/* Filters and Controls */}
                {showFilters && (
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 p-6 bg-zinc-50 dark:bg-zinc-800 rounded-2xl">
                        <div className="flex items-center gap-4">
                            <div className="text-sm text-zinc-600 dark:text-zinc-400">
                                <span className="font-semibold text-zinc-900 dark:text-white">
                                    {displayProperties.length}
                                </span> propiedades encontradas
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Sort Dropdown */}
                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as any)}
                                    className="appearance-none bg-white dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 rounded-lg px-4 py-2 pr-10 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="newest">Más Recientes</option>
                                    <option value="popular">Más Populares</option>
                                    <option value="price-low">Precio: Menor a Mayor</option>
                                    <option value="price-high">Precio: Mayor a Menor</option>
                                </select>
                                <SortAsc className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                            </div>

                            {/* View Mode Toggle */}
                            <div className="flex bg-zinc-100 dark:bg-zinc-700 rounded-lg p-1">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-md transition-colors duration-200 ${
                                        viewMode === 'grid'
                                            ? 'bg-white dark:bg-zinc-600 text-blue-600 dark:text-blue-400 shadow-sm'
                                            : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
                                    }`}
                                    aria-label="Vista en cuadrícula"
                                >
                                    <Grid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-md transition-colors duration-200 ${
                                        viewMode === 'list'
                                            ? 'bg-white dark:bg-zinc-600 text-blue-600 dark:text-blue-400 shadow-sm'
                                            : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
                                    }`}
                                    aria-label="Vista en lista"
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Properties Grid */}
                <div className={`grid ${gridCols} gap-6 lg:gap-8`}>
                    {displayProperties.map((property) => (
                        <PropertyCard
                            key={property._id}
                            property={property}
                        />
                    ))}
                </div>

                {/* Load More Button (if maxItems is set and there are more items) */}
                {maxItems && properties.length > maxItems && (
                    <div className="text-center mt-12">
                        <button className="inline-flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                            Ver todas las propiedades
                            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                                +{properties.length - maxItems}
                            </span>
                        </button>
                    </div>
                )}

                {/* Results Summary */}
                <div className="mt-12 text-center border-t-2 border-t-zinc-300 dark:border-t-zinc-600 pt-4">
                    <div className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>
                            Mostrando {displayProperties.length} de {properties.length} propiedades
                        </span>
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}