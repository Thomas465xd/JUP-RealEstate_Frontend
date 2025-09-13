import Footer from "@/components/home/Footer";
import Testimonials from "@/components/home/Testimonials";
import Hero from "@/components/home/Hero";
import Featured from "@/components/home/Featured";
import AboutSection from "@/components/home/AboutSection";
import CallToAction from "@/components/home/CallToAction";
import Services from "@/components/services/ServiceList";

export default function page() {
    return (
        <main>
            <Hero searchBar includeImageSection />
            <Featured />
            <AboutSection />
            <Testimonials />
            <CallToAction />
            <Services />
            <Footer />
        </main>
    )
}
