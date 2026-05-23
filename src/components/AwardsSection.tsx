import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy } from "lucide-react";
import { awards } from "@/data/projects";
import sumitPhoto from "@/assets/sumit-ann-awards.jpg";

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

        <div className="grid md:grid-cols-5 gap-10 md:gap-14 items-start">
          {/* Photo — left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-2"
          >
            <div className="relative overflow-hidden rounded-sm border border-border bg-secondary">
              <img
                src={sumitPhoto}
                alt="Sumit Mandre with ANN Awards trophies"
                className="w-full h-full object-cover aspect-[4/5]"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                <p className="font-display text-xs tracking-[0.3em] uppercase text-primary">ANN Awards 2025</p>
                <p className="text-white/90 text-sm mt-1">Best Animator & Best Storyboard Artist</p>
              </div>
            </div>
          </motion.div>

          {/* Awards list — right */}
          <div className="md:col-span-3 space-y-0">
            {awards.map((award, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group border-b border-border py-6 md:py-7 flex items-start gap-5 hover:bg-secondary/20 px-3 -mx-3 transition-colors rounded-sm"
              >
                <div className="flex-shrink-0">
                  <div className="w-11 h-11 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Trophy size={16} className="text-primary" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-display text-sm text-primary font-semibold">{award.year}</span>
                    <h3 className="font-display text-base md:text-lg font-semibold leading-tight">{award.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm mt-1">
                    {award.event} — <span className="text-secondary-foreground">{award.project}</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
