import { motion } from "framer-motion";
import { useState } from "react";
import { ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  glowIntensity?: number;
}

const GlowCard = ({
  children,
  className = "",
  glowColor = "hsl(var(--primary))",
  glowIntensity = 0.3,
}: GlowCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      style={{
        filter: isHovered
          ? `drop-shadow(0 0 20px ${glowColor}/${glowIntensity}) drop-shadow(0 0 40px ${glowColor}/${
              glowIntensity * 0.5
            })`
          : "none",
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0"
        style={{
          background: `radial-gradient(circle at center, ${glowColor}/${
            glowIntensity * 0.2
          }, transparent 70%)`,
          filter: "blur(20px)",
          zIndex: -1,
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
      />

      {children}
    </motion.div>
  );
};

export default GlowCard;
