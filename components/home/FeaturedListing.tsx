"use client"; 
import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { getProperties } from '@/src/api/PropertyAPI';

export default function FeaturedListing() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["properties"], 
        queryFn: () => getProperties({ page: 1, perPage: 6 }),
        retry: false
    }); 
    
    console.log(data)

    return (
        <div className='p-40'>
            <h1 className="font-extrabold uppercase text-3xl">Propiedades Destacadas</h1>
        </div>
    )
}
