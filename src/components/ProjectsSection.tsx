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

      {/* 4-column grid */}
      <div className="px-6 md:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => navigate(`/project/${project.id}`)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-4">
                <img
                  src={project.posterImage}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-border/40 group-hover:ring-primary/40 transition-colors duration-500" />

                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                    <ArrowRight size={16} className="text-primary-foreground" />
                  </div>
                </div>
              </div>

              <p className="text-[10px] tracking-[0.2em] uppercase text-primary/80 font-display mb-1.5">
                {project.category}
              </p>
              <h3 className="font-display text-base md:text-lg font-semibold tracking-tight group-hover:text-primary transition-colors leading-tight">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-xs md:text-sm mt-1">{project.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
