import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Clapperboard,
  PenTool,
  Users,
  Workflow,
  Sparkles,
  Cpu,
  Film,
  Camera,
} from "lucide-react";

/** Software with proficiency (out of 6) — mirrors the reference card */
const software: { name: string; level: number; letter: string; color: string }[] = [
  { name: "Photoshop",      level: 6, letter: "Ps", color: "#31A8FF" },
  { name: "Storyboard Pro", level: 5, letter: "Sb", color: "#E36F1E" },
  { name: "Blender",        level: 4, letter: "Bl", color: "#F5792A" },
  { name: "After Effects",  level: 5, letter: "Ae", color: "#9999FF" },
  { name: "Adobe Animate",  level: 6, letter: "An", color: "#FF7C00" },
  { name: "Anime / Moho",   level: 6, letter: "Mo", color: "#7DD3C0" },
  { name: "Premiere Pro",   level: 5, letter: "Pr", color: "#9999FF" },
  { name: "Autodesk Maya",  level: 3, letter: "Ma", color: "#0696D7" },
  { name: "Unreal Engine",  level: 4, letter: "Ue", color: "#E5E5E5" },
  { name: "AI Pipeline",    level: 4, letter: "AI", color: "#C9A84C" },
];

const coreSkills: { icon: React.ElementType; label: string }[] = [
  { icon: Clapperboard, label: "Animation Direction & Cinematic Storytelling" },
  { icon: PenTool,      label: "Storyboarding, Previz & Shot Composition" },
  { icon: Users,        label: "Team Leadership — 40+ artists, multi-studio" },
  { icon: Workflow,     label: "Pipeline Architecture & Production Scheduling" },
  { icon: Sparkles,     label: "Character & Visual Development, Art Direction" },
  { icon: Cpu,          label: "AI Pipeline — Veo3, Kling, Meshy.ai, Metahuman" },
  { icon: Camera,       label: "Virtual Production — Unreal, LiDAR, Mocap" },
  { icon: Film,         label: "Client Communication, Pitching & Bidding" },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 md:py-32 px-6 md:px-10" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          <p className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-3">
            Expertise
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
            Software & <span className="text-muted-foreground">Skills</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* SOFTWARE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card rounded-sm p-6 md:p-10"
          >
            <h3 className="font-display text-xs tracking-[0.4em] uppercase text-muted-foreground mb-8">
              Software
            </h3>
            <ul className="space-y-4">
              {software.map((s, i) => (
                <motion.li
                  key={s.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.04 }}
                  className="flex items-center gap-4"
                >
                  <span
                    className="flex-shrink-0 w-9 h-9 rounded-sm flex items-center justify-center font-display text-[11px] font-bold border"
                    style={{
                      color: s.color,
                      borderColor: `${s.color}55`,
                      background: `${s.color}12`,
                    }}
                    aria-hidden
                  >
                    {s.letter}
                  </span>
                  <span className="flex-1 text-sm md:text-base text-foreground font-medium">
                    {s.name}
                  </span>
                  <span className="flex gap-1.5" aria-label={`Proficiency ${s.level} of 6`}>
                    {Array.from({ length: 6 }).map((_, idx) => (
                      <span
                        key={idx}
                        className={`block h-2.5 w-2.5 rotate-45 border ${
                          idx < s.level
                            ? "bg-primary border-primary"
                            : "bg-transparent border-border"
                        }`}
                      />
                    ))}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* SKILLS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card rounded-sm p-6 md:p-10"
          >
            <h3 className="font-display text-xs tracking-[0.4em] uppercase text-muted-foreground mb-8">
              Skills
            </h3>
            <ul className="space-y-4">
              {coreSkills.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.li
                    key={s.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                    className="flex items-start gap-4 group"
                  >
                    <span className="flex-shrink-0 w-9 h-9 rounded-sm border border-primary/30 bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <Icon size={16} strokeWidth={1.75} />
                    </span>
                    <span className="text-sm md:text-base text-foreground leading-relaxed pt-1.5">
                      {s.label}
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
