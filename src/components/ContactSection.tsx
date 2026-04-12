import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Linkedin, Instagram, ArrowUpRight } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-10" ref={ref}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          <p className="text-primary font-display text-sm tracking-[0.3em] uppercase">Get In Touch</p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
            Let's Create
            <br />
            <span className="text-gradient">Something Epic</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Available for global leadership roles and creative collaborations.
          </p>

          <div className="pt-8">
            <a
              href="mailto:sumit@mandre.com"
              className="inline-flex items-center gap-3 font-display text-xl md:text-2xl font-semibold text-foreground hover:text-primary transition-colors group"
            >
              <Mail size={24} className="text-primary" />
              sumit@mandre.com
              <ArrowUpRight size={20} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <a
              href="https://linkedin.com/in/sumitmandre"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground text-muted-foreground transition-all duration-300"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://instagram.com/sumitmandre"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground text-muted-foreground transition-all duration-300"
            >
              <Instagram size={18} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Sumit Mandre. All rights reserved.
        </span>
        <span className="text-muted-foreground text-sm">
          Animation Show Director & Creative Leader
        </span>
      </div>
    </section>
  );
};

export default ContactSection;
