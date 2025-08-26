import EditPropertyForm from "@/components/admin/EditPropertyForm";
import React from "react";

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
