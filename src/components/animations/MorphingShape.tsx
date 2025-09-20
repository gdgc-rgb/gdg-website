import { motion } from "framer-motion";
import { useState, ReactNode } from "react";

interface MorphingShapeProps {
  children: ReactNode;
  className?: string;
  shapes?: {
    initial: string;
    hover: string;
    active?: string;
  };
  colors?: {
    initial: string;
    hover: string;
    active?: string;
  };
  duration?: number;
}

const MorphingShape = ({
  children,
  className = "",
  shapes = {
    initial: "16px",
    hover: "50%",
  },
  colors = {
    initial: "hsl(var(--card))",
    hover: "hsl(var(--primary) / 0.1)",
  },
  duration = 0.4,
}: MorphingShapeProps) => {
  const [state, setState] = useState<"initial" | "hover" | "active">("initial");

  const getCurrentShape = () => {
    switch (state) {
      case "hover":
        return shapes.hover;
      case "active":
        return shapes.active || shapes.hover;
      default:
        return shapes.initial;
    }
  };

  const getCurrentColor = () => {
    switch (state) {
      case "hover":
        return colors.hover;
      case "active":
        return colors.active || colors.hover;
      default:
        return colors.initial;
    }
  };

  return (
    <motion.div
      className={`relative overflow-hidden cursor-pointer ${className}`}
      onMouseEnter={() => setState("hover")}
      onMouseLeave={() => setState("initial")}
      onMouseDown={() => setState("active")}
      onMouseUp={() => setState("hover")}
      animate={{
        borderRadius: getCurrentShape(),
        backgroundColor: getCurrentColor(),
      }}
      transition={{
        duration,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        scale: 1.05,
        rotate: state === "active" ? 5 : 0,
      }}
      whileTap={{
        scale: 0.95,
      }}
    >
      {/* Morphing background pattern */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: `repeating-conic-gradient(from 0deg at 50% 50%, 
            transparent 0deg, 
            hsl(var(--primary)) 15deg, 
            transparent 30deg)`,
        }}
        animate={{
          rotate: state === "hover" ? 360 : 0,
          scale: state === "active" ? 1.2 : 1,
        }}
        transition={{
          duration: state === "hover" ? 8 : 0,
          repeat: state === "hover" ? Infinity : 0,
          ease: "linear",
        }}
      />

      {/* Liquid blob effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${
            state === "hover" ? "30% 70%" : "50% 50%"
          }, hsl(var(--primary) / 0.1), transparent 60%)`,
        }}
        animate={{
          scale: state === "hover" ? [1, 1.2, 1] : 1,
          rotate: state === "active" ? 180 : 0,
        }}
        transition={{
          scale: {
            duration: 2,
            repeat: state === "hover" ? Infinity : 0,
            ease: "easeInOut",
          },
          rotate: {
            duration: 0.6,
            ease: "backOut",
          },
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default MorphingShape;
