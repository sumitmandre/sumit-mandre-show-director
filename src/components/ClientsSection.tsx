import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import netflix from "@/assets/clients-v2/netflix.jpg.asset.json";
import prime from "@/assets/clients-v2/prime.jpg.asset.json";
import sony from "@/assets/clients-v2/sony.jpg.asset.json";
import cn from "@/assets/clients-v2/cn.jpg.asset.json";
import xilam from "@/assets/clients-v2/xilam.jpg.asset.json";
import tvasahi from "@/assets/clients-v2/tvasahi.jpg.asset.json";
import dharma from "@/assets/clients-v2/dharma.jpg.asset.json";
import fantom from "@/assets/clients-v2/fantom.jpg.asset.json";
import applause from "@/assets/clients-v2/applause.jpg.asset.json";
import pinkfong from "@/assets/clients-v2/pinkfong.jpg.asset.json";
import byjus from "@/assets/clients-v2/byjus.jpg.asset.json";
import andolan from "@/assets/clients-v2/andolan.jpg.asset.json";
import pkt from "@/assets/clients-v2/pkt.jpg.asset.json";
import grid from "@/assets/clients-v2/grid.webp.asset.json";

const clientList: { name: string; logo: string }[] = [
  { name: "Netflix", logo: netflix.url },
  { name: "Amazon Prime Video", logo: prime.url },
  { name: "Sony", logo: sony.url },
  { name: "Cartoon Network", logo: cn.url },
  { name: "Xilam", logo: xilam.url },
  { name: "TV Asahi", logo: tvasahi.url },
  { name: "Dharma Productions", logo: dharma.url },
  { name: "Phantom Films", logo: fantom.url },
  { name: "Applause Entertainment", logo: applause.url },
  { name: "Pinkfong", logo: pinkfong.url },
  { name: "Byju's", logo: byjus.url },
  { name: "Andolan Films", logo: andolan.url },
  { name: "Pocket FM", logo: pkt.url },
  { name: "Grid VFX", logo: grid.url },
];

const ClientsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="clients" className="py-20 md:py-28 px-6 md:px-10" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 md:mb-14 text-center"
        >
          <p className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-3">
            Trusted By
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
            Clients & <span className="text-muted-foreground">Collaborators</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-px bg-border/40 rounded-sm overflow-hidden border border-border/40">
          {clientList.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
              title={c.name}
              className="aspect-[5/3] bg-background flex items-center justify-center p-4 md:p-5 group hover:bg-secondary/40 transition-colors"
            >
              <img
                src={c.logo}
                alt={`${c.name} logo`}
                loading="lazy"
                className="max-h-12 md:max-h-14 max-w-full object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-500"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
