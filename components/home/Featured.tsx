"use client"; 
import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { getProperties } from '@/src/api/PropertyAPI';
import PropertyListing from '../properties/PropertyList';
import Link from 'next/link';
import { House } from 'lucide-react';
import PropertiesSkeleton from '../utility/PropertiesSkeleton';
import { redirect } from 'next/navigation';
import { getCateogoriesByName } from '@/src/api/FeaturedAPI';

export default function Featured() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["properties"], 
        queryFn: () => getCateogoriesByName("propiedades-destacadas"),
        retry: false
    }); 
    
    const properties = data?.categories?.[0]?.properties || [];

    if(isError) return redirect("/404")

    if(isLoading) return <PropertiesSkeleton />

    if(data) return (
        <section className='p-12 lg:px-40 bg-zinc-100 dark:bg-zinc-900 space-y-8'>
            <PropertyListing 
                properties={properties}
                maxItems={6}
                title='Propiedades Destacadas'
            />

            <div className="flex justify-center">
                <Link
                    href={"/home/properties"}
                    className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-101 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Ver todas nuestras propiedades
                    <House className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
            </div>
        </section>
    )
}
