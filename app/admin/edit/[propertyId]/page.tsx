import EditPropertyForm from "@/components/admin/properties/EditPropertyForm";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Editar Propiedad"
}

export default async function EditProperty({ params } : { params: Promise<{ propertyId: string }>}) {
    const { propertyId } = await params; 

	return (
        <section className="">
            <EditPropertyForm
                propertyId={propertyId}            
            />
        </section>
    );
}
