import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { clients } from "@/data/projects";

const ClientsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="clients" className="py-24 md:py-32 px-6 md:px-10" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <p className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-3">Trusted By</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
            Clients & <span className="text-muted-foreground">Collaborators</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6">
          {clients.map((client, i) => (
            <motion.div
              key={client}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card rounded-sm p-4 md:p-6 flex items-center justify-center group hover:border-primary/20 transition-all duration-500 cursor-default"
            >
              <span className="font-display text-xs md:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center leading-tight">
                {client}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
