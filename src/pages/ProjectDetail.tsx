import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Play, Award } from "lucide-react";
import { projects } from "@/data/projects";

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

  return (
    <div className="min-h-screen bg-background">
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-6 left-6 z-50"
      >
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 backdrop-blur-sm border border-border hover:bg-secondary text-foreground transition-colors font-display text-sm"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      </motion.div>

      {/* Hero image */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img
          src={project.posterImage}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-primary font-display text-sm tracking-[0.3em] uppercase">{project.category}</span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mt-3">
              {project.title}
            </h1>
            <p className="text-primary font-display text-lg mt-2">{project.role}</p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-16 md:py-24 space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="font-display text-2xl font-semibold mb-6">About the Project</h2>
          <p className="text-secondary-foreground text-lg leading-relaxed">
            {project.description}
          </p>
        </motion.div>

        {/* Video placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="glass-card rounded-sm aspect-video flex items-center justify-center cursor-pointer group"
        >
          <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
            <Play size={24} className="text-primary ml-1" />
          </div>
        </motion.div>

        {/* Stills gallery placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <h2 className="font-display text-2xl font-semibold mb-6">Stills</h2>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-video rounded-sm overflow-hidden bg-secondary">
                <img
                  src={project.posterImage}
                  alt={`${project.title} still ${i}`}
                  className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;
