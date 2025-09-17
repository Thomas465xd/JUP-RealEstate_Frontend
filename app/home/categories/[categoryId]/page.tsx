import FeaturedListings from '@/components/featured/FeaturedListings';
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Explora Nuestras Categorías"
}

export default async function page({ params } : { params: Promise<{ categoryId: string }>}) {
    const { categoryId } = await params; 

    return (
        <>
            <FeaturedListings 
                categoryId={categoryId}
            />
        </>
    )
}
