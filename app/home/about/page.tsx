import AboutUs from "@/components/about/AboutUs";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sobre Nosotros"
}

export default function page() {
    return (
        <AboutUs/>
    )
}
