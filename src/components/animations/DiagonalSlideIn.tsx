import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ReactNode } from "react";

interface DiagonalSlideInProps {
  children: ReactNode;
  delay?: number;
  corner?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  distance?: number;
  className?: string;
}

const DiagonalSlideIn = ({
  children,
  delay = 0,
  corner = "top-left",
  distance = 100,
  className = "",
}: DiagonalSlideInProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const cornerVariants = {
    "top-left": { x: -distance, y: -distance },
    "top-right": { x: distance, y: -distance },
    "bottom-left": { x: -distance, y: distance },
    "bottom-right": { x: distance, y: distance },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        ...cornerVariants[corner],
        scale: 0.8,
      }}
      animate={
        inView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              transition: {
                duration: 0.7,
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

export default DiagonalSlideIn;
