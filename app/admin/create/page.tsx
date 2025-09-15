import CreatePropertyForm from "@/components/admin/properties/CreatePropertyForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Crear Propiedad"
}

export default function page() {
    return (
        <section className="">
            <CreatePropertyForm />
        </section>
    )
}
