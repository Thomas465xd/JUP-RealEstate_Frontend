"use client"; 
import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { getProperties } from '@/src/api/PropertyAPI';
import Loader from '../utility/Loader';
import { redirect } from 'next/navigation';
import PropertyListing from '../properties/PropertyList';

export default function Featured() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["properties"], 
        queryFn: () => getProperties({ page: 1, perPage: 6 }),
        retry: false
    }); 
    
    const properties = data?.properties || [];

    //if(isError) return redirect("/404")

    if(isLoading) return <Loader />

    if(data) return (
        <div className='p-12 lg:p-40 bg-zinc-100 dark:bg-zinc-900'>
            <h1 className="font-extrabold uppercase text-3xl">Propiedades Destacadas</h1>

            <PropertyListing 
                properties={properties}
            />
        </div>
    )
}
