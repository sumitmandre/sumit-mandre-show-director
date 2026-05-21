import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Play, Award } from "lucide-react";
import { projects } from "@/data/projects";
import RestrictedYouTube from "@/components/RestrictedYouTube";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);

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

  const ids = project.videoEmbedIds ?? (project.videoEmbedId ? [project.videoEmbedId] : []);
  const showVideo = !project.hideVideo && ids.length > 0;
  const showExternal = !project.hideVideo && !ids.length && project.externalUrl;
  const showStills = !project.imageSections && project.stills && project.stills.length > 0;

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
            {/* Highlighted role */}
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

        {/* Embedded clip(s) */}
        {showVideo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="space-y-4"
          >
            <h2 className="font-display text-2xl font-semibold">{ids.length > 1 ? "Clips" : "Clip"}</h2>
            <div className={ids.length > 1 ? "grid md:grid-cols-2 gap-4" : ""}>
              {ids.map((vid) => (
                <RestrictedYouTube key={vid} videoId={vid} title={`${project.title} — clip`} className="aspect-video rounded-sm" />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Clips embedded for preview only. Not available for download or external embedding.
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
                <div key={i} className="aspect-video rounded-sm overflow-hidden bg-secondary">
                  <img
                    src={src}
                    alt={`${project.title} still ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Image sections (illustrations / cartoons) */}
        {project.imageSections?.map((section, si) => (
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
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {section.images.map((src, i) => (
                  <div key={i} className="aspect-square rounded-sm overflow-hidden bg-secondary">
                    <img
                      src={src}
                      alt={`${section.heading} ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetail;
