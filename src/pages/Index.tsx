import { useState, useCallback } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import AwardsSection from "@/components/AwardsSection";
import ClientsSection from "@/components/ClientsSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  const [isMuted, setIsMuted] = useState(false);

  const handleToggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const handleAutoMute = useCallback(() => {
    setIsMuted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header isMuted={isMuted} onToggleMute={handleToggleMute} />
      <HeroSection isMuted={isMuted} onAutoMute={handleAutoMute} />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <AwardsSection />
      <ClientsSection />
      <ContactSection />
    </div>
  );
};

export default Index;
