"use client";
import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
	id: number;
	name: string;
	role: string;
	company: string;
	content: string;
	rating: number;
	avatar: string;
}

//? Could be done in a separate model in the backend
//? Could be done in a separate model in the backend
const testimonials: Testimonial[] = [
	{
		id: 1,
		name: "Rodrigo Fuchs",
		role: "Business & Technology Delivery Associate Manager",
		company: "Accenture",
		content:
			"Muchas gracias a JUP por toda la atención y por la manera en que llevaron la transacción. Otra categoría, siempre gentiles y dispuestos a ayudar.",
		rating: 5,
		avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
	},
	{
		id: 2,
		name: "Carlos Rodríguez",
		role: "Founder",
		company: "Property Investments",
		content:
			"Con JUP Propiedades los resultados son muy satisfactorios. Todo envuelto en alta calidad y un enfoque innovador que atrae una gran cantidad de visitantes.",
		rating: 5,
		avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
	},
	{
		id: 3,
		name: "Ana Silva",
		role: "CEO",
		company: "Modern Homes",
		content:
			"Son capaces de ayudar a una startup como la mía a escalar y responden muy rápido a todas nuestras necesidades. ¡Profesionalismo excepcional de principio a fin!",
		rating: 5,
		avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
	},
	{
		id: 4,
		name: "Roberto Mendoza",
		role: "Director",
		company: "Elite Properties",
		content:
			"Servicio excepcional de principio a fin. Me ayudaron a encontrar la propiedad ideal de inversión y me guiaron en cada paso del proceso.",
		rating: 5,
		avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
	},
	{
		id: 5,
		name: "Isabel Torres",
		role: "Founder",
		company: "Urban Living",
		content:
			"Un equipo profesional que entrega resultados. Su experiencia en el mercado inmobiliario no tiene comparación y realmente se preocupan por el éxito del cliente.",
		rating: 5,
		avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
	},
];

