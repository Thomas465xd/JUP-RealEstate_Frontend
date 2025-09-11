import PropertyDetails from "@/components/properties/PropertyDetails";
import React from "react";

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
