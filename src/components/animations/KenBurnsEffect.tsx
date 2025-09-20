import { motion } from "framer-motion";
import { useState } from "react";

interface KenBurnsEffectProps {
  src: string;
  alt?: string;
  className?: string;
  direction?:
    | "zoom-in"
    | "zoom-out"
    | "pan-left"
    | "pan-right"
    | "pan-up"
    | "pan-down";
  duration?: number;
  intensity?: number;
}

const KenBurnsEffect = ({
  src,
  alt = "",
  className = "",
  direction = "zoom-in",
  duration = 10,
  intensity = 1.1,
}: KenBurnsEffectProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const getAnimationValues = () => {
    switch (direction) {
      case "zoom-in":
        return {
          initial: { scale: 1 },
          animate: { scale: intensity },
        };
      case "zoom-out":
        return {
          initial: { scale: intensity },
          animate: { scale: 1 },
        };
      case "pan-left":
        return {
          initial: { scale: intensity, x: "10%" },
          animate: { scale: 1, x: "-10%" },
        };
      case "pan-right":
        return {
          initial: { scale: intensity, x: "-10%" },
          animate: { scale: 1, x: "10%" },
        };
      case "pan-up":
        return {
          initial: { scale: intensity, y: "10%" },
          animate: { scale: 1, y: "-10%" },
        };
      case "pan-down":
        return {
          initial: { scale: intensity, y: "-10%" },
          animate: { scale: 1, y: "10%" },
        };
      default:
        return {
          initial: { scale: 1 },
          animate: { scale: intensity },
        };
    }
  };

  const { initial, animate } = getAnimationValues();

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading placeholder */}
      {!isLoaded && (
        <motion.div
          className="absolute inset-0 bg-muted animate-pulse"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        />
      )}

      {/* Ken Burns Image */}
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        initial={{
          ...initial,
          opacity: 0,
        }}
        animate={{
          ...animate,
          opacity: isLoaded ? 1 : 0,
        }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          opacity: { duration: 0.5 },
        }}
        onLoad={() => setIsLoaded(true)}
        style={{
          transformOrigin: "center center",
        }}
      />

      {/* Overlay gradient for depth */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            135deg, 
            rgba(0, 0, 0, 0.1) 0%, 
            transparent 50%, 
            rgba(0, 0, 0, 0.05) 100%
          )`,
        }}
        animate={{
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{
          duration: duration / 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            circle at center, 
            transparent 60%, 
            rgba(0, 0, 0, 0.1) 100%
          )`,
        }}
      />
    </div>
  );
};

export default KenBurnsEffect;
