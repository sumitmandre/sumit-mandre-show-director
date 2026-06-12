import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Play, Pause, Headphones, Volume2, VolumeX } from "lucide-react";

interface HeroProps {
  isMuted: boolean;
  isPlaying: boolean;
  onAutoMute: () => void;
  onUserUnmute?: () => void;
  onUserPlay?: () => void;
}

const SHOWREEL_ID = "O4gjv779n68";

const HeroSection = ({ isMuted, isPlaying, onAutoMute, onUserUnmute, onUserPlay }: HeroProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [started, setStarted] = useState(false);
  const [nearEnd, setNearEnd] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const durationRef = useRef<number>(0);

  const post = (func: string, args: unknown[] = []) =>
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args }),
      "*"
    );

  const handleStart = () => {
    setStarted(true);
    // small delay so iframe with autoplay=1 loads — then ensure unmuted & playing in HD
    setTimeout(() => {
      post("unMute");
      post("setVolume", [100]);
      post("playVideo");
      post("setPlaybackQuality", ["hd1080"]);
    }, 250);
    setTimeout(() => post("setPlaybackQuality", ["hd1080"]), 1500);
    setTimeout(() => post("setPlaybackQuality", ["hd1080"]), 3500);
    onUserUnmute?.();
    onUserPlay?.();
  };

  useEffect(() => {
    if (!started) return;
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.3) onAutoMute();
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onAutoMute, started]);

  useEffect(() => {
    if (!started) return;
    post(isMuted ? "mute" : "unMute");
    if (!isMuted) post("setVolume", [100]);
  }, [isMuted, started]);

  useEffect(() => {
    if (!started) return;
    post(isPlaying ? "playVideo" : "pauseVideo");
  }, [isPlaying, started]);

  useEffect(() => {
    if (!started) return;
    const onMsg = (e: MessageEvent) => {
      if (typeof e.data !== "string") return;
      try {
        const data = JSON.parse(e.data);
        if (data.event === "infoDelivery" && data.info) {
          if (typeof data.info.duration === "number" && data.info.duration > 0) {
            durationRef.current = data.info.duration;
            setDuration(data.info.duration);
          }
          if (typeof data.info.currentTime === "number" && durationRef.current > 0) {
            setCurrentTime(data.info.currentTime);
            const remaining = durationRef.current - data.info.currentTime;
            setNearEnd(remaining > 0 && remaining < 8);
          }
        }
      } catch {
        // ignore
      }
    };
    window.addEventListener("message", onMsg);
    const id = setInterval(() => {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "listening" }),
        "*"
      );
    }, 1000);
    return () => {
      window.removeEventListener("message", onMsg);
      clearInterval(id);
    };
  }, [started]);

  const params = new URLSearchParams({
    autoplay: "1",
    mute: "0",
    controls: "0",
    loop: "1",
    playlist: SHOWREEL_ID,
    playsinline: "1",
    modestbranding: "1",
    rel: "0",
    iv_load_policy: "3",
    disablekb: "1",
    fs: "0",
    cc_load_policy: "0",
    enablejsapi: "1",
    vq: "hd1080",
    hd: "1",
  }).toString();

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-background select-none"
      onContextMenu={(e) => e.preventDefault()}
      style={{ WebkitTouchCallout: "none" } as React.CSSProperties}
    >
      {started && (
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${SHOWREEL_ID}?${params}`}
            title="Sumit Mandre — Showreel"
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-[56.25vw] min-w-full min-h-full pointer-events-none"
          />
          <div className="absolute inset-0" onContextMenu={(e) => e.preventDefault()} />
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

      {/* Minimal progress slider — bottom edge */}
      {started && (
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-10 pb-3">
          <input
            type="range"
            min={0}
            max={1000}
            value={duration > 0 ? Math.round((currentTime / duration) * 1000) : 0}
            onChange={(e) => {
              const pct = Number(e.target.value) / 1000;
              if (duration > 0) {
                iframeRef.current?.contentWindow?.postMessage(
                  JSON.stringify({ event: "command", func: "seekTo", args: [pct * duration, true] }),
                  "*"
                );
                setCurrentTime(pct * duration);
              }
            }}
            aria-label="Showreel progress"
            className="w-full h-[2px] appearance-none bg-white/15 rounded-full cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary
              [&::-moz-range-thumb]:w-2 [&::-moz-range-thumb]:h-2 [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0"
            style={{
              background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${
                duration > 0 ? (currentTime / duration) * 100 : 0
              }%, rgba(255,255,255,0.15) ${
                duration > 0 ? (currentTime / duration) * 100 : 0
              }%, rgba(255,255,255,0.15) 100%)`,
            }}
          />
        </div>
      )}
    </section>
  );
};

export default HeroSection;
