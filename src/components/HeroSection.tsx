import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";

interface HeroProps {
  isMuted: boolean;
  onAutoMute: () => void;
}

const HeroSection = ({ isMuted, onAutoMute }: HeroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.3) {
        onAutoMute();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onAutoMute]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPaused(false);
    } else {
      videoRef.current.pause();
      setIsPaused(true);
    }
  };

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      {/* Video Background - using a cinematic gradient as placeholder */}
      <div className="absolute inset-0 bg-background">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 30% 50%, hsla(38,70%,55%,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, hsla(220,60%,30%,0.1) 0%, transparent 50%)",
          }}
        />
        {/* Animated grain texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Hero gradient overlay */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-32 px-6 md:px-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-primary font-display text-sm md:text-base tracking-[0.3em] uppercase mb-4">
            Animation Show Director
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-6">
            Directing Stories.
            <br />
            <span className="text-gradient">Building Worlds.</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl leading-relaxed">
            15+ years crafting international animation &amp; film projects across 2D, 3D, and live-action formats.
          </p>
        </motion.div>

        {/* Play/Pause control */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          onClick={togglePlay}
          className="absolute bottom-8 right-8 md:bottom-12 md:right-12 p-3 rounded-full border border-border bg-secondary/50 backdrop-blur-sm hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
          aria-label={isPaused ? "Play" : "Pause"}
        >
          {isPaused ? <Play size={20} /> : <Pause size={20} />}
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-muted-foreground text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
