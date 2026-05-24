import { useState, useEffect } from "react";
import { Volume2, VolumeX, Play, Pause, Linkedin, Instagram, Mail } from "lucide-react";
import { motion } from "framer-motion";
import sumitLogo from "@/assets/logos/sumit-logo.jpg";

interface HeaderProps {
  isMuted: boolean;
  isPlaying: boolean;
  onToggleMute: () => void;
  onTogglePlay: () => void;
}

const Header = ({ isMuted, isPlaying, onToggleMute, onTogglePlay }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-sm overflow-hidden border border-primary/30 bg-background">
            <img src={sumitLogo} alt="Sumit Mandre logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight text-foreground">
            Sumit Mandre
          </span>
        </a>

        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={onTogglePlay}
            className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            aria-label={isPlaying ? "Pause showreel" : "Play showreel"}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button
            onClick={onToggleMute}
            className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            aria-label={isMuted ? "Unmute showreel" : "Mute showreel"}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          <div className="h-4 w-px bg-border hidden md:block" />

          <nav className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/sumit-mandre-aab88653"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://www.instagram.com/sumit_mandre"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="mailto:sumitmandre@gmail.com"
              className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
