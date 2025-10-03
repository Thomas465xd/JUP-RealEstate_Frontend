import PropertyDetails from "@/components/properties/PropertyDetails";
import React from "react";
import { Metadata } from "next";
import FeaturedListings from "@/components/featured/FeaturedListings";
import { getUF } from "@/lib/uf";

export const metadata: Metadata = {
    title: "Conoce nuestras Propiedades"
}

export default async function EditProperty({ params } : { params: Promise<{ propertyId: string }>}) {
    const { propertyId } = await params; 
    const ufValue = await getUF(); // Fetch once per request

	return (
        <section className="">
            <PropertyDetails
                propertyId={propertyId}
                ufValue={ufValue}
            />

            <FeaturedListings
                max={1}
                header={false}
            />
        </section>
    );
}
