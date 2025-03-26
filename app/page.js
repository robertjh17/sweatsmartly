import Image from "next/image";
import { Link } from '@chakra-ui/next-js'
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import FeaturesSection from "../components/FeatureSection";

export default function Home() {
  return (
    <>
    <HeroSection />
    <AboutSection />
    <FeaturesSection />
    </>
  );
}
