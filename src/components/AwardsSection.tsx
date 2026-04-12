import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy } from "lucide-react";
import { awards } from "@/data/projects";

const AwardsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="awards" className="py-24 md:py-32 px-6 md:px-10" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-3">Recognition</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
            Awards & <span className="text-muted-foreground">Achievements</span>
          </h2>
        </motion.div>

        <div className="space-y-0">
          {awards.map((award, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group border-b border-border py-6 md:py-8 flex items-start md:items-center gap-6 hover:bg-secondary/20 px-4 -mx-4 transition-colors duration-300 rounded-sm"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Trophy size={18} className="text-primary" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                  <span className="font-display text-sm text-primary font-semibold">{award.year}</span>
                  <h3 className="font-display text-lg font-semibold">{award.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm mt-1">
                  {award.event} — <span className="text-secondary-foreground">{award.project}</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
