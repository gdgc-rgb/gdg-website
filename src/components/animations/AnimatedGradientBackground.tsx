import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedGradientBackgroundProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  direction?: "horizontal" | "vertical" | "diagonal" | "radial";
  speed?: "slow" | "medium" | "fast";
  intensity?: "subtle" | "medium" | "vibrant";
}

const AnimatedGradientBackground = ({
  children,
  className = "",
  colors = [
    "hsl(var(--primary))",
    "hsl(var(--secondary))",
    "hsl(var(--accent))",
  ],
  direction = "diagonal",
  speed = "medium",
  intensity = "subtle",
}: AnimatedGradientBackgroundProps) => {
  const getSpeedDuration = () => {
    switch (speed) {
      case "slow":
        return 8;
      case "medium":
        return 5;
      case "fast":
        return 3;
      default:
        return 5;
    }
  };

  const getIntensityOpacity = () => {
    switch (intensity) {
      case "subtle":
        return 0.1;
      case "medium":
        return 0.2;
      case "vibrant":
        return 0.4;
      default:
        return 0.1;
    }
  };

  const getGradientDirection = () => {
    switch (direction) {
      case "horizontal":
        return "90deg";
      case "vertical":
        return "180deg";
      case "diagonal":
        return "135deg";
      case "radial":
        return "circle";
      default:
        return "135deg";
    }
  };

  const duration = getSpeedDuration();
  const opacity = getIntensityOpacity();
  const gradientDir = getGradientDirection();

  // Create multiple gradient variations for smooth transitions
  const gradientVariations = [
    `${
      direction === "radial" ? "radial-gradient" : "linear-gradient"
    }(${gradientDir}, ${colors[0]}${Math.round(opacity * 255).toString(16)}, ${
      colors[1]
    }${Math.round(opacity * 255).toString(16)}, ${colors[2]}${Math.round(
      opacity * 255
    ).toString(16)})`,
    `${
      direction === "radial" ? "radial-gradient" : "linear-gradient"
    }(${gradientDir}, ${colors[1]}${Math.round(opacity * 255).toString(16)}, ${
      colors[2]
    }${Math.round(opacity * 255).toString(16)}, ${colors[0]}${Math.round(
      opacity * 255
    ).toString(16)})`,
    `${
      direction === "radial" ? "radial-gradient" : "linear-gradient"
    }(${gradientDir}, ${colors[2]}${Math.round(opacity * 255).toString(16)}, ${
      colors[0]
    }${Math.round(opacity * 255).toString(16)}, ${colors[1]}${Math.round(
      opacity * 255
    ).toString(16)})`,
  ];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Animated gradient layers */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: gradientVariations[0],
        }}
        animate={{
          background: gradientVariations,
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Secondary gradient layer for depth */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `${
            direction === "radial" ? "radial-gradient" : "linear-gradient"
          }(${
            gradientDir === "90deg"
              ? "270deg"
              : gradientDir === "180deg"
              ? "0deg"
              : gradientDir === "135deg"
              ? "315deg"
              : gradientDir
          }, ${colors[2]}${Math.round(opacity * 0.5 * 255).toString(
            16
          )}, transparent, ${colors[0]}${Math.round(
            opacity * 0.5 * 255
          ).toString(16)})`,
        }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scale: direction === "radial" ? [1, 1.1, 1] : [1, 1.05, 1],
        }}
        transition={{
          duration: duration * 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AnimatedGradientBackground;
