import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="projects" className="py-24 md:py-32" ref={ref}>
      <div className="px-6 md:px-10 max-w-7xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-3">Selected Work</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
            Projects & <span className="text-muted-foreground">Productions</span>
          </h2>
        </motion.div>
      </div>

      {/* Horizontal scroll */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-6 md:px-10 pb-6 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => navigate(`/project/${project.id}`)}
            className="group flex-shrink-0 w-[300px] md:w-[400px] snap-start cursor-pointer"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-4">
              <img
                src={project.posterImage}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              {/* Category badge */}
              <div className="absolute top-4 left-4">
                <span className="text-xs tracking-widest uppercase font-display text-primary/80 bg-background/40 backdrop-blur-sm px-3 py-1 rounded-full border border-primary/20">
                  {project.category}
                </span>
              </div>

              {/* Hover arrow */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <ArrowRight size={18} className="text-primary-foreground" />
                </div>
              </div>
            </div>

            <h3 className="font-display text-lg font-semibold tracking-tight group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-muted-foreground text-sm mt-1">{project.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
