import { motion } from "framer-motion";
import { ReactNode } from "react";

interface LiquidSwipeTransitionProps {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "down";
  duration?: number;
  className?: string;
  color?: string;
}

const LiquidSwipeTransition = ({
  children,
  direction = "right",
  duration = 0.8,
  className = "",
  color = "hsl(var(--primary))",
}: LiquidSwipeTransitionProps) => {
  const getClipPath = (progress: number) => {
    switch (direction) {
      case "left":
        return `polygon(0% 0%, ${progress * 100}% 0%, ${
          progress * 100 - 10
        }% 100%, 0% 100%)`;
      case "right":
        return `polygon(${100 - progress * 100}% 0%, 100% 0%, 100% 100%, ${
          100 - progress * 100 + 10
        }% 100%)`;
      case "up":
        return `polygon(0% 0%, 100% 0%, 100% ${progress * 100}%, 0% ${
          progress * 100 - 10
        }%)`;
      case "down":
        return `polygon(0% ${100 - progress * 100}%, 100% ${
          100 - progress * 100 + 10
        }%, 100% 100%, 0% 100%)`;
      default:
        return `polygon(${100 - progress * 100}% 0%, 100% 0%, 100% 100%, ${
          100 - progress * 100 + 10
        }% 100%)`;
    }
  };

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Liquid transition overlay */}
      <motion.div
        className="absolute inset-0 z-50"
        style={{
          background: `linear-gradient(135deg, ${color}, ${color}dd)`,
        }}
        initial={{
          clipPath: getClipPath(0),
        }}
        animate={{
          clipPath: [getClipPath(0), getClipPath(1), getClipPath(1)],
        }}
        exit={{
          clipPath: [getClipPath(1), getClipPath(0)],
        }}
        transition={{
          duration,
          ease: [0.65, 0, 0.35, 1], // Custom cubic-bezier for liquid effect
          times: [0, 0.6, 1],
        }}
      />

      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 z-40"
        style={{
          background: `radial-gradient(circle, ${color}40, transparent 70%)`,
        }}
        initial={{
          scale: 0,
          opacity: 0,
        }}
        animate={{
          scale: [0, 2, 3],
          opacity: [0, 0.6, 0],
        }}
        transition={{
          duration: duration * 0.8,
          ease: "easeOut",
          delay: duration * 0.1,
        }}
      />

      {/* Content container */}
      <motion.div
        className="relative z-10 w-full h-full"
        initial={{
          scale: 0.95,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        exit={{
          scale: 1.05,
          opacity: 0,
        }}
        transition={{
          duration: duration * 0.5,
          delay: duration * 0.3,
          ease: "easeOut",
        }}
      >
        {children}
      </motion.div>

      {/* Particle burst effect */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: color,
              left: "50%",
              top: "50%",
            }}
            initial={{
              scale: 0,
              x: 0,
              y: 0,
              opacity: 1,
            }}
            animate={{
              scale: [0, 1, 0],
              x: [0, Math.cos((i * 45 * Math.PI) / 180) * 100],
              y: [0, Math.sin((i * 45 * Math.PI) / 180) * 100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: duration * 0.6,
              delay: duration * 0.2 + i * 0.05,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LiquidSwipeTransition;
