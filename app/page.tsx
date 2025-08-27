import Footer from "@/components/home/Footer";
import Testimonials from "@/components/home/Testimonials";
import Hero from "@/components/home/Hero";
import FeaturedListing from "@/components/home/Featured";
import AboutSection from "@/components/home/AboutSection";
import CallToAction from "@/components/home/CallToAction";
import Services from "@/components/home/Services";

export default function page() {
    return (
        <main>
            <Hero searchBar includeImageSection />
            <FeaturedListing />
            <AboutSection />
            <Testimonials />
            <CallToAction />
            <Services />
            <Footer />
        </main>
    )
}
