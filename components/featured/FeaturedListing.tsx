"use client";
import { CategoryPopulated } from "@/src/types";
import { ChevronLeft, ChevronRight, LucideIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import PropertyCard from "../properties/PropertyCard";

type FeaturedPropertiesCarouselProps = {
    category: CategoryPopulated;
    title?: string;
    description?: string;
    icon?: LucideIcon;
    showViewAllButton?: boolean;
    autoPlay?: boolean;
    autoPlayInterval?: number;
};

export default function FeaturedList({ 
    category,
    title,
    description,
    icon: Icon,
    showViewAllButton = true,
    autoPlay = false,
    autoPlayInterval = 5000
}: FeaturedPropertiesCarouselProps) {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    
    const properties = category.properties;
    const hasProperties = properties && properties.length > 0;
    const displayTitle = title || category.name;
    const displayDescription = description || `Explora las mejores opciones en ${category.name.toLowerCase()}`;

    // Calculate how many items are visible at once
    const getVisibleItems = () => {
        if (typeof window === 'undefined') return 3;
        if (window.innerWidth >= 1024) return 3; // lg
        if (window.innerWidth >= 768) return 2;  // md
        return 1; // sm
    };

    const [visibleItems, setVisibleItems] = useState(getVisibleItems);

    useEffect(() => {
        const handleResize = () => {
            setVisibleItems(getVisibleItems());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Auto-play functionality
    useEffect(() => {
        if (!autoPlay || isHovered || !hasProperties) return;

        const interval = setInterval(() => {
            setCurrentIndex(prev => 
                prev >= properties.length - visibleItems ? 0 : prev + 1
            );
        }, autoPlayInterval);

        return () => clearInterval(interval);
    }, [autoPlay, autoPlayInterval, isHovered, hasProperties, properties.length, visibleItems]);

    const canScrollLeft = currentIndex > 0;
    const canScrollRight = hasProperties && currentIndex < properties.length - visibleItems;

    const scrollLeft = () => {
        if (canScrollLeft) {
            setCurrentIndex(prev => Math.max(0, prev - 1));
        }
    };

    const scrollRight = () => {
        if (canScrollRight) {
            setCurrentIndex(prev => Math.min(properties.length - visibleItems, prev + 1));
        }
    };

    const handleViewAll = () => {
        router.push(`/home/categories/${category._id}`);
    };

    // Scroll to position when currentIndex changes
    useEffect(() => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const cardWidth = container.scrollWidth / properties.length;
            const scrollPosition = currentIndex * cardWidth;
            
            container.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
    }, [currentIndex, properties.length]);

    if (!hasProperties) {
        return null; // Don't render empty carousels
    }

    return (
        <section className="py-12 bg-white dark:bg-zinc-900 transition-colors duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-8 gap-4">
                    <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-2">
                            {displayTitle}
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-300 text-sm md:text-base max-w-2xl">
                            {displayDescription}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Property Count */}
                        <div className="hidden sm:flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>{properties.length} propiedades</span>
                        </div>

                        {/* Navigation Controls */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={scrollLeft}
                                disabled={!canScrollLeft}
                                className={`p-2 rounded-lg transition-all duration-200 ${
                                    canScrollLeft
                                        ? 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm hover:shadow-md'
                                        : 'bg-zinc-50 dark:bg-zinc-800/50 text-zinc-300 dark:text-zinc-600 cursor-not-allowed'
                                }`}
                                aria-label="Propiedades anteriores"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            
                            <button
                                onClick={scrollRight}
                                disabled={!canScrollRight}
                                className={`p-2 rounded-lg transition-all duration-200 ${
                                    canScrollRight
                                        ? 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm hover:shadow-md'
                                        : 'bg-zinc-50 dark:bg-zinc-800/50 text-zinc-300 dark:text-zinc-600 cursor-not-allowed'
                                }`}
                                aria-label="Siguientes propiedades"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>

                        {/* View All Button */}
                        {showViewAllButton && (
                            <button
                                onClick={handleViewAll}
                                className="hidden sm:inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:scale-105"
                            >
                                Ver todas
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Carousel Container */}
                <div 
                    className="relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Properties Carousel */}
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}
                    >
                        {properties.map((property, index) => (
                            <div
                                key={property._id}
                                className="flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start"
                            >
                                <PropertyCard 
                                    property={property} 
                                />
                            </div>
                        ))}
                    </div>

                    {/* Gradient Overlays for Visual Continuity */}
                    {canScrollLeft && (
                        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white dark:from-zinc-900 to-transparent pointer-events-none z-10" />
                    )}
                    {canScrollRight && (
                        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-zinc-900 to-transparent pointer-events-none z-10" />
                    )}
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center mt-8 gap-2">
                    {Array.from({ length: Math.ceil(properties.length / visibleItems) }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index * visibleItems)}
                            className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                Math.floor(currentIndex / visibleItems) === index
                                    ? 'bg-blue-600 dark:bg-blue-400'
                                    : 'bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400 dark:hover:bg-zinc-500'
                            }`}
                            aria-label={`Ir a la página ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Mobile View All Button */}
                {showViewAllButton && (
                    <div className="sm:hidden mt-6 text-center">
                        <button
                            onClick={handleViewAll}
                            className="inline-flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg"
                        >
                            Ver todas las propiedades
                            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                                {properties.length}
                            </span>
                        </button>
                    </div>
                )}
            </div>

            <style jsx>{`
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
}