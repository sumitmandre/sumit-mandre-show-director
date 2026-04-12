import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import profileImage from "@/assets/profile.jpg";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-10" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-5 gap-12 md:gap-20 items-start">
          {/* Image */}
          <motion.div
            className="md:col-span-2 relative"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <img
                src={profileImage}
                alt="Sumit Mandre - Animation Director"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
            {/* Accent line */}
            <div className="absolute -left-4 top-8 w-px h-24 bg-primary/40" />
          </motion.div>

          {/* Text */}
          <motion.div
            className="md:col-span-3 space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <p className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-3">About</p>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
                Creative Vision,
                <br />
                <span className="text-muted-foreground">Technical Precision</span>
              </h2>
            </div>

            <div className="space-y-5 text-secondary-foreground leading-relaxed text-base md:text-lg">
              <p>
                A versatile and adaptive animation director with over 15 years of experience across 2D, 3D, and live-action projects for international productions. Known for a calm, confident, and solution-driven approach. My key skills include animation direction, storyboarding, character design, and previz. I specialize in leading large teams, handling high-pressure environments, and delivering projects from concept to completion.
              </p>
              <p>
                From client communication, bidding, and proof-of-concept development to pipeline setup, team building, and final execution — I bring end-to-end ownership to every project. My cross-departmental expertise and strong technical foundation allow me to develop efficient workflows and innovative solutions.
              </p>
              <p>
                I thrive on new challenges, adapt to diverse art styles, and focus on fostering growth, positivity, and excellence within teams while consistently delivering high-quality results.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              <div>
                <div className="font-display text-3xl font-bold text-primary">15+</div>
                <div className="text-muted-foreground text-sm">Years Experience</div>
              </div>
              <div className="w-px bg-border" />
              <div>
                <div className="font-display text-3xl font-bold text-primary">40+</div>
                <div className="text-muted-foreground text-sm">Team Size Led</div>
              </div>
              <div className="w-px bg-border" />
              <div>
                <div className="font-display text-3xl font-bold text-primary">50+</div>
                <div className="text-muted-foreground text-sm">Projects Delivered</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
