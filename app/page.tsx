import Footer from "@/components/home/Footer";
import Testimonials from "@/components/home/Testimonials";
import Hero from "@/components/home/Hero";
import FeaturedListing from "@/components/home/FeaturedListing";
import AboutSection from "@/components/home/AboutSection";

export default function page() {
    return (
        <main>
            <Hero searchBar includeImageSection />
            <FeaturedListing />
            <AboutSection />
            <Testimonials />
            <Footer />
        </main>
    )
}
