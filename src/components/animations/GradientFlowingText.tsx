import { motion } from "framer-motion";
import { useState } from "react";

interface GradientFlowingTextProps {
  text: string;
  className?: string;
  gradientColors?: string[];
  flowSpeed?: number;
  direction?: "left" | "right";
  trigger?: "scroll" | "hover" | "auto";
  size?: "sm" | "md" | "lg" | "xl";
}

const GradientFlowingText = ({
  text,
  className = "",
  gradientColors = [
    "hsl(var(--primary))",
    "hsl(var(--secondary))",
    "hsl(var(--accent))",
  ],
  flowSpeed = 3,
  direction = "right",
  trigger = "auto",
  size = "md",
}: GradientFlowingTextProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "text-sm";
      case "md":
        return "text-base";
      case "lg":
        return "text-lg";
      case "xl":
        return "text-xl";
      default:
        return "text-base";
    }
  };

  const shouldAnimate = () => {
    switch (trigger) {
      case "hover":
        return isHovered;
      case "scroll":
        return true; // Would need scroll detection
      case "auto":
      default:
        return true;
    }
  };

  const gradientString = gradientColors.join(", ");

  return (
    <motion.span
      className={`
        inline-block font-bold bg-clip-text text-transparent relative
        ${getSizeClasses()}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: `linear-gradient(
          90deg, 
          ${gradientString}, 
          ${gradientColors[0]}
        )`,
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
      animate={
        shouldAnimate()
          ? {
              backgroundPosition: direction === "right" ? "200% 0" : "-200% 0",
            }
          : {}
      }
      transition={{
        duration: flowSpeed,
        repeat: Infinity,
        ease: "linear",
      }}
      whileHover={
        trigger === "hover"
          ? {
              scale: 1.05,
              transition: { duration: 0.2 },
            }
          : {}
      }
    >
      {text}

      {/* Shimmer overlay effect */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
        style={{
          background: `linear-gradient(
            90deg, 
            transparent, 
            rgba(255, 255, 255, 0.4), 
            transparent
          )`,
          mixBlendMode: "overlay",
        }}
        animate={
          shouldAnimate()
            ? {
                x: direction === "right" ? ["0%", "200%"] : ["200%", "0%"],
              }
            : {}
        }
        transition={{
          duration: flowSpeed * 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </motion.span>
  );
};

export default GradientFlowingText;
