import { motion } from "framer-motion";
import { useState, useRef } from "react";

interface TextWarpHoverProps {
  text: string;
  className?: string;
  warpIntensity?: number;
  splitBy?: "words" | "letters";
  staggerDelay?: number;
}

const TextWarpHover = ({
  text,
  className = "",
  warpIntensity = 8,
  splitBy = "words",
  staggerDelay = 0.02,
}: TextWarpHoverProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const splitText = () => {
    if (splitBy === "letters") {
      return text.split("").map((char, index) => ({
        content: char === " " ? "\u00A0" : char,
        index,
      }));
    } else {
      return text.split(" ").map((word, index) => ({
        content: word,
        index,
      }));
    }
  };

  const textParts = splitText();

  const getWarpEffect = (index: number) => {
    if (hoveredIndex === null) return {};

    const distance = Math.abs(index - hoveredIndex);
    const maxDistance = 3; // Affect 3 items on each side

    if (distance > maxDistance) return {};

    const intensity = (maxDistance - distance) / maxDistance;
    const warpAmount = intensity * warpIntensity;

    return {
      y: -warpAmount,
      scale: 1 + intensity * 0.1,
      rotateX: intensity * 5,
    };
  };

  return (
    <motion.div
      ref={containerRef}
      className={`inline-flex ${
        splitBy === "words" ? "gap-2" : ""
      } ${className}`}
      style={{ perspective: "1000px" }}
    >
      {textParts.map((part, index) => (
        <motion.span
          key={index}
          className={`inline-block cursor-pointer ${
            splitBy === "letters" ? "" : "whitespace-nowrap"
          }`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          animate={getWarpEffect(index)}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: staggerDelay * Math.abs((hoveredIndex || 0) - index),
          }}
          whileHover={{
            color: "hsl(var(--primary))",
            textShadow: "0 0 8px hsl(var(--primary) / 0.5)",
          }}
          style={{
            transformOrigin: "center bottom",
            transformStyle: "preserve-3d",
          }}
        >
          {part.content}

          {/* Ripple effect */}
          {hoveredIndex === index && (
            <motion.span
              className="absolute inset-0 rounded-sm pointer-events-none"
              style={{
                background: `radial-gradient(
                  circle, 
                  hsl(var(--primary) / 0.1), 
                  transparent 70%
                )`,
              }}
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          )}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default TextWarpHover;
