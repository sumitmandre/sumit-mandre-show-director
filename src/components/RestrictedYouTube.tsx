import { useEffect, useRef, useState, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface Props {
  videoId: string;
  title?: string;
  className?: string;
  autoplay?: boolean;
}

const RestrictedYouTube = ({ videoId, title = "Clip", className = "", autoplay = false }: Props) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(autoplay);
  const [progress, setProgress] = useState(0); // 0..1
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const send = useCallback((func: string, args: unknown[] = []) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args }),
      "*"
    );
  }, []);

  const forceHD = useCallback(() => {
    send("setPlaybackQuality", ["hd1080"]);
    // Some clients ignore the first call until playback has begun
    setTimeout(() => send("setPlaybackQuality", ["hd1080"]), 800);
    setTimeout(() => send("setPlaybackQuality", ["hd1080"]), 2500);
  }, [send]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      send("pauseVideo");
    } else {
      // First user gesture on this video — unmute so audio plays from the start
      if (isMuted) {
        send("unMute");
        send("setVolume", [100]);
        setIsMuted(false);
      }
      send("playVideo");
      forceHD();
    }
    setIsPlaying((p) => !p);
  }, [isPlaying, isMuted, send, forceHD]);

  const toggleMute = useCallback(() => {
    if (isMuted) send("unMute");
    else send("mute");
    setIsMuted((m) => !m);
  }, [isMuted, send]);

  // Poll the iframe for current time/duration
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (typeof e.data !== "string") return;
      try {
        const data = JSON.parse(e.data);
        if (data.event === "infoDelivery" && data.info) {
          if (typeof data.info.duration === "number" && data.info.duration > 0)
            setDuration(data.info.duration);
          if (typeof data.info.currentTime === "number") {
            setCurrentTime(data.info.currentTime);
            const d = data.info.duration ?? duration;
            if (d > 0) setProgress(Math.min(1, data.info.currentTime / d));
          }
        }
      } catch {
        // ignore
      }
    };
    window.addEventListener("message", onMsg);
    const id = setInterval(() => {
      iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ event: "listening" }), "*");
    }, 500);
    return () => {
      window.removeEventListener("message", onMsg);
      clearInterval(id);
    };
  }, [duration]);

  // If autoplay, kick HD + unmute once the iframe is ready
  useEffect(() => {
    if (!autoplay) return;
    const t1 = setTimeout(() => {
      send("unMute");
      send("setVolume", [100]);
      send("playVideo");
      forceHD();
      setIsMuted(false);
    }, 600);
    return () => clearTimeout(t1);
  }, [autoplay, send, forceHD]);

  const seek = (pct: number) => {
    if (duration > 0) {
      send("seekTo", [pct * duration, true]);
      setProgress(pct);
    }
  };

  const fmt = (t: number) => {
    if (!isFinite(t) || t <= 0) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    mute: autoplay ? "1" : "0",
    controls: "0",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    fs: "0",
    iv_load_policy: "3",
    disablekb: "1",
    cc_load_policy: "0",
    showinfo: "0",
    enablejsapi: "1",
    vq: "hd1080",
    hd: "1",
  }).toString();

  return (
    <div
      className={`relative bg-black overflow-hidden group select-none ${className}`}
      style={{ WebkitTouchCallout: "none", WebkitUserSelect: "none" } as React.CSSProperties}
      onContextMenu={(e) => e.preventDefault()}
    >
      <iframe
        ref={iframeRef}
        src={`https://www.youtube-nocookie.com/embed/${videoId}?${params}`}
        title={title}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen={false}
        referrerPolicy="strict-origin-when-cross-origin"
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      <button
        type="button"
        onClick={togglePlay}
        onContextMenu={(e) => e.preventDefault()}
        aria-label={isPlaying ? "Pause" : "Play"}
        className="absolute inset-0 w-full h-full bg-transparent cursor-pointer"
      />

      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-2xl">
            <Play size={28} className="text-primary-foreground ml-1" fill="currentColor" />
          </div>
        </div>
      )}

      {/* Controls + minimal slider */}
      <div className="absolute bottom-0 left-0 right-0 px-3 pb-2 pt-6 flex flex-col gap-1.5 bg-gradient-to-t from-black/85 to-transparent opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
        {/* Slider */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] tabular-nums text-white/70 font-display w-8">{fmt(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={1000}
            value={Math.round(progress * 1000)}
            onChange={(e) => seek(Number(e.target.value) / 1000)}
            onClick={(e) => e.stopPropagation()}
            aria-label="Seek"
            className="flex-1 h-[2px] appearance-none bg-white/20 rounded-full accent-primary cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary
              [&::-moz-range-thumb]:w-2.5 [&::-moz-range-thumb]:h-2.5 [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0"
            style={{
              background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${
                progress * 100
              }%, rgba(255,255,255,0.18) ${progress * 100}%, rgba(255,255,255,0.18) 100%)`,
            }}
          />
          <span className="text-[10px] tabular-nums text-white/70 font-display w-8 text-right">{fmt(duration)}</span>
        </div>
        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="p-1.5 rounded-full bg-background/40 hover:bg-background/70 backdrop-blur text-foreground transition-colors"
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute" : "Mute"}
            className="p-1.5 rounded-full bg-background/40 hover:bg-background/70 backdrop-blur text-foreground transition-colors"
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestrictedYouTube;
