import { motion, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface SlidingIndicatorProps {
  activeIndex: number;
  items: string[];
  className?: string;
  indicatorColor?: string;
  onItemClick?: (index: number) => void;
}

const SlidingIndicator = ({
  activeIndex,
  items,
  className = "",
  indicatorColor = "hsl(var(--primary))",
  onItemClick,
}: SlidingIndicatorProps) => {
  const [indicatorStyle, setIndicatorStyle] = useState({ x: 0, width: 0 });
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const springX = useSpring(indicatorStyle.x, {
    stiffness: 300,
    damping: 30,
  });

  const springWidth = useSpring(indicatorStyle.width, {
    stiffness: 300,
    damping: 30,
  });

  useEffect(() => {
    const activeElement = itemRefs.current[activeIndex];
    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement;
      setIndicatorStyle({
        x: offsetLeft,
        width: offsetWidth,
      });
    }
  }, [activeIndex]);

  return (
    <div className={`relative flex ${className}`}>
      {/* Sliding indicator dot/bar */}
      <motion.div
        className="absolute bottom-0 h-0.5 rounded-full"
        style={{
          backgroundColor: indicatorColor,
          x: springX,
          width: springWidth,
        }}
      />

      {/* Floating indicator dot */}
      <motion.div
        className="absolute -bottom-3 w-2 h-2 rounded-full"
        style={{
          backgroundColor: indicatorColor,
          x: springX,
          left: "50%",
          transform: "translateX(-50%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Navigation items */}
      {items.map((item, index) => (
        <motion.button
          key={index}
          ref={(el) => (itemRefs.current[index] = el)}
          className={`
            relative px-4 py-2 text-sm font-medium transition-colors duration-200
            ${
              activeIndex === index
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }
          `}
          onClick={() => onItemClick?.(index)}
          whileHover={{
            y: -1,
            scale: 1.05,
          }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
        >
          {item}

          {/* Hover glow effect */}
          <motion.div
            className="absolute inset-0 rounded-md -z-10"
            style={{
              background: `radial-gradient(circle, ${indicatorColor}15, transparent 60%)`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          />
        </motion.button>
      ))}
    </div>
  );
};

export default SlidingIndicator;
