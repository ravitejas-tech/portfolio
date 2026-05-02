import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface RevealSectionProps {
  children: React.ReactNode;
  delay?: number;
}

export function RevealSection({ children, delay = 0 }: RevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
