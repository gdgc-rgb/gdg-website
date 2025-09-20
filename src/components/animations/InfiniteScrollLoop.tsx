import { motion } from "framer-motion";
import { ReactNode } from "react";

interface InfiniteScrollLoopProps {
  children: ReactNode[];
  direction?: "left" | "right" | "up" | "down";
  speed?: number;
  className?: string;
  pauseOnHover?: boolean;
}

const InfiniteScrollLoop = ({
  children,
  direction = "left",
  speed = 50,
  className = "",
  pauseOnHover = true,
}: InfiniteScrollLoopProps) => {
  const isHorizontal = direction === "left" || direction === "right";
  const isReverse = direction === "right" || direction === "down";

  const animationDirection = isHorizontal
    ? isReverse
      ? [0, -100]
      : [0, 100]
    : isReverse
    ? [0, -100]
    : [0, 100];

  const animationProperty = isHorizontal ? "x" : "y";

  const duplicatedChildren = [...children, ...children, ...children];

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{
        maskImage: isHorizontal
          ? "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)"
          : "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <motion.div
        className={`flex ${isHorizontal ? "flex-row" : "flex-col"} gap-6`}
        animate={{
          [animationProperty]: `${animationDirection[1]}%`,
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        whileHover={
          pauseOnHover
            ? {
                animationPlayState: "paused",
              }
            : {}
        }
        style={{
          width: isHorizontal ? "300%" : "100%",
          height: isHorizontal ? "100%" : "300%",
        }}
      >
        {duplicatedChildren.map((child, index) => (
          <motion.div
            key={index}
            className={`flex-shrink-0 ${isHorizontal ? "w-auto" : "h-auto"}`}
            whileHover={
              pauseOnHover
                ? {
                    scale: 1.05,
                    zIndex: 10,
                  }
                : {}
            }
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteScrollLoop;
