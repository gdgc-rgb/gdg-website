import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ParallaxLayer {
  element: ReactNode;
  speed: number;
  className?: string;
  blur?: number;
  opacity?: number;
}

interface ParallaxBackgroundProps {
  children: ReactNode;
  layers: ParallaxLayer[];
  className?: string;
  height?: string;
}

const ParallaxBackground = ({
  children,
  layers,
  className = "",
  height = "100vh",
}: ParallaxBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden w-screen ${className}`}
      style={{ height }}
    >
      {/* Parallax Layers */}
      {layers.map((layer, index) => {
        const y = useTransform(scrollYProgress, [0, 1], [0, layer.speed * 200]);

        return (
          <motion.div
            key={index}
            className={`absolute inset-0 w-screen h-screen ${layer.className || ""}`}
            style={{
              y,
              filter: layer.blur ? `blur(${layer.blur}px)` : "none",
              opacity: layer.opacity || 1,
              zIndex: -layers.length + index,
            }}
          >
            {layer.element}
          </motion.div>
        );
      })}

      {/* Foreground Content */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

export default ParallaxBackground;
