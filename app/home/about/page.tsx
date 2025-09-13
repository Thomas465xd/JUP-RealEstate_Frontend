import AboutUs from "@/components/about/AboutUs";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Conoce nuestra Historia"
}

export default function page() {
    return (
        <AboutUs/>
    )
}
