import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

interface ScrollProgressIndicatorProps {
  className?: string;
  height?: number;
  color?: string;
  backgroundColor?: string;
  position?: "top" | "bottom" | "left" | "right";
  showPercentage?: boolean;
}

const ScrollProgressIndicator = ({
  className = "",
  height = 3,
  color = "hsl(var(--primary))",
  backgroundColor = "hsl(var(--muted))",
  position = "top",
  showPercentage = false,
}: ScrollProgressIndicatorProps) => {
  const { scrollYProgress } = useScroll();
  const [scrollPercentage, setScrollPercentage] = useState(0);

  // Smooth spring animation for progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (showPercentage) {
      const unsubscribe = scrollYProgress.on("change", (latest) => {
        setScrollPercentage(Math.round(latest * 100));
      });
      return () => unsubscribe();
    }
  }, [scrollYProgress, showPercentage]);

  const getPositionStyles = () => {
    switch (position) {
      case "top":
        return {
          top: 0,
          left: 0,
          right: 0,
          height: `${height}px`,
          transformOrigin: "0% 0%",
        };
      case "bottom":
        return {
          bottom: 0,
          left: 0,
          right: 0,
          height: `${height}px`,
          transformOrigin: "0% 0%",
        };
      case "left":
        return {
          top: 0,
          left: 0,
          bottom: 0,
          width: `${height}px`,
          transformOrigin: "0% 0%",
          rotate: 90,
        };
      case "right":
        return {
          top: 0,
          right: 0,
          bottom: 0,
          width: `${height}px`,
          transformOrigin: "0% 0%",
          rotate: 90,
        };
      default:
        return {};
    }
  };

  const isVertical = position === "left" || position === "right";

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className={`fixed z-50 ${className}`}
        style={{
          backgroundColor,
          ...getPositionStyles(),
        }}
      >
        {/* Animated progress fill */}
        <motion.div
          className="h-full w-full origin-left"
          style={{
            backgroundColor: color,
            scaleX: isVertical ? 1 : scaleX,
            scaleY: isVertical ? scaleX : 1,
            background: `linear-gradient(90deg, 
              ${color}, 
              hsl(var(--secondary)), 
              ${color})`,
          }}
        />

        {/* Glowing effect */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, 
              transparent, 
              ${color}80, 
              transparent)`,
            scaleX: isVertical ? 1 : scaleX,
            scaleY: isVertical ? scaleX : 1,
            filter: "blur(2px)",
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Moving indicator dot */}
        <motion.div
          className="absolute w-3 h-3 rounded-full -top-1.5 shadow-lg"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}80`,
            left: isVertical ? "-6px" : undefined,
            top: isVertical ? undefined : "-6px",
            x: isVertical ? 0 : `calc(${scrollPercentage}% - 6px)`,
            y: isVertical ? `calc(${scrollPercentage}% - 6px)` : 0,
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Percentage Display */}
      {showPercentage && (
        <motion.div
          className="fixed top-4 right-4 z-50 px-3 py-1 bg-card border border-border 
                     rounded-full text-sm font-medium shadow-lg backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <motion.span
            key={scrollPercentage}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
          >
            {scrollPercentage}%
          </motion.span>
        </motion.div>
      )}
    </>
  );
};

export default ScrollProgressIndicator;
