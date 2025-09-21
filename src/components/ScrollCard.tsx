import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ReactNode } from "react";

interface ScrollCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  intensity?: "light" | "medium" | "strong";
  shadowLevel?: "soft" | "medium" | "strong" | "glow";
}

const ScrollCard = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  intensity = "medium",
  shadowLevel = "medium",
}: ScrollCardProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Direction variants
  const directionVariants = {
    up: { y: 60, x: 0, scale: 1 },
    down: { y: -60, x: 0, scale: 1 },
    left: { x: 60, y: 0, scale: 1 },
    right: { x: -60, y: 0, scale: 1 },
    scale: { x: 0, y: 0, scale: 0.8 },
  };

  // Intensity settings
  const intensitySettings = {
    light: { duration: 0.4, spring: { damping: 25, stiffness: 120 } },
    medium: { duration: 0.6, spring: { damping: 20, stiffness: 100 } },
    strong: { duration: 0.8, spring: { damping: 15, stiffness: 80 } },
  };

  // Shadow classes
  const shadowClasses = {
    soft: "shadow-soft hover:shadow-medium",
    medium: "shadow-medium hover:shadow-large",
    strong: "shadow-large hover:shadow-xl",
    glow: "shadow-glow hover:shadow-glow-strong",
  };

  const initial = {
    opacity: 0,
    ...directionVariants[direction],
  };

  const animate = inView
    ? {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        transition: {
          ...intensitySettings[intensity],
          delay: delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      }
    : initial;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      className={`
        bg-white border border-gray-200 rounded-xl
        transition-all duration-300 ease-out
        ${shadowClasses[shadowLevel]}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default ScrollCard;
