import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Play, Headphones } from "lucide-react";
import showreelAsset from "@/assets/showreel.mp4.asset.json";

interface HeroProps {
  isMuted: boolean;
  isPlaying: boolean;
  onAutoMute: () => void;
  onUserUnmute?: () => void;
  onUserPlay?: () => void;
  onTogglePlay?: () => void;
  onToggleMute?: () => void;
}

const HeroSection = ({ isMuted, isPlaying, onAutoMute, onUserUnmute, onUserPlay, onTogglePlay }: HeroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [nearEnd, setNearEnd] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const handleStart = async () => {
    setStarted(true);
    const v = videoRef.current;
    if (v) {
      v.muted = false;
      v.volume = 1;
      try {
        await v.play();
      } catch {
        // ignore
      }
    }
    onUserUnmute?.();
    onUserPlay?.();
  };

  // Sync external play/mute toggles
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !started) return;
    v.muted = isMuted;
    if (!isMuted) v.volume = 1;
  }, [isMuted, started]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !started) return;
    if (isPlaying) v.play().catch(() => {});
    else v.pause();
  }, [isPlaying, started]);

  // Auto-mute on scroll past hero
  useEffect(() => {
    if (!started) return;
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.3) onAutoMute();
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onAutoMute, started]);

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    setCurrentTime(v.currentTime);
    if (v.duration > 0) {
      const remaining = v.duration - v.currentTime;
      setNearEnd(remaining > 0 && remaining < 8);
    }
  };

  const onLoadedMetadata = () => {
    const v = videoRef.current;
    if (v && isFinite(v.duration)) setDuration(v.duration);
  };

  const handleVideoClick = () => onTogglePlay?.();

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-background select-none"
      onContextMenu={(e) => e.preventDefault()}
      style={{ WebkitTouchCallout: "none" } as React.CSSProperties}
    >
      {started && (
        <div className="absolute inset-0 overflow-hidden">
          <video
            ref={videoRef}
            src={showreelAsset.url}
            onClick={handleVideoClick}
            onTimeUpdate={onTimeUpdate}
            onLoadedMetadata={onLoadedMetadata}
            onContextMenu={(e) => e.preventDefault()}
            playsInline
            preload="auto"
            controls={false}
            controlsList="nodownload noremoteplayback noplaybackrate nofullscreen"
            disablePictureInPicture
            disableRemotePlayback
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore - non-standard attribute supported by some browsers
            x-webkit-airplay="deny"
            className="absolute inset-0 w-full h-full object-cover cursor-pointer"
          />
          {/* Invisible overlay to swallow right-click on top of <video> */}
          <div
            className="absolute inset-0 pointer-events-none"
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      )}

      {/* Start overlay — gives us a real user gesture so audio can play */}
      <AnimatePresence>
        {!started && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-gradient-to-b from-background via-background/95 to-background"
          >
            <div className="flex flex-col items-center text-center px-6">
              <p className="text-primary font-display text-[10px] md:text-xs tracking-[0.5em] uppercase mb-6">
                Sumit Mandre — Showreel
              </p>
              <button
                type="button"
                onClick={handleStart}
                aria-label="Play showreel"
                className="group relative w-24 h-24 md:w-32 md:h-32 rounded-full border border-primary/40 bg-primary/10 backdrop-blur-sm flex items-center justify-center transition-all duration-500 hover:bg-primary hover:border-primary hover:scale-105"
              >
                <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                <Play
                  size={36}
                  className="text-primary group-hover:text-primary-foreground transition-colors ml-1.5"
                  fill="currentColor"
                />
              </button>
              <p className="mt-8 font-display text-lg md:text-2xl font-semibold tracking-tight text-foreground">
                Play Showreel
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-muted-foreground text-xs md:text-sm">
                <Headphones size={14} className="text-primary" />
                <span className="tracking-wide">Best experienced with sound on</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Small unobtrusive showreel label */}
      {started && (
        <div className="pointer-events-none absolute bottom-6 left-6 md:bottom-8 md:left-10 z-10">
          <span className="font-display text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/50">
            Showreel
          </span>
        </div>
      )}

      {/* Scroll down indicator — appears near end of showreel */}
      {started && (
        <motion.div
          initial={false}
          animate={{ opacity: nearEnd ? 1 : 0, y: nearEnd ? 0 : 10 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="font-display text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/80">
            Scroll Down
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={18} className="text-white/80" />
          </motion.div>
        </motion.div>
      )}

      {/* Minimal time slider — bottom edge */}
      {started && duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-10 pb-3">
          <input
            type="range"
            min={0}
            max={1000}
            value={Math.round((currentTime / duration) * 1000)}
            onChange={(e) => {
              const pct = Number(e.target.value) / 1000;
              const v = videoRef.current;
              if (v) {
                v.currentTime = pct * duration;
                setCurrentTime(v.currentTime);
              }
            }}
            onClick={(e) => e.stopPropagation()}
            aria-label="Showreel progress"
            className="w-full h-[2px] appearance-none bg-white/15 rounded-full cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary
              [&::-moz-range-thumb]:w-2 [&::-moz-range-thumb]:h-2 [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0"
            style={{
              background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${
                (currentTime / duration) * 100
              }%, rgba(255,255,255,0.15) ${
                (currentTime / duration) * 100
              }%, rgba(255,255,255,0.15) 100%)`,
            }}
          />
        </div>
      )}
    </section>
  );
};

export default HeroSection;
