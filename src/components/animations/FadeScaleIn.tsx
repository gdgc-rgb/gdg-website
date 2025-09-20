import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ReactNode } from "react";

interface FadeScaleInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  initialScale?: number;
  className?: string;
}

const FadeScaleIn = ({
  children,
  delay = 0,
  duration = 0.6,
  initialScale = 0.9,
  className = "",
}: FadeScaleInProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        scale: initialScale,
      }}
      animate={
        inView
          ? {
              opacity: 1,
              scale: 1,
              transition: {
                duration,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            }
          : {}
      }
    >
      {children}
    </motion.div>
  );
};

export default FadeScaleIn;
