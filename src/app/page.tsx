import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ChatButton from "@/components/ChatButton";
import CursorSpotlight from "@/components/CursorSpotlight";
import AmbientOrbs from "@/components/AmbientOrbs";
import AuroraWaves from "@/components/AuroraWaves";

export default function Home() {
  return (
    <>
      {/* Ambient background layers — sit below everything */}
      <AmbientOrbs />
      <AuroraWaves />
      <CursorSpotlight />

      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
      <ChatButton />
    </>
  );
}
