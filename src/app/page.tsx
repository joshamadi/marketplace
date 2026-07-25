import Hero from "@/components/home/Hero";
import CuisineGrid from "@/components/home/CuisineGrid";
import HowItWorks from "@/components/home/HowItWorks";
import PopularRestaurants from "@/components/home/PopularRestaurants";
import Features from "@/components/home/Features";
import DownloadBanner from "@/components/home/DownloadBanner";
import FaqSection from "@/components/home/FaqSection";
import Newsletter from "@/components/home/Newsletter";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <CuisineGrid />
      <HowItWorks />
      <PopularRestaurants />
      <Features />
      <DownloadBanner />
      <FaqSection />
      <Newsletter />
      <Footer />
    </main>
  );
}
