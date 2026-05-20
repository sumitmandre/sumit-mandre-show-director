import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface HeroProps {
  isMuted: boolean;
  onAutoMute: () => void;
}

const SHOWREEL_ID = "O4gjv779n68";

const HeroSection = ({ isMuted, onAutoMute }: HeroProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  // Auto-mute when scrolled past hero
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.3) onAutoMute();
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onAutoMute]);

  // Send mute/unmute commands to the YouTube iframe via postMessage
  useEffect(() => {
    if (!iframeRef.current?.contentWindow) return;
    const fn = isMuted ? "mute" : "unMute";
    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({ event: "command", func: fn, args: [] }),
      "*"
    );
  }, [isMuted, ready]);

  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    controls: "0",
    loop: "1",
    playlist: SHOWREEL_ID,
    playsinline: "1",
    modestbranding: "1",
    rel: "0",
    iv_load_policy: "3",
    disablekb: "1",
    fs: "0",
    enablejsapi: "1",
  }).toString();

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-background">
      {/* Showreel background */}
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          ref={iframeRef}
          onLoad={() => setReady(true)}
          src={`https://www.youtube-nocookie.com/embed/${SHOWREEL_ID}?${params}`}
          title="Sumit Mandre — Showreel"
          allow="autoplay; encrypted-media; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-[56.25vw] min-w-full min-h-full pointer-events-none"
        />
        {/* Click-blocker to prevent any YT interaction */}
        <div className="absolute inset-0" />
      </div>

      {/* Cinematic overlay */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 bg-background/40" />

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
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-muted-foreground text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
