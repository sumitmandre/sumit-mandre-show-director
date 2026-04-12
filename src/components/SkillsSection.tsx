import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "@/data/projects";

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const categoryIcons: Record<string, string> = {
    "Direction & Storytelling": "🎬",
    "Team Leadership": "👥",
    "Animation Pipeline": "⚙️",
    "Visual Development": "🎨",
    "Software": "💻",
  };

  return (
    <section id="skills" className="py-24 md:py-32 px-6 md:px-10" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-3">Expertise</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
            Skills & <span className="text-muted-foreground">Capabilities</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, items], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card rounded-sm p-6 md:p-8 group hover:border-primary/20 transition-all duration-500"
            >
              <div className="text-2xl mb-4">{categoryIcons[category] || "📌"}</div>
              <h3 className="font-display text-lg font-semibold mb-4 group-hover:text-primary transition-colors">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-full border border-border hover:border-primary/30 hover:text-foreground transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
