import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface RotatingCardGridProps {
  cards: ReactNode[];
  className?: string;
  columns?: number;
  rotationIntensity?: number;
  staggerDelay?: number;
}

const RotatingCardGrid = ({
  cards,
  className = "",
  columns = 3,
  rotationIntensity = 10,
  staggerDelay = 0.1,
}: RotatingCardGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"],
  });

  return (
    <div
      ref={gridRef}
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ${className}`}
    >
      {cards.map((card, index) => {
        const row = Math.floor(index / columns);
        const col = index % columns;

        // Different rotation patterns based on position
        const rotationY = useTransform(
          scrollYProgress,
          [0, 1],
          [0, rotationIntensity * (col % 2 === 0 ? 1 : -1)]
        );

        const rotationX = useTransform(
          scrollYProgress,
          [0, 1],
          [0, rotationIntensity * (row % 2 === 0 ? 1 : -1)]
        );

        const scale = useTransform(
          scrollYProgress,
          [0, 0.5, 1],
          [0.9, 1.1, 0.9]
        );

        return (
          <motion.div
            key={index}
            className="perspective-1000"
            style={{
              perspective: "1000px",
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * staggerDelay,
              duration: 0.6,
              ease: "easeOut",
            }}
          >
            <motion.div
              className="relative transform-gpu"
              style={{
                rotateY: rotationY,
                rotateX: rotationX,
                scale,
              }}
              whileHover={{
                rotateY: 5,
                rotateX: 5,
                scale: 1.05,
                z: 50,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              <div className="bg-card border border-border rounded-xl p-6 shadow-lg transform-gpu backface-hidden">
                {card}

                {/* Shimmer effect on scroll */}
                <motion.div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                    opacity: useTransform(
                      scrollYProgress,
                      [0, 0.5, 1],
                      [0, 1, 0]
                    ),
                  }}
                />

                {/* Depth shadow */}
                <motion.div
                  className="absolute inset-0 rounded-xl bg-black/10 -z-10"
                  style={{
                    x: useTransform(rotationY, [-10, 10], [-2, 2]),
                    y: useTransform(rotationX, [-10, 10], [-2, 2]),
                    filter: "blur(4px)",
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default RotatingCardGrid;
