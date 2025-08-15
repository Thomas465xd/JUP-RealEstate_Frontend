import React from 'react'
import Header from './Header'
import ContactBar from './ContactBar'
import Image from 'next/image'
import heroImage from "@/public/hero-image.jpg"; // now it's a static import
import Testimonials from './Testimonials';
import SearchBar from './SearchBar';

export default function Hero() {
    return (
        <>
            {/* Top Contact Bar */}
            <ContactBar />
            {/* Main Header */}
            <Header />
        
            <section className="relative h-[70vh] flex items-center justify-center">
                <Image
                    src={heroImage}
                    alt="Hero background"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="relative z-10 text-center text-white">
                    <h1 className="text-5xl font-bold">Bienvenido a JUP Propiedades</h1>
                    <p className="mt-4 text-lg">Your tagline goes here</p>
                </div>
                <div className="absolute inset-0 bg-black/40" /> {/* overlay */}
            </section>

            <SearchBar />
        </>
    )
}
