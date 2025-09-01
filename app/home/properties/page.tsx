"use client"; 
import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { getProperties } from '@/src/api/PropertyAPI';
import { redirect } from 'next/navigation';
import Loader from '@/components/utility/Loader';
import PropertyListing from '@/components/properties/PropertyList';

export default function page() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["properties"], 
        queryFn: () => getProperties({ page: 1, perPage: 6 }),
        retry: false
    }); 
    
    const properties = data?.properties || [];

    if(isError) return redirect("/404")

    if(isLoading) return <Loader />

    if(data) return (
        <div className='p-12 lg:p-40 bg-zinc-100 dark:bg-zinc-900'>
            <h1 className="title">Nuestras Propiedades:</h1>
            <p className="text-zinc-700 dark:text-zinc-400">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa nisi nobis vitae placeat cum molestias? Ut omnis quisquam, officia ducimus eaque aliquam laborum neque in 
            </p>

            <PropertyListing
                properties={properties}
            />
        </div>
    )
}
