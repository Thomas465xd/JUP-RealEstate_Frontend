import React from 'react'
import Header from './Header'
import ContactBar from './ContactBar'
import Image from 'next/image'
import heroImage from "@/public/hero-image.jpg"; // now it's a static import
import SearchBar from './SearchBar';

type HeroProps = {
    includeImageSection?: boolean; 
    shortHero?: boolean; // choose wether to display a minified version of the hero image or not
    searchBar?: boolean; // choose wether to display the serach bar or not
}

export default function Hero({ includeImageSection = false, shortHero = false, searchBar = false } : HeroProps) {
    return (
        <>
            {/* Top Contact Bar */}
            <ContactBar />
            
            {/* Main Header */}
            <Header />
        
            {includeImageSection && (
                <section className="relative h-[70vh] 2xl:h-[60vh] flex items-center justify-center">
                    
                    <Image
                        src={heroImage}
                        alt="Hero background"
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="relative z-10 text-center text-white">
                        <h1 className="text-5xl font-bold mx-4">Bienvenido a JUP Propiedades</h1>
                        <p className="mt-4 text-lg">Vuelve tus sueños realidad</p>
                    </div>
                    <div className="absolute inset-0 bg-black/40" /> {/* overlay */}
                </section>
            )}

            {shortHero && (
                <section className="relative h-[30vh] flex items-center justify-center">
                    <Image
                        src={heroImage}
                        alt="Hero background"
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" /> {/* overlay */}
                </section>
            )}

            {searchBar && (
                <SearchBar />
            )}
        </>
    )
}
