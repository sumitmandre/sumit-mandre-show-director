import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface HeroProps {
  isMuted: boolean;
  isPlaying: boolean;
  onAutoMute: () => void;
  onUserUnmute?: () => void;
}

const SHOWREEL_ID = "O4gjv779n68";

const HeroSection = ({ isMuted, isPlaying, onAutoMute, onUserUnmute }: HeroProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [nearEnd, setNearEnd] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const durationRef = useRef<number>(0);

  const post = (func: string, args: unknown[] = []) =>
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args }),
      "*"
    );

  // Auto-mute on scroll away
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.3) onAutoMute();
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onAutoMute]);

  // Try to unmute on first user gesture (browsers usually block autoplay-with-sound)
  useEffect(() => {
    const unlock = () => {
      post("unMute");
      post("setVolume", [100]);
      onUserUnmute?.();
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
    };
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    window.addEventListener("touchstart", unlock, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
    };
  }, [onUserUnmute]);

  useEffect(() => {
    post(isMuted ? "mute" : "unMute");
    if (!isMuted) post("setVolume", [100]);
  }, [isMuted]);

  useEffect(() => {
    post(isPlaying ? "playVideo" : "pauseVideo");
  }, [isPlaying]);

  // Listen for YT messages to track progress for "scroll down" indicator
  useEffect(() => {
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
    // Subscribe to time updates
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
  }, []);

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
    cc_load_policy: "0",
    enablejsapi: "1",
  }).toString();

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-background select-none"
      onContextMenu={(e) => e.preventDefault()}
      style={{ WebkitTouchCallout: "none" } as React.CSSProperties}
    >
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          ref={iframeRef}
          src={`https://www.youtube-nocookie.com/embed/${SHOWREEL_ID}?${params}`}
          title="Sumit Mandre — Showreel"
          allow="autoplay; encrypted-media; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-[56.25vw] min-w-full min-h-full pointer-events-none"
        />
        <div className="absolute inset-0" onContextMenu={(e) => e.preventDefault()} />
      </div>

      {/* Small unobtrusive showreel label */}
      <div className="pointer-events-none absolute bottom-6 left-6 md:bottom-8 md:left-10 z-10">
        <span className="font-display text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/50">
          Showreel
        </span>
      </div>

      {/* Scroll down indicator — appears near end of showreel */}
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
    </section>
  );
};

export default HeroSection;
