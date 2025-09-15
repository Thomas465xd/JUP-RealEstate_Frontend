import PropertyDetails from "@/components/properties/PropertyDetails";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Conoce nuestras Propiedades"
}

export default async function EditProperty({ params } : { params: Promise<{ propertyId: string }>}) {
    const { propertyId } = await params; 
    console.log(propertyId)

	return (
        <section className="">
            <PropertyDetails
                propertyId={propertyId}
            />
        </section>
    );
}
