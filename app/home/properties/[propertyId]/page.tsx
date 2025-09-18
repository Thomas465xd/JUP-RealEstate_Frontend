import PropertyDetails from "@/components/properties/PropertyDetails";
import React from "react";
import { Metadata } from "next";
import FeaturedListings from "@/components/featured/FeaturedListings";

export const metadata: Metadata = {
    title: "Conoce nuestras Propiedades"
}

export default async function EditProperty({ params } : { params: Promise<{ propertyId: string }>}) {
    const { propertyId } = await params; 

	return (
        <section className="">
            <PropertyDetails
                propertyId={propertyId}
            />

            <FeaturedListings
                max={1}
                header={false}
            />
        </section>
    );
}
