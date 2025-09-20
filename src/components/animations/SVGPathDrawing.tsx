import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface SVGPathDrawingProps {
  paths: string[];
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
  fillColor?: string;
  duration?: number;
  delay?: number;
  staggerDelay?: number;
  viewBox?: string;
  size?: { width: number; height: number };
  onComplete?: () => void;
}

const SVGPathDrawing = ({
  paths,
  className = "",
  strokeColor = "hsl(var(--primary))",
  strokeWidth = 2,
  fillColor = "none",
  duration = 2,
  delay = 0,
  staggerDelay = 0.3,
  viewBox = "0 0 100 100",
  size = { width: 100, height: 100 },
  onComplete,
}: SVGPathDrawingProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration,
          delay: delay + i * staggerDelay,
          ease: "easeInOut",
        },
        opacity: {
          duration: 0.3,
          delay: delay + i * staggerDelay,
        },
      },
    }),
  };

  const fillVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      opacity: fillColor !== "none" ? 0.8 : 0,
      scale: 1,
      transition: {
        delay: delay + paths.length * staggerDelay + duration,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.svg
        width={size.width}
        height={size.height}
        viewBox={viewBox}
        className="overflow-visible"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        onAnimationComplete={onComplete}
      >
        {/* Glow effect background */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradient for more dynamic colors */}
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: strokeColor, stopOpacity: 1 }}
            />
            <stop
              offset="50%"
              style={{ stopColor: "hsl(var(--secondary))", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: strokeColor, stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>

        {/* Background fill (appears after drawing) */}
        {fillColor !== "none" && (
          <motion.g
            variants={fillVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {paths.map((path, index) => (
              <path
                key={`fill-${index}`}
                d={path}
                fill={fillColor}
                stroke="none"
              />
            ))}
          </motion.g>
        )}

        {/* Animated paths */}
        {paths.map((path, index) => (
          <motion.path
            key={index}
            d={path}
            fill="none"
            stroke="url(#pathGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
            variants={pathVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={index}
          />
        ))}

        {/* Animated dots at path endpoints */}
        {inView &&
          paths.map((path, pathIndex) => {
            // Extract the end point of each path for the dot
            const pathElement = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "path"
            );
            pathElement.setAttribute("d", path);
            const pathLength = pathElement.getTotalLength();
            const endPoint = pathElement.getPointAtLength(pathLength);

            return (
              <motion.circle
                key={`dot-${pathIndex}`}
                cx={endPoint.x}
                cy={endPoint.y}
                r="2"
                fill={strokeColor}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.5, 1],
                  opacity: [0, 1, 1],
                }}
                transition={{
                  delay: delay + pathIndex * staggerDelay + duration,
                  duration: 0.5,
                  ease: "backOut",
                }}
              />
            );
          })}
      </motion.svg>

      {/* Floating particles effect */}
      {inView && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: strokeColor,
                left: `${20 + i * 10}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -20, -40],
                x: [0, Math.random() * 20 - 10, Math.random() * 40 - 20],
              }}
              transition={{
                duration: 2 + Math.random(),
                delay: delay + duration + i * 0.2,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Progress indicator */}
      <motion.div
        className="absolute -bottom-8 left-0 right-0 h-1 bg-muted rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: strokeColor }}
          initial={{ width: "0%" }}
          animate={inView ? { width: "100%" } : {}}
          transition={{
            duration: duration + paths.length * staggerDelay,
            delay,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
};

export default SVGPathDrawing;
