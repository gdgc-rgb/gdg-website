import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ZoomThroughTransitionProps {
  children: ReactNode;
  zoomOrigin?: { x: number; y: number } | "center";
  duration?: number;
  className?: string;
  intensity?: "subtle" | "medium" | "dramatic";
}

const ZoomThroughTransition = ({
  children,
  zoomOrigin = "center",
  duration = 0.7,
  className = "",
  intensity = "medium",
}: ZoomThroughTransitionProps) => {
  const getTransformOrigin = () => {
    if (zoomOrigin === "center") {
      return "center center";
    }
    return `${zoomOrigin.x}% ${zoomOrigin.y}%`;
  };

  const getIntensityScale = () => {
    switch (intensity) {
      case "subtle":
        return { initial: 0.9, peak: 1.1, exit: 1.2 };
      case "medium":
        return { initial: 0.8, peak: 1.2, exit: 1.4 };
      case "dramatic":
        return { initial: 0.6, peak: 1.5, exit: 1.8 };
      default:
        return { initial: 0.8, peak: 1.2, exit: 1.4 };
    }
  };

  const scaleValues = getIntensityScale();

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Zoom mask overlay */}
      <motion.div
        className="absolute inset-0 z-40"
        style={{
          background: `radial-gradient(circle at ${
            zoomOrigin === "center"
              ? "center"
              : `${zoomOrigin.x}% ${zoomOrigin.y}%`
          }, transparent 30%, rgba(0,0,0,0.8) 70%)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration,
          times: [0, 0.3, 1],
          ease: "easeInOut",
        }}
      />

      {/* Content with zoom effect */}
      <motion.div
        className="relative z-10 w-full h-full"
        style={{
          transformOrigin: getTransformOrigin(),
        }}
        initial={{
          scale: scaleValues.initial,
          opacity: 0,
          filter: "blur(2px)",
        }}
        animate={{
          scale: [scaleValues.initial, scaleValues.peak, 1],
          opacity: [0, 0.5, 1],
          filter: ["blur(2px)", "blur(1px)", "blur(0px)"],
        }}
        exit={{
          scale: scaleValues.exit,
          opacity: 0,
          filter: "blur(2px)",
        }}
        transition={{
          duration,
          ease: [0.25, 0.46, 0.45, 0.94],
          times: [0, 0.4, 1],
        }}
      >
        {children}
      </motion.div>

      {/* Concentric rings effect */}
      {Array.from({ length: 3 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute border-2 border-primary/30 rounded-full pointer-events-none"
          style={{
            left: zoomOrigin === "center" ? "50%" : `${zoomOrigin.x}%`,
            top: zoomOrigin === "center" ? "50%" : `${zoomOrigin.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          initial={{
            width: 0,
            height: 0,
            opacity: 0,
          }}
          animate={{
            width: [`${i * 50}px`, `${(i + 1) * 200}px`],
            height: [`${i * 50}px`, `${(i + 1) * 200}px`],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: duration * 0.6,
            delay: i * 0.1,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Starburst effect */}
      <div
        className="absolute z-30 pointer-events-none"
        style={{
          left: zoomOrigin === "center" ? "50%" : `${zoomOrigin.x}%`,
          top: zoomOrigin === "center" ? "50%" : `${zoomOrigin.y}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        {Array.from({ length: 12 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 bg-primary/60"
            style={{
              height: "2px",
              transformOrigin: "0 50%",
              rotate: `${i * 30}deg`,
            }}
            initial={{
              scaleX: 0,
              opacity: 0,
            }}
            animate={{
              scaleX: [0, 20, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: duration * 0.4,
              delay: duration * 0.2 + i * 0.02,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Zoom flash effect */}
      <motion.div
        className="absolute inset-0 z-20 bg-white/80 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{
          duration: duration * 0.3,
          delay: duration * 0.3,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default ZoomThroughTransition;
