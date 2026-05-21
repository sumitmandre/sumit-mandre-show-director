import { useEffect, useRef } from "react";

interface HeroProps {
  isMuted: boolean;
  isPlaying: boolean;
  onAutoMute: () => void;
}

const SHOWREEL_ID = "O4gjv779n68";

const HeroSection = ({ isMuted, isPlaying, onAutoMute }: HeroProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.3) onAutoMute();
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onAutoMute]);

  const post = (func: string) =>
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args: [] }),
      "*"
    );

  useEffect(() => {
    post(isMuted ? "mute" : "unMute");
  }, [isMuted]);

  useEffect(() => {
    post(isPlaying ? "playVideo" : "pauseVideo");
  }, [isPlaying]);

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
        {/* Click-blocker to prevent any YT interaction & block long-press copy-link */}
        <div className="absolute inset-0" onContextMenu={(e) => e.preventDefault()} />
      </div>
    </section>
  );
};

export default HeroSection;
