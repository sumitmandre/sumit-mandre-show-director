import { useEffect, useRef, useState, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface Props {
  videoId: string;
  title?: string;
  className?: string;
  autoplay?: boolean;
}

/**
 * Restricted YouTube embed:
 * - Hides YouTube title bar, channel, "Watch on YouTube" overlay, share/copy link, settings, CC
 * - Custom Play/Pause/Mute controls only
 * - Blocks long-press context menu (prevents copy link on mobile)
 * - Non-downloadable, non-embeddable for others
 */
const RestrictedYouTube = ({ videoId, title = "Clip", className = "", autoplay = false }: Props) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(autoplay);

  const send = useCallback((func: string, args: unknown[] = []) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args }),
      "*"
    );
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) send("pauseVideo");
    else send("playVideo");
    setIsPlaying((p) => !p);
  }, [isPlaying, send]);

  const toggleMute = useCallback(() => {
    if (isMuted) send("unMute");
    else send("mute");
    setIsMuted((m) => !m);
  }, [isMuted, send]);

  useEffect(() => {
    // Block right-click/long-press globally on this component
    const handler = (e: Event) => e.preventDefault();
    const el = iframeRef.current?.parentElement;
    el?.addEventListener("contextmenu", handler);
    return () => el?.removeEventListener("contextmenu", handler);
  }, []);

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
      {/* Click-shield: blocks long-press context menu, link clicks, and YT chrome */}
      <button
        type="button"
        onClick={togglePlay}
        onContextMenu={(e) => e.preventDefault()}
        aria-label={isPlaying ? "Pause" : "Play"}
        className="absolute inset-0 w-full h-full bg-transparent cursor-pointer"
      />

      {/* Center play indicator (only when paused) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-2xl">
            <Play size={28} className="text-primary-foreground ml-1" fill="currentColor" />
          </div>
        </div>
      )}

      {/* Custom controls bar */}
      <div className="absolute bottom-0 left-0 right-0 px-3 py-2 flex items-center gap-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="p-2 rounded-full bg-background/40 hover:bg-background/70 backdrop-blur text-foreground transition-colors"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
          className="p-2 rounded-full bg-background/40 hover:bg-background/70 backdrop-blur text-foreground transition-colors"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
    </div>
  );
};

export default RestrictedYouTube;
