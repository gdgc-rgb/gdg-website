import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface TextRevealMaskProps {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right" | "center";
  gradientColor?: string;
  delay?: number;
}

const TextRevealMask = ({
  children,
  className = "",
  direction = "left",
  gradientColor = "hsl(var(--primary))",
  delay = 0,
}: TextRevealMaskProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 0.9", "start 0.1"],
  });

  const getMaskPosition = () => {
    switch (direction) {
      case "left":
        return useTransform(scrollYProgress, [0, 1], ["-100%", "100%"]);
      case "right":
        return useTransform(scrollYProgress, [0, 1], ["200%", "0%"]);
      case "center":
        return useTransform(scrollYProgress, [0, 1], ["50%", "50%"]);
      default:
        return "-100%";
    }
  };

  const maskPosition = getMaskPosition();
  const maskSize =
    direction === "center"
      ? useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
      : "200%";

  return (
    <div ref={textRef} className={`relative overflow-hidden ${className}`}>
      {/* Background text (hidden state) */}
      <div className="opacity-20">{children}</div>

      {/* Revealed text with mask */}
      <motion.div
        className="absolute inset-0"
        style={{
          maskImage:
            direction === "center"
              ? `radial-gradient(circle at 50% 50%, black ${maskSize}, transparent ${maskSize})`
              : `linear-gradient(90deg, transparent 0%, black 40%, black 60%, transparent 100%)`,
          maskPosition: direction === "center" ? "center" : maskPosition,
          maskSize: direction === "center" ? maskSize : "200% 100%",
          WebkitMaskImage:
            direction === "center"
              ? `radial-gradient(circle at 50% 50%, black ${maskSize}, transparent ${maskSize})`
              : `linear-gradient(90deg, transparent 0%, black 40%, black 60%, transparent 100%)`,
          WebkitMaskPosition: direction === "center" ? "center" : maskPosition,
          WebkitMaskSize: direction === "center" ? maskSize : "200% 100%",
        }}
      >
        <div className="bg-gradient-to-r from-gcp-blue via-gcp-green to-gcp-yellow bg-clip-text text-transparent">
          {children}
        </div>
      </motion.div>

      {/* Shimmer effect overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${gradientColor}40, transparent)`,
          x: maskPosition,
          opacity: useTransform(
            scrollYProgress,
            [0, 0.3, 0.7, 1],
            [0, 1, 1, 0]
          ),
        }}
      />
    </div>
  );
};

export default TextRevealMask;
