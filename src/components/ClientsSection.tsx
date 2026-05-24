import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import netflix from "@/assets/clients/c09.png";
import primeVideo from "@/assets/clients/c13.png";
import xilam from "@/assets/clients/c15.jpg";
import youku from "@/assets/clients/c03.jpg";
import cartoonNetwork from "@/assets/clients/cartoonnetwork.png";
import sony from "@/assets/clients/c02.png";
import reliance from "@/assets/clients/c10.png";
import phantom from "@/assets/clients/c01.jpg";
import grid from "@/assets/clients/grid.webp";
import pocketFm from "@/assets/clients/c06.jpg";
import byjus from "@/assets/clients/byjus.png";
import pinkfong from "@/assets/clients/c11.jpg";
import applause from "@/assets/clients/applause.png";
import tvAsahi from "@/assets/clients/tvasahi.png";
import dharma from "@/assets/clients/c12.jpg";
import andolan from "@/assets/clients/andolan.png";

const clientList: { name: string; logo: string }[] = [
  { name: "Netflix", logo: netflix },
  { name: "Amazon Prime Video", logo: primeVideo },
  { name: "Sony", logo: sony },
  { name: "Cartoon Network", logo: cartoonNetwork },
  { name: "Xilam", logo: xilam },
  { name: "Youku", logo: youku },
  { name: "TV Asahi", logo: tvAsahi },
  { name: "Dharma Productions", logo: dharma },
  { name: "Reliance Entertainment", logo: reliance },
  { name: "Phantom Films", logo: phantom },
  { name: "Andolan Films", logo: andolan },
  { name: "Applause Entertainment", logo: applause },
  { name: "Grid", logo: grid },
  { name: "Pocket FM", logo: pocketFm },
  { name: "Pinkfong", logo: pinkfong },
  { name: "Byju's", logo: byjus },
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

        {/* Compact logo grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-px bg-border/40 rounded-sm overflow-hidden border border-border/40">
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
                className="max-h-10 md:max-h-12 max-w-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-500 [filter:grayscale(100%)_brightness(1.1)] group-hover:[filter:grayscale(0%)_brightness(1)]"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