export default function TestimonialsCarousel() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);
	const [isAnimating, setIsAnimating] = useState(false);
	const [visibleCards, setVisibleCards] = useState(3);

	// Update visible cards based on screen size
	useEffect(() => {
		const updateVisibleCards = () => {
			if (window.innerWidth < 768) {
				setVisibleCards(1); // Mobile: 1 card
			} else if (window.innerWidth < 1024) {
				setVisibleCards(2); // Tablet: 2 cards
			} else {
				setVisibleCards(3); // Desktop: 3 cards
			}
		};

		updateVisibleCards();
		window.addEventListener("resize", updateVisibleCards);
		return () => window.removeEventListener("resize", updateVisibleCards);
	}, []);

	const maxIndex = Math.max(0, testimonials.length - visibleCards);

	// Memoized next slide function to prevent recreation
	const nextSlide = useCallback(() => {
		if (isAnimating) return;
		setIsAnimating(true);

		setCurrentIndex((prev) => {
			const newIndex = prev >= maxIndex ? 0 : prev + 1;
			return newIndex;
		});

		setTimeout(() => setIsAnimating(false), 500);
	}, [isAnimating, maxIndex]);

	// Auto-play effect - simplified and fixed
	useEffect(() => {
		if (!isAutoPlaying) return;

		const interval = setInterval(nextSlide, 4000);
		return () => clearInterval(interval);
	}, [isAutoPlaying, nextSlide]);

	const prevSlide = () => {
		if (isAnimating) return;
		setIsAnimating(true);

		// Temporarily pause auto-play for 8 seconds after manual navigation
		setIsAutoPlaying(false);
		setTimeout(() => setIsAutoPlaying(true), 8000);

		setCurrentIndex((prev) => {
			const newIndex = prev <= 0 ? maxIndex : prev - 1;
			return newIndex;
		});

		setTimeout(() => setIsAnimating(false), 500);
	};

	const handleNextSlide = () => {
		if (isAnimating) return;
		
		// Temporarily pause auto-play for 8 seconds after manual navigation
		setIsAutoPlaying(false);
		setTimeout(() => setIsAutoPlaying(true), 8000);
		
		nextSlide();
	};

	const renderStars = (rating: number) => {
		return Array.from({ length: 5 }, (_, i) => (
			<Star
				key={i}
				className={`w-4 h-4 ${
					i < rating
						? "fill-yellow-400 text-yellow-400"
						: "text-gray-300 dark:text-gray-600"
				}`}
			/>
		));
	};

	return (
		<section className="py-16 bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="flex items-start justify-between mb-12">
					<div className="max-w-3xl">
						{/* Section Label */}
						<div className="inline-flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 rounded-full px-4 py-2 mb-6">
							<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
							<span className="text-sm font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">
								Testimoniales
							</span>
						</div>
						<h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
							Lo que dicen nuestros {" "}
							<span className="italic text-zinc-700 dark:text-zinc-300">
								clientes
							</span>
						</h2>
						<p className="text-zinc-600 dark:text-zinc-400 text-lg">
							Conoce algunas de las opiniones de nuestros clientes al trabajar con nosotros.
						</p>
					</div>

					{/* Navigation Controls */}
					<div className="hidden md:flex gap-2">
						<button
							onClick={prevSlide}
							disabled={isAnimating}
							className="w-12 h-12 rounded-full border-2 border-zinc-300 dark:border-zinc-600 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:border-blue-500 hover:text-blue-500 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all duration-300 disabled:opacity-50"
							aria-label="Previous testimonials"
						>
							<ChevronLeft className="w-5 h-5" />
						</button>
						<button
							onClick={nextSlide}
							disabled={isAnimating}
							className="w-12 h-12 rounded-full border-2 border-zinc-300 dark:border-zinc-600 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:border-blue-500 hover:text-blue-500 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all duration-300 disabled:opacity-50"
							aria-label="Next testimonials"
						>
							<ChevronRight className="w-5 h-5" />
						</button>
					</div>
				</div>

				{/* Carousel Container */}
				<div className="relative overflow-hidden">
					<div
						className="flex transition-transform duration-500 ease-in-out"
						style={{
							transform: `translateX(-${
								currentIndex * (100 / visibleCards)
							}%)`,
						}}
					>
						{testimonials.map((testimonial, index) => (
							<div
								key={testimonial.id}
								className={`flex-none px-2 md:px-3 ${
									visibleCards === 1
										? "w-full"
										: visibleCards === 2
										? "w-1/2"
										: "w-1/3"
								}`}
							>
                                <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                                    {/* Stars */}
                                    <div className="flex gap-1 mb-4">
                                        {renderStars(testimonial.rating)}
                                    </div>

                                    {/* Content */}
                                    <p className="text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed text-sm flex-1">
                                        {testimonial.content}
                                    </p>

                                    {/* Author Info */}
                                    <div className="bg-gradient-to-r from-zinc-700 to-zinc-800 dark:from-zinc-700 dark:to-zinc-600 rounded-xl p-4 flex items-center gap-3 mt-auto">
                                        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/20">
                                            <img
                                                src={testimonial.avatar}
                                                alt={testimonial.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.style.display = "none";

                                                    const sibling = target.nextElementSibling as HTMLElement | null;
                                                    if (sibling) {
                                                        sibling.style.display = "flex";
                                                    }
                                                }}
                                            />
                                            <div className="w-full h-full bg-white/20 rounded-full hidden items-center justify-center text-white font-semibold text-sm">
                                                {testimonial.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </div>
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <h4 className="text-white font-semibold text-sm truncate">
                                                {testimonial.name}
                                            </h4>
                                            <p className="text-white/90 text-xs truncate">
                                                {testimonial.role} of {testimonial.company}
                                            </p>
                                        </div>
                                    </div>
                                </div>
							</div>
						))}
					</div>
				</div>

				{/* Mobile Navigation */}
				<div className="flex md:hidden justify-center gap-2 mt-8">
					<button
						onClick={prevSlide}
						disabled={isAnimating}
						className="w-10 h-10 rounded-full border-2 border-zinc-300 dark:border-zinc-600 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:border-blue-500 hover:text-blue-500 transition-all duration-300 disabled:opacity-50"
						aria-label="Previous testimonials"
					>
						<ChevronLeft className="w-4 h-4" />
					</button>
					<button
						onClick={nextSlide}
						disabled={isAnimating}
						className="w-10 h-10 rounded-full border-2 border-zinc-300 dark:border-zinc-600 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:border-blue-500 hover:text-blue-500 transition-all duration-300 disabled:opacity-50"
						aria-label="Next testimonials"
					>
						<ChevronRight className="w-4 h-4" />
					</button>
				</div>

				{/* Progress Indicators */}
				<div className="flex justify-center mt-6 gap-2">
					{Array.from({ length: maxIndex + 1 }, (_, index) => (
						<button
							key={index}
							onClick={() => {
								if (!isAnimating) {
									setIsAnimating(true);
									setCurrentIndex(index);
									setIsAutoPlaying(false);
									setTimeout(
										() => setIsAnimating(false),
										500
									);
								}
							}}
							className={`w-2 h-2 rounded-full transition-all duration-300 ${
								index === currentIndex
									? "bg-blue-500 dark:bg-blue-400 w-6"
									: "bg-zinc-300 dark:bg-zinc-600 hover:bg-blue-300 dark:hover:bg-blue-600"
							}`}
							aria-label={`Go to slide ${index + 1}`}
						/>
					))}
				</div>
			</div>
		</section>
	);
};