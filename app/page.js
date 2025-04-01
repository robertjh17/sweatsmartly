import Image from "next/image";
import { Link } from '@chakra-ui/next-js'
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import FeaturesSection from "../components/FeatureSection";
import CTASection from "../components/CTASection";
import Navbar from "../components/ui/navigation/Navbar";

export default function Home() {
  return (
    <>
    <HeroSection />
    <AboutSection />
    <FeaturesSection />
    <CTASection />
    </>
  );
}
