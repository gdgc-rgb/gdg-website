import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SlideFadeTransitionProps {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "down";
  duration?: number;
  className?: string;
}

const SlideFadeTransition = ({
  children,
  direction = "right",
  duration = 0.6,
  className = "",
}: SlideFadeTransitionProps) => {
  const getDirectionVariants = () => {
    switch (direction) {
      case "left":
        return {
          initial: { x: -100, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: 100, opacity: 0 },
        };
      case "right":
        return {
          initial: { x: 100, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: -100, opacity: 0 },
        };
      case "up":
        return {
          initial: { y: 100, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          exit: { y: -100, opacity: 0 },
        };
      case "down":
        return {
          initial: { y: -100, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          exit: { y: 100, opacity: 0 },
        };
      default:
        return {
          initial: { x: 100, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: -100, opacity: 0 },
        };
    }
  };

  const variants = getDirectionVariants();

  return (
    <motion.div
      className={`w-full h-full ${className}`}
      initial={variants.initial}
      animate={variants.animate}
      exit={variants.exit}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration,
      }}
    >
      {children}
    </motion.div>
  );
};

export default SlideFadeTransition;
