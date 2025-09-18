"use client";
import React, { useState, useEffect } from 'react'
import Header from './Header'
import ContactBar from './ContactBar'
import Image from 'next/image'
import SearchBar from './SearchBar'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'

// Import your hero images
import heroImage1 from "@/public/hero-image-1.jpg"
import heroImage2 from "@/public/hero-image-2.jpg"
import heroImage3 from "@/public/hero-image-3.jpg"
import heroImage4 from "@/public/hero-image-4.jpg"
import heroImage5 from "@/public/hero-image-5.jpg"
import heroImage6 from "@/public/hero-image-6.jpg"

type HeroProps = {
    includeImageSection?: boolean
    shortHero?: boolean
    searchBar?: boolean
}

const heroImages = [
    { src: heroImage1, alt: "Luxury property exterior" },
    { src: heroImage2, alt: "Modern interior design" },
    { src: heroImage3, alt: "Beautiful garden view" },
    { src: heroImage4, alt: "Spacious living room" },
    { src: heroImage5, alt: "Elegant kitchen" },
    { src: heroImage6, alt: "Stunning bedroom" }
]

export default function Hero({ includeImageSection = false, shortHero = false, searchBar = false }: HeroProps) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)

    // Auto-advance carousel
    useEffect(() => {
        if (!isPlaying) return

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length)
        }, 5000) // Change image every 5 seconds

        return () => clearInterval(interval)
    }, [isPlaying])

    const goToSlide = (index: number) => {
        setCurrentSlide(index)
    }

    const goToPrevious = () => {
        setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)
    }

    const goToNext = () => {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying)
    }

    return (
        <>
            {/* Top Contact Bar */}
            <ContactBar />
            
            {/* Main Header */}
            <Header />
        
            {includeImageSection && (
                <section className="relative h-[80vh] 2xl:h-[70vh] flex items-center justify-center overflow-hidden">
                    {/* Carousel Images */}
                    <div className="absolute inset-0">
                        {heroImages.map((image, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                                }`}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    sizes="(max-width: 1315px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    priority={index === 0}
                                    fetchPriority={index === 0 ? "high" : "auto"}
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50" />

                    {/* Content */}
                    <div className="relative z-10 text-center text-white px-4">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
                            Bienvenido a JUP Propiedades
                        </h1>
                        <p className="text-lg sm:text-xl md:text-2xl font-light drop-shadow-md">
                            Vuelve tus sueños realidad
                        </p>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={goToPrevious}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </button>

                    <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group"
                        aria-label="Next image"
                    >
                        <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </button>

                    {/* Play/Pause Button */}
                    <button
                        onClick={togglePlayPause}
                        className="absolute top-6 right-6 z-20 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                        aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                    >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>

                    {/* Pagination Dots */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
                        {heroImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    index === currentSlide
                                        ? 'bg-white scale-125'
                                        : 'bg-white/50 hover:bg-white/80'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Progress Bar */}
                    <div className="absolute bottom-0 left-0 right-0 z-20">
                        <div className="h-1 bg-white/20">
                            <div
                                className="h-full bg-white transition-all duration-300 ease-linear"
                                style={{
                                    width: `${((currentSlide + 1) / heroImages.length) * 100}%`
                                }}
                            />
                        </div>
                    </div>
                </section>
            )}

            {shortHero && (
                <section className="relative h-[30vh] flex items-center justify-center overflow-hidden">
                    {/* Carousel Images for Short Hero */}
                    <div className="absolute inset-0">
                        {heroImages.map((image, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                                }`}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    priority={index === 0}
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="absolute inset-0 bg-black/40" />

                    {/* Simple pagination for short hero */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
                        {heroImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    index === currentSlide
                                        ? 'bg-white'
                                        : 'bg-white/50 hover:bg-white/80'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </section>
            )}

            {searchBar && (
                <SearchBar />
            )}
        </>
    )
}