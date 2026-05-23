import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Film } from "lucide-react";
import { clients } from "@/data/projects";

// Map clients → simpleicons.org slug when a recognizable brand mark exists.
// Unknown brands fall back to a neutral film icon so the grid stays visually consistent.
const ICON_MAP: Record<string, string> = {
  Netflix: "netflix",
  "Amazon Prime": "primevideo",
  Sony: "sony",
  "Cartoon Network": "cartoonnetwork",
  Youku: "youku",
};

const iconUrl = (slug: string) => `https://cdn.simpleicons.org/${slug}/c9a84c`;

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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {clients.map((client, i) => {
            const slug = ICON_MAP[client];
            return (
              <motion.div
                key={client}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card rounded-sm px-4 py-6 flex flex-col items-center justify-center gap-3 group hover:border-primary/30 transition-all duration-500"
              >
                <div className="h-8 w-8 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                  {slug ? (
                    <img
                      src={iconUrl(slug)}
                      alt={`${client} logo`}
                      className="h-7 w-7 object-contain"
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <Film size={20} className="text-primary/70" />
                  )}
                </div>
                <span className="font-display text-xs md:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center leading-tight">
                  {client}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
