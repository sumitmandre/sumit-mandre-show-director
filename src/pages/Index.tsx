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
  const [isPlaying, setIsPlaying] = useState(true);

  const handleToggleMute = useCallback(() => setIsMuted((p) => !p), []);
  const handleTogglePlay = useCallback(() => setIsPlaying((p) => !p), []);
  const handleAutoMute = useCallback(() => setIsMuted(true), []);
  const handleUserUnmute = useCallback(() => setIsMuted(false), []);
  const handleUserPlay = useCallback(() => setIsPlaying(true), []);

  return (
    <div className="min-h-screen bg-background">
      <Header
        isMuted={isMuted}
        isPlaying={isPlaying}
        onToggleMute={handleToggleMute}
        onTogglePlay={handleTogglePlay}
      />
      <HeroSection
        isMuted={isMuted}
        isPlaying={isPlaying}
        onAutoMute={handleAutoMute}
        onUserUnmute={handleUserUnmute}
        onUserPlay={handleUserPlay}
      />
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
