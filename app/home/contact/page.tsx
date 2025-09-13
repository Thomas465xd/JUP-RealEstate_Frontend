import ContactForm from "@/components/contact/ContactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contacto"
}

export default function page() {
    return (
        <>
            <ContactForm />
        </>
    )
}
