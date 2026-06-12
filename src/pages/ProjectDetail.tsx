import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Play, Award, Maximize2 } from "lucide-react";
import { projects } from "@/data/projects";
import Lightbox, { type LightboxItem } from "@/components/Lightbox";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const ids = project?.videoEmbedIds ?? (project?.videoEmbedId ? [project.videoEmbedId] : []);
  const showVideo = !!project && !project.hideVideo && ids.length > 0;
  const showExternal = !!project && !project.hideVideo && !ids.length && project.externalUrl;
  const showStills = !!project && !project.imageSections && project.stills && project.stills.length > 0;

  // Build a unified media list for the lightbox
  const lightboxItems = useMemo<LightboxItem[]>(() => {
    if (!project) return [];
    const items: LightboxItem[] = [];
    ids.forEach((vid) =>
      items.push({ type: "video", videoId: vid, title: `${project.title} — clip` })
    );
    project.stills?.forEach((src) =>
      items.push({ type: "image", src, alt: `${project.title} still` })
    );
    project.imageSections?.forEach((s) =>
      s.images.forEach((src) => items.push({ type: "image", src, alt: s.heading }))
    );
    return items;
  }, [project, ids]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-display text-2xl font-bold">Project not found</h1>
          <button onClick={() => navigate("/")} className="text-primary hover:underline">
            Go back home
          </button>
        </div>
      </div>
    );
  }

  // Index helpers based on insertion order above
  const videoCount = ids.length;
  const stillsStart = videoCount;
  let imageSectionStart = stillsStart + (project.stills?.length ?? 0);
  const sectionIndexBase: number[] = [];
  project.imageSections?.forEach((s) => {
    sectionIndexBase.push(imageSectionStart);
    imageSectionStart += s.images.length;
  });

  return (
    <div className="min-h-screen bg-background">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed top-6 left-6 z-50">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 backdrop-blur-sm border border-border hover:bg-secondary text-foreground transition-colors font-display text-sm"
        >
          <ArrowLeft size={16} /> Back
        </button>
      </motion.div>

      {/* Hero */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img src={project.posterImage} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-primary font-display text-sm tracking-[0.3em] uppercase">
              {project.category}
            </span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mt-3">
              {project.title}
            </h1>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 border border-primary/40 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-primary font-display text-sm md:text-base font-semibold tracking-wide">
                My Role — {project.role}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-16 md:py-24 space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="font-display text-2xl font-semibold mb-6">About the Project</h2>
          <p className="text-secondary-foreground text-lg leading-relaxed whitespace-pre-line">
            {project.description}
          </p>
        </motion.div>

        {(project.director || project.awards?.length) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid md:grid-cols-2 gap-8 border-t border-border pt-12"
          >
            <div className="space-y-3">
              {project.director && (
                <div>
                  <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-display">Director</p>
                  <p className="text-foreground mt-1">{project.director}</p>
                </div>
              )}
              {project.cast && (
                <div>
                  <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-display">Cast</p>
                  <p className="text-foreground mt-1">{project.cast}</p>
                </div>
              )}
            </div>
            {project.awards?.length && (
              <div>
                <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-display mb-3">Recognition</p>
                <ul className="space-y-2">
                  {project.awards.map((a) => (
                    <li key={a} className="flex items-start gap-2 text-foreground">
                      <Award size={16} className="text-primary mt-1 flex-shrink-0" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}

        {/* Embedded clip(s) — click opens fullscreen lightbox */}
        {showVideo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="space-y-4"
          >
            <h2 className="font-display text-2xl font-semibold">{ids.length > 1 ? "Clips" : "Clip"}</h2>
            <div className={ids.length > 1 ? "grid md:grid-cols-2 gap-4" : ""}>
              {ids.map((vid, i) => (
                <button
                  type="button"
                  key={vid}
                  onClick={() => setLightboxIndex(i)}
                  className="relative w-full aspect-video bg-black rounded-sm overflow-hidden group"
                >
                  <img
                    src={`https://i.ytimg.com/vi/${vid}/hqdefault.jpg`}
                    alt={`${project.title} clip ${i + 1}`}
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/90 group-hover:bg-primary flex items-center justify-center shadow-2xl">
                      <Play size={28} className="text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Click to play in fullscreen. Preview only — not available for download.
            </p>
          </motion.div>
        )}

        {/* External link tile */}
        {showExternal && (
          <motion.a
            href={project.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="block glass-card rounded-sm aspect-video flex items-center justify-center group hover:border-primary/40 transition-colors"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <Play size={24} className="text-primary ml-1" />
              </div>
              <span className="font-display text-sm text-muted-foreground group-hover:text-foreground">Watch on YouTube →</span>
            </div>
          </motion.a>
        )}

        {/* Stills */}
        {showStills && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }}>
            <h2 className="font-display text-2xl font-semibold mb-6">Stills</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {project.stills!.map((src, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setLightboxIndex(stillsStart + i)}
                  className="relative aspect-video rounded-sm overflow-hidden bg-secondary group"
                >
                  <img
                    src={src}
                    alt={`${project.title} still ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <Maximize2 size={18} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Image sections (illustrations / cartoons) */}
        {project.imageSections?.map((section, si) => {
          const isCartoonCollage = /cartoon/i.test(section.heading ?? "");
          const base = sectionIndexBase[si];
          return (
            <motion.div
              key={si}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + si * 0.1, duration: 0.6 }}
            >
              {section.heading && (
                <h2 className="font-display text-2xl font-semibold mb-6">{section.heading}</h2>
              )}
              {section.images.length === 0 ? (
                <p className="text-muted-foreground text-sm italic">Gallery coming soon.</p>
              ) : isCartoonCollage ? (
                <div className="space-y-4 -mx-6 md:-mx-10">
                  {section.images.map((src, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setLightboxIndex(base + i)}
                      className="w-full bg-secondary overflow-hidden block"
                    >
                      <img
                        src={src}
                        alt={`${section.heading} ${i + 1}`}
                        className="w-full h-auto object-contain"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {section.images.map((src, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setLightboxIndex(base + i)}
                      className="relative aspect-square rounded-sm overflow-hidden bg-secondary group"
                    >
                      <img
                        src={src}
                        alt={`${section.heading} ${i + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <Maximize2 size={18} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <Lightbox
        items={lightboxItems}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </div>
  );
};

export default ProjectDetail;
